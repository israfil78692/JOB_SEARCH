import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSerchJobByText } from '@/redux/jobSlice'

function Jobs() {
    useGetAllAdminJobs()
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSerchJobByText(input))
    }, [input])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        // value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-fit"
                        placeholder="Filter By Name,role"
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}



export default Jobs