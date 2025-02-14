"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  IconButton,
  Button,
  List,
  ListItem,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { ArrowBack, Add, Remove, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Function to update quantity
  const updateQuantity = (index: number, amount: number) => {
    const updatedCart = [...cart];
    const newQuantity = updatedCart[index].quantity + amount;

    // Ensure quantity does not go below 1
    if (newQuantity > 0) {
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Function to remove an item from the cart
  const removeItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => {
    const price = parseFloat(item.price);
    // Check if price is a valid number and item has a quantity
    if (!isNaN(price) && item.quantity > 0) {
      return acc + price * item.quantity;
    }
    return acc;
  }, 0).toFixed(2); // Ensuring total price is fixed to two decimal places

  return (
    <Box>
      <Container sx={{ textAlign: "center", marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>Your Cart</Typography>

        {cart.length === 0 ? (
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Your cart is currently empty.
          </Typography>
        ) : (
          <List>
            {cart.map((item, index) => (
              <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Card sx={{ width: "100%", display: "flex", alignItems: "center", padding: 2 }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{ width: 100, height: 100, objectFit: "contain", marginRight: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography color="text.secondary">${parseFloat(item.price).toFixed(2)}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                      <IconButton onClick={() => updateQuantity(index, -1)} disabled={item.quantity === 1}>
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton onClick={() => updateQuantity(index, 1)}>
                        <Add />
                      </IconButton>
                    </Box>
                  </CardContent>
                  <IconButton color="error" onClick={() => removeItem(index)}>
                    <Delete />
                  </IconButton>
                </Card>
              </ListItem>
            ))}
          </List>
        )}

        {cart.length > 0 && (
          <Typography variant="h5" sx={{ marginTop: 3 }}>
            Total: ${totalPrice}
          </Typography>
        )}

        <Button variant="contained" onClick={() => router.push("/")} sx={{ marginTop: 3 }}>
          <ArrowBack /> Back to Shopping
        </Button>
      </Container>
    </Box>
  );
}