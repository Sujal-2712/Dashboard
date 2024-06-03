import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from './BarChart';

import CardStatus from './CardStatus';
import { Link } from 'react-router-dom';


const Home = () => {
	const [data, setdata] = useState({});
	const [Wheelprogress, setWheelProgress] = useState(0);
	const [blankCard, setblankCard] = useState(0);
	const [updatedStock, setupdatedStock] = useState(0);

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


	useEffect(() => {
		const fetchBarData = async () => {
			try {
				const response = await axios.get('http://localhost:3001/barchart/wheelType', {
					withCredentials: true
				})
				const result = transformData(response.data);
				console.log("tHIS IS API RESULT",result);
				setdata(result);
			} catch (error) {
				console.log(error);
			}
		}
		fetchBarData();
	}, []);

	const [WheelprogressForm, setWheelProgressForm] = useState({
		number: 1,
		interval: 'WEEK',
	});

	return (
		<div className='min-h-screen'>
			<div className='h-fit'>
				<div className='grid lg:grid-cols-3 grid-cols-1 p-2 gap-1 h-fit'>
					<Link to="/user/showdetails"><CardStatus total={blankCard} setTotal={setblankCard} endpoint={'/progress/blank_card_stock'} text={"Total Cards"} /></Link>


					<Link to="/user/rfid"><CardStatus text={"Uploaded Stock"} total={updatedStock} setTotal={setupdatedStock} endpoint={'/progress/wheelmaster'} /></Link>


					<CardStatus total={Wheelprogress} setTotal={setWheelProgress} endpoint={`/progress/wheel_type?number=${WheelprogressForm.number}&interval=${WheelprogressForm.interval}`} text={`Total Progress in last ${WheelprogressForm.interval}(Number of Cards)`} enableInput={true} setProgressForm={setWheelProgressForm} progressForm={WheelprogressForm} />


				</div>
			</div>


			<div className='flex w-full flex-col lg:flex-row'>
				<div className='w-full p-3 md:w-[80%] md:mx-auto lg:w-[82%]'>
					<BarChart data={data} setdata={setdata} />
				</div>
			</div>


		</div>
	)
}

export default Home;