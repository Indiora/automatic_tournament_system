import React, { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context'

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
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <MyInput type='text' id="email" placeholder='email'></MyInput>
                    <MyInput type='text' id="password" placeholder='password'></MyInput>
                    <MyButton>login</MyButton>
                </form>
            </div>
        </section>
  )
}

export default Login