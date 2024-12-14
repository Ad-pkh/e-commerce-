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
        //todo :paramss set
    }

    postRequest = async (url: string, data: any = {}, config: any = null) => {
        this.setHeaders(config);

        const response = await axiosInstance.post(url, data, {
            headers: { ...this.headers },
        });

        return response;
    };

    getRequest = async (url: string, config: any = null) => {
        this.setHeaders(config);
        
        const response = await axiosInstance.get(url, {
            
            headers: { ...this.headers },
        });

        return response;
    };
}

export default HttpService;