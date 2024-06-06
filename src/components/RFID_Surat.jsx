import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegEdit, } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
const RFID_Surat = () => {
    const [data, setData] = useState([]);
    const fetchBlankCardData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/wheelmaster/wheeltype/surat', {
                withCredentials: true,
            })
            const result = response.data;
            console.log(result);
            setData(result);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchBlankCardData();
    }, [])

    const [showAddModal, setShowAddModal] = useState(false);
    const [errors, setErrors] = useState({});

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        // Update the form data for adding a new entry
        setAddFormData({
            ...addFormData,
            [name]: value
        });
    };
    const [addFormData, setAddFormData] = useState({
        // purchase_id: "",
        no_of_card: "",
        purchase_date: "",
        receive_by: "",
        total_stock: 0,
        inward_type: 1
    }
    );
    const validateForm = (formData) => {
        let valid = true;
        const newErrors = {};

        if (!formData.inward_type) {
            newErrors.inward_type = 'Inward Type is required';
            valid = false;
        }

        if (!formData.no_of_card) {
            newErrors.no_of_card = 'Number of Card is required';
            valid = false;
        }

        if (!formData.purchase_date) {
            newErrors.purchase_date = 'Date is required';
            valid = false;
        }

        if (!formData.receive_by) {
            newErrors.receive_by = "Receiver's Name is required";
            valid = false;
        }

        return { valid, errors: newErrors };
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const { valid, errors } = validateForm(addFormData);

        if (!valid) {
            setErrors(errors);
            toast.error("Please fill valid data!");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/blank_card_stock/addNewCard', addFormData, {
                withCredentials: true,
                params: {
                    table: "Surat"
                }
            })
            console.log(response.data);
            toast.success('Card Details Added Successfully!!');
            setShowAddModal(false);
            fetchBlankCardData();
        } catch (error) {
            console.log("Error", error);
        }
    }
    const [NoOfEntry, setNoOfEntry] = useState(10);
    const handleNoOfEntry = async (e) => {
        setNoOfEntry(e.target.value);
    };

    return (
        <div className="container mt-5 p-5 card pt-0 text-3xl">
            <div className="search flex p-3 justify-between">

                <div className='flex gap-2 lg:w-[30%] w-full items-center bg-sl px-5'>
                    <label htmlFor="entry" className='text-sm w-[85%]'>No. of Entry</label>
                    <select className="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Rating" data-kt-ecommerce-order-filter="rating" onChange={handleNoOfEntry} name='entry'>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>

            </div>


            <DataTable value={data} csortMode="multiple" paginator rows={NoOfEntry}
                rowsPerPageOptions={[5, 10, 20, 25, 100]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                currentPageReportTemplate="{totalRecords} entries"
                emptyMessage="No records found"
                className="p-datatable-sm p-datatable-gridlines p-datatable-striped p-datatable-hoverable-rows custom-paginator"
            >
                <Column field="RFIdNo" header="RFID No" sortable headerClassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyClassName={'text-gray-600 fw-semibold text-gray-800 text-hover-primary mb-1'}></Column>

                <Column field="UPDATE_TIME" header="Date" sortable headerClassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyClassName={'text-gray-600 fw-semibold text-gray-800 text-hover-primary mb-1'}></Column>


            </DataTable>
            {showAddModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">x
                    <div className="flex items-center   justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

                        <div className="bg-slate-200 lg:w-[30%] w-[80%] border-black border-2 rounded-lg z-20">

                            <div className='heading border-b-2 border-black flex justify-between items-center p-4'>
                                <h3 className='text-2xl'>Add New Cards</h3>
                                <button onClick={() => setShowAddModal(false)} className="text-xl"><IoMdClose /></button>
                            </div>

                            <main className='p-4'>
                                <form onSubmit={handleAdd} className="mx-auto text-lg">

                                    <div className="grid grid-cols-1 gap-3">
                                        <label className="block">
                                            <span className="text-gray-700">Inward Type</span>
                                            <select name="purchase_id" value={addFormData.inward_type} onChange={handleAddChange} className="mt-1 p-2 block w-full rounded border-gray-300">
                                                <option value="purchase">Purchase</option>
                                            </select>
                                            {errors.inward_type && <p className="text-red-500 text-xs mt-1">{errors.inward_type}</p>}
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Number Of Cards</span>
                                            <input type="number" name="no_of_card" value={addFormData.no_of_card} onChange={handleAddChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                                            {errors.no_of_card && <p className="text-red-500 text-xs mt-1">{errors.no_of_card}</p>}
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Purchase Date</span>
                                            <input type="date" name="purchase_date" value={addFormData.purchase_date} onChange={handleAddChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                                            {errors.purchase_date && <p className="text-red-500 text-xs mt-1">{errors.purchase_date}</p>}
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Card Received By</span>
                                            <input type="text" name="receive_by" value={addFormData.receive_by} onChange={handleAddChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                                            {errors.receive_by && <p className="text-red-500 text-xs mt-1">{errors.receive_by}</p>}
                                        </label>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button type="submit" className="bg-blue-500 text-white px-7 py-3  rounded hover:bg-blue-600">Add Cards</button>
                                    </div>
                                </form>
                            </main>


                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => { setShowAddModal(true) }}
                className="rounded-full fixed right-6 bottom-6 text-6xl"
            >
                <FaCirclePlus />
            </button>
        </div>
    )
}

export default RFID_Surat;
