import React, { useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { toast, Toaster } from "react-hot-toast";

const AddNewCompany = ({ addCompany }) => {
    const [formData, setFormData] = useState({
        wheel_company_name: "",
        short_name: "",
        wheel_company_phno: "",
        wheel_company_person: "",
        wheel_company_email: "",
        wheel_company_site: "",
        wheel_company_address: "",
    });

    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const resetForm = () => {
        setFormData({
            wheel_company_name: "",
            short_name: "",
            wheel_company_phno: "",
            wheel_company_person: "",
            wheel_company_email: "",
            wheel_company_site: "",
            wheel_company_address: "",
        });

        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.wheel_company_name) {
            newErrors.wheel_company_name = 'Company Name is required';
            valid = false;
        }

        if (!formData.short_name) {
            newErrors.short_name = 'Company Code is required';
            valid = false;
        }

        if (!formData.wheel_company_phno) {
            newErrors.wheel_company_phno = 'Contact No. is required';
            valid = false;
        }
        else if (!/^\d{10}$/.test(formData.wheel_company_phno) && formData.wheel_company_phno != 10) {
            newErrors.wheel_company_phno = 'Contact No. Invalid';
            valid = false;
        }

        if (!formData.wheel_company_person) {
            newErrors.wheel_company_person = 'Contact Person Name is required';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill valid data!")
            console.log('formData', formData);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/companymaster/wheel_company', formData, {
                withCredentials: true, // Send cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            addCompany(response.data);
            toast.success('Company Added Successfully!!')
            resetForm();
            setShowModal(false);
        } catch (error) {
            console.error('Error:', error);
        }
        setShowModal(false);
    };

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="">
                <button
                    onClick={() => setShowModal(true)}
                    className="rounded-full fixed right-6 bottom-6 text-6xl"
                >
                    <FaCirclePlus />
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

                        <div className="bg-slate-200 rounded-lg z-20">

                            <div className='heading border-b-2 border-black flex justify-between items-center p-4'>
                                <h3 className='text-2xl'>Add New Company</h3>
                                <button onClick={() => setShowModal(false)} className="text-xl"><IoMdClose /></button>
                            </div>

                            <main className='p-4 text-lg'>
                                <form onSubmit={handleSubmit} className="mx-auto">

                                    <div className="grid grid-cols-2 gap-3">
                                        <label className="block">
                                            <span className="text-gray-700">Company Name</span>
                                            <input type="text" name="wheel_company_name" value={formData.wheel_company_name} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                                            {errors.wheel_company_name && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_name}</p>}
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Company Code</span>
                                            <input type="text" name="short_name" value={formData.short_name} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                                            {errors.short_name && <p className="text-red-500 text-xs mt-1">{errors.short_name}</p>}
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Contact No.</span>
                                            <input type="text" name="wheel_company_phno" value={formData.wheel_company_phno} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                                            {errors.wheel_company_phno && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_phno}</p>}
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Contact Person Name</span>
                                            <input type="text" name="wheel_company_person" value={formData.wheel_company_person} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                                            {errors.wheel_company_person && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_person}</p>}
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Email</span>
                                            <input type="email" name="wheel_company_email" value={formData.wheel_company_email} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                                            {errors.wheel_company_email && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_email}</p>}
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Website</span>
                                            <input type="text" name="wheel_company_site" value={formData.wheel_company_site} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                                            {errors.wheel_company_site && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_site}</p>}
                                        </label>
                                    </div>

                                    <div className='mt-3'>
                                        <label className="block">
                                            <span className="text-gray-700">Address</span>
                                            <textarea name="wheel_company_address" value={formData.wheel_company_address} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                                            {errors.wheel_company_address && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_address}</p>}
                                        </label>
                                    </div>

                                    <div className="mt-6 flex gap-2 justify-end">
                                        <button type="submit" className="bg-blue-500 text-white px-7 py-3 rounded hover:bg-blue-600">Submit</button>
                                        <button type="reset" className="bg-blue-500 text-white px-7 py-3 rounded hover:bg-blue-600" onClick={resetForm}>Reset</button>
                                    </div>
                                </form>

                                
                            </main>


                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddNewCompany;