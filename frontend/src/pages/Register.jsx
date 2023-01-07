import { useState, useContext } from "react";
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { registerUser } = useContext(AuthContext);
  
    const handleSubmit = async e => {
      e.preventDefault();
      registerUser(username, email, password, password2);
    };
  
    
    return (
        <section>
            <div class="log_div position-absolute top-50 start-50 translate-middle">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                        type='text'
                        name='username'
                        className='shadow-none my_log_input'
                        onChange={(e)=>setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        name='email'
                        className='shadow-none my_log_input'
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Пороль</Form.Label>
                        <Form.Control
                        type="password"
                        name='password'
                        className='shadow-none my_log_input'
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Повторите пороль</Form.Label>
                        <Form.Control
                        type="password"
                        name='password2'
                        className='shadow-none my_log_input'
                        onChange={(e)=>setPassword2(e.target.value)}
                        />
                    </Form.Group>
                    <Button className='my_home_button btn-md' variant="success" type="submit">
                        Создать
                    </Button>
                </Form>
            </div>
        </section>
  )
}

export default Register