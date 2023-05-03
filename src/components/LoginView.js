import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate()
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Basic ' + window.btoa("netrackingnodeAPI:netrackingnodeAPI@#b00")
                },
                body: JSON.stringify({ username: new String(`${user}`), password: new String(`${pwd}`) })
            };
            const response = await fetch('http://gtrac.in:8080/tracking/logindev', requestOptions);
            const data = await response.json();

            setUser('');
            setPwd('');
            setSuccess(data.status);
            if (response?.ok) {
                if (!data.status) {
                    setErrMsg(data.message);
                    errRef.current.focus();
                }

            } else {
                if (response?.status === 400) {
                    setErrMsg(data.details[0].message);
                    errRef.current.focus();
                } else if (response?.status === 401) {
                    setErrMsg(data.details[0].message);
                    errRef.current.focus();
                }
            }
            navigate('./home')
        } catch (err) {
            setErrMsg("Internal Server Error");;
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button><strong>Sign In</strong></button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <a href="#">Sign Up</a>
                </span>
            </p>
        </section>
    )
}

export default LoginView