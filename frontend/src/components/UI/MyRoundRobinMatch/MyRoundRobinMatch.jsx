import React, { useState, useContext } from "react";
import classes from "./MyRoundRobinMatch.module.css";
import MyModal from "../ MyModal/MyModal";
import Modal from 'react-bootstrap/Modal';
import MyButton from  "../button/MyButton";
import MyCard from  "../MyCard/MyCard";
import useAxios from "../../../utils/useAxios";
import MyFormGroupInput from "../MyFormGroupInput/MyFormGroupInput";
import { useForm } from 'react-hook-form';


const MyRoundRobinMatch = ({id, match}) => {
    const [responseBody, setResponseBody] = useState(match);
    const [modalShow, setMatchCardModalShow] = useState(false);
    const [modalEditShow, setEditMatchCardModalShow] = useState(false);

    const [matchTime, setMatchTime] = useState(match.startTime)
    const [userOne, setUserOne] = useState(match.participants[0].name)
    const [userTwo, setuserTwo] = useState(match.participants[1].name)
    const [userOneResult, setUserOneResult] = useState(match.participants[0].resultText)
    const [userTwoResult, setUserTwoResult] = useState(match.participants[1].resultText)

    const api = useAxios()
    console.log(match.id)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm({mode: "onBlur"});
    

    const hoverOnMatch = (id) => {
        const elements = document.querySelectorAll(`[id=${id}]`);
        for (let elem of elements) {
            elem.classList.remove(classes.side);
            elem.classList.add(classes.hoverSide);
        }
       
    }

    const matchTimeHandler = (e) => {
        e.preventDefault()
        setMatchTime(e.target.value)
    }

    const inputUserOneHandler = (e) => {
        e.preventDefault()
        setUserOne(e.target.value)
    }

    const inputUserTwoHandler = (e) => {
        e.preventDefault()
        setuserTwo(e.target.value)
    }

    const inputUserOneResultHandler = (e) => {
        e.preventDefault()
        setUserOneResult(e.target.value)
    }

    const inputUserTwoResultHandler = (e) => {
        e.preventDefault()
        setUserTwoResult(e.target.value)
    }

    const hoverOffMatch = (id) => {
        const elements = document.querySelectorAll(`[id=${id}]`);
        for (let elem of elements) {
            elem.classList.remove(classes.hoverSide);
            elem.classList.add(classes.side);
        }
    }
    
    
    const onSubmitHandler = () => {
        const response = api.patch(`/update_bracket/${id}/`,  { id: match.id, tournamentRoundText: "test", startTime: matchTime, state: "SCHEDULED", 
        participants: [
           {id: match.participants[0].id, isWinner: false, name: userOne, picture: null, resultText: userOneResult, status: null},
           {id: match.participants[1].id, isWinner: false, name: userTwo, picture: null, resultText: userTwoResult, status: null}
       ] }) 
       setEditMatchCardModalShow(false)
        
    }

    return (
        <div className="col">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className={classes.topText}>{match.startTime}</p>
           
            </div>
            <div className={classes.myMatch}>
                <div id={`id${match.participants[0].name}`} className={classes.side} >
                    <div className={classes.parName} onMouseEnter={(e)=>{hoverOnMatch(`id${match.participants[0].name}`)}} onMouseLeave={(e)=>{hoverOffMatch(`id${match.participants[0].name}`)}}>{match.participants[0].name}</div>
                    <div onMouseEnter={(e)=>{hoverOnMatch(`id${match.participants[0].name}`)}} onMouseLeave={(e)=>{hoverOffMatch(`id${match.participants[0].name}`)}} className={classes.score}>{match.participants[0].resultText}</div>
                </div>
                <div  id={`id${match.participants[1].name}`} className={classes.side}>
                    <div className={classes.parName} onMouseEnter={(e)=>{hoverOnMatch(`id${match.participants[1].name}`)}} onMouseLeave={(e)=>{hoverOffMatch(`id${match.participants[1].name}`)}}>{match.participants[1].name}</div>
                    <div onMouseEnter={(e)=>{hoverOnMatch(`id${match.participants[1].name}`)}} onMouseLeave={(e)=>{hoverOffMatch(`id${match.participants[1].name}`)}} className={classes.score}>{match.participants[1].resultText}</div>
                </div>
            </div>
            <div className={`${classes.buttonDiv} p-1`}>
                <button onClick={() => setMatchCardModalShow(true)} className={classes.iconButton}> 
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        className={classes.matchSvg}
                        viewBox="0 0 100 100"
                    >
                        <path d="M61.9 62.3c-.4 0-.8-.1-1.1-.4L34.1 35.2c-.2-.2-.4-.5-.4-.8l-2.1-13.1c-.1-.5.1-1 .4-1.3.3-.3.8-.5 1.3-.4l13.1 2.1c.3 0 .6.2.8.4L74 48.9c.3.3.4.7.4 1.1s-.2.8-.4 1.1l-11 11c-.3.1-.7.2-1.1.2zM36.6 33.4l25.3 25.3 8.9-8.9-25.4-25.3-10.5-1.7 1.7 10.6zm28 42.2c-.3 0-.6-.1-.9-.3l-9.2-6.7c-.4-.3-.6-.7-.6-1.1 0-.4.1-.9.4-1.2l24.1-24.1c.3-.3.7-.5 1.2-.4.4 0 .8.3 1.1.6l6.7 9.2c.4.6.4 1.4-.2 1.9L65.7 75.1c-.3.3-.7.5-1.1.5zm-6.9-8.4l6.8 4.9 19.7-19.7-4.9-6.8-21.6 21.6zm21.8 8.5c-.4 0-.8-.1-1.1-.4l-7.5-7.5c-.3-.3-.4-.7-.4-1.1s.2-.8.4-1.1l6.7-6.7c.3-.3.7-.4 1.1-.4.4 0 .8.2 1.1.4l7.5 7.5c.6.6.6 1.5 0 2.1l-6.7 6.7c-.3.3-.7.5-1.1.5zm-5.4-9l5.4 5.4 4.6-4.6-5.4-5.4-4.6 4.6zm10.2 13.8c-.4 0-.8-.1-1.1-.4l-4.8-4.8c-.6-.6-.6-1.5 0-2.1l6.7-6.7c.6-.6 1.5-.6 2.1 0l4.8 4.8c.6.6.6 1.5 0 2.1L85.3 80c-.3.3-.6.5-1 .5zm-2.7-6.3l2.7 2.7 4.6-4.6-2.7-2.7-4.6 4.6zM38.1 62.3c-.4 0-.8-.1-1.1-.4l-11-11c-.3-.3-.4-.7-.4-1.1s.2-.8.4-1.1l12-11.8c.6-.6 1.5-.6 2.1 0l11 11c.6.6.6 1.5 0 2.1L39.2 61.9c-.3.3-.7.4-1.1.4zm-8.9-12.4l8.9 8.9 9.8-9.8-8.9-8.9-9.8 9.8zM61 39.5c-.4 0-.8-.1-1.1-.4l-11-11c-.6-.6-.6-1.5 0-2.1l3.9-3.9c.2-.2.5-.4.8-.4l13.1-2.1c.5-.1 1 .1 1.3.4.3.3.5.8.4 1.3l-2.1 13.1c0 .3-.2.6-.4.8L62 39c-.3.3-.6.5-1 .5zM52.1 27l8.9 8.9 2.5-2.5 1.7-10.5-10.5 1.7-2.6 2.4zM35.4 75.6c-.4 0-.8-.1-1.1-.4L12.9 53.6c-.5-.5-.6-1.3-.2-1.9l6.7-9.2c.3-.4.7-.6 1.1-.6.4 0 .9.1 1.2.4l24.1 24.1c.3.3.5.7.4 1.2 0 .4-.3.8-.6 1.1l-9.2 6.7c-.4.1-.7.2-1 .2zM15.9 52.4l19.7 19.7 6.8-4.9-21.6-21.6-4.9 6.8zm4.6 23.3c-.4 0-.8-.1-1.1-.4l-6.7-6.7c-.6-.6-.6-1.5 0-2.1l7.5-7.5c.3-.3.7-.4 1.1-.4.4 0 .8.2 1.1.4l6.7 6.7c.3.3.4.7.4 1.1s-.2.8-.4 1.1l-7.5 7.5c-.3.1-.7.3-1.1.3zm-4.6-8.2l4.6 4.6 5.4-5.4-4.6-4.6-5.4 5.4zm-.2 13c-.4 0-.8-.1-1.1-.4l-6.7-6.7c-.6-.6-.6-1.5 0-2.1l4.8-4.8c.6-.6 1.5-.6 2.1 0l6.7 6.7c.6.6.6 1.5 0 2.1L16.8 80c-.3.3-.7.5-1.1.5zm-4.6-8.3l4.6 4.6 2.7-2.7-4.6-4.6-2.7 2.7z"></path>
                    </svg>
                </button>
                <button onClick={() => setEditMatchCardModalShow(true)} className={classes.iconButton}> 
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    className={classes.matchSvg}
                    viewBox="0 0 28 28"
                    xmlSpace="preserve"
                    >
                    <path d="M23.258 10.943L21.84 9.526a.4.4 0 00-.566 0l-.612.612-6.817-6.817.597-.597a.4.4 0 000-.565L13.025.739a.4.4 0 00-.566 0L5.899 7.3a.394.394 0 00-.001.565l1.419 1.417a.4.4 0 00.564 0l.539-.536 3.136 3.136-9.054 9.054-.461-.461a.4.4 0 00-.566.566l1.487 1.489a.4.4 0 00.566-.566l-.461-.462 9.054-9.054 3.113 3.114-.535.538a.4.4 0 000 .565l1.418 1.418a.4.4 0 00.566 0l6.574-6.574a.405.405 0 00.001-.566zM16.4 17.234l-.853-.853.535-.538a.4.4 0 000-.565l-3.675-3.675-.003-.004-.004-.003-3.697-3.698a.4.4 0 00-.565 0l-.538.536-.854-.852 5.994-5.995.852.854-.597.597a.4.4 0 000 .565l7.383 7.383c.15.15.416.15.566 0l.612-.613.853.852-6.009 6.009zM1.309 21.208a.4.4 0 00-.566.565l1.488 1.488a.4.4 0 00.566-.565l-1.488-1.488z"></path>
                    </svg>
                </button>
            </div>
            <MyModal 
                    show={modalShow}
                    onHide={() => setMatchCardModalShow(false)}>
                    <Modal.Header closeButton className={classes.myModalHeader}>
                        <div className={classes.matchTitle}>{match.startTime}</div>
                    </Modal.Header>
                    <Modal.Body className={classes.myModalBody}>
                        <div className={classes.divVS}>
                            <div className="row align-items-center">
                                <div className="col">
                                {match.participants[0].name}
                                </div>
                                <div className="col">
                                
                                </div>
                                <div className="col">
                                {match.participants[1].name}
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col">
                                {match.participants[0].resultText}
                                </div>
                                <div className="col">
                                <h4>VS</h4>
                                </div>
                                <div className="col">
                                {match.participants[1].resultText}
                                </div>
                            </div>
                        
                        </div>   
                    </Modal.Body>
                </MyModal>
                <MyModal 
                    show={modalEditShow}
                    onHide={() => setEditMatchCardModalShow(false)}>
                     <Modal.Header closeButton className={classes.myModalHeader}>
                        <div className={classes.matchTitle}><input className={classes.dateInput} onChange={e => matchTimeHandler(e)} type="datetime-local" defaultValue={match.startTime}/></div>
                    </Modal.Header>
                    <Modal.Body className={classes.myModalBody}>
                        <div className={classes.divVS}>
                            <div className="row align-items-center">
                                <div className={`col`}>
                                {match.participants[0].name}
                                </div>
                                <div className="col">
                                
                                </div>
                                <div className="col">
                                {match.participants[1].name}
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className={`col`} >  
                                <input className={classes.myInput} onChange={e => inputUserOneResultHandler(e)} type="text" defaultValue={match.participants[0].resultText} />
                                </div>
                                <div className="col">
                                <h4>VS</h4>
                                </div>
                                <div className="col">
                                <input className={classes.myInput}  onChange={e => inputUserTwoResultHandler(e)} type="text" defaultValue={match.participants[1].resultText} />
                                </div>
                            </div>
                            <MyButton onClick={onSubmitHandler}>Submit</MyButton>
                        
                        </div>   
                    </Modal.Body>
                {/* <Modal.Body className={classes.myModalBody}>
                    <div className={classes.divVS}>
                        <MyCard>
                            <input onChange={e => inputUserOneHandler(e)} type="text" defaultValue={match.participants[0].name}/>
                            <input onChange={e => inputUserOneResultHandler(e)} type="text" defaultValue={match.participants[0].resultText} />
                        </MyCard>
                        <h4 className={`${classes.matchSpan} my-2`}>VS</h4>
                        <MyCard>
                            <input onChange={e => inputUserTwoHandler(e)} type="text" defaultValue={match.participants[1].name}/>
                            <input onChange={e => inputUserTwoResultHandler(e)} type="text" defaultValue={match.participants[1].resultText} />
                        </MyCard>
                        <input onChange={e => matchTimeHandler(e)} type="datetime-local" defaultValue={match.startTime}/>
                    </div>
                    <MyButton onClick={onSubmitHandler}>Edit</MyButton>
                </Modal.Body> */}
            </MyModal>
        </div>
    )}


export default MyRoundRobinMatch;