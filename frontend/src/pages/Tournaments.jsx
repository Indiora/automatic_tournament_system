import React, {useEffect, useRef, useState} from 'react';
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import '../styles/App.css';
import def_tour from "../assets/img/d_t.png" 
import TournamentList from '../components/TournamentList';
import PostFilter from "../components/PostFilter";
import { useObserver } from '../hooks/useObserver';
import {usePosts} from "../hooks/usePosts";


function Tournaments() {
    const [tournaments, setTournaments] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(9);
    const [page, setPage] = useState(1);
    const lastElement = useRef()
    
    const sortedAndSearchedPosts = usePosts(tournaments, filter.sort, filter.query);

    const [fetchPosts, isPostLoadind, postError] = useFetching(async () => {
        const response = await PostService.getAllTournaments(limit, page);
        setTournaments([...tournaments, ...response.data.results])
        setTotalPages(getPageCount(response.data.count, limit))
    })

    const changePage = (page) => {
        setPage(page)
    }

    useObserver(lastElement, page < totalPages, isPostLoadind, ()=> {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts()
    }, [page])
 

    return (
        <section class="pb-3 hello">
            {postError &&
                <h1>Error ${postError}</h1>
            }
            <PostFilter filter={filter} setFilter={setFilter}/>
            <TournamentList tournaments={sortedAndSearchedPosts} title="Список"/>
            <div ref={lastElement} className="scrool_div"></div>
            {isPostLoadind &&
                 <section style={{display: 'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></section>
            }
        </section>
    );
}

export default Tournaments;
