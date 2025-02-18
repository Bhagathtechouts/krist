"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Typography, Button, Box, IconButton, Container, List, ListItem, 
  Popover, Grid, TextField, Divider, Paper 
} from "@mui/material";
import { Add, Remove, ShoppingCart, AccountCircle, Search, Favorite } from "@mui/icons-material";
import Image from "next/image";
import "@/app/globals.css";

export default function ProductDetail() {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    if (!router) return;
    const id = window.location.pathname.split("/").pop();

    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [router]);

  const handleHover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push({ ...product, quantity });
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <>
      {/* Navbar */}
      <Box className="nav">
        <Container maxWidth="md" sx={{ textAlign: "center", padding: "20px" }}>
          <Image 
            src="https://www.krist.tokyo/images/KRIST_logo.png" 
            alt="Krist Logo" 
            width={150} 
            height={80} 
            className="image" 
          />
          <List className="header" sx={{ display: "flex", justifyContent: "center" }}>
            <ListItem>Home</ListItem>
            <ListItem onMouseEnter={handleHover} onMouseLeave={handleClose}>Shop</ListItem>
            <ListItem>Our Story</ListItem>
            <ListItem>Blog</ListItem>
            <ListItem>Contact Us</ListItem>
          </List>
          <Popover 
            open={open} 
            anchorEl={anchorEl} 
            onClose={handleClose} 
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }} 
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Grid container spacing={2} sx={{ padding: "10px", width: "300px" }}>
              <Grid item xs={4}><Typography variant="h6">Menswear</Typography></Grid>
              <Grid item xs={4}><Typography variant="h6">Womenswear</Typography></Grid>
              <Grid item xs={4}><Typography variant="h6">Footwear</Typography></Grid>
            </Grid>
          </Popover>
          <Box className="icons" sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
            <TextField 
              label="Search" 
              variant="outlined" 
              size="small" 
              onChange={(e) => setSearch(e.target.value)} 
            />
            <IconButton color="inherit"><Search /></IconButton>
            <IconButton color="inherit" sx={{ marginRight: 2 }}><ShoppingCart /></IconButton>
            <Button color="inherit" startIcon={<AccountCircle />}>Login</Button>
          </Box>
        </Container>
      </Box>

      {/* Product Detail Page Content */}
      {product ? (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={5} alignItems="center">
            
            {/* Product Image */}
            <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
              <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  width={350} 
                  height={450} 
                  style={{ objectFit: "contain" }} 
                />
              </Paper>
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={7}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>{product.title}</Typography>
              <Typography sx={{ marginBottom: 2, color: "gray" }}>{product.description}</Typography>
              <Typography variant="h5" color="primary">${product.price}</Typography>
              <Typography variant="body2" color="text.sucess">
                Rating: {product.rating?.rate} ⭐ ({product.rating?.count} reviews)
              </Typography>

              {/* Quantity Selector */}
              <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Centers inside parent
    gap: 2,
    marginTop: 3,
    backgroundColor: "white",
    color: "black",
    width: "200px", // Set fixed width
    padding: "8px",
    borderRadius: "8px", // Rounded corners
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", // Subtle shadow
  }}
>
  <IconButton
    onClick={() => setQuantity(Math.max(1, quantity - 1))}
    sx={{ border: "1px solid gray", borderRadius: 1 }}
  >
    <Remove />
  </IconButton>
  <Typography sx={{ fontSize: "1.2rem", minWidth: "40px", textAlign: "center" }}>
    {quantity}
  </Typography>
  <IconButton
    onClick={() => setQuantity(quantity + 1)}
    sx={{ border: "1px solid gray", borderRadius: 1 }}
  >
    <Add />
  </IconButton>
</Box>


              {/* Wishlist & Cart Buttons */}
              <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ flex: 1 }} 
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outlined" 
                  color={wishlist ? "secondary" : "default"} 
                  sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }} 
                  onClick={() => setWishlist(!wishlist)}
                >
                  <Favorite sx={{ fontSize: 24, marginRight: 1 }} />
                  {wishlist ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Reviews Section */}
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>Customer Reviews</Typography>
              {product.rating?.count > 0 ? (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">"Great product! Highly recommend." ⭐⭐⭐⭐⭐</Typography>
                  <Typography variant="body1">"Quality is amazing for the price." ⭐⭐⭐⭐</Typography>
                  <Typography variant="body1">"Would buy again." ⭐⭐⭐⭐⭐</Typography>
                </Box>
              ) : (
                <Typography sx={{ mt: 2 }}>No reviews yet.</Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Typography sx={{ textAlign: "center", mt: 5 }}>Loading...</Typography>
      )}
    </>
  );
}
