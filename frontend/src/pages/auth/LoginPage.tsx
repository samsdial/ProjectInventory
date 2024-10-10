import React from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/sliceAuthReducer";



export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const loginValidate = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(login());
        navigate("/home");
    };

    return (
        <div className="h-screen md:flex fade-in">
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
            <Container maxWidth="sm" className="flex md:w-1/2 justify-center items-center text-center bg-white">
                <form className="w-full flex flex-col gap-6" onSubmit={loginValidate}>
                    <Typography variant="h6" className="text-gray-800 font-bold">
                        Login
                    </Typography>
                    <TextField
                        label="Business email"
                        type="email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        className="mb-4"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        fullWidth
                        className="mb-4"
                    />
                    <Button variant="contained" color="primary" fullWidth type="submit">
                        Log in
                    </Button>

                    <Typography variant="body2" className="mt-4 text-gray-600 text-center">
                        Don't have an account? <Link to="/auth/register" className="text-blue-500 cursor-pointer">Sign up</Link>
                    </Typography>
                </form>
            </Container>
        </div>
    );
};
