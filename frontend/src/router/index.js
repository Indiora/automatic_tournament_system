import Login from "../pages/Login";
import Home from "../pages/Home";
import Tournaments from "../pages/Tournaments";
import Tournament from "../pages/Tournament";
import CreateTournament from "../pages/CreateTournament";
import CreateBracket from "../pages/CreateBracket";
import Bracket from "../pages/Bracket";
import Register from "../pages/Register";
import Profile from "../pages/Profile";


export const privateRoutes = [
    {path: '/create_tournament', element: <CreateTournament/>, exact: true},
]

export const publicRoutes = [
    {path: '/', element: <Home/>, exact: true},
    {path: '/tournaments', element: <Tournaments/>, exact: true},
    {path: '/tournament/:slug', element: <Tournament/>, exact: true},
    {path: '/bracket/:id', element: <Bracket/>, exact: true},
    {path: '/create_bracket', element: <CreateBracket/>, exact: true},
    {path: '/profile/:slug', element: <Profile/>, exact: true},
    {path: '/login', element: <Login/>, exact: true},
    {path: '/register', element: <Register/>, exact: true},
]