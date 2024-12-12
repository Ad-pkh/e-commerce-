import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";

export const HomeHeader=()=>{
    return(<>
    
    <Navbar fluid rounded className=" bg-slate-100 shadow-md px-3">
    <Navbar.Brand href="https://media1.tenor.com/m/DdjMYNm3A7UAAAAd/k-cha-hajur-k-xa.gif">
        <img src="https://imgs.search.brave.com/q9vGBRKy6tVCbjFWfuoXxwohvtVznddVepchL8TrF24/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nb2dlbmllLm5l/dC9pbWFnZXMvZXhl/bXBsZXMvZW4vZWR1/Y2F0aW9uLWxvZ28u/cG5n" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
    </Navbar.Brand>
    <div className=" flex md:order-2">
    <Navbar.Collapse className=" me-5">
            <NavLink to="/register"className={({isActive}:{isActive:boolean})=> isActive? `md:text-cyan-700`:`md:text-gray-700`+`block py-2 px-3 text-gray-700 bg-cyan-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-gray-500`}>Register</NavLink>
            <NavLink to="/login"className={({isActive}:{isActive:boolean})=> isActive? `md:text-cyan-700`:`md:text-gray-700`+`block py-2 px-3 text-gray-700 bg-cyan-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-gray-500`}>Login</NavLink>
        </Navbar.Collapse>
        
        {/* <Dropdown
        arrowIcon={false}
        inline
        label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
        }
        >
        <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown> */}
        <Navbar.Toggle />
    </div>

    <Navbar.Collapse>
        <NavLink to="/" className={({isActive}:{isActive:boolean})=> isActive? `md:text-cyan-700`:`md:text-gray-700`+`block py-2 px-3 text-gray-700 bg-cyan-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-gray-500`}>
        Home
        </NavLink>
        <NavLink to="/about" className={({isActive}:{isActive:boolean})=> isActive? `md:text-cyan-700`:`md:text-gray-700`+`block py-2 px-3 text-black bg-cyan-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-gray-500`}>About</NavLink>

        <NavLink to="/categories"className={({isActive}:{isActive:boolean})=> isActive? `md:text-cyan-700`:`md:text-gray-700`+`block py-2 px-3 text-gray-700 bg-cyan-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-gray-500`}>Categories</NavLink>

        <NavLink to="/products"className={({isActive}:{isActive:boolean})=> isActive? `md:text-cyan-700`:`md:text-gray-700`+`block py-2 px-3 text-gray-700 bg-cyan-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-gray-500`}>All Products</NavLink>
        <NavLink to="/contact"className={({isActive}:{isActive:boolean})=> isActive? `md:text-cyan-700`:`md:text-gray-700`+`block py-2 px-3 text-gray-700 bg-cyan-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-gray-500`}>Contact</NavLink>
       
    </Navbar.Collapse>
   
    
    </Navbar>
   
    </>)
}