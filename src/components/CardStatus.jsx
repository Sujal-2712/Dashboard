import React, { useEffect } from 'react'
import axios from 'axios';

const CardStatus = (props) => {
    const styles = {
        backgroundColor: '#F1486C',
        backgroundImage: "url('assets/media/patterns/vector-1.png')",
    };
    const GetData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001${props.endpoint}`, {
                withCredentials: true, // Send cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            props.setTotal(response.data[0].progress)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        GetData();
    }, [props.progressForm])

    return (
        <div>
            <div class="card card-flush bgi-no-repeat bgi-size-contain mb-xl-10 h-48" style={styles}>
                <div class="card-header pt-5 pb-10 flex flex-col">
                    <div class="card-title d-flex flex-column">

                        <div className='flex justify-between'>

                            <div class="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">{props.total}</div>
                            <div className='input flex flex-row flex-end items-center gap-1' >
                                {props.enableInput ? <>
                                    <input type="number" value={props.progressForm.number} class=" rounded-md border-0 w-1/4 px-1 focus:outline-none focus:ring focus:border-blue-300" onChange={(event)=>{
                                        props.setProgressForm({...props.progressForm, number: event.target.value})
                                    }} />
                                    <select className='rounded-md focus:outline-none focus:ring focus:border-blue-300' value={props.progressForm.interval} onChange={(event)=>{
                                        
                                        props.setProgressForm({...props.progressForm, interval: event.target.value})
                                    }}>
                                        <option value="HOUR">Hours</option>
                                        <option value="DAY">Days</option>
                                        <option value="WEEK">Week</option>
                                        <option value="MONTH">Month</option>
                                        <option value="YEAR">Year</option>
                                    </select></> : ''}
                            </div>
                        </div>

                        <span class="text-white opacity-75 pt-3 fw-semibold fs-6">{props.text}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CardStatus