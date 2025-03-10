import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Jobs from './Jobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const randomJob=[1,2,3]
function Browse() {
    useGetAllJobs()
    const {allJobs}=useSelector(store=>store.job)
    const dispatch=useDispatch()
    useEffect(()=>{
        return()=>{
            dispatch(setSearchQuery(""))
        }
    },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10 '>
            <h1 className='font-bold text-xl my-10'>Search Result ({allJobs.length})</h1>
            <div className='grid grid-cols-3  gap-4'>
                {
                    allJobs.map((job)=>{
                        return(
                            <Jobs job={job} key={job._id}/>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Browse