import React from 'react'
import useAuthContext from '../Context/AuthContext';
import { useState } from 'react';

function Login() {
    const { loginUser } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

       const handleLogin = async (e) => {
        e.preventDefault();
        await loginUser(email, password);
    };


 return (
        <div className="min-h-screen flex items-center justify-center">
            <form 
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-xl font-semibold mb-4">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button 
                    type="submit" 
                    className="bg-green-500 text-white w-full py-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;