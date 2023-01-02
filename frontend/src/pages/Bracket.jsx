import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import Loader from '../components/UI/Loader/Loader'
import PostService from "../API/PostService";
import SingleElimination from '../components/SingleElimination'



const Bracket = () => {
    const params = useParams()

    const [bracket, setBracket] = useState([{
        "id": 1,
        "nextMatchId": 0,
        "tournamentRoundText": "test",
        "startTime": "2021-05-30",
        "state": "SCHEDULED",
        "participants": [
        {
            "id": "d1",
            "resultText": 0,
            "isWinner": false,
            "status": null,
            "name": "not",
            "picture": null
        },
        {
            "id": "d1",
            "resultText": 0,
            "isWinner": false,
            "status": null,
            "name": "not",
            "picture": null
        }
        ]
    }])

    const [fetchBrackets, isBraLoadind, braError] = useFetching(async (id) => {
        const response = await PostService.getBracketById(id)
        setBracket(response.data.bracket)
    })

    useEffect(() => {
        fetchBrackets(params.id)
    }, [])

    return (
        <section>
            {isBraLoadind
                ? <Loader/>
                :   <div class="container-fluid ">
                        <div class="row p-3">
                            <div class="col-lg-2"></div>
                                <div class="col-lg-8 col-md-12">
                                    <div class="row my-3">
                                        <div class="col">
                                            <SingleElimination bracket={bracket}/>
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