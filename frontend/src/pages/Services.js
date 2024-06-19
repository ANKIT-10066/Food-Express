import React from "react";
import banner from "../assets/banner.jpg";
import { GiFruitBowl } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { FaGift } from "react-icons/fa6";
const serviceLists = [
  {id:1, title: "Catering", des: "Delight your guests with our flavors and  presentation", img:<GiFruitBowl/>},
  {id:2, title: "Fast delivery", des: "We deliver your order promptly to your door", img:<FaShippingFast />},
  {id:3, title: "Online Ordering", des: "Explore menu & order with ease using our Online Ordering n", img:<PiShoppingCartBold/>},
  {id:4, title: "Gift Cards", des: "Give the gift of exceptional dining with Foodi Gift Cards", img:<FaGift/>},
]

const Services = () => {
  return (
    <div className="relative bg-slate-200">
     <h1 className="absolute  top-8  w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-red-700 to bg-purple-700 text-5xl md:text-7xl font-bold ">
     Services
    </h1>
     <img
     src={banner}
     className="w-full h-[500px] opacity-50 relative"
     alt=""
     />
    
            <p className="subtitle my-8 text-center text-5xl font-bold text-red-600">Our Story & Services</p>
    <div className="section-container bg-slate-100 py-6 mx-6">
      <div className="flex flex-col md:flex-row  justify-between gap-12">
        <div className="md:w-1/2 justify-center items-center flex ">
          <div className="text-center md:w-4/5 flex flex-col gap-10">
            <h2 className="title text-2xl text-blue-700">Our Culinary Journey And Services</h2>
            <p className=" text-lg leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>

            <div className="w-full">
              <button className="bg-red-600 text-lg font-bold min-w-[200px] text-white px-8 py-3 rounded-full hover:bg-red-700">
              Explore
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mr-4">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                           <div className="text-6xl w-full flex justify-center min-h-10"> {service.img}</div>
                            <h5 className="pt-3 font-semibold"> {service.title}</h5>
                            <p className="text-blue-600">{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Services