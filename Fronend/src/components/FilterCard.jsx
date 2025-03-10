import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { data } from 'react-router-dom'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const filterArr=[
    {
        filterType:"Location",
        arr:["Delhi","Noida","Banglore","Hydrabad","Mumbai"]
    },
    {
        filterType:"Industry",
        arr:["Frontend Devoloper","Backend Developer","FullStack Developer"]
    },
    {
        filterType:"Salary",
        arr:["0-40k","1-5lakh","5-7lakh"]
    }
]

function FilterCard() {
    const [selectedValue, setSelectedValue] = useState("")
    const dispatch=useDispatch()
    const changeHandler=(value)=>{
        setSelectedValue(value)
    }
    useEffect(()=>{
        dispatch(setSearchQuery(selectedValue))
        
    },[selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Job</h1>
        <hr className='mt-3' />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
                filterArr.map((data,index)=>(
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.arr.map((item,idx)=>{
                                const itemId=`${index}-${idx}`
                                return (
                                    <div className='flex items-center space-x-2 my-2  '>
                                        <RadioGroupItem value={item} id={itemId}/>
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>

    </div>
  )
}

export default FilterCard