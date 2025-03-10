import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

function AppliedJobTable() {
  const {allAppliedJobs}=useSelector(store=>store.job)
  return (
    <div>
      <Table>
        <TableCaption>List of your Applied Job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
              {
                allAppliedJobs?.length <=0 ?<span>No Job Applied Yet</span>: allAppliedJobs.map((appliedJob)=>(
                  <TableRow key={appliedJob._id}>
                    <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{appliedJob.job.title}</TableCell>
                    <TableCell>{appliedJob.job.company.name}</TableCell>
                    <TableCell className="text-right"><Badge className={`${appliedJob?.status==="rejected"?"bg-red-500":appliedJob.status==="pending"? "bg-gray-500":"bg-green-500"}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>

                  </TableRow>
                ))
              }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable