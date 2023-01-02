import React, {useState} from 'react'
import '../styles/App.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PostService from "../API/PostService";
import { useNavigate } from "react-router-dom";


const CreateTournament = () => {

  const navigate = useNavigate()

  const [responseBody, setResponseBody] = useState({title: '', content: '', participants: '', game: '', prize: '', type: ''});

  const inputChangeHandler = (event) => {
      const {name, value} = event.target
      setResponseBody({...responseBody, [name]: value})
  }

  const onSubmitHandler = (event) => {
      event.preventDefault()
      console.log(responseBody)
      const response = PostService.createTournament(responseBody).then(
        navigate(`/tournament/${responseBody.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`)
    )
      
  }

  return (
    <section className='section_without_div pt-4'>
    <Form>
      <Card border="success" className='card_form'>
          <Card.Header className='tournament_text'>Информация о турнире</Card.Header>
          <Card.Body>
          <Card.Text>
              <Form.Group className="mb-3">
                  <Form.Label>Название турнира</Form.Label>
                  <Form.Control
                    type='text'
                    name='title'
                    className='shadow-none my_input'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as="textarea"
                    name='content'
                    className='shadow-none my_input'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Призовой фонд</Form.Label>
                  <Form.Control
                    name='prize'
                    className='shadow-none my_input'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Игра</Form.Label>
                  <Form.Control
                    name='game'
                    className='shadow-none my_input'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Начало турнира</Form.Label>
                  <Form.Control
                    className='shadow-none my_input'
                    type='datetime-local'
                  />
              </Form.Group>
          </Card.Text>
          </Card.Body>
      </Card>
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

export default CreateTournament