import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLY_API_END_POINT } from '@/util/constant'
const shortListing=["Accepted","Rejected"]
function ApplicantsTable() {
    const {applicant}=useSelector(store=>store.application)
    const statusHandler=async (status,id)=>{
        try {
            const res=await axios.post(`${APPLY_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

  return (
    <div>
        <Table>
            <TableCaption>A list of Your Recent Applied User</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicant && applicant?.applications?.map((item)=>(
                            <tr key={item._id}>
                        <TableCell>{item.applicant.fullname}</TableCell>
                        <TableCell>{item.applicant.email}</TableCell>
                        <TableCell>{item.applicant.phoneNumber}</TableCell>
                            

                        <TableCell
                        
                        className="text-blue-700 cursor-pointer">
                            
                            {
                               item.applicant.profile?.resume ? <a target='blank' href={item.applicant.profile?.resume}>{item.applicant.profile?.resumeOriginal}</a>:<span>NA</span>
                            }
                            </TableCell>
                        <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal/>
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    {
                                        shortListing.map((status,index)=>{
                                            return(
                                                <div onClick={()=>statusHandler(status,item._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer '>
                                                    <span>{status}</span>
                                                </div>
                                            )
                                        })
                                    }
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

export default ApplicantsTable