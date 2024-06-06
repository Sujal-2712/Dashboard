import { useState, useEffect } from 'react';
import Input from "./../components/Input";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Correct import for cookies

export default function Login() {
    const [loginState, setLoginState] = useState({
        username:"",
        password:""
    });
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = async () => {
        const endpoint = `http://localhost:3001/login`;
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginState)
        }).then(response => response.json());

        if (result.success) {
            setIsLogin(true);
            Cookies.set('jwt', result.token); // Use Cookies.set from js-cookie
        }
        else {
            document.getElementById('error-msg').innerText = "Invalid Username or Password";
            setLoginState(prevState => ({
                ...prevState,
                password: ''
            }));
        }
    }

    useEffect(() => {
        if (isLogin) {
            navigate('/user');
        }
    }, [isLogin, navigate]);

    return (
        <div className='bg-gray-900 min-h-screen flex items-center justify-center'>
            <div className='bg-gray-800 p-10 rounded-lg shadow-xl w-96'>
                <div className='text-center mb-8'>
                    <img src="https://arjunbala.com/nishthadashboarddemo/NisthaDashboard/Sales/images/auth-bg/Final%20Yantra%20Logo.png" className='h-10 w-full mb-4' alt='Logo' />
                    <a href="#"
                       className="inline-block mt-4 bg-gray-700 text-white border border-gray-600 rounded-full px-4 py-2 hover:bg-gray-600">
                        <img alt="Google logo" src='https://www.svgrepo.com/show/380993/google-logo-search-new.svg' className='inline-block h-5 mr-2' />
                        Sign in with Google
                    </a>
                </div>
                <div className='text-center mb-6'>
                    <span className='text-gray-400'>Or with username</span>
                </div>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <Input
                        handleChange={handleChange}
                        value={loginState.username}
                        labelText='Username'
                        labelFor='username'
                        id='username'
                        name='username'
                        type='text'
                        isRequired={true}
                        placeholder='Enter your username'
                    />
                    <Input
                        handleChange={handleChange}
                        value={loginState.password}
                        labelText='Password'
                        labelFor='password'
                        id='password'
                        name='password'
                        type='password'
                        isRequired={true}
                        placeholder='Enter your password'
                    />
                    <p id='error-msg' className='text-red-500 text-sm font-semibold text-center'></p>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
