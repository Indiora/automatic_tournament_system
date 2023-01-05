import React, { useEffect, useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyNavbar from "./components/UI/MyNavbar/MyNavbar";
import MyFooter from "./components/UI/MyFooter/MyFooter";
import AppRouter from "./components/AppRouter";
import { AuthContext, ThemeContext} from "./context";
import './styles/App.css';
import { AuthProvider } from "./context";


function App() {
    const [theme, setTheme] = useState(false);

    return (  
        <ThemeContext.Provider value={{theme, setTheme}}>
            <BrowserRouter>
                <AuthProvider>
                    <MyNavbar/>
                    <AppRouter/>
                    <MyFooter/>
                </AuthProvider>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

export default App;