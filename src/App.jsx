import React, { Fragment, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { changeSchema } from "./apis/userService";

import Login from "../src/pages/login/Login";
import LoginSuccess from "./components/loginsuccess/LoginSuccess";
import NotFoundPage from "../src/pages/notfoundpage/NotFoundPage";
import Powersheet from "./pages/powersheet/Powersheet";
import Webapp from "./pages/webbapp/Webapp";
import Header from "./components/header/Header";

// context
import StoreContext from "./store/Context";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;
    const [state] = useContext(StoreContext);
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const checkIfMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            setIsMobile(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    useEffect(() => {
        if (isMobile && ["/"].includes(pathname)) {
          navigate("/webapp");
        }
      }, [isMobile, pathname, navigate]);

    const redirectPath = isMobile ? "/webapp" : "/powersheet";

    return (
        <Fragment>
            {["/powersheet", "/webapp"].includes(pathname) && (
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            )}
            <Routes>
                <Route
                    path="/"
                    element={
                        state.currentUser ? <Navigate to={redirectPath} /> : <Login />
                    }
                />
                <Route path="/login-success" element={<LoginSuccess />} />
                <Route
                    path="/powersheet"
                    element={
                        state.currentUser
                            ? (isMobile ? <Navigate to="/webapp" /> : <Powersheet />)
                            : <Navigate to="/" />
                    }
                />
                <Route
                    path="/webapp"
                    element={
                        state.currentUser
                            ? (isMobile ?  <Webapp searchTerm={searchTerm}/> : <Navigate to="/powersheet" />)
                            : <Navigate to="/" />
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Fragment>
    );
}

export default App;
