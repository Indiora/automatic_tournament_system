import React, {useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import '../styles/App.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PostService from "../API/PostService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context'
import useAxios from '../utils/useAxios';
import UploadButton from '../components/UI/UploadButton/UploadButton';


const EditTournament = () => {
  const api = useAxios()
  const navigate = useNavigate()
  const params = useParams()
  const { user } = useContext(AuthContext);
  const [tournament, setTournament] = useState({})
  const [fetchTournament, isLoading, error] = useFetching(async (slug) => {
    const response = await PostService.getTournamentBySlug(slug)
    setTournament(response.data)    
    setResponseBody({title: response.data.title,
                     content: response.data.content,
                     participants: response.data.participants,
                     game: response.data.game,
                     prize: response.data.prize,
                     start_time: response.data.start_time,
                     type: response.data.type,
                     creater_email: user.email})
    })

  const [responseBody, setResponseBody] = useState({title: '', content: '', start_time: '', participants: '', game: '', prize: '', type: '', creater_email: user.email});
  const [inputFile, setInputFile] = useState(null);

  useEffect(() => {
    fetchTournament(params.slug)
  }, [])

  const inputChangeHandler = (event) => {
      const {name, value} = event.target
      setResponseBody({...responseBody, [name]: value})
  }

  const onSubmitHandler = (event) => {
      event.preventDefault()
      console.log(responseBody)
      const response = api.patch(`/edit_tournament/${params.slug}/`, {...responseBody, poster: inputFile}, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
       },) 
        navigate(`/tournament/${responseBody.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`)
      
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
                    value={responseBody.title}
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as="textarea"
                    name='content'
                    className='shadow-none my_input'
                    value={responseBody.content}
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Призовой фонд</Form.Label>
                  <Form.Control
                    name='prize'
                    className='shadow-none my_input'
                    value={responseBody.prize}
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Игра</Form.Label>
                  <Form.Control
                    name='game'
                    className='shadow-none my_input'
                    value={responseBody.game}
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Начало турнира</Form.Label>
                  <Form.Control
                    className='shadow-none my_input'
                    type='datetime-local'
                    name='start_time'
                    defaultValue={responseBody.start_time}
                    onChange={(e)=>inputChangeHandler(e)}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Постер</Form.Label>
                  <UploadButton setInputFileValue={setInputFile} />
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
                        value={responseBody.participants}
                        onChange={(e)=>inputChangeHandler(e)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Тип сетки</Form.Label>
                <Form.Select 
                    className='shadow-none my_input' 
                    name='type' 
                    defaultValue={responseBody.type}
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
          Редактировать
      </Button>
    </Form>
</section>
  );
}

export default EditTournament