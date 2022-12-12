import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/App.css';
import PostService from "../API/PostService";



const CreateBracket = () => {

    const [responseBody, setResponseBody] = useState({participants: '', type: 'SE'});

    const inputChangeHandler = (event) => {
        const {name, value} = event.target
        setResponseBody({...responseBody, [name]: value})
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log(responseBody)
        const response = PostService.createBracket(responseBody)
        
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
                                onChange={(e)=>inputChangeHandler(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Disabled select menu</Form.Label>
                            <Form.Select>
                                <option>Single Elimination</option>
                                <option>Double Elimination</option>
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