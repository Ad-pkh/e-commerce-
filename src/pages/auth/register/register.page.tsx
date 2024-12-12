
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import RegisterImage from "../../../assets/registratrion image.png";
import { InputLabel, RoleSelectComponent, TextAreaComponent, TextInputComponent } from "../../../components/common/form/input.component";
import authSvc from "./auth.service";
import { toast } from "react-toastify";


const RegisterPage = () => {
    const registerDTO=Yup.object({
        name:Yup.string().min(2).max(25).required(),
        email:Yup.string().email().required(),
        password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ ,
            "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character").required(),
        confirmpassword:Yup.string().oneOf([Yup.ref('password')],"Password and confirm Password must match"),
        role:Yup.string().matches(/^(customer|seller)$/).default("customer"),
        phone:Yup.string(),
        address:Yup.string(),
        image:Yup.mixed()
    })
    const {setValue,setError, control, handleSubmit, formState: { errors } } = useForm({
        resolver:yupResolver(registerDTO)
    });
    const submitForm = async(data: any) => {
        try{
            // API CALL
            const response :any= await authSvc.postRequest('/auth/register',data,{file:true})
            toast.success(response.message);
       
    }catch(exception: any){
        if(+exception.status===400){
             Object.keys(exception.data.details).map((field:any)=>{//backend error message display
               setError(field,{message:exception.data.details[field]})
            })
        } 
        
        toast.error(exception.data.message);
    }
    
    
        
    }
    return (<>
    
        <section className="bg-teal-200">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src={RegisterImage}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <a className="block text-blue-600" href="#">
                            <span className="sr-only">Home</span>

                        </a>

                        <p className="mt-4 leading-relaxed text-pink-500">
                            <strong>Website</strong>
                        </p>

                        <p className="text-left rtl:text-right text-yellow-600 dark:text-blue-400 mt-6 text-sm font-semibold sm:text-sm md:text-sm">
                            Join the Club!

                            Hey there! Ready to unlock exclusive deals, faster checkouts, and all-around shopping awesomeness? Just fill out the form below and voila! You're officially part of the <strong>Website name</strong> squad.

                            Let's get this shopping party started!

                            Cheers,
                        </p>


                        <form onSubmit={handleSubmit(submitForm)} className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6 ">
                                <InputLabel htmlFor="name">Full Name</InputLabel>

                                <TextInputComponent
                                    name="name"
                                    errMsg={errors?.name?.message as string}
                                    required={true}
                                    control={control}
                                />
                            </div>



                            <div className="col-span-6">
                            <InputLabel htmlFor="email">Email</InputLabel>

                                <TextInputComponent
                                    name="email"
                                    errMsg={errors?.email?.message as string}
                                    required={true}
                                    control={control}
                                />
                            </div>
                            <div className="col-span-6">
                            <InputLabel htmlFor="phone">Phone</InputLabel>

                                <TextInputComponent
                                    name="phone"
                                    errMsg={errors?.phone?.message as string}
                                    required={true}
                                    control={control}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                            <InputLabel htmlFor="password">Password</InputLabel>  
                               
                               <TextInputComponent 
                                 name="password"
                                 type="password"
                                 errMsg={errors?.password?.message as string}
                                 required={true}
                                 control={control}
                                />

                            </div>

                            <div className="col-span-6 sm:col-span-3">
                            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>

                                <TextInputComponent 
                                 name="confirmpassword"
                                 type="password"
                                 errMsg={errors?.confirmpassword?.message as string}
                                 required={true}
                                 control={control}
                                />
                            </div>
                            <div className="col-span-6 ">
                            <InputLabel htmlFor="address">Address</InputLabel>

                               <TextAreaComponent 
                               name="address"
                               errMsg={errors?.address?.message as string}
                               required={true}
                               control={control}
                               />

                            </div>
                            <div className="col-span-6">
                            <InputLabel htmlFor="role">Role</InputLabel>                                    <RoleSelectComponent 
                                    name="role"
                                    errMsg={errors?.role?.message as string}
                                    
                                    control={control}
                                    />
                                
                            </div>

                            <div className="col-span-6">
                            <InputLabel htmlFor="image">Image</InputLabel>
                            
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="Role" 
                                type="file"
                                onChange={(e:any)=>{
                                    const image=e.target.files['0'];
                                    setValue('image',image);
                                    
                                }}
                                />

                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500">
                                    By creating an account, you agree to our
                                    <a href="#" className="text-gray-700 underline mx-1"> terms and conditions</a>
                                    and
                                    <a href="#" className="text-gray-700 underline mx-1">privacy policy</a>.
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-800 sm:mt-0">
                                    Already have an account?
                                    <NavLink to="/login" className="text-gray-700 underline mx-1">Log in</NavLink>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>





    </>)
}

export default RegisterPage;