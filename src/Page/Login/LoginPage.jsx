import LoginForm from "../../Component/LoginForm/LoginForm";
import {useState} from "react";


const LoginPage = () => {

    const [ formSubmitting, setFormSubmitting ] = useState(false);
    const [ formErrors, setFormErrors ] = useState({});
    const handleSubmit = async (credentials) => {
        setFormSubmitting(true);
        try {
            //TODO Make Login call
            const response = await fetch('https://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(credentials));
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            } else {
                setFormErrors(data);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
            // message
        } finally {
            setFormSubmitting(false);
        }
    };

    return(
        <div>

            <LoginForm
                handleSubmit={handleSubmit}
                formErrors={formErrors}
            />
            <div>
                {formErrors && formErrors.message && (
                    <p className="error-message">{formErrors.message}</p>
                )}
            </div>

        </div>
    )
}

export default LoginPage;