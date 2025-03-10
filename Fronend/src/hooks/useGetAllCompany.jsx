import { setCompanies} from '@/redux/companySlice';
import { COMPANYREGISTER_API_END_POINT } from '@/util/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllCompany() {
    const dispatch=useDispatch()
  useEffect(()=>{
    const fetchCompany=async()=>{
        try {
            const res= await axios.get(`${COMPANYREGISTER_API_END_POINT}/get`,{withCredentials:true})
            console.log(res);
            
            if(res.data.success){
                dispatch(setCompanies(res.data.company))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchCompany()
  },[])
  
}

export default useGetAllCompany