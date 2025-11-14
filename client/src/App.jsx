import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Todos from './Pages/Todos'
import useAuthContext from './Context/AuthContext'

function App() {
    const { token } = useAuthContext();

    return (
        <div>
            <Toaster />
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/todos" element={token ? <Todos/> : <Login/>}/>
            </Routes>
        </div>
    )
}

export default App
