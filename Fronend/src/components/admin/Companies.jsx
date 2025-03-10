import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

function Companies() {
  const [input, setInput] = useState("")
  useGetAllCompany()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(setSearchCompanyByText(input))
    },[input])
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input
                // value={input}
                onChange={(e)=>setInput(e.target.value)}
                className="w-fit"
                placeholder="Filter By Name"
                />
                <Button onClick={()=>navigate("/admin/company/create")}>New Company</Button>
            </div>
            <CompaniesTable/>
        </div>
    </div>
  )
}

export default Companies