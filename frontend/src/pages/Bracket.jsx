import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import Loader from '../components/UI/Loader/Loader'
import PostService from "../API/PostService";
import SingleElimination from '../components/SingleElimination'



const Bracket = () => {
    const params = useParams()
    const [bracket, setBracket] = useState({})
    const [fetchPostById, isLoadind, error] = useFetching(async (id) => {
            const response = await PostService.getBracketById(id)
            setBracket(response.data)
            console.log(bracket)
    })

    useEffect(() => {
        fetchPostById(params.id)
    }, [])

    return (
        <section>
            {isLoadind
                ? <Loader/>
                :   <div class="container-fluid ">
                        <div class="row p-3">
                            <div class="col-lg-2"></div>
                                <div class="col-lg-8 col-md-12">
                                    <div class="row my-3">
                                        <div class="col">
                                            <SingleElimination bracket={bracket.bracket}/>
                                        </div>
                                    </div>
                                </div>
                            <div class="col-lg-2"></div>
                        </div>
                    </div>
            
            }
        </section>
    )
}

export default Bracket