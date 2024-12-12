import { useController } from "react-hook-form"

export interface InputLabelProps {
    children:any,
    htmlFor:string
}
export const InputLabel=({children,htmlFor}:InputLabelProps)=>{
    return(<> 
     <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700"> {children} </label>

    </> )
}
export interface TextInputInterface{
    control: any,
    name:string,
    defaultValue?:string|undefined,
    required:boolean,
    errMsg?:string|null,
    type?:string,
    row?:number

}
export const TextInputComponent = ({type="text",control,name,defaultValue,errMsg=null}:TextInputInterface) => {
    const{field}=useController({
        control:control,
        name:name,
        defaultValue:defaultValue,
        // rules:{
        //     required:required
        // }
    })
    return (<>
        <input
            type={type}
            {...field}
            className={`mt-1 w-full rounded-md ${errMsg?"border-red-600 focus:border-red-500": "border-gray-200"}  bg-white text-sm text-gray-700 shadow-sm`}
        />
    <span className="text-sm italic text-red-800">
        {errMsg}
    </span>
    </>)
}

export const TextAreaComponent=({control,name,defaultValue,errMsg=null,row=5}:TextInputInterface)=>{
    const {field}=useController({
        control:control,
        name:name,
        defaultValue:defaultValue,
        // rules:{
        //     required:required 
        // }
    })
    return(<>
     <textarea style={{ resize: "none" }}
      rows={row}
      {...field}
      className="mt-1 w-full rounded-md border-gray-200  bg-white text-sm text-gray-700 shadow-sm">{defaultValue}</textarea>
    
    
        <span className="text-sm italic text-red-800">
        {errMsg}
        </span>
    </>)
}
export interface OptionType{
    label:string,
    value:string
}
export interface SelectOptionProps{
    control:any,
    name:string,
    //required?:boolean,
    errMsg?:string
    options?:Array<OptionType>
}
export const SelectOptionComponent=({options,control,name,errMsg=""}:SelectOptionProps)=>{
   const {field}=useController({
    name:name,
    control:control,
    // rules:{
    //     required:required
    // }
   })
   return(<>
    <select
        {...field}
        // multiple
        className="mt-1 w-full rounded-md border-gray-200  bg-white text-sm text-gray-700 shadow-sm"
        >
        {
            options &&options.map((row: OptionType,i:number)=>(
                <option key={i} value={row.label}>{row.label}</option>
            ))
        }
    </select>
    <span className="text-sm italic text-red-800">
        {errMsg}
    </span>
    </>)
}
export const RoleSelectComponent=({control,name,errMsg=""}:SelectOptionProps)=>{
    return(<>
   < SelectOptionComponent 
    options={
        [{label:"customer",value:"customer"},{label:"seller",value:"seller"}]
    }
    control={control}
    name={name}
    //required={required}//no need yup is there
    errMsg={errMsg}
    
    
    />
    
    
    </>)
}