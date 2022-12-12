import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoadind, error] = useFetching(async (id) => {
            const response = await PostService.getById(id)
            setPost(response.data)
    })

    const [fetchComments, isComLoadind, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(id)
        setComments(response.data)
})

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])
    return (
        <div>
            <div>PostIdPage {params.id}</div>
            {isLoadind
                ? <Loader/>
                : <div>{post.title}</div>
            }
            <h1>Comments</h1>
            {isComLoadind
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default PostIdPage