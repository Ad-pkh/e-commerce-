import axios from "axios";

const axiosInstance =axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout:30000, //30 sec
    timeoutErrorMessage:"Server Timed out......",
   // method:"get,post,put,patch,delete",
    // maxContentLength:// payload max size
    // maxRate// max api call ->to prevent ddos
    headers:{
        "Content-Type":"application/json"
    }
})


//interceptor
axiosInstance.interceptors.response.use((response:any)=>{
    
    return response.data;
    
},(error:any)=>{
   if(error.code==="ERR_BAD_REQUEST"){
       throw error.response;
   }else{
    //todo: manipulate
   }
    
})
export default axiosInstance;