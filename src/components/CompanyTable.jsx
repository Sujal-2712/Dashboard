import React from 'react';
import { FaRegEdit } from "react-icons/fa";

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"



const CompanyTable = ({ data, onEdit, filters, entry }) => {
  console.log("This is Table data",data);
  return (
    <div className="container mt-5 card pt-0 text-3xl">

      <DataTable value={data} sortMode="multiple" filters={filters}
        paginator rows={entry}
        rowsPerPageOptions={[5, 10, 20, 25, 100]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate="{totalRecords} entries"
        emptyMessage="No records found"
        className="p-datatable-sm p-datatable-gridlines p-datatable-striped p-datatable-hoverable-rows custom-paginator"
      >
        <Column field="wheel_company_name" header="Name" sortable headerClassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyClassName={'text-gray-600 fw-semibold text-gray-800 text-hover-primary mb-1'}></Column>
        <Column field="short_name" header="Short Name" sortable headerClassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyClassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'}></Column>
        <Column field="wheel_company_phno" header="Contact No." sortable headerClassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyClassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'}></Column>
        <Column field="wheel_company_person" header="Contact Person" sortable headerClassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyClassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'}></Column>
        <Column field="wheel_company_address" header="Address" sortable headerClassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyClassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'}></Column>
        {onEdit && <Column field="wheel_company_id" header="" body={(rowData) => {
          return <button onClick={() => onEdit(rowData.wheel_company_id)} className="text-blue-500 hover:text-blue-700 focus:outline-none" sortable headerClassName='text-start text-muted fw-bold fs-7 text-uppercase' bodyClassName={'text-hover-primary mb-1 text-gray-600 fw-semibold'} ><FaRegEdit className='text-xl' /></button>
        }} />}
        
      </DataTable>
    </div>
  );
};

export default CompanyTable;