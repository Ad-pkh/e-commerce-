import axiosInstance from "../config/axios.config";
interface HeaderConfigProps{
    auth?:boolean,
    file?:boolean
}
abstract class HttpService{
    private headers={};

    private setHeaders =(config:HeaderConfigProps)=>{
        if (config && config.auth){
            //tofo: loginn token
        }if(config && config.file){
            this.headers={
                ...this.headers,
                "Content-Type":"multipart/form-data"
            }
        }
    }

    postRequest =async(url:string, data:any={},config:any=null)=>{
        try {
            this.setHeaders(config);

            const response=await axiosInstance.post(url,data,{
                headers:{...this.headers}
            })
           
            return response;
            
        } catch (exception) {
            throw exception;
        }
    }
}

export default HttpService;