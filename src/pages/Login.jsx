import React, { useEffect, useState } from 'react';
import './CSS/Loginsignu.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setMsg("");
            setError(""); // Clear error message after timeout
        }, 15000);
        return () => clearTimeout(timer); // Cleanup on unmount
    }, [msg, error]);

    const handleInputChange = (e, type) => {
        setError(""); // Clear error on input change
        if (type === "email") {
            setEmail(e.target.value);
        } else if (type === "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async () => {
        if (email && password) {
            const url = "http://localhost/poultry/login.php"; // Adjust the URL for your login endpoint
            const headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            const data = {
                email,
                password
            };

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                // Check if the response indicates a successful login
                if (result[0].result === "Login successful!") {
                    setMsg(result[0].result); // Show success message
                    setEmail("");
                    setPassword("");
                    navigate('/meat'); // Redirect to the Meat category page
                } else {
                    setError(result[0].result || "An error occurred during login.");
                    setEmail("");
                    setPassword("");
                }
            } catch (err) {
                setError("Network error: " + err.message);
                console.error(err);
                setEmail("");
                setPassword("");
            }
        } else {
            setError("All fields are required");
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup_container">
                <h1>Login</h1>
                <p>
                    {msg ? <span className="succesmsg">{msg}</span> : <span className="errormsg">{error}</span>}
                </p>
                <div className="loginsignup_fields">
                    <input type="email" name='email' placeholder='Email Address' value={email}
                        onChange={(e) => handleInputChange(e, "email")} />
                    <input type="password" name='password' placeholder='Password' value={password}
                        onChange={(e) => handleInputChange(e, "password")} />
                </div>
                <button onClick={handleSubmit}>Login</button>
                <p className="loginsignup_login">
                    Don't have an Account? <Link to="/signup">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;