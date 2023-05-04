// Genral imports
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

// Style imports
import './LoginForm.css';

const LoginForm = ({handleSubmit}, {formErrors}) => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = ({key, value}) => {
        setCredentials((prevState) => {
            return {...prevState, [key]: value};
        });
    };

    const handleLoginChange = (event) => {
        handleChange({
            key: 'username',
            value: event.currentTarget.value
        });
    };

    const handlePasswordChange = (event) => {
        handleChange({
            key: 'password',
            value: event.currentTarget.value
        });
    };

    const handleSubmitForm = async(event) => {
        event.preventDefault();
        await handleSubmit(credentials);
    };
    //TODO Add Credentials Inputs (With Input Component)
    return (
        <>

            <form id="login-form" onSubmit={handleSubmitForm}>

                <div className='credentials-and-password-container'>

                    <div className='credentials-container'>
                        <label htmlFor="login">Login</label>
                        <input
                            id="login"
                            type="text"
                            value={credentials.username}
                            onChange={handleLoginChange}
                        />
                    </div>

                    <div className='password-container'>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={credentials.password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <button
                        className='login-page-call-to-action'
                        type="submit"
                    >
                        Submit
                    </button>

                    <div>
                        {formErrors && formErrors.message && (
                            <p className="error-message">{formErrors.message}</p>
                        )}
                    </div>

                </div>
            </form>
        </>
    );
};

export default LoginForm;
