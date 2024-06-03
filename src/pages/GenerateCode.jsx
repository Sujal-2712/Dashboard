import React, { useState, useEffect } from 'react';
import WheelInfo from '../components/WheelInfo'
import CodeList from '../components/CodeList'


const GenerateCode = () => {
  let [wheelInfo, setWheelInfo] = useState({
    wheelCompany: '',
    wheelCompanyId : '',
    companyCode: '',
    wheelType: '',
    wheelSize: '',
    wheelSoftness: '',
    subTypeForSoftness: '',
    remark: '',
    rpm: '',
});

  return (
    <div className='flex gap-5 md:flex-row flex-col w-full h-full p-3'>
      <WheelInfo wheelInfo={wheelInfo} setWheelInfo={setWheelInfo}/>
      <CodeList wheelInfo={wheelInfo}/>
    </div>
  )
}

export default GenerateCode
