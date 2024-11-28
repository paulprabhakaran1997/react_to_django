import axios from 'axios';
import React, { useMemo, useState } from 'react'

const Login = () => {

    const BASE_API_URL = useMemo(() => "http://127.0.0.1:8000", [])

    const initialCred = useMemo(() => {
        return {
            username: "",
            password: ""
        }
    }, [])

    const [cred, setCred] = useState(initialCred);

    const login = (e) => {
        e.preventDefault();
        console.log("Cred === ", cred);

        axios({
            method: 'POST',
            url: `${BASE_API_URL}/login/`,
            // headers : {
            //     "Access-Control-Allow-Credentials": true,
            //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            //     "Content-Type": "application/json"
            // },
            headers: {
                'content-type': 'multipart/form-data'
            },
            data: cred
        })
        .then(res => {
            console.log("RES ==== ", res);
        })
        .catch(err => console.log("ERRR === ", err));


        setCred(initialCred);
    }

    return (
        <div>
            <form onSubmit={login}>
                <input
                    type='text'
                    placeholder='Username'
                    value={cred.username}
                    onChange={(e) => setCred({ ...cred, username: e.target.value })}
                /><br />
                <input
                    type='text'
                    placeholder='*********'
                    value={cred.password}
                    onChange={(e) => setCred({ ...cred, password: e.target.value })}
                /><br />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login