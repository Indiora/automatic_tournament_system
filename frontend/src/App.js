import React, { useEffect, useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyNavbar from "./components/UI/MyNavbar/MyNavbar";
import MyFooter from "./components/UI/MyFooter/MyFooter";
import AppRouter from "./components/AppRouter";
import { AuthContext, ThemeContext} from "./context";
import './styles/App.css';



function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [theme, setTheme] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        else {
            setIsAuth(false)
        }

    }, [])

    return (  
        <ThemeContext.Provider value={{theme, setTheme}}>
            <AuthContext.Provider value={{isAuth, setIsAuth}}>
                <BrowserRouter>
                    <MyNavbar/>
                    <AppRouter/>
                    <MyFooter/>
                </BrowserRouter>
            </AuthContext.Provider>
        </ThemeContext.Provider>
    );
}

export default App;