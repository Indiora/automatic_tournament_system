import React, { useContext } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from '../pages/About';
import Posts from '../pages/Posts';
import PostIdPage from '../pages/PostIdPage';
import { privateRoutes, publicRoutes } from '../router';
import { AuthContext } from '../context';
import Login from '../pages/Login';


function AppRouter() {
  const {isAuth, setIsAuth} = useContext(AuthContext)
  return (
    isAuth
    ?
        <Routes>
            {privateRoutes.map(route => 
              <Route 
                  path={route.path} 
                  element={route.element}
                  exact={route.exact} 
                  key={route.path}
                />
            )}
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                    </main>
                }
                />
        </Routes>
    :
        <Routes>
        {publicRoutes.map(route => 
          <Route 
              path={route.path} 
              element={route.element}
              exact={route.exact} 
              key={route.path}
            />
        )}
        <Route
            path="*"
            element={
                <Login/>
            }
            />
      </Routes>
  )
}

export default AppRouter