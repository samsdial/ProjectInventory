import React from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const RegisterPage: React.FC = () => {
    return (
        <div className="h-screen md:flex fade-in">
            <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
                <div>
                    <Typography variant="h4" className="text-white font-bold">
                        Tech Inventory
                    </Typography>
                    <Typography className="text-white mt-1">
                        Manage and control your tech items efficiently
                    </Typography>
                    <Button
                        variant="contained"
                        className="mt-4 py-2"
                        style={{ backgroundColor: "#fff", color: "#4b0082" }}
                    >
                        Information
                    </Button>
                </div>
            </div>
            <Container maxWidth="sm" className="flex md:w-1/2 justify-center items-center text-center py-10 bg-white ">
                <form className="w-full flex flex-col gap-6">
                    <Typography variant="h5" className="text-gray-800 font-bold mb-4">
                        Welcome to the inventory system!
                    </Typography>
                    <TextField
                        label="User Name"
                        variant="outlined"
                        fullWidth
                        className="mb-4"
                    />
                    <TextField
                        label="Bussines Email"
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
                        Register user
                    </Button>

                    <Link to="/auth/login" className=" text-blue-500">{"<--"} Go back to Login</Link>
                </form>
            </Container>
        </div>
    );
};

