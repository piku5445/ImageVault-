import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

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

PORT=3000
DBURL=mongodb://127.0.0.1:27017/login
JWT_SECRET_KEY=1234
CLOUDINARY_CLOUD_NAME=dlpxdxbla
CLOUDINARY_API_KEY=156396443962334
CLOUD_SECRET_KEY=I7_LqkuR7ed-kB6VHIJ5Vz7c4z4
MAILTRAP_TOKEN=98c2c19a1c24834218fa3759a693eb71
MAILTRAP_ENDPOINT=
