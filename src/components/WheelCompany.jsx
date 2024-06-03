import React, { useState } from 'react'
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import CompanyTable from './CompanyTable';

import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { toast, Toaster } from "react-hot-toast";

const WheelCompany = ({ companies, getCompanies }) => {


  // for updating company
  const [updateFormData, setUpdateFormData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!updateFormData.wheel_company_name) {
      newErrors.wheel_company_name = 'Company Name is required';
      valid = false;
    }

    if (!updateFormData.short_name) {
      newErrors.short_name = 'Company Code is required';
      valid = false;
    }

    if (!updateFormData.wheel_company_phno) {
      newErrors.wheel_company_phno = 'Contact No. is required';
      valid = false;
    }
    else if (!/^\d+(\.\d+)?$/.test(updateFormData.wheel_company_phno) && updateFormData.wheel_company_phno != 10) {
      newErrors.wheel_company_phno = 'Contact No. is Invalid';
      valid = false;
    }

    if (!updateFormData.wheel_company_person) {
      newErrors.wheel_company_person = 'Contact Person Name is required';
      valid = false;
    }

    if (!updateFormData.wheel_company_email) {
      newErrors.wheel_company_email = 'Email is required';
      valid = false;
    }

    if (!updateFormData.wheel_company_site) {
      newErrors.wheel_company_site = 'Website is required';
      valid = false;
    }

    if (!updateFormData.wheel_company_address) {
      newErrors.wheel_company_address = 'Address is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill valid data!")
      return;
    }
    try {
      const response = await axios.patch(`http://localhost:3001/companymaster/wheel_company/${updateFormData.wheel_company_id}`, updateFormData);
      console.log(response.data);
      toast.success('Company Updated Successfully!!')
      setShowEditModal(false);
      getCompanies();
    } catch (error) {
      console.error('Error:', error);
    }
    setShowEditModal(false);
  }

  const handleEdit = (company_id) => {
    const index = companies.findIndex((company) => company.wheel_company_id === company_id);
    setShowEditModal(true);
    setUpdateFormData(companies[index]);
  };

  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });

  const handleFilter = (e) => {
    setFilters({ global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } });
  }

  const [NoOfEntry, setNoOfEntry] = useState(10);
  const handleNoOfEntry = async (e) => {
    setNoOfEntry(e.target.value);
  };

  return (
    <div className='card bg-slate-100'>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className='heading border-b-2 border-black'>
        <h3 className='p-4 font-bold text-2xl'>Wheel Company</h3>
      </div>

      <main className='p-4'>

        <div className="search flex justify-between">

          <div className='flex gap-2 w-100px'>
        
            <select class="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Rating" data-kt-ecommerce-order-filter="rating" onChange={handleNoOfEntry}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>



          </div>
          <div className="search-bar gap-2 flex d-flex align-items-center position-relative my-1">
            <i class="ki-duotone ki-magnifier fs-3 position-absolute ms-5">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <InputText name="search" className='form-control form-control-solid w-250px ps-12' onInput={handleFilter} placeholder="Search 
            Company"></InputText>

          </div>
        </div>

        <div className="container">
          <CompanyTable data={companies} onEdit={handleEdit} filters={filters} entry={NoOfEntry} />
        </div>
      </main>

      {showEditModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center   justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

            <div className="bg-slate-200 border-black border-2 rounded-lg z-20">

              <div className='heading border-b-2 border-black flex justify-between items-center p-4'>
                <h3 className='text-2xl'>Edit Company</h3>
                <button onClick={() => setShowEditModal(false)} className="text-xl"><IoMdClose /></button>
              </div>

              <main className='p-4'>
                <form onSubmit={handleUpdate} className="mx-auto text-lg">

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-gray-700">Company Name</span>
                      <input type="text" name="wheel_company_name" value={updateFormData.wheel_company_name} onChange={handleUpdateChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                      {errors.wheel_company_name && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_name}</p>}
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Company Code</span>
                      <input type="text" name="short_name" value={updateFormData.short_name} onChange={handleUpdateChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                      {errors.short_name && <p className="text-red-500 text-xs mt-1">{errors.short_name}</p>}
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Contact No.</span>
                      <input type="text" name="wheel_company_phno" value={updateFormData.wheel_company_phno} onChange={handleUpdateChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                      {errors.wheel_company_phno && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_phno}</p>}
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Contact Person Name</span>
                      <input type="text" name="wheel_company_person" value={updateFormData.wheel_company_person} onChange={handleUpdateChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                      {errors.wheel_company_person && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_person}</p>}
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Email</span>
                      <input type="email" name="wheel_company_email" value={updateFormData.wheel_company_email} onChange={handleUpdateChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                      {errors.wheel_company_email && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_email}</p>}
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Website</span>
                      <input type="text" name="wheel_company_site" value={updateFormData.wheel_company_site} onChange={handleUpdateChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                      {errors.wheel_company_site && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_site}</p>}
                    </label>
                  </div>

                  <div className='mt-3'>
                    <label className="block">
                      <span className="text-gray-700">Address</span>
                      <textarea name="wheel_company_address" value={updateFormData.wheel_company_address} onChange={handleUpdateChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                      {errors.wheel_company_address && <p className="text-red-500 text-xs mt-1">{errors.wheel_company_address}</p>}
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-7 py-3  rounded hover:bg-blue-600">Update</button>
                  </div>
                </form>
              </main>


            </div>
          </div>
        </div>
      )}
    </div>


  )
}

export default WheelCompany