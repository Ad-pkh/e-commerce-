import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const  CategoryDetail=()=>{
   const Params= useParams();
   const[query,setQuery]=useSearchParams({});

   useEffect(()=>{
        setTimeout(()=>{
            setQuery("page=1&title=test")
        },5000)
    },[])
   console.log(query.get("page"))
    return(<>
        <p className="m-10 p-10">
            category Details of {Params.slug}
        </p>
    
    </>)
}

export default CategoryDetail;