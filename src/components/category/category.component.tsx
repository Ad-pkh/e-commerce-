import { Heading1 } from "../common/title";
import { ImagewithTitleCard } from "../common/card/singlecard.component";

export const CategoryList=()=>{
    return(<>
    
        <div className="flex justify-between  mx-20 mt-20 border-b-2 border-solid border-teal-500/50 pd-3">
          <Heading1><>Category list</></Heading1>
          <a className="bg-teal-700 text-white text-center pt-2.5 rounded-lg w-40" href="/categories">
          view all &rarr;
          </a>

        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mx-20 my-20">
        <ImagewithTitleCard data={{_id:'',title:"gaming chairs",slug:'/category/gaming-chairs',image:"https://static-01.daraz.com.np/p/f08a3429796d66b7175ecb8a5d57887e.jpg_300x0q75.webp"}} />
        <ImagewithTitleCard data={{_id:'',title:"gaming chairs",slug:'/category/gaming-chairs',image:"https://static-01.daraz.com.np/p/f08a3429796d66b7175ecb8a5d57887e.jpg_300x0q75.webp"}} />
        <ImagewithTitleCard data={{_id:'',title:"gaming chairs",slug:'/category/gaming-chairs',image:"https://static-01.daraz.com.np/p/f08a3429796d66b7175ecb8a5d57887e.jpg_300x0q75.webp"}} />
        <ImagewithTitleCard data={{_id:'',title:"gaming chairs",slug:'/category/gaming-chairs',image:"https://static-01.daraz.com.np/p/f08a3429796d66b7175ecb8a5d57887e.jpg_300x0q75.webp"}} />
        </div>
    </>)
}