import { createSlice } from "@reduxjs/toolkit";
const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        serchJobByText:"",
        allAppliedJobs:[],
        searchQuery:""
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload
        },
        getSingleJob:(state,action)=>{
            state.singleJob=action.payload
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload
        },
        setSerchJobByText:(state,action)=>{
            state.serchJobByText=action.payload
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload
        }
        
    }
})
export const{setAllJobs,getSingleJob,setAllAdminJobs,setSerchJobByText,setAllAppliedJobs,setSearchQuery}=jobSlice.actions
export default jobSlice.reducer