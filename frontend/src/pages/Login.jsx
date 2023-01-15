import React, { useContext } from 'react'
import { AuthContext } from '../context'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import MyFormGroupInput from '../components/UI/MyFormGroupInput/MyFormGroupInput';
import { useForm } from 'react-hook-form';


const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [state, setState] = useState({email: '', password: ''})
    
    const handleLoginSubmit = () => {
        loginUser(state.email, state.password);
    };

    const inputChangeHandler = (inputValue) => {
        const {name, value} = inputValue
        setState({...state, [name]: value})
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({mode: "onBlur"});
  
    return (
        <section>
            <div>
                <div class="log_div position-absolute top-50 start-50 translate-middle">
                <Form onSubmit={handleSubmit(handleLoginSubmit)}>
                    <MyFormGroupInput
                        label='Email'
                        name='email'
                        errors={errors}
                        register={register}
                        validationSchema={{ 
                            required: "⚠ This input is required.",
                            pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "⚠ Invalid email."
                            }
                        }}
                        onChange={inputChangeHandler}>
                    </MyFormGroupInput>
                    <MyFormGroupInput
                        label='Password'
                        type='password'
                        name='password'
                        errors={errors}
                        register={register}
                        validationSchema={{ 
                            required: "⚠ This input is required.",
                        }}
                        onChange={inputChangeHandler}>
                    </MyFormGroupInput>
                    <p><a href='/password_reset'>Forgot password ?</a></p>
                    <Button className='my_home_button btn-md' variant="success" type="submit">
                        Войти
                    </Button>
                </Form>
                </div>
            </div>
        </section>
  )
}

export default Login