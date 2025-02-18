"use client";
import { useState, useEffect } from "react";
import { Typography, List, ListItem, Container, Box, IconButton, Button, TextField, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { ShoppingCart, AccountCircle, Search } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Add this for navigation
import "@/app/globals.css";

export default function Product() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const router = useRouter(); // Initialize router

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.title} added to cart!`);
  };

  const handleProductClick = (product: any) => {
    router.push(`/productdetail/${product.id}`);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box className="nav">
        <Container maxWidth="sm" style={{ textAlign: "center", padding: "20px" }}>
          <Image src="https://www.krist.tokyo/images/KRIST_logo.png" alt="Krist Logo" width={150} height={80} className="image" />
          <List className="header" style={{ display: "flex", justifyContent: "center" }}>
            <ListItem>Home</ListItem>
            <ListItem>Our Story</ListItem>
            <ListItem>Blog</ListItem>
            <ListItem>Contact Us</ListItem>
          </List>
          <Box className="icons" sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
            <TextField label="Search" variant="outlined" size="small" onChange={(e) => setSearch(e.target.value)} />
            <IconButton color="inherit">
              <Search />
            </IconButton>
            <IconButton color="inherit">
              <ShoppingCart />
            </IconButton>
            <Button color="inherit" startIcon={<AccountCircle />}>Login</Button>
          </Box>
        </Container>
      </Box>

      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>Trending Products</Typography>

      <Grid container spacing={3} justifyContent="center">
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 345, boxShadow: 5, borderRadius: 2 }} onClick={() => handleProductClick(product)}>
              <CardMedia component="img" height="500" image={product.image} alt={product.title} />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  {product.title.length > 30 ? product.title.substring(0, 30) + "..." : product.title}
                </Typography>
                <Typography color="text.secondary">${product.price}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
