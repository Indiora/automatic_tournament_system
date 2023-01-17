import React, {useState, useContext} from 'react'
import '../styles/App.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context'
import useAxios from '../utils/useAxios';
import UploadButton from '../components/UI/UploadButton/UploadButton';
import { useForm } from 'react-hook-form';
import MyFormGroupInput from '../components/UI/MyFormGroupInput/MyFormGroupInput';
import MyButton from '../components/UI/button/MyButton';


const CreateTournament = () => {
  const api = useAxios()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const [responseBody, setResponseBody] = useState({title: '', content: '', start_time: '', participants: '', game: '', prize: '', type: 'SE', creater_email: user.email});
  const [inputFile, setInputFile] = useState(null);

  const inputChangeHandler = (inputValue) => {
      const {name, value} = inputValue
      setResponseBody({...responseBody, [name]: value})
  }

  const inputSelectChangeHandler = (event) => {
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
              <MyFormGroupInput
                  label='Title'
                  name='title'
                  type='text'
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                      required: "⚠ This input is required." 
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
              <MyFormGroupInput
                  label='Description'
                  name='content'
                  as="textarea"
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                      required: "⚠ This input is required." 
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
              <MyFormGroupInput
                  label='Prize fund'
                  name='prize'
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                    required: "⚠ This input is required.",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "⚠ Invalid data."
                    }
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
              <MyFormGroupInput
                  label='Game'
                  name='game'
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                    required: "⚠ This input is required." 
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
              <MyFormGroupInput
                  label='Start of the tournament'
                  name='start_time'
                  type='datetime-local'
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                    required: "⚠ This input is required." 
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
              <Form.Group className="mb-3">
                  <Form.Label>Poster</Form.Label>
                  <UploadButton setInputFileValue={setInputFile} />
              </Form.Group>
          </Card.Body>
      </Card>
      <Card border="success" className='card_form my-4'>
          <Card.Header className='tournament_text'>Информация о сетке</Card.Header>
          <Card.Body>
              <MyFormGroupInput
                  label='Participants'
                  name='participants'
                  as="textarea"
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                    required: "⚠ This input is required.",
                    pattern: {
                      value: /^.+\n+.+/i,
                      message: "⚠ Minimum two participants."
                    }
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
                <Form.Group className="mb-3">
                <Form.Label>Bracket type</Form.Label>
                <Form.Select 
                    className='shadow-none my_input' 
                    name='type' 
                    onChange={(e)=>inputSelectChangeHandler(e)}>
                    <option value="SE">Single Elimination</option>
                    <option value="DE">Double Elimination</option>
                    <option value="RR">Round Robin</option>
                </Form.Select>
                </Form.Group>
          </Card.Body>
      </Card>
      <div className='form_button_div pb-4'>
        <MyButton additionalCl={'btn-md'} type="submit">
            Редактировать
        </MyButton>
      </div>
    </Form>
</section>
  );
}

export default CreateTournament