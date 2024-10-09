import React from "react";
import { Button, Input } from "../../components";

export const LoginPage: React.FC = () => {
    return (
        <div className="max-w-sm p-6 border rounded-lg text-center shadow-lg">
            <h1 className="mb-6 text-3xl font-semibold">Login</h1>
            <form action="" className="flex flex-col gap-3">
                <Input type="text" placeholder="Usuario" />
                <Input type="text" placeholder="Contraseña" />
                <Button color="bg-green-500" text="Iniciar sesión" />
            </form>
        </div>
    );
};