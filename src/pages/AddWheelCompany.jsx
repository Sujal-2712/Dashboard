import React , {useEffect , useState} from 'react'
import AddNewCompany from './../components/AddNewCompany'
import WheelCompany from './../components/WheelCompany'
import axios from 'axios';


const AddWheelCompany = () => {

  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:3001/companymaster/wheel_company',{
        withCredentials: true, // Send cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setCompanies(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    getCompanies();
  }, []);

  const addCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
    getCompanies();
  };

  
  return (
    <div className='p-2 max-h-full h-full'>
        <WheelCompany companies={companies} getCompanies={getCompanies}/>
        <AddNewCompany addCompany={addCompany}/>
    </div>
  )
}

export default AddWheelCompany