
import { BannerComponent } from "../../components/banner/banner";
import { CategoryList } from "../../components/category/category.component";
import { Heading1 } from "../../components/common/title";
import { SingleProductCard } from "../../components/common/card/singlecard.component";

//import logo from "address"
const LandingPage = () => {

  return (
    <>
     
      <BannerComponent></BannerComponent>

      <CategoryList></CategoryList>

      <div className="flex justify-between  mx-20 mt-20 border-b-2 border-solid border-teal-500/50 pd-3">
        <Heading1><>Products</></Heading1>
        <a className="bg-teal-700 text-white text-center pt-2.5 rounded-lg w-40" href="/products">
          view all &rarr;
        </a>

      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mx-20 my-20">

        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
        <SingleProductCard data={{}}/>
                
      </div>

    
    </>
  )
}


export default LandingPage;