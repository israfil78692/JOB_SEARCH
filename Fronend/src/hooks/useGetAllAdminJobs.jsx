import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/util/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllAdminJobs() {
    const dispatch=useDispatch()
  useEffect(()=>{
    const fetchAlldminJobs=async()=>{
        try {
            const res= await axios.get(`${JOB_API_END_POINT}/getAdminJobs`,{withCredentials:true})
            console.log(res);
            
            if(res.data.success){
                dispatch(setAllAdminJobs(res.data.jobs))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAlldminJobs()
  },[])
  
}

export default useGetAllAdminJobs