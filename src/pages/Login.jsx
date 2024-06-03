import { useState, useEffect } from 'react';
import { loginFields } from "../constants/formFields";
import Input from "./../components/Input";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Correct import for cookies

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.name] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
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
            setLoginState({
                email: '',
                password: ''
            });
        }
    }

    useEffect(() => {
        if (isLogin) {
            navigate('/user');
        }
    }, [isLogin, navigate]);

    return (
        <div className='bg-slate-600'>

            <div className='w-1/4 mx-auto flex justify-center items-center h-screen'>

                <form className="form w-100 bg-slate-800 p-7 rounded-xl" novalidate="novalidate" id="kt_sign_in_form" onSubmit={handleSubmit}>

                    <div className="text-center mb-11 mt-10">
                        <div className="text-gray-500 fw-semibold fs-6 text-3xl">
                            <img src="https://arjunbala.com/nishthadashboarddemo/NisthaDashboard/Sales/images/auth-bg/Final%20Yantra%20Logo.png" className='h-10 w-full'></img>
                        </div>

                    </div>
                    <div className="row g-3 mb-9">

                        <div className="col-md-12">

                            <a href="#"
                                className="btn btn-flex btn-outline text-white hover:bg-slate-600 flex-center text-nowrap w-100">
                                <img alt="Logo" src='https://www.svgrepo.com/show/380993/google-logo-search-new.svg'
                                    className="h-15px me-3" />
                                Sign in with Google
                            </a>
                        </div>

                    </div>


                    <div className="separator separator-content my-10">
                        <span className="w-125px text-gray-500 fw-semibold fs-7">Or with username</span>
                    </div>


                    {fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )}
                    <p id='error-msg' className='text-red-500 text-lg font-semibold text-center my-5'></p>

                
                    <div className="d-grid mb-10">
                        <button type="submit" id="kt_sign_in_submit" className="btn btn-primary">
                            Sign In
                        </button>
                    </div>



                </form>

            </div>
        </div>
        // <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        //     <div className="-space-y-px">
        //         {fields.map(field =>
        //             <Input
        //                 key={field.id}
        //                 handleChange={handleChange}
        //                 value={loginState[field.id]}
        //                 labelText={field.labelText}
        //                 labelFor={field.labelFor}
        //                 id={field.id}
        //                 name={field.name}
        //                 type={field.type}
        //                 isRequired={field.isRequired}
        //                 placeholder={field.placeholder}
        //             />
        //         )}

        //     </div>

        //     <p id='error-msg' className='text-red-500 font-semibold text-center mt-1'></p>

        //     <input
        //         className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-slate-700 cursor-pointer mt-10"
        //         type='submit'
        //         value="Login"
        //     />
        // </form>
    );
}
