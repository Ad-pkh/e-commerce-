import { Outlet } from "react-router-dom";
import { PageFooter } from "../../components/common/footer/footer.common";
import { HomeHeader } from "../../components/common/header";

const HomePageLayout=()=>{
    return(<>
        <HomeHeader />
            
            <Outlet />
            
        <PageFooter />
        
    </>)
}

export default HomePageLayout;

