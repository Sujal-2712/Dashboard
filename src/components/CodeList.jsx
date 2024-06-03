import React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const CodeList = ({ wheelInfo }) => {
  const [wheelData, setWheelData] = useState([]);
  const wheeltype = {
    C: 'Cup Wheel',
    B: 'Brutting Wheel',
    G: 'Girdle Wheel',
  }

  const wheelsize = {
    X: '150X16(X)',
    Y: '150X12(Y)',
    Z: '198X08(Z)',
    A: '165X08(A)',
    B: '165X10(B)',
    C: '165X06(C)',
    D: '165X12(D)',
    E: '175X08(E)',
    F: '175X12(F)',

  };

  const wheelsoftness = {
    S: 'Soft',
    M: 'Medium',
    H: 'Hard',
  }

  const findCode = (data) => {
    const { wheel_type_name , remarks , index} = data;
    let reverseWheel_type_name = wheel_type_name.split('').reverse().join('');
    const wheelSizeValue = wheelsize[reverseWheel_type_name[5]];
    const wheelTypeValue = wheeltype[reverseWheel_type_name[6]];
    const wheelSoftnessValue = wheelsoftness[reverseWheel_type_name[1]];
    setWheelData(prev => [...prev, { index, wheel_type_name, wheelType: wheelTypeValue, wheelSoftness: wheelSoftnessValue, wheelSize: wheelSizeValue, remarks }]);
  }

  async function getWheelTypeByCompany() {
    if (!wheelInfo.wheelCompanyId) return;
    try {
      const response = await fetch(`http://localhost:3001/wheeltype/wheel_type/${wheelInfo.wheelCompanyId}`, { credentials: 'include' });
      const data = await response.json();
      setWheelData([]);
      if (data.length === 0) return console.log('No data found');
      data.forEach(findCode);
    } catch (error) {
      console.error('Error fetching wheel information:', error);
    }
  }

  useEffect(() => {
    getWheelTypeByCompany();
  }, [wheelInfo]);

  return (
    <div className='bg-slate-100 py-4 rounded-lg w-1/2'>
      <div className='px-4'>
        <p className='text-2xl'>Code List - {wheelInfo.wheelCompany}</p>
      </div>
      <div className='p-2'>
        <DataTable value={wheelData}>
          <Column field="index" header="index"></Column>
          <Column field="wheel_type_name" header="Wheel Code"></Column>
          <Column field="wheelType" header="Wheel Type"></Column>
          <Column field="wheelSoftness" header="Wheel Softness"></Column>
          <Column field="wheelSize" header="Wheel Size"></Column>
          <Column field="remarks" header="Remarks"></Column>
        </DataTable>
      </div>
      <hr className='my-2' />
    </div>
  )
}

export default CodeList
