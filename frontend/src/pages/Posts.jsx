import React, {useEffect, useRef, useState} from 'react';
import PostService from "../API/PostService";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import PostFrom from '../components/PostForm';
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";
import '../styles/App.css';
import { useObserver } from '../hooks/useObserver';


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef()

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostLoadind, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount =  response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostLoadind, ()=> {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts()
    }, [page])
 
    const createPost = (newPost) => {   
        setPosts([...posts, newPost])
        setModal(false)
    }

    const changePage = (page) => {
        setPage(page)
    }

    const removePost = (post) => {
        console.log('hello')
        setPosts(posts.filter(p => p.id !== post.id))
    }


    return (
        <div className="App">
            <button onClick={fetchPosts}>tye</button>
            <MyButton onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}><PostFrom create={createPost}/></MyModal>
            
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError &&
                <h1>Error ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список"/>
            <div ref={lastElement} style={{height: 10}}></div>
            {isPostLoadind &&
                 <div style={{display: 'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div>
            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
                
        </div>
    );
}

export default Posts;
