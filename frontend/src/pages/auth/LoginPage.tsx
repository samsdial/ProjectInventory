import React from "react";
import { Button, Input } from "../../components";

export const LoginPage: React.FC = () => {
    return (
        <div className="">
            <h1>Login</h1>
            <form action="">
                <input type="text" name="" id="" placeholder="Usuario" />
                <input type="text" name="" id="" placeholder="Contraseña" />
                <Input type="text" placeholder="User" />
                <Button color="bg-green-500" text="Iniciar sesión" />
            </form>
        </div>
    );
};