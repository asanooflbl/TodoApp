import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AuthContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
        }
    }, [token]);

    const registerUser = async (username, email, password) => {
        try {
            const res = await axios.post("/api/auth/register", {
                username,
                email,
                password,
            });

            if (!res.data.success) return res.data;

            setToken(res.data.token);
            setUser(res.data.user);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/todos");
            return res.data;
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const loginUser = async (email, password) => {
        try {
            const res = await axios.post("/api/auth/login", {
                email,
                password,
            });

            if (!res.data.success) return res.data;

            setToken(res.data.token);
            setUser(res.data.user);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/todos");
            return res.data;
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const getTodos = async () => {
        try {
            const res = await axios.get("/api/todo/all");
            if (res.data.success) {
                setTodos(res.data.todos);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const addTodo = async (title, description) => {
        try {
            const res = await axios.post("/api/todo/add", {
                title,
                description,
            });

            if (res.data.success) {
                getTodos();
            }

            return res.data;
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const updateTodo = async (id, title, description) => {
        try {
            const res = await axios.post("/api/todo/update", {
                id,
                title,
                description,
            });

            if (res.data.success) {
                getTodos();
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const res = await axios.post("/api/todo/delete", { id });
            if (res.data.success) {
                getTodos();
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const toggleStatus = async (id) => {
        try {
            const res = await axios.post("/api/todo/toggle", { id });
            if (res.data.success) {
                getTodos();
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                todos,
                registerUser,
                loginUser,
                getTodos,
                addTodo,
                updateTodo,
                deleteTodo,
                toggleStatus,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuthContext() {
    return useContext(AuthContext);
}
