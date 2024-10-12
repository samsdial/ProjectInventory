import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios"; // <-- Asegúrate de tener axios instalado
import { Button, TextField, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IFormRegister } from "../../interfaces";



export const RegisterPage: React.FC = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Configuración de Formik con validaciones
    const formik = useFormik<IFormRegister>({
        initialValues: {
            userName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('User Name is required'),
            email: Yup.string().email('Invalid email address').required('Business Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
        }),
        onSubmit: async (values: IFormRegister, { resetForm }: FormikHelpers<IFormRegister>) => {
            try {
                // Hacer la solicitud POST a la API para registrar
                const response = await axios.post('https://yourapi.com/register', values);
                console.log(response.data);

                // Mostrar mensaje de éxito
                setSuccessMessage("Registration successful!");

                // Limpiar el formulario y mensaje después de 3 segundos
                resetForm();
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            } catch (error) {
                console.error("Error al registrar el usuario:", error);
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
            <Container maxWidth="sm" className="flex md:w-1/2 justify-center items-center text-center py-10 bg-white">
                <form className="w-full flex flex-col gap-6" onSubmit={formik.handleSubmit}>
                    <Typography variant="h5" className="text-gray-800 font-bold mb-4">
                        Welcome to the inventory system!
                    </Typography>

                    <TextField
                        label="User Name"
                        name="userName"
                        variant="outlined"
                        fullWidth
                        className="mb-4"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        error={formik.touched.userName && Boolean(formik.errors.userName)}
                        helperText={formik.touched.userName && formik.errors.userName}
                    />
                    <TextField
                        label="Business Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        className="mb-4"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        className="mb-4"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <Button variant="contained" color="primary" fullWidth type="submit">
                        Register User
                    </Button>

                    {successMessage && (
                        <Typography variant="body2" color="success" className="mt-4">
                            {successMessage}
                        </Typography>
                    )}

                    <Link to="/auth/login" className="text-blue-500">
                        {"<--"} Go back to Login
                    </Link>
                </form>
            </Container>
        </div>
    );
};
