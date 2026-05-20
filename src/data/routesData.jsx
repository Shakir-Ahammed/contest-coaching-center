import { AllSuccessCard, BranchEditor, CourseDetails, Customise, Error, GalleryEditor, GalleryMain, ServiceEditor, StatsEditor, SuccessEditor, SummaryEditor } from "../components";
import { DCourse, DSlider, Help, Logout, Notice, Schedule, Settings, Student, Teacher } from "../dashboardPages";

import { Admission, Branches, Courses, Login, Register, Verify } from "../pages";

export let mainPageRoutes = [
    {route: <Courses/>, path: "courses"}, {route: <Admission/>, path: "admission"},{route: <GalleryMain/>, path: "gallery"}, {route: <Branches/>, path: "branches"},{route: <AllSuccessCard/>, path: "all-success"}, {route: <CourseDetails/>, path:"/courses/:id"}, {route: <Login/>, path: "login"}, {route: <Register/>, path: "register"}, {route: <Verify/>, path: "verify/:id/:hash"}, {route: <Error/>, path: "*"},
];

export let dashboardPageRoutes = [
    {route: <Schedule/>, path: "schedule"}, {route: <Student/>, path: "student"}, {route: <Teacher/>, path: "teacher"}, {route: <DSlider/>, path: "slider"}, {route: <Notice/>, path: "notice"},{route: <DCourse/>, path: "course-editor"},{route: <SuccessEditor/>, path: "success-editor"},{route: <StatsEditor/>, path: "stats-editor"},{route: <ServiceEditor/>, path: "service-editor"}, {route: <SummaryEditor/>, path: "summary-editor"}, {route: <GalleryEditor/>, path: "gallery-editor"}, {route: <BranchEditor/>, path: "branch-editor"}, {route: <Customise/>, path: "customise"}, {route: <Settings/>, path: "settings"}, {route: <Help/>, path: "help"}, {route: <Logout/>, path: "logout"},
];
