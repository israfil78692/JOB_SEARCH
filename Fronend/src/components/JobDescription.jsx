import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getSingleJob } from '@/redux/jobSlice'
import { APPLY_API_END_POINT, JOB_API_END_POINT } from '@/util/constant'
import { toast } from 'sonner'


function JobDescription() {
    
    const param=useParams()
    const jobId=param.id
    const {singleJob}=useSelector(store=>store.job)
    const {user}=useSelector(store=>store.auth)
    const dispatch=useDispatch()
    const isInitiallyApplied=singleJob?.applications?.some(application=>application.applicant===user?._id)|| false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)
    const applyHandler=async()=>{
        try {
            const res= await axios.get(`${APPLY_API_END_POINT}/apply/${jobId}`,{withCredentials:true})
            if(res.data.success){
                setIsApplied(true)
                const updateSingleJobs={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(getSingleJob(updateSingleJobs))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }

    useEffect(()=>{
      const fetchSingleJob=async()=>{
          try {
              const res= await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true})
              
              
              if(res.data.success){
                  dispatch(getSingleJob(res.data.jobs))
                  setIsApplied(res.data.jobs.applications.some(application=>application.applicant===user?._id))
              }
          } catch (error) {
              console.log(error);
              
          }
      }
      fetchSingleJob()
    },[jobId,dispatch,user?._id])
    return (
        <div className='max-w-7xl pt-5  mx-auto'>
            <div className=' flex justify-between items-center'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant='ghost'> {singleJob?.position} position</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant='ghost'> {singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209B7] font-bold'} variant='ghost'> {singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button onClick={isApplied?null:applyHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed ':'bg-[#7209B7] hover:bg-green-600'}`}>{isApplied ? "Already Applied":"Apply Now"}</Button>
            </div>
            <h1 className=' border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>0-{singleJob?.experienceLavel} Year</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicant: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.updatedAt.split("T")[0]}</span></h1>

            </div>
        </div>
    )
}

export default JobDescription










//{singleJob?.createdAt.split("T")[0]}