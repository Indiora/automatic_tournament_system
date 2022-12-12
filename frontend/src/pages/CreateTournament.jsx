import React, {useState} from 'react'
import '../styles/App.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PostService from "../API/PostService";


const CreateTournament = () => {

    const [responseBody, setResponseBody] = useState({title: '', content: '', participants: '', game: '', prize: ''});

    const inputChangeHandler = (event) => {
        const {name, value} = event.target
        setResponseBody({...responseBody, [name]: value})
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log(responseBody)
        const response = PostService.createTournament(responseBody)
        
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
                    name='title'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as="textarea"
                    name='content'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Призовой фонд</Form.Label>
                  <Form.Control
                    name='prize'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Игра</Form.Label>
                  <Form.Control
                    name='game'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Начало турнира</Form.Label>
                  <Form.Control/>
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

export default CreateTournament