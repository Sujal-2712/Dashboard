import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Toaster, toast } from 'react-hot-toast';


const WheelInfo = ({ wheelInfo, setWheelInfo }) => {
    const [Code, setCode] = useState({
        companyCode: '',
        wheelType: '',
        wheelSize: '',
        wheelSoftness: '',
        subTypeForSoftness: ''
    });

    useEffect(() => {
        const { companyCode, wheelType, wheelSize, wheelSoftness, subTypeForSoftness } = Code;
        let newFinalCode = "";
        if (companyCode || wheelType || wheelSize || wheelSoftness || subTypeForSoftness)
            newFinalCode = `${companyCode} ${wheelType}${wheelSize} - ${wheelSoftness}${subTypeForSoftness}`;
        setWheelInfo({ ...wheelInfo, companyCode: newFinalCode })
    }, [Code]);

    const [companies, setCompanies] = useState([]);

    async function getWheelInfo() {
        try {
            const response = await fetch('http://localhost:3001/companymaster/wheel_company', { credentials: 'include' });
            const data = await response.json();
            // console.log(data)
            const formattedData = data.map(item => ({ value: item.wheel_company_name, label: item.wheel_company_name }));
            setCompanies(formattedData);
        } catch (error) {
            console.error('Error fetching wheel information:', error);
        }
    }

    useEffect(() => {
        getWheelInfo();
    }, []);

    const [wheeltype, setWheelType] = useState([
        { value: 'C', label: 'Cup Wheel' },
        { value: 'B', label: 'Brutting Wheel' },
        { value: 'G', label: 'Girdle Wheel' },
    ]);

    const [wheelsize, setWheelSize] = useState([
        { value: "X", label: "150X16(X)" },
        { value: "Y", label: "150X12(Y)" },
        { value: "Z", label: "198X08(Z)" },
        { value: "A", label: "165X08(A)" },
        { value: "B", label: "165X10(B)" },
        { value: "C", label: "165X06(C)" },
        { value: "D", label: "165X12(D)" },
        { value: "E", label: "175X08(E)" },
        { value: "F", label: "175X12(F)" },
    ]);

    const [wheelsoftness, setWheelSoftness] = useState([
        { value: 'H', label: 'Hard' },
        { value: 'M', label: 'Medium' },
        { value: 'S', label: 'Soft' },
    ]);

    const [subtypewheelsoftness, setSubTypeForSoftness] = useState([
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ]);

    const handleChange = async (selectedOption, name) => {
        let newValue = '';
        if (name === 'wheelCompany') {
            const response = await fetch(`http://localhost:3001/companymaster/wheel_company/code/${selectedOption.value}`, { credentials: 'include' });
            const result = await response.json();
            console.log(result);
            newValue = result[0].short_name;
            setWheelInfo(prevState => ({ ...prevState, wheelCompanyId: result[0].wheel_company_id }));
            setCode(prevState => ({ ...prevState, companyCode: newValue }));

        } else {
            newValue = selectedOption.value;
        }
        setCode(prevState => ({ ...prevState, [name]: newValue }));
        setWheelInfo(prevState => ({ ...prevState, [name]: selectedOption.value }));
    };

    const [errors, setErrors] = useState({});
    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!wheelInfo.wheelCompany) {
            newErrors.wheelCompany = 'Wheel Company is required';
            valid = false;
        }
        if (!wheelInfo.wheelType) {
            newErrors.wheelType = 'Wheel Type is required';
            valid = false;
        }
        if (!wheelInfo.wheelSize) {
            newErrors.wheelSize = 'Wheel Size is required';
            valid = false;
        }
        if (!wheelInfo.wheelSoftness) {
            newErrors.wheelSoftness = 'Wheel Softness is required';
            valid = false;
        }
        if (!wheelInfo.subTypeForSoftness) {
            newErrors.subTypeForSoftness = 'Wheel Softness is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log('Form has errors:', errors);
            return;
        }

        console.log('WheelInfo:', wheelInfo);

        try {
            const response = await fetch('http://localhost:3001/wheeltype/wheel_type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(wheelInfo),
            });
            const data = await response.json();
            console.log('Success:', data);
            toast.success('New Wheel Added Successfully!!')
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <div className='bg-slate-100 py-4 rounded-lg md:w-1/2'>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className='px-4 border-b-2 border-black'>
                <p className='p-2 text-2xl'>Generate Code</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-wrap mt-5">
                <div className="w-1/2 px-3 mb-4">
                    <label htmlFor="wheelCompany">Wheel Company</label>
                    <Select
                        id="wheelCompany"
                        name="wheelCompany"
                        value={companies.find(option => option.value === wheelInfo.wheelCompany)}
                        onChange={(selectedOption) => handleChange(selectedOption, 'wheelCompany')}
                        options={companies}
                        isSearchable
                        placeholder="Select Company"
                    />
                    {errors.wheelCompany && <p className="text-red-500 text-xs">{errors.wheelCompany}</p>}
                </div>

                <div className="w-1/2 px-3 mb-4">
                    <label htmlFor="companyCode">Company Code</label>
                    <input
                        type="text"
                        id="companyCode"
                        name="companyCode"
                        value={Code.companyCode}
                        readOnly
                        className="w-full px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm  focus:ring-blue-500"
                    />
                </div>

                <div className="w-1/2 px-3 mb-4">
                    <label htmlFor="wheelType">Wheel Type</label>
                    <Select
                        id="wheelType"
                        name="wheelType"
                        value={wheeltype.find(option => option.value === wheelInfo.wheelType)}
                        onChange={(selectedOption) => handleChange(selectedOption, 'wheelType')}
                        options={wheeltype}
                        isSearchable
                        placeholder="Select Wheel Type"
                        className="w-full"
                    />
                    {errors.wheelType && <p className="text-red-500 text-xs">{errors.wheelType}</p>}
                </div>

                <div className="w-1/2 px-3 mb-4">
                    <label htmlFor="wheelSize">Wheel Size</label>
                    <Select
                        id="wheelSize"
                        name="wheelSize"
                        value={wheelsize.find(option => option.value === wheelInfo.wheelSize)}
                        onChange={(selectedOption) => handleChange(selectedOption, 'wheelSize')}
                        options={wheelsize}
                        isSearchable
                        placeholder="Select Wheel Size"
                        className="w-full"
                    />
                    {errors.wheelSize && <p className="text-red-500 text-xs">{errors.wheelSize}</p>}
                </div>

                <div className="w-1/2 px-3 mb-4">
                    <label htmlFor="wheelSoftness">Wheel Softness</label>
                    <Select
                        id="wheelSoftness"
                        name="wheelSoftness"
                        value={wheelsoftness.find(option => option.value === wheelInfo.wheelSoftness)}
                        onChange={(selectedOption) => handleChange(selectedOption, 'wheelSoftness')}
                        options={wheelsoftness}
                        isSearchable
                        placeholder="Select Wheel Softness"
                        className="w-full"
                    />
                    {errors.wheelSoftness && <p className="text-red-500 text-xs">{errors.wheelSoftness}</p>}
                </div>

                <div className="w-1/2 px-3 mb-4">
                    <label htmlFor="subTypeForSoftness">Sub Type For Softness</label>
                    <Select
                        id="subTypeForSoftness"
                        name="subTypeForSoftness"
                        value={subtypewheelsoftness.find(option => option.value === wheelInfo.subTypeForSoftness)}
                        onChange={(selectedOption) => handleChange(selectedOption, 'subTypeForSoftness')}
                        options={subtypewheelsoftness}
                        isSearchable
                        placeholder="Select Sub Type For Softness"
                        className="w-full"
                    />
                    {errors.subTypeForSoftness && <p className="text-red-500 text-xs">{errors.subTypeForSoftness}</p>}
                </div>

                <div className="w-full px-3 mb-4">
                    <label htmlFor="remarks">Remarks</label>
                    <textarea
                        id="remarks"
                        name="remarks"
                        value={wheelInfo.remark}
                        onChange={(e) => setWheelInfo({ ...wheelInfo, remark: e.target.value })}
                        className="w-full px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm  focus:ring-blue-500 focus:ring-opacity-75"
                    />
                </div>

                <div className="w-1/2 px-4 mb-4">
                    <label htmlFor="rpm">RPM</label>
                    <input
                        type="text"
                        id="rpm"
                        name="rpm"
                        value={wheelInfo.rpm}
                        onChange={(e) => setWheelInfo({ ...wheelInfo, rpm: e.target.value })}
                        className="w-full px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    {errors.rpm && <p className="text-red-500 text-xs mt-1">{errors.rpm}</p>}
                    {errors.rpmN && <p className="text-red-500 text-xs mt-1">{errors.rpmN}</p>}
                </div>

                <div className="w-1/2 px-3 mb-4">
                    <label htmlFor="code">Code</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={wheelInfo.companyCode}
                        readOnly
                        className="w-full px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-75"
                    />
                </div>

                <div className="w-full px-4 mb-4 flex justify-end">
                    <button type="submit" className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default WheelInfo;
