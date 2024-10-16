import React from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IAuthCredentials, IAuthResponse } from "../../interfaces";
import { login } from "../../store/slice/sliceAuthReducer";
import { authUser } from "../../api/authUser";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();    

    const formik = useFormik<IAuthCredentials>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const res: IAuthResponse = await authUser(values);
            if (res.data) {
                dispatch(login(res.data));
                navigate("/home");
            } else {
                alert("Error de autenticación, inténtalo de nuevo");
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

                    <Typography variant="body2" className="mt-4 text-gray-600 text-center">
                        Don't have an account? <Link to="/auth/register" className="text-blue-500 cursor-pointer">Sign up</Link>
                    </Typography>
                </form>
            </Container>
        </div>
    );
};
