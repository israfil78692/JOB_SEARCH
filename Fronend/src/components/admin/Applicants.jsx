import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLY_API_END_POINT } from '@/util/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicant } from '@/redux/applcationSlice'

function Applicants() {
    const params=useParams()
    const dispatch=useDispatch()
    const {applicant}=useSelector(store=>store.application)
    useEffect(() => {
      const fetchApplicant=async()=>{
        try {
            const res=await axios.get(`${APPLY_API_END_POINT}/${params.id}/applicant`,{withCredentials:true})
            if(res.data.success){
                    dispatch(setAllApplicant(res.data.job))
            }
        } catch (error) {
            console.log(error);
            
        }
      }
      fetchApplicant()
    }, [])
    
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants:{applicant.applications.length}</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants