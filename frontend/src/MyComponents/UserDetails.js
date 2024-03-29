import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import baseUrl from '../services/Baseurl';


export default function UserDetails() {

    useEffect(()=>{
        getUserDetails();
    },[]);

    let [username, setusernameReg] = useState("");
    let [email, setemailReg] = useState("");
    let [details, setdetails] = useState([]);
    let [rating, setRating] = useState(0);
    
    function getUserDetails(){
        let url = baseUrl + 'profile/getUserData';
        Axios.get(url, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                }
            })
            .then((res)=>{
                console.log(res);
                let details1 = res.data.result;
                setusernameReg(details1.username);
                setemailReg(details1.email);
                setdetails(res.data.result);
                let count = res.data.result.count;
                if(count > 0){
                    let val = res.data.result.rating / count;
                    setRating(val);
                }
            }) 
    }

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white rounded bg-dark">
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                {/* <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> */}
                <span className="fs-4">{username}</span>
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <div className="nav-link text-white" aria-current="page">
                        Email : {email}
                    </div>
                </li>
                { rating > 0 ? (<li className="nav-item">
                    <div className="nav-link text-white" aria-current="page">
                        Rating : {rating}
                    </div>
                </li>) : (<></>) }
                <li>
                    <div className="nav-link text-white">
                        {/* <svg className="bi me-2" width="16" height="16"><use xlinLink:to="#speedometer2"></use></svg> */}
                        Address
                    </div>
                </li>
                <li>
                    <Link to={{pathname : "/editprofile", state : details}} className="nav-link text-white">
                        {/* <svg className="bi me-2" width="16" height="16"><use xlinLink:to="#table"></use></svg> */}
                        Edit Profile
                    </Link>
                </li>
                <li>
                    <Link to="/request" className="nav-link text-white">
                        {/* <svg className="bi me-2" width="16" height="16"><use xlinLink:to="#people-circle"></use></svg> */}
                        View Requests
                    </Link>
                </li>
            </ul>
        </div>
    )
}