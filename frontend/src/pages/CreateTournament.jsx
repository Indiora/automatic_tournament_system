import React, {useState, useContext} from 'react'
import '../styles/App.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PostService from "../API/PostService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context'
import useAxios from '../utils/useAxios';
import UploadButton from '../components/UI/UploadButton/UploadButton';
import { useForm } from 'react-hook-form';


const CreateTournament = () => {
  const api = useAxios()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  const [responseBody, setResponseBody] = useState({title: '', content: '', start_time: '', participants: '', game: '', prize: '', type: 'SE', creater_email: user.email});
  const [inputFile, setInputFile] = useState(null);

  const inputChangeHandler = (event) => {
      const {name, value} = event.target
      setResponseBody({...responseBody, [name]: value})
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({mode: "onBlur"});

  const onSubmitHandler = () => {
      setResponseBody({...responseBody, poster: inputFile})
      console.log({...responseBody, poster: inputFile})
      const response = api.post(`/create_tournament/`, {...responseBody, poster: inputFile}, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
       },{
        validateStatus: function (status) {
          return status == 201;
        },
        }) 
        // navigate(`/tournament/${responseBody.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`)
      
  }

  return (
    <section className='section_without_div pt-4'>
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <Card border="success" className='card_form'>
          <Card.Header className='tournament_text'>Информация о турнире</Card.Header>
          <Card.Body>
              <Form.Group className="mb-3">
                  <Form.Label>Название турнира</Form.Label>
                  <Form.Control
                    {...register('title', { 
                      required: "⚠ This input is required." 
                    })}
                    type='text'
                    className='shadow-none my_input'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
                  {errors.title && <p role="alert">{errors.title?.message}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as="textarea"
                    {...register('content', { 
                      required: "⚠ This input is required." 
                    })}
                    className='shadow-none my_input'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
                  {errors.content && <p role="alert">{errors.content?.message}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Призовой фонд</Form.Label>
                  <Form.Control
                    {...register('prize', { 
                      required: "⚠ This input is required.",
                      pattern: {
                        value: /^[0-9\b]+$/,
                        message: "⚠ Invalid data."
                      }
                    })}
                    className='shadow-none my_input'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
                  {errors.prize && <p role="alert">{errors.prize?.message}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Игра</Form.Label>
                  <Form.Control
                    {...register('game', { 
                      required: "⚠ This input is required." 
                    })}
                    className='shadow-none my_input'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
                  {errors.game && <p role="alert">{errors.game?.message}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Начало турнира</Form.Label>
                  <Form.Control 
                    {...register('start_time', { 
                      required: "⚠ This input is required." 
                    })}
                    className='shadow-none my_input'
                    type='datetime-local'
                    onChange={(e)=>inputChangeHandler(e)}
                  />
                  {errors.start_time && <p role="alert">{errors.start_time?.message}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Постер</Form.Label>
                  <UploadButton setInputFileValue={setInputFile} />
              </Form.Group>
     
          </Card.Body>
      </Card>
      <Card border="success" className='card_form my-4'>
          <Card.Header className='tournament_text'>Информация о сетке</Card.Header>
          <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Участники</Form.Label>
                    <Form.Control
                        as="textarea"  
                        {...register('participants', { 
                          required: "⚠ This input is required.",
                          pattern: {
                            value: /^.+\n+.+/i,
                            message: "⚠ Minimum two participants."
                          }

                        })}
                        className='shadow-none my_input'
                        onChange={(e)=>inputChangeHandler(e)}
                    />
                {errors.participants && <p role="alert">{errors.participants?.message}</p>}
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
          </Card.Body>
      </Card>
      <Button className='form_button mb-4' variant="success" type="submit">
          Создать
      </Button>
    </Form>
</section>
  );
}

export default CreateTournament