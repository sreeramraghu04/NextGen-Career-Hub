import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "./components/Loader";
import JobCreation from "./screens/JobCreation";
import ViewAllMockTests from "./screens/ViewAllMockTests";
// import MockTestResults from "./screens/MockTestResults";

const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const RegisterScreen = lazy(() => import("./screens/RegisterScreen"));
const LoginScreen = lazy(() => import("./screens/LoginScreen"));
const OurCompanyScreen = lazy(() => import("./screens/OurCompanyScreen"));
const Aboutusscreen = lazy(() => import("./screens/Aboutus"));
const Alumnijobscreen = lazy(() => import("./screens/AlumniJobScreen"));
const AdminJobscreen = lazy(() => import("./screens/AdminJobscreen"));
const ViewJob = lazy(() => import("./screens/ViewJob"));
const UserEditScreen = lazy(() => import("./screens/AdminUserControl"));
const MockTest = lazy(() => import("./screens/MockTest"));
const MockTestResults = lazy(() => import("./screens/MockTestResults"));
const AttendMockTest = lazy(() => import("./screens/AttendMockTest"));
const ViewApplicants = lazy(() => import("./screens/ViewApplicants"));
const CreateQuestions = lazy(() => import("./screens/CreateQuestion"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <HomeScreen />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <RegisterScreen />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <LoginScreen />
      </Suspense>
    ),
  },
  {
    path: "/ourcompanies",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <OurCompanyScreen />
      </Suspense>
    ),
  },
  {
    path: "/jobcreation",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <JobCreation />
      </Suspense>
    ),
  },

  {
    path: "/aboutus",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <Aboutusscreen />
      </Suspense>
    ),
  },

  {
    path: "/jobpostings",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <Alumnijobscreen />
      </Suspense>
    ),
  },

  {
    path: "/adminjobscreen",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <AdminJobscreen />
      </Suspense>
    ),
  },
  {
    path: "/viewJob",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <ViewJob />
      </Suspense>
    ),
  },
  {
    path: "/useredit_admin",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <UserEditScreen />
      </Suspense>
    ),
  },
  {
    path: "/mocktest",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <MockTest />
      </Suspense>
    ),
  },
  {
    path: "/mocktest/all",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <ViewAllMockTests />
      </Suspense>
    ),
  },
  {
    path: "/mocktest/result",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <MockTestResults />
      </Suspense>
    ),
  },
  {
    path: "/mocktest/attend",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <AttendMockTest />
      </Suspense>
    ),
  },
  {
    path: "/mocktest/applicants",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <ViewApplicants />
      </Suspense>
    ),
  },
  {
    path: "/mocktest/question",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <CreateQuestions />
      </Suspense>
    ),
  },
]);

export default routes;
