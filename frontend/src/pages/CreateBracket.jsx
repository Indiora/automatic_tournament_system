import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../styles/App.css';
import PostService from "../API/PostService";
import { useForm } from 'react-hook-form';
import MyFormGroupInput from '../components/UI/MyFormGroupInput/MyFormGroupInput';
import MyButton from '../components/UI/button/MyButton';
import MyCard from '../components/UI/MyCard/MyCard';


const CreateBracket = () => {

    const navigate = useNavigate()

    const [responseBody, setResponseBody] = useState({participants: '', type: 'SE'});

    const inputChangeHandler = (inputValue) => {
        const {name, value} = inputValue
        setResponseBody({...responseBody, [name]: value})
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({mode: "onBlur"});

    const onSubmitHandler = () => {
        console.log(responseBody)
        const response = PostService.createBracket(responseBody).then(function (response) {
            navigate(`/bracket/${JSON.parse(response.request.response).id}`)
          })  
    }

    return (
        <section className='section_without_div pt-4'>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='my-4'>
                    <MyCard border="success">
                        <Card.Header className='tournament_text'>Информация о сетке</Card.Header>
                        <Card.Body>
                        <Card.Text>
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
                    </MyCard>
                </div>
                <div className='form_button_div pb-4'>
                    <MyButton additionalCl={'btn-md'} type="submit">
                        Create
                    </MyButton>
                </div>
            </Form>
        </section>
      );
}

export default CreateBracket