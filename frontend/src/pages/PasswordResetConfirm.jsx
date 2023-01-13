import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PostService from '../API/PostService';



const PasswordResetConfirm = () => {
    const params = useParams()
    const [new_password, setPassword] = useState("");
    const [re_new_password, setRePassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        console.log(params.uid)
        console.log(params.token)
        console.log({"uid": params.uid, 'token': params.token, 'new_password': new_password, 're_new_password': re_new_password})
        const response = PostService.resetPasswordConfirm({"uid": params.uid, 'token': params.token, 'new_password': new_password, 're_new_password': re_new_password})
    };

  
    return (
        <section>
            <div>
                <div class="log_div position-absolute top-50 start-50 translate-middle">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='text'
                            name='title'
                            className='shadow-none my_log_input'
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type='text'
                            name='title'
                            className='shadow-none my_log_input'
                            onChange={(e)=>setRePassword(e.target.value)}
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

export default PasswordResetConfirm