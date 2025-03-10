import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useNavigate } from 'react-router-dom'

function Jobs({job}) {
    const navigate=useNavigate()
    // const jobId="tffgbbjjbk"
    const daysAgoFunction=(mongodbTime)=>{
        const createdAt=new Date(mongodbTime)
        const currentTime=new Date()
        const TimeDiffrence=currentTime-createdAt
        return Math.floor(TimeDiffrence/(1000*24*60*60))
    }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-100'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-600'>{daysAgoFunction(job?.updatedAt)===0? "Today" :`${daysAgoFunction(job?.updatedAt)} days Ago`}</p>
            <Button variant="outline" className="rounded-full " size="icon"><Bookmark/></Button>

        </div>

        <div className='flex flex-col items-start gap-2 my-2'>
                <div className='flex gap-4 items-center'>
                <Button  variant="outline" size="icon" >
                    <Avatar>
                        <AvatarImage  src={job?.company?.logo}/>
                        <AvatarImage />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg '>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-600'>India</p>
                </div>
                </div>
                <div>
                    <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                    <p className='text-sm text-gray-500'>{job?.description}</p>
                </div>
                
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant='ghost'> {job?.position} Position</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant='ghost'> {job?.jobType}</Badge>
            <Badge className={'text-[#7209B7] font-bold'} variant='ghost'> {job?.salary} LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button onClick={()=>navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
            <Button className='bg-[#7209b7]'>Save fir Later</Button>
        </div>
    </div>
  )
}

export default Jobs