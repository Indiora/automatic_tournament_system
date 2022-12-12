import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Tournaments from "../pages/Tournaments";
import Tournament from "../pages/Tournament";
import CreateTournament from "../pages/CreateTournament";
import CreateBracket from "../pages/CreateBracket";
import Bracket from "../pages/Bracket";


export const privateRoutes = [
    {path: '/', element: <Home/>, exact: true},
    {path: '/tournaments', element: <Tournaments/>, exact: true},
    {path: '/tournament/:slug', element: <Tournament/>, exact: true},
    {path: '/bracket/:id', element: <Bracket/>, exact: true},
    {path: '/about', element: <About/>, exact: true},
    {path: '/posts', element: <Posts/>, exact: true},
    {path: '/posts/:id', element: <PostIdPage/>, exact: true},
    {path: '/create_tournament', element: <CreateTournament/>, exact: true},
    {path: '/create_bracket', element: <CreateBracket/>, exact: true},
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
]