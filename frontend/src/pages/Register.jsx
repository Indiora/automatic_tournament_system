import { useState, useContext } from "react";
import { AuthContext } from '../context'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MyFormGroupInput from '../components/UI/MyFormGroupInput/MyFormGroupInput';
import { useForm } from 'react-hook-form';


const Register = () => {
    const [state, setState] = useState({username: '', email: '', password: '', password2: ''})
    const { registerUser } = useContext(AuthContext);
  
    const handleRegisterSubmit = async () => {
      registerUser(state.username, state.email, state.password, state.password2);
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
            <div class="log_div position-absolute top-50 start-50 translate-middle">
                <Form onSubmit={handleSubmit(handleRegisterSubmit)}>
                    <MyFormGroupInput
                        label='Username'
                        name='username'
                        errors={errors}
                        register={register}
                        validationSchema={{ 
                            required: "⚠ This input is required.",
                        }}
                        onChange={inputChangeHandler}>
                    </MyFormGroupInput>
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
                    <MyFormGroupInput
                        label='Repeat password'
                        type='password'
                        name='password2'
                        errors={errors}
                        register={register}
                        validationSchema={{ 
                            required: "⚠ This input is required.",
                        }}
                        onChange={inputChangeHandler}>
                    </MyFormGroupInput>
                    <Button className='my_home_button btn-md' variant="success" type="submit">
                        Создать
                    </Button>
                </Form>
            </div>
        </section>
  )
}

export default Register