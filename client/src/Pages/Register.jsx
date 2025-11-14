import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../Context/AuthContext";

function Register() {



    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {registerUser} = useAuthContext();

    const handleRegister = async(e) => {
        e.preventDefault();
        await registerUser(username,email,password)
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form 
                onSubmit={handleRegister}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

                <input 
                    type="text"
                    placeholder="Username"
                    className="border p-2 w-full mb-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

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
                    className="bg-blue-500 text-white w-full py-2 rounded"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default Register;
