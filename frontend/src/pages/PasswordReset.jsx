import React, { useContext } from 'react'
import { AuthContext } from '../context'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PostService from '../API/PostService';


const PasswordReset = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const response = PostService.resetPassword({email: 'email'})
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
                    <Button className='my_home_button btn-md' variant="success" type="submit">
                        Отправить
                    </Button>
                </Form>
                </div>
            </div>
        </section>
  )
}

export default PasswordReset