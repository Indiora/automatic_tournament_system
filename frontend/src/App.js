import React, {useState, useRef} from "react";
import Counter from './components/Counter';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import PostFrom from './components/PostFrom';
import ClassCounter from './components/ClassCounter';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import './styles/App.css';

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JS', body: 'hello'},
        {id: 2, title: 'Java', body: 'hello'},
        {id: 3, title: 'Python', body: 'hello'},
    ])



    const bodyInputRef = useRef()

    const addNewPost = (e) => {
        e.preventDefault();
        setPosts([...posts, {...post, id: Date.now()}])
        setPost({title: '', body: ''})


    }

    return (
    <div className="App">
        <PostFrom/>
        <PostList posts={posts} title="Список"/>
    </div>
    );
}

export default App;
