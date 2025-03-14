import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { applyJob, getapplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js'
const router=express.Router()

router.route("/apply/:id").get(isAuthenticated,applyJob)
router.route("/get").get(isAuthenticated,getAppliedJobs)
router.route("/:id/applicant").get(isAuthenticated,getapplicants)
router.route("/status/:id/update").post(isAuthenticated,updateStatus)

export default router