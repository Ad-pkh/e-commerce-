import { ReactElement, useEffect} from "react"//useState


export const  Heading1=({children}:{children: ReactElement})=>{

    return(
        <>
        <h1 className="font-extrabold text-gray-900 hover:text-gray-800 hover:cursor-pointer text-[20px] md:text-[28px] lg:text-[30px] xl:text-[32px] 2xl:text-[38px] ">
            {children}

        </h1>
        </>
    )
}
export const Heading2 =(props:{value?:string})=>{
    return(
        <>
        <h2 className="font-extrabold text-gray-900 hover:text-gray-800 hover:cursor-pointer text-[16px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[34px]">
            {props.value}

        </h2>
        </>
    )
}
// export class Heading3 extends Component{
//     constructor(props:any){
//         super(props)

//         this.state ={
//             value:props.value
//         }
//     }
//     render=()=>{
//         return(
//             <>
//                 <h3>{this.state?.value}</h3>
//             </>
//         )
//     }
// }

export const Heading3=({children}:{children: ReactElement})=>{
  //let [loading,setLoading]= useState(true)
 // let [loading1,setLoading1]= useState(true)

  useEffect(()=>{
    console.log("i am called on any state change")

  })

    useEffect(()=>{
        //onlyonce
        console.log("i am only clled when component rendered once")
        //setLoading(false)
    },[])

    useEffect(()=>{
        console.log("i am only called when loading state gets updated/created iiii")
    },[])//loading1
    return(
        <>
        <h3 className="font-extrabold text-gray-900 hover:text-gray-800 hover:cursor-pointer text-[14px] md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[30px] ">
            {children}

        </h3>
        </>
    )

}