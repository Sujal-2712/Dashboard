import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import { format } from 'date-fns';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import CompanyTable from './CompanyTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CardStatus from './CardStatus';
import { Link } from 'react-router-dom';


const Home = () => {
	const [data, setdata] = useState({});
	const [Wheelprogress, setWheelProgress] = useState(0);
	const [blankCard, setblankCard] = useState(0);
	const [updatedStock, setupdatedStock] = useState(0);
	const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
	const [companies, setCompanies] = useState([]);
	const [isBar, setisBar] = useState(true);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const handleFilter = (e) => {
        setFilters({ global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } });
    }

	const [NoOfEntry, setNoOfEntry] = useState(10);
	const handleNoOfEntry = async (e) => {
		setNoOfEntry(e.target.value);
	}
	

	const HandleAnalysis = (e) => {
		setisBar(e.target.value === 'bar' ? true : false);
	}

	

	const transformData = (data) => {
		const result = {};
		data.forEach(item => {
			const { wheel_company_name, wheel_type_name } = item;
			if (!result[wheel_company_name]) {
				result[wheel_company_name] = { Soft: 0, Medium: 0, Hard: 0, total: 0 };
			}

			const secondLastChar = wheel_type_name.charAt(wheel_type_name.length - 2);

			if (secondLastChar === 'S') {
				result[wheel_company_name].Soft += 1;
			} else if (secondLastChar === 'M') {
				result[wheel_company_name].Medium += 1;
			} else if (secondLastChar === 'H') {
				result[wheel_company_name].Hard += 1;
			}
			result[wheel_company_name].total = result[wheel_company_name].Soft + result[wheel_company_name].Medium + result[wheel_company_name].Hard;
		});
		return result;
	};
	const fetchBarData = async () => {
		try {
			const response = await axios.get('http://localhost:3001/barchart/wheelType', {
				withCredentials: true
			})
			const result = transformData(response.data);
			console.log("tHIS IS API RESULT", result);
			setdata(result);
		} catch (error) {
			console.log(error);
		}
	}
	


	const getCompanies = async (startDate, endDate) => {
        try {
            const response = await axios.get('http://localhost:3001/companymaster/wheel_company', {
                params: {
                    startDate: startDate ? format(startDate, 'yyyy-MM-dd') : null,
                    endDate: endDate ? format(endDate, 'yyyy-MM-dd') : null,
                },
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCompanies(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


	useEffect(() => {
        fetchBarData(startDate, endDate);
        getCompanies(startDate, endDate);
    }, [isBar, setFilters, NoOfEntry, startDate, endDate]);

	const [WheelprogressForm, setWheelProgressForm] = useState({
		number: 1,
		interval: 'WEEK',
	});

	

	return (
		<div className='min-h-screen'>
			<div className='h-fit'>
				<div className='grid lg:grid-cols-3 grid-cols-1 p-2 gap-1 h-fit'>
					<Link to="/user/showdetails" props={"hello"}><CardStatus total={blankCard} setTotal={setblankCard} endpoint={'/progress/blank_card_stock'} text={"Total Cards"} /></Link>


					<Link to="/user/rfid"><CardStatus text={"Uploaded Stock"} total={updatedStock} setTotal={setupdatedStock} endpoint={'/progress/wheelmaster'} /></Link>


					<CardStatus total={Wheelprogress} setTotal={setWheelProgress} endpoint={`/progress/wheel_type?number=${WheelprogressForm.number}&interval=${WheelprogressForm.interval}`} text={`Total Progress in last ${WheelprogressForm.interval}(Number of Cards)`} enableInput={true} setProgressForm={setWheelProgressForm} progressForm={WheelprogressForm} />


				</div>
			</div>

			<main className='container'>

				<div className='header flex flex-row justify-between'>

					<div>
						<div className='flex gap-2 w-fit'>
							<select className="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Rating" data-kt-ecommerce-order-filter="rating" onChange={HandleAnalysis}>
								<option value="bar">Chart</option>
								<option value="table">Table</option>
							</select>
						</div>
					</div>

					<div className='flex'>
						<DatePicker
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							selectsStart
							startDate={startDate}
							endDate={endDate}
							placeholderText="From Date"
							className="form-control"
							dateFormat="dd/MM/yyyy"
						/>
						<DatePicker
							selected={endDate}
							onChange={(date) => setEndDate(date)}
							selectsEnd
							startDate={startDate}
							endDate={endDate}
							minDate={startDate}
							placeholderText="To Date"
							className="form-control"
							dateFormat="dd/MM/yyyy"
						/>
					</div>


					{!isBar && <div className="search flex justify-end gap-5">

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
							<InputText name="search" className='form-control form-control-solid w-250px ps-12' onInput={handleFilter} placeholder="Search Company"></InputText>
						</div>
					</div>}

				</div>

				<div className="">

					{!isBar && <div className='w-full p-3 md:w-[95%] md:mx-auto lg:w-[98%]'>
						<CompanyTable data={companies} filters={filters} entry={NoOfEntry} />
					</div>}
					{isBar && <div className='w-full p-3 md:w-[80%] md:mx-auto lg:w-[82%] mt-5'>
						<BarChart data={data} setdata={setdata} />
					</div>}
				</div>
			</main>



		</div>
	)
}

export default Home;