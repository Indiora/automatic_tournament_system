import React, {useEffect, useRef, useState} from 'react';
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Loader from "../components/UI/Loader/Loader";
import TournamentList from '../components/TournamentList';
import TournamentFilter from "../components/TournamentFilter";
import {useObserver} from '../hooks/useObserver';
import {useTournaments} from "../hooks/useTournaments";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/App.css';


function Tournaments() {
    const [tournaments, setTournaments] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(9);
    const [page, setPage] = useState(1);
    const lastElement = useRef()
    
    const sortedAndSearchedTournaments = useTournaments(tournaments, filter.sort, filter.query);

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
        <section class="section_with_div">
            {postError &&
                <h1>Error ${postError}</h1>
            }
            <TournamentFilter filter={filter} setFilter={setFilter}/>
            <Row>
                <Col lg={2}></Col>
                <Col lg={8}>
                    <TournamentList tournaments={sortedAndSearchedTournaments} title="Список"/>
                </Col>
                <Col lg={2}></Col>
            </Row>
            <div ref={lastElement} className="scrool_div"></div>
            {isPostLoadind &&
                 <section style={{display: 'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></section>
            }
        </section>
    );
}

export default Tournaments;
