import { useState, useContext } from "react";
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { registerUser } = useContext(AuthContext);
  
    const handleSubmit = async e => {
      e.preventDefault();
      registerUser(email, password, password2);
    };
  
    
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <hr />
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    type="text"
                    id="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                    type="password"
                    id="confirm-password"
                    onChange={e => setPassword2(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    />
                    <p>{password2 !== password ? "Passwords do not match" : ""}</p>
                </div>
                <button>Register</button>
            </form>
      </section>
  )
}

export default Register