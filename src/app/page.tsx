"use client";
import { Typography, List, ListItem, Container, Box, IconButton, Button, Popover, Grid, TextField } from "@mui/material";
import { ShoppingCart, AccountCircle, Search } from "@mui/icons-material";
import Image from "next/image";
import "./globals.css";
import { useState, useEffect } from "react";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import * as React from 'react';
import Stack from '@mui/material/Stack';

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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="nav">
      <Container maxWidth="sm" style={{ textAlign: "center", padding: "20px" }}>
        <Image src="https://www.krist.tokyo/images/KRIST_logo.png" alt="Krist Logo" width={150} height={80} className="image" />
        <List className="header" style={{ display: "flex", justifyContent: "center" }}>
          <ListItem>Home</ListItem>
          <ListItem onMouseEnter={handleHover} onMouseLeave={handleClose}>Shop</ListItem>
          <ListItem>Our Story</ListItem>
          <ListItem>Blog</ListItem>
          <ListItem>Contact Us</ListItem>
        </List>
        <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} transformOrigin={{ vertical: "top", horizontal: "left" }}>
          <Grid container spacing={2} sx={{ padding: "10px", width: "300px" }}>
            <Grid item xs={4}><Typography variant="h6">Menswear</Typography></Grid>
            <Grid item xs={4}><Typography variant="h6">Womenswear</Typography></Grid>
            <Grid item xs={4}><Typography variant="h6">Footwear</Typography></Grid>
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
          <div><img src="https://cmsimages.shoppersstop.com/Home_web_41fb18f3c1/Home_web_41fb18f3c1.png" alt="image2" /></div>
          <div><img src="https://cmsimages.shoppersstop.com/Indianwear_main_banner_web_5954a56eb1/Indianwear_main_banner_web_5954a56eb1.png" alt="image3" /></div>
          <div>
            <img src="https://cmsimages.shoppersstop.com/Footwear_main_banner_web_5162bed0d0/Footwear_main_banner_web_5162bed0d0.png" alt="image4" />
          </div>
          <div>
            <img src="https://cmsimages.shoppersstop.com/Entry_Banner_web_f6137a6ed7/Entry_Banner_web_f6137a6ed7.gif" alt="image5" />
          </div>
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
      <Button variant="contained">add to wishlist</Button>
    
      <Button variant="contained" href="#contained-buttons">
        add to cart
      </Button>
</Stack>

                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
