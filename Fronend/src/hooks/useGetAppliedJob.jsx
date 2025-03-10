import { setAllAppliedJobs } from "@/redux/jobSlice"
import { APPLY_API_END_POINT } from "@/util/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
const useGetAppliedJob=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchAppliedJob=async ()=>{
            try {
                const res=await axios.get(`${APPLY_API_END_POINT}/get`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAppliedJob()
    },[])
}
export default useGetAppliedJob