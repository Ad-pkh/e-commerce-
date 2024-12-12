import { Carousel } from "flowbite-react"
export const BannerComponent=()=>{
    return(<>
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover>
        <img src="https://icms-image.slatic.net/images/ims-web/9904c7a7-2da6-4783-8a10-d068e8c408e0.jpg_1200x1200.jpg" alt="..." />
        <img src="https://icms-image.slatic.net/images/ims-web/9fa06389-a029-424c-b5de-a668652db834.jpg" alt="..." />
        <img src="https://icms-image.slatic.net/images/ims-web/68fbf36a-e97a-4189-85b7-6aba3515ee1c.jpg" alt="..." />
        <img src="https://icms-image.slatic.net/images/ims-web/be727802-ea20-435a-9cda-bb01a221b1ab.jpg" alt="..." />
        <img src="https://icms-image.slatic.net/images/ims-web/358a16a4-57b3-418f-9358-988205bc20a1.jpg" alt="..." />
        <img src="https://img.lazcdn.com/us/domino/8d9f1d92-4510-401a-bfb6-b4d72c88e20c_NP-1976-688.jpg_2200x2200q80.jpg"alt=""/>
      </Carousel>
        </div>
    </>)
}