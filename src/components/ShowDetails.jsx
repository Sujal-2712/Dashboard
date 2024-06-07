import React, { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext';
import { FaRegEdit, } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"


const ShowDetials = (props) => {
  const [data, setData] = useState([]);
  // const [updateFormData, setUpdateFormData] = useState({});
  const [formData, setFormData] = useState({
    no_of_card: "",
    purchase_date: "",
    receive_by: "",
    total_stock: 0,
    inward_type: "purchase"
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [showModal, setShoModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [deleteItemId, setDeleteItemId] = useState(null);

  const fetchBlankCardData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/blank_card_stock/showDetials/rajkot', {
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

  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
  const handleFilter = (e) => {
    setFilters({ global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } });
  }
  const [NoOfEntry, setNoOfEntry] = useState(10);
  const handleNoOfEntry = async (e) => {
    setNoOfEntry(e.target.value);
  };
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const closeDeleteModal = (e) => {
    setShowDeleteModal(false);
  }

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   const { valid, errors } = validateForm(updateFormData);

  //   if (!valid) {
  //     setErrors(errors);
  //     toast.error("Please fill valid data!");
  //     return;
  //   }
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:3001/blank_card_stock/update/${updateFormData.purchase_id}`,
  //       updateFormData,
  //       {
  //         withCredentials: true,
  //         params:{
  //           table:""
  //         }
  //       }
  //     );
  //     toast.success('Card Details Updated Successfully!!');
  //     setShowModal(false);
  //     fetchBlankCardData();
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors } = validateForm(formData);

    if (!valid) {
      setErrors(errors);
      toast.error("Please fill valid data!");
      return;
    }

    try {
      if (isEditMode) {
        await axios.patch(
          `http://localhost:3001/blank_card_stock/update/${formData.purchase_id}`,
          formData,
          { withCredentials: true, params: { table: "" } }
        );
        toast.success('Card Details Updated Successfully!!');
      } else {
        await axios.post('http://localhost:3001/blank_card_stock/addNewCard/rajkot', formData, { withCredentials: true });
        toast.success('Card Details Added Successfully!!');
      }
      setShowModal(false);
      fetchBlankCardData();
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleEdit = (purchase_id) => {
    const index = data.findIndex((entry) => entry.purchase_id === purchase_id);
    const purchaseDate = new Date(data[index].purchase_date).toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format
    data[index].purchase_date = purchaseDate;
    setFormData(data[index]);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (purchase_id) => {
    setShowDeleteModal(true);
    setDeleteItemId(purchase_id);
  }
  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/blank_card_stock/deleteCard/${deleteItemId}`, {
        withCredentials: true,
        params: {
          table: ""
        }
      });
      fetchBlankCardData();
      toast.success("Card Deleted Successfully!!")
      setShowDeleteModal(false);
      setDeleteItemId(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  return (
    <div>

      <div className="container p-5 mt-5 card pt-0  text-3xl">
        <div className='text-sm'>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </div>
        <div className="search flex justify-between">

          <div className='flex gap-2 w-[20%] items-center bg-sl px-5'>
            <label htmlFor="entry" className='text-xs w-[85%]'>No. of Entry</label>
            <select className="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Rating" data-kt-ecommerce-order-filter="rating" onChange={handleNoOfEntry} name='entry'>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="search-bar gap-2 flex d-flex align-items-center position-relative my-2">
            <i className="ki-duotone ki-magnifier fs-2 position-absolute ms-4">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
            <InputText name="search" className='form-control form-control-solid w-250px ps-12' onInput={handleFilter} placeholder="Search Entry"></InputText>

          </div>
        </div>

        <DataTable value={data} csortMode="multiple" filters={filters} paginator rows={NoOfEntry}
          rowsPerPageOptions={[5, 10, 20, 25, 100]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="{totalRecords} entries"
          emptyMessage="No records found"
          className="p-datatable-sm p-4  p-datatable-gridlines p-datatable-striped p-datatable-hoverable-rows custom-paginator"
        >
          <Column field="purchase_id" header="Purchase ID" sortable headerclassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyclassName={'text-gray-600 fw-semibold text-gray-800 text-hover-primary mb-1'}></Column>
          <Column field="no_of_card" header="Number Of Card" sortable headerclassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyclassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'}></Column>
          <Column field="purchase_date" header="Purchase Date" sortable headerclassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyclassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'}></Column>
          <Column field="receive_by" header="Received By" sortable headerclassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyclassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'}></Column>
          <Column field="inward_type" header="Inward Type" sortable headerclassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyclassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'}></Column>
          <Column field="wheel_company_id" header="" body={(rowData) => {
            return <button onClick={() => handleEdit(rowData.purchase_id)} className="text-blue-500 hover:text-blue-700 focus:outline-none" sortable headerClassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyClassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'} ><FaRegEdit className='text-xl' /></button>
          }} />
          <Column field="wheel_company_id" header="" body={(rowData) => {
            return <button onClick={() => handleDelete(rowData.purchase_id)} className="text-blue-500 hover:text-blue-700 focus:outline-none" sortable headerClassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyClassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'} ><MdDeleteForever className='text-2xl text-red-600' /></button>
          }} />

        </DataTable>


        {showDeleteModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              {/* Background overlay */}
              <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

              {/* Modal content */}
              <div className="bg-slate-200 rounded-lg p-8 mx-4 md:mx-auto shadow-lg z-50">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Confirm Deletion</h2>
                  {/* Close button */}
                  <button onClick={closeDeleteModal} className="text-gray-500 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-700 text-lg mb-4 font-bold">Are you sure you want to delete this item?</p>
                <div className="flex justify-end">
                  <button className="bg-red-500 hover:bg-red-600 flex items-center gap-1 justify-between text-sm text-white font-bold py-2 px-4 rounded mr-2" onClick={confirmDelete}>
                    <MdDeleteForever className='text-2xl' />Delete
                  </button>
                  <button className="bg-slate-500 hover:bg-gray-700 text-sm text-white font-bold py-2 px-6 rounded" onClick={closeDeleteModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center   justify-center min-h-screen">
              <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

              <div className="bg-slate-200 lg:w-[30%] w-[80%] border-black border-2 rounded-lg z-20">

                <div className='heading border-b-2 border-black flex justify-between items-center p-4'>
                  <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Card Details' : 'Add New Card'}</h2>
                  <button onClick={() => setShowModal(false)} className="text-xl"><IoMdClose /></button>
                </div>

                <main className='p-4'>
                  <form onSubmit={handleSubmit} className="mx-auto text-lg">

                    <div className="grid grid-cols-1 gap-3">
                      <label className="block">
                        <span className="text-gray-700">Inward Type</span>
                        <select name="purchase_id" value={formData.inward_type} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300">
                          <option value="purchase">Purchase</option>
                        </select>
                        {errors.inward_type && <p className="text-red-500 text-xs mt-1">{errors.inward_type}</p>}
                      </label>
                      <label className="block">
                        <span className="text-gray-700">Number Of Cards</span>
                        <input type="number" name="no_of_card" value={formData.no_of_card} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                        {errors.no_of_card && <p className="text-red-500 text-xs mt-1">{errors.no_of_card}</p>}
                      </label>
                      <label className="block">
                        <span className="text-gray-700">Purchase Date</span>
                        <input type="date" name="purchase_date" value={formData.purchase_date} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                        {errors.purchase_date && <p className="text-red-500 text-xs mt-1">{errors.purchase_date}</p>}
                      </label>
                      <label className="block">
                        <span className="text-gray-700">Card Received By</span>
                        <input type="text" name="receive_by" value={formData.receive_by} onChange={handleChange} className="mt-1 p-2 block w-full rounded border-gray-300" />
                        {errors.receive_by && <p className="text-red-500 text-xs mt-1">{errors.receive_by}</p>}
                      </label>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        {isEditMode ? 'Update' : 'Add'}
                      </button>
                    </div>
                  </form>
                </main>


              </div>
            </div>
          </div>
        )}


      </div>

      <button
        onClick={() => { setShowModal(true) }}
        className="rounded-full fixed right-6 bottom-6 text-6xl"
      >
        <FaCirclePlus />
      </button>
    </div>
  )
}

export default ShowDetials
