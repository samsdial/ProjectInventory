import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup"; // Librería para validaciones
import axios from "axios";
import { login } from "../../store/slice/sliceAuthReducer";

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Validaciones con Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    // Formik para manejar el formulario y las validaciones
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("https://yourapi.com/login", {
                    email: values.email,
                    password: values.password,
                });

                dispatch(login());
                setSuccessMessage("Login successful!");

                // Navegar al home después de 2 segundos
                setTimeout(() => {
                    navigate("/home");
                }, 2000);

                // Limpiar el mensaje de éxito después de 3 segundos
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } catch (error) {
                setErrorMessage("Login failed. Please check your credentials.");
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000); // Ocultar el mensaje de error después de 3 segundos
            }
        },
    });

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
                <form className="w-full flex flex-col gap-6" onSubmit={formik.handleSubmit}>
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
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        fullWidth
                        className="mb-4"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button variant="contained" color="primary" fullWidth type="submit">
                        Log in
                    </Button>

                    {/* Mostrar mensaje de éxito o error */}
                    {successMessage && (
                        <Typography variant="body2" color="success" className="mt-4">
                            {successMessage}
                        </Typography>
                    )}
                    {errorMessage && (
                        <Typography variant="body2" color="error" className="mt-4">
                            {errorMessage}
                        </Typography>
                    )}

                    <Typography variant="body2" className="mt-4 text-gray-600 text-center">
                        Don't have an account? <Link to="/auth/register" className="text-blue-500 cursor-pointer">Sign up</Link>
                    </Typography>
                </form>
            </Container>
        </div>
    );
};
