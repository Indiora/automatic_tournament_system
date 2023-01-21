import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import Loader from '../components/UI/Loader/Loader'
import PostService from "../API/PostService";
import def_tour from "../assets/img/d_t.png" 
import SingleElimination from '../components/SingleElimination'
import useAxios from '../utils/useAxios';
import { AuthContext } from '../context';
import { useNavigate } from "react-router-dom";
import { CustomMatchBracket } from '../components/CustomSingleElimination';
import MyButton from '../components/UI/button/MyButton';
import RoundRobin from '../components/RoundRobin';


const Tournament = () => {
    const params = useParams()
    const [id, setId] = useState(0)
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
    const { user } = useContext(AuthContext);
    const [fetchTournament, isLoading, error] = useFetching(async (slug) => {
        const response = await PostService.getTournamentBySlug(slug)
        setTournament(response.data)    
    })
    
    const api = useAxios();
    const navigate = useNavigate()
    const onDelete = async () => {
        const response = await api.delete(`/delete_tournament/${params.slug}/`)
    }

    const onEdit = async () => {
        navigate(`/edit_tournament/${params.slug}/`)
    }

    const [fetchBrackets, isBraLoadind, braError] = useFetching(async (slug) => {
        const response = await PostService.allTournamentBrackets(slug)
        setBracket(response.data.brackets[0].bracket)
        setTypes(response.data.brackets[0].type)
        setId(response.data.brackets[0].id)
    })

    useEffect(() => {
        fetchTournament(params.slug)
        fetchBrackets(params.slug)
    }, [])

    return (
        <section>
            {isLoading
                ? <Loader/>
                :   <div class="container-fluid ">
                        <div class="row p-3">
                            <div class="col-lg-2"></div>
                                <div class="col-lg-8 col-md-12">
                                    <div class="row">
                                        <div class="col-sm-8"> 
                                            <img Style="width:100%" src={def_tour} alt="tournament poster" class="pe-4"/>
                                            {/* <img Style="width:100%" src={tournament.poster} alt="tournament poster" class="pe-4"/> */}
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="d-flex flex-column pt-1">
                                            <h3 className='tournament_text'>{tournament.title}</h3>
                                            <p>Начало турнира</p>
                                            <p className='tournament_text'>{tournament.start_time}</p>
                                            <p>Игра</p>
                                            <p className='tournament_text'>{tournament.game }</p>
                                            <p>Призовой фонд</p>
                                            <p className='tournament_text'>{tournament.prize } <span>&#8381;</span></p>
                                            
                                            <p>Организатор</p>
                                            <p className='tournament_text'>{tournament.owner}</p>  
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row my-3">
                                        <div class="col"> 
                                            <h4>Описание</h4>
                                            <p>{tournament.content}</p>
                                            {isBraLoadind 
                                                ? <div style={{display: 'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div>
                                                : <> {(() => {
                                                    if (types == "SE") {
                                                        return (
                                                         
                                                        <CustomMatchBracket bracket={bracket}/>
                                                        )
                                                    } else if (types == "RR") {
                                                        return (
                                                        <RoundRobin id={id} bracket={bracket}/>
                                                        )
                                                    } else {
                                                        return (
                                                        <div>Double Elumination</div>
                                                        )
                                                    }
                                                })()} </>
                                            }
                                             
                                        </div>
                                    </div>
                                    {tournament.owner !== user.username
                                        ? <></>
                                        :<>
                                            <MyButton additionalCl={'btn-md btn my-3 me-3'} type="submit" onClick = {onEdit}>
                                                Редактировать
                                            </MyButton>
                                            <MyButton additionalCl={'btn-md btn my-3 me-3'} type="submit" onClick = {onDelete}>
                                                Удалить
                                            </MyButton>
                                        </>
                                    }
                                </div>
                            <div class="col-lg-2"></div>
                           
                        </div>  
                    </div>
            }
        </section>
    )
}

export default Tournament