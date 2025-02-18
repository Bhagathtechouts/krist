"use client";
import { useState, useEffect } from "react";
import { Typography, List, ListItem, Container, Box, IconButton, Button, Popover, Grid, TextField } from "@mui/material";
import { ShoppingCart, AccountCircle, Search } from "@mui/icons-material";
import Image from "next/image";
import "./globals.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Stack from "@mui/material/Stack";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 3)))
      .catch((err) => console.error(err));
  }, []);

  const handleHover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorEl?.contains(event.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  return (
    <Box className="nav">
<Container maxWidth="lg" style={{ textAlign: "center", paddingLeft: "500px", paddingTop:"50px" }}>

<Image 
  src="https://www.krist.tokyo/images/KRIST_logo.png" 
  alt="Krist Logo" 
  width={150} 
  height={80} 
  style={{ position:"absolute",left:100}} 
  className="image" 
/>

        <List className="header" style={{ display: "flex", justifyContent: "center" }}>
          <ListItem>Home</ListItem>
          <ListItem onMouseEnter={handleHover}>Shop</ListItem>
          <ListItem>Our Story</ListItem>
          <ListItem>Blog</ListItem>
          <ListItem>Contact Us</ListItem>
        </List>

        {/* Mega Menu */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          disableAutoFocus
        >
          <Grid container spacing={2} sx={{ padding: "20px", width: "600px" }} onMouseLeave={handleClose}>
            <Grid item xs={3}>
              <Typography variant="h6">Men</Typography>
              <List>
                <ListItem>T-Shirts</ListItem>
                <ListItem>Casual Shirts</ListItem>
                <ListItem>Formal Shirts</ListItem>
                <ListItem>Jackets</ListItem>
              </List>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">Women</Typography>
              <List>
                <ListItem>Kurtis & Sets</ListItem>
                <ListItem>Sarees</ListItem>
                <ListItem>Lehenga Cholis</ListItem>
              </List>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">Footwear</Typography>
              <List>
                <ListItem>Flats</ListItem>
                <ListItem>Casual Shoes</ListItem>
              </List>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">Kids</Typography>
              <List>
                <ListItem>T-Shirts</ListItem>
                <ListItem>Shirts</ListItem>
              </List>
            </Grid>
          </Grid>
        </Popover>

        <Box className="icons" sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
          <TextField label="Search" variant="outlined" size="small" onChange={(e) => setSearch(e.target.value)} />
          <IconButton color="inherit"><Search /></IconButton>
          <IconButton color="inherit" sx={{ marginRight: 2 }}><ShoppingCart /></IconButton>
          <Button color="inherit" startIcon={<AccountCircle />}>Login</Button>
        </Box>
      </Container>

      {/* Carousel Section */}
      <Box sx={{ maxWidth: "80%", margin: "auto", mt: 4 }}>
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          <div><img src="https://cmsimages.shoppersstop.com/Menswear_main_banner_web_a3b00ffd51/Menswear_main_banner_web_a3b00ffd51.png" alt="image1" /></div>
        </Carousel>
      </Box>

      {/* Products Section */}
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>Featured Products</Typography>
        <Grid container spacing={3}>
          {products
            .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
            .map((product) => (
              <Grid item xs={12} sm={4} key={product.id}>
                <Box sx={{ border: "1px solid #ddd", padding: 2, borderRadius: 2, textAlign: "center" }}>
                  <img src={product.image} alt={product.title} width={120} height={150} style={{ objectFit: "contain" }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>{product.title}</Typography>
                  <Typography variant="body1">${product.price}</Typography>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained">Add to Wishlist</Button>
                    <Button variant="contained">Add to Cart</Button>
                  </Stack>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
