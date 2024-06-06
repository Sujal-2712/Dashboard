
import { FaRegEdit } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
const RFID = () => {
  const [data, setData] = useState([]);
  const fetchBlankCardData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/wheelmaster/wheeltype/rajkot', {
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
    </div>
  )
}

export default RFID;
