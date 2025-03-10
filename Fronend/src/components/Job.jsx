import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Jobs from './Jobs'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'


const jobArr=[1,2,3,4,5,6,7,8,9]
function Job() {
    const {allJobs,searchQuery}=useSelector(store=>store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)
    useEffect(()=>{
        if(searchQuery){
            const filterdJobs=allJobs.filter((job)=>{
                return job?.title[0].toLowerCase().includes(searchQuery.toLowerCase())||
                job.description.toLowerCase().includes(searchQuery.toLowerCase())||
                job.location.toLowerCase().includes(searchQuery.toLowerCase())
                
            })
            setFilterJobs(filterdJobs)
        }else{
            setFilterJobs(allJobs)
        }
    },[allJobs,searchQuery])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-5'>
                <div className='w-[20%]'>
                <FilterCard/>
                </div>
                {
                    filterJobs.length<=0 ? <span>jobs not found</span> :(
                        <div className='flex 1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-3 gap-5'>
                            {
                                filterJobs.map((job)=>(
                                    <motion.div
                                    initial={{opacity:0,x:100}}
                                    animate={{opacity:1,x:0}}
                                    exit={{opacity:0,x:-100}}
                                    transition={{duration:0.3}}
                                    >
                                        
                                        <Jobs key={job?._id} job={job}/>
                                    </motion.div>
                                ))
                            }
                            
                            </div>
                        </div>
                    )
                }

            </div>
       
        
        </div>
        
    </div>
  )
}

export default Job