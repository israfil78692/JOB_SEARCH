import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANYREGISTER_API_END_POINT } from '@/util/constant'

function CompanyCreate() {
    const navigate=useNavigate()
    const dispatch =useDispatch()
    const [companyName, setCompanyName] = useState("")
    const registerNewCompany=async()=>{
        try {
            const res= await axios.post(`${COMPANYREGISTER_API_END_POINT}/register`,{companyName},{
                //for authenticate
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId=res?.data?.company?._id
                navigate(`/admin/company/${companyId}`)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='text-2xl font-bold'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change later</p>
                </div>

                <Label>Company Name</Label>
                <Input
                value={companyName}
                onChange={(e)=>setCompanyName(e.target.value)}
                    type="text"
                    className="my-2"
                    placeholder="Jobhunt, MicroSoft,etc..."
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={()=>navigate("/admin/company")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>

            </div>
        </div>
    )
}

export default CompanyCreate