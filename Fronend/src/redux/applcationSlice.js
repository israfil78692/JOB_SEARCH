import { createSlice } from "@reduxjs/toolkit"; 
const applicationSlice=createSlice({
    name:"application",
    initialState:{
        applicant:[]
    },
    reducers:{
        setAllApplicant:(state,action)=>{
            state.applicant=action.payload
        }
    }
})
export const {setAllApplicant}=applicationSlice.actions
export default applicationSlice.reducer