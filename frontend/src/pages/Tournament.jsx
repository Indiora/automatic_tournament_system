import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import Loader from '../components/UI/Loader/Loader'
import PostService from "../API/PostService";
import def_tour from "../assets/img/d_t.png" 
import SingleElimination from '../components/SingleElimination'


const Tournament = () => {
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

    const [tournament, setTournament] = useState({})
    const [types, setTypes] = useState("SE")

    const [fetchPostById, isLoadind, error] = useFetching(async (slug) => {
        const response = await PostService.getTournamentBySlug(slug)
        setTournament(response.data)    
    })

    const [fetchBrackets, isBraLoadind, braError] = useFetching(async (slug) => {
        const response = await PostService.allTournamentBrackets(slug)
        setBracket(response.data.brackets[0].bracket)
        setTypes(response.data.brackets[0].type)
        console.log(response.data.brackets[0])
    })

    useEffect(() => {
        fetchPostById(params.slug)
        fetchBrackets(params.slug)
    }, [])

    return (
        <section>
            {isLoadind
                ? <Loader/>
                :   <div class="container-fluid ">
                        <div class="row p-3">
                            <div class="col-lg-2"></div>
                                <div class="col-lg-8 col-md-12">
                                    <div class="row">
                                        <div class="col-sm-8"> 
                                            <img Style="width:100%" src={def_tour} alt="tournament poster" class="pe-4"/>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="d-flex flex-column pt-1">
                                            <h3 className='tournament_text'>{tournament.title}</h3>
                                            <p>Начало турнира</p>
                                            <p className='tournament_text'>10 декабря в 16:02</p>
                                            <p>Игра</p>
                                            <p className='tournament_text'>{tournament.game }</p>
                                            <p>Призовой фонд</p>
                                            <p className='tournament_text'>{tournament.prize } <span>&#8381;</span></p>
                                            
                                            <p>Организатор</p>
                                            <p className='tournament_text'>Qewest</p>  
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row my-3">
                                        <div class="col"> 
                                            <h4>Описание</h4>
                                            <p>{tournament.content}</p>
                                            {isBraLoadind &&
                                                <div style={{display: 'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div>
                                            }
                                            {(() => {
                                                if (types == "SE") {
                                                    return (
                                                    <SingleElimination bracket={bracket}/>
                                                    )
                                                } else if (types == "RR") {
                                                    return (
                                                    <div>Round Robin</div>
                                                    )
                                                } else {
                                                    return (
                                                    <div>Double Elumination</div>
                                                    )
                                                }
                                            })()}
                                            

                                            
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

export default Tournament