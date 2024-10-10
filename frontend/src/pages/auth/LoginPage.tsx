import React from "react";
import { Button, TextField, Container, Typography } from "@mui/material";

export const LoginPage: React.FC = () => {
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div>
          <Typography variant="h4" className="text-white font-bold">
            Tech Inventory
          </Typography>
          <Typography className="text-white mt-1">
          Access the inventory management system
          </Typography>
          <Button
            variant="contained"
            className="mt-4 py-2"
            style={{ backgroundColor: "#fff", color: "#4b0082" }}
          >
            Access the inventory management system
          </Button>
        </div>
      </div>
      <Container maxWidth="sm" className="flex md:w-1/2 justify-center py-10 bg-white">
        <form className="w-full">
          <Typography variant="h5" className="text-gray-800 font-bold mb-4">
          Log in to your account
          </Typography>
          <TextField
            label="Business email"
            variant="outlined"
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className="mb-4"
          />
          <Button variant="contained" color="primary" fullWidth>
          Log in
          </Button>
          <Typography variant="body2" className="mt-4 text-gray-600 text-center">
          Forgot your password? <span className="text-blue-500 cursor-pointer">Recover it here</span>
          </Typography>
        </form>
      </Container>
    </div>
  );
};

