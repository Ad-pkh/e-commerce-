import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landing";
import RegisterPage from "../pages/auth/register/register.page";
import HomePageLayout from "../pages/layout/home.page";
import AdminPageLayout from "../pages/layout/cms.layout";
import CategoryDetail from "../pages/category/category-detail.page";
import {Contact} from "../components/contact/contact";
import { Login } from "../pages/auth/login/login.page";
import Allproduct from "../pages/products/products";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
const RouterConfig=()=>{
    return(<>
    <ToastContainer/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePageLayout/>}>
                    <Route index element={<LandingPage/>}   />
                    <Route path="register" element={<RegisterPage/>} />
                    <Route path="login" element={<Login/>}/>
                    <Route path="category/:slug" element={<CategoryDetail />}   />
                    <Route path="products" element={<Allproduct/>}   />
                    <Route path="contact" element={<Contact/>}   />
                    <Route path="about" element={<>About</>}/>

                    <Route path="*" element={<>Page Not Found</>}   />

                </Route>
                <Route path="/admin" element={<AdminPageLayout/>}>

                </Route>

            </Routes>
        </BrowserRouter>
    </>)
}
export default RouterConfig;