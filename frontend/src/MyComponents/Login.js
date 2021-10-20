import React, {useState} from 'react'
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

export default function Login() {
    let history = useHistory();
    const [passwordReg, setPasswordReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const login = (e) => {
        Axios.post("http://localhost:5000/login", {
            email: emailReg,
            password: passwordReg,
        })
        .then((res)=>{
            console.log(res);
            //setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            history.push('/');
            window.location.reload();
        }) 
        e.preventDefault();       
    };

    return (
        <div className="text-center container w-25 rounded bg-dark">
            <div className="form-signin my-5 p-3">
                <form onSubmit={login}>
                    <h1 className="h3 pt-3 mb-5 fw-normal text-white">Login</h1>
                    <div className="form-floating">
                        <input 
                        type="email" 
                        className="form-control" id="floatingInput"
                        onChange={(e)=> {
                            setEmailReg(e.target.value);
                        }}
                        placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mt-5">
                        <input type="password" 
                        className="form-control" 
                        id="floatingPassword"
                        onChange={(e)=> {
                            setPasswordReg(e.target.value);
                        }} 
                        placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    
                    <button className="w-50 mt-5 mb-5 btn btn-primary" type="submit">Sign in</button>
                    
                    <br />
                    <Link to="#" className="text-white">Forgot Password</Link>
                    <br />
                    <div className="row container text-center">
                        <div className="col-10 text-white mt-2 mb-3">Dont have an account? </div>
                        <div className="col-2 mt-2"><Link to="/register" className="text-white">Register</Link></div>
                        <br />
                    </div>
                </form>
            </div>
        </div>

    );
}