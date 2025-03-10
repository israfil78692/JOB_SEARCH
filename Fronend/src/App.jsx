import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import SignUp from "./components/auth/SignUp"
import LogIn from "./components/auth/LogIn"
import Home from "./components/Home"
import Job from "./components/Job"
import Browse from "./components/Browse"
import Profile from "./components/profile/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CompanyCreate from "./components/admin/CompanyCreate"
import CompanySetup from "./components/admin/CompanySetup"
import Jobs from "./components/admin/Jobs"
import PostJob from "./components/admin/PostJob"
import Applicants from "./components/admin/Applicants"
import ProtectedRoute from "./components/admin/ProtectedRoute"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/jobs',
    element: <Job />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  //admin
  {
    path:"/admin/company",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><Jobs/></ProtectedRoute>
  },
  {
    path:"/admin/company/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:"/admin/company/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },{
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  }
])

function App() {


  return (
    <>
      {/* <h1 className=' text-3xl'>Lets build job search</h1> */}
      {/* <Button >Click me</Button> */}
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
