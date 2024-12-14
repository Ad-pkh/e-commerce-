import { Spinner } from "flowbite-react"

const LoadingComponent = ({size='xl'}:{size?:string}) => {
    return (<>
    <div className="flex flex-row gap-3">
      
        <Spinner aria-label="Spinner button example" size={size} />
        {/* <span className="pl-3">Loading...</span> */}
            
    </div>
    </>)
}
export default LoadingComponent;