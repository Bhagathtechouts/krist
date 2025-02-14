// pages/product/[id].tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, Container, Box, Button, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import "@/app/globals.css";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the URL
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.title} added to cart!`);
  };

  const handleAddToWishlist = () => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    existingWishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    alert(`${product.title} added to wishlist!`);
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ marginTop: 5 }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia component="img" height="400" image={product.image} alt={product.title} />
        <CardContent>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="h6" color="text.secondary">${product.price}</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>{product.description}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", marginBottom: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAddToCart} startIcon={<ShoppingCart />}>
            Add to Cart
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleAddToWishlist} startIcon={<Favorite />}>
            Add to Wishlist
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ProductDetail;