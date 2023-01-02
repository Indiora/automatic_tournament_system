import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/App.css';
import PostService from "../API/PostService";



const CreateBracket = () => {

    const navigate = useNavigate()

    const [responseBody, setResponseBody] = useState({participants: '', type: 'SE'});

    const inputChangeHandler = (event) => {
        const {name, value} = event.target
        setResponseBody({...responseBody, [name]: value})
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log(responseBody)
        const response = PostService.createBracket(responseBody).then(function (response) {
            navigate(`/bracket/${JSON.parse(response.request.response).id}`)
          })
        
        
        
    }

    return (
        <section className='section_without_div pt-4'>
            <Form>
                <Card border="success" className='card_form my-4'>
                    <Card.Header className='tournament_text'>Информация о сетке</Card.Header>
                    <Card.Body>
                    <Card.Text>
                        <Form.Group className="mb-3">
                            <Form.Label>Участники</Form.Label>
                            <Form.Control
                                as="textarea"
                                name='participants'
                                className='shadow-none my_input'
                                onChange={(e)=>inputChangeHandler(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Тип сетки</Form.Label>
                            <Form.Select 
                            className='shadow-none my_input' 
                            name='type' 
                            onChange={(e)=>inputChangeHandler(e)}>
                                <option value="SE">Single Elimination</option>
                                <option value="DE">Double Elimination</option>
                                <option value="RR">Round Robin</option>
                            </Form.Select>
                        </Form.Group>
                    </Card.Text>
                    </Card.Body>
                </Card>

                <Button className='form_button mb-4' variant="success" type="submit" onClick = {onSubmitHandler}>
                    Создать
                </Button>
            </Form>
        </section>
      );
}

export default CreateBracket