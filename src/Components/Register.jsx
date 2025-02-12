import React, { useState } from 'react'
import "./Home.css"

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const [successMsg, setSuccessMsg] = useState();

    const changeHandler = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = async (userData) => {
        try {
            console.log(userData);
            const response = await fetch('https://edgistify-backend-oh53.onrender.com/api/user/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const errorData = await response.json(); // Parse the error message
            setSuccessMsg(errorData.msg);

            if(response.ok){
                setFormData({
                    fullName: "",
                    email: "",
                    password: ""
                });
            }

        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    return (
        <div className='form-box'>
            <h4 className='msg'>{successMsg}</h4>
            <form className='form-block' onSubmit={(e) => {
                e.preventDefault()
                // console.log(formData);
                handleSubmit(formData);
            }}>
                <input value={formData.fullName} onChange={(event) => { changeHandler("fullName", event.target.value) }} type="text" placeholder='Full Name' required/>
                <input value={formData.email} onChange={(event) => { changeHandler("email", event.target.value) }} type='email' placeholder='Email' required/>
                <input value={formData.password} onChange={(event) => { changeHandler("password", event.target.value) }} type="password" placeholder='Password' required/>
                <input className='click-btn' type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register