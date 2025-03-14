import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/util/constant'
import { setUser } from '@/redux/authSlice'


function Navbar() {
    // const user = true
    const {user}=useSelector(store=>store.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logoutHandler=async ()=>{
        try {
            const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
            if(res.data.success){
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.res.data.message)
            
        }
    }
    return (
        <div className='bg-white '>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job <span className='text-[#F83002]'>Search</span></h1>
                </div>
                <div className='flex items-center gap-10'>
                    <ul className='flex font-medium items-center gap-5'>
                       
                    {
                        user && user.role==='recruiter' ? (
                            <>
                            <li><Link to="/admin/company">Companies</Link></li>
                            <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ):(
                            <>
                        
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/jobs'>jobs</Link></li>
                        <li><Link to='/browse'>Browse</Link></li>
                        </>
                        )
                        
                    }
                        
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button className="cursor-pointer" variant="outline">Login</Button></Link>
                                <Link to="/signup"> <Button className="bg-[#6A38C2] hover:bg-[#5c4584] cursor-pointer">SignUp</Button>  </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage className=' w-10 h-10 rounded-full ' src={user?.profile?.profilePhoto} alt="@shadcn" />

                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage className=' w-15 h-15   rounded-full ' src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col text-gray-600 my-2'>
                                        {
                                            user &&user.role==='student'&& (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button className='cursor-pointer' variant="link"><Link to="/profile">View Profile</Link></Button>
                                        </div>
                                            )
                                        }
                                        
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>

                                            <LogOut />
                                            <Button onClick={logoutHandler} className='cursor-pointer' variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default Navbar