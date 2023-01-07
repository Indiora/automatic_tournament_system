import React, { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        email.length > 0 && loginUser(email, password);
    };

  
    return (
        <section>
            <div>
                <div class="log_div position-absolute top-50 start-50 translate-middle">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='text'
                            name='title'
                            className='shadow-none my_log_input'
                            id="email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Пороль</Form.Label>
                        <Form.Control
                            name='prize'
                            className='shadow-none my_log_input'
                            id="password"
                        />
                    </Form.Group>
                    <p><a href='#restore'>Забыли пороль ?</a></p>
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