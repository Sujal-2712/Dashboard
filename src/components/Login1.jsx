import { useState, useEffect } from 'react';
import { loginFields } from "../constants/formFields";
import Input from "./Input";
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
        <div className=''>

            <form className="form w-100" novalidate="novalidate" id="kt_sign_in_form" onSubmit={handleSubmit}>

                <div className="text-center mb-11 mt-10">
                    <div className="text-gray-500 fw-semibold fs-6 text-3xl">
                        <img src="https://arjunbala.com/nishthadashboarddemo/NisthaDashboard/Sales/images/auth-bg/Final%20Yantra%20Logo.png" className=''></img>
                    </div>

                </div>



                <div className="row g-3 mb-9">

                    <div className="col-md-12">

                        <a href="#"
                            className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
                          
                            Sign in with Google
                        </a>
                    </div>

                </div>


                <div className="separator separator-content my-10">
                    <span className="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
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
                <p id='error-msg' className='text-red-500 font-semibold text-center mt-1'></p>

                <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                    <div></div>



                </div>



                <div className="d-grid mb-10">
                    <button type="submit" id="kt_sign_in_submit" className="btn btn-primary">
                        Sign In
                    </button>
                </div>



            </form>

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
