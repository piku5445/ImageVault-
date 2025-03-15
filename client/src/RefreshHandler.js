import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/register";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Forget from "./components/forget";
import RefreshHandler from "./RefreshHandler";
import Landing from "./components/landing";

function BasicExample() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    const PrivateRouting = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" replace />;
    };

    return (
        <Router>
            <Header />
            <RefreshHandler
                setIsAuthenticated={setIsAuthenticated}
                initialCheckDone={initialCheckDone}
                setInitialCheckDone={setInitialCheckDone}
            />

            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Landing />} />
                    <Route path="home" element={<PrivateRouting element={<Home />} />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forget" element={<Forget />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default BasicExample;
