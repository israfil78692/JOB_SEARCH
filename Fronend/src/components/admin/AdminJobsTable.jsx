import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const{allAdminJobs,serchJobByText}=useSelector(store=>store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate=useNavigate()
    useEffect(()=>{
        const filterdJobs=allAdminJobs.length >=0 && allAdminJobs.filter((job)=>{
            if(!serchJobByText){
                return true
            }
            return job?.title[0]?.toLowerCase().includes(serchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(serchJobByText.toLowerCase())
        })
        setFilterJobs(filterdJobs)
    },[allAdminJobs,serchJobByText])

    return (
        <div>
            <Table>
                <TableCaption>A List of Your recent Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>CompanyName</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr>
                               
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer"><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=>navigate(`/admin/company/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))


                       
                    }


                </TableBody>
            </Table>
        </div>
    )
}


export default AdminJobsTable