import React, {useRef} from "react";
import bike from "../assets/bike.png";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";
import HomeCard from "../components/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../components/AllProduct";
import { Link } from "react-router-dom";


const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList =[ ...productData.slice(5, 6),...productData.slice(16,17),...productData.slice(20,22)];
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 300;
  };
  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 300;
  };
  
  return (
    <div className="relative bg-image2-opacity z-10">
      <div className=" md:flex justify-center items-center flex-col gap-4 py-3 relative bg-image-opacity z-10">
        <div className="w-30 md:w-4/5 mt-1">
          <div className="flex gap-3 bg-white w-36 px-2 items-center rounded-full m-auto">
            <p className="text-sm font-medium text-blue-700">Bike Delivery</p>
            <img 
              src={bike} 
              alt="bike delivery" 
              className="h-7"
            />
          </div>
          <div className="flex flex-col text-center font-bold">
          <h2 className=" text-3xl md:text-6xl lg:text-7xl font-extrabold py-3 text-center text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-purple-800 to-red-800 "><span className="text-red-">T</span>he <span className='text-red-00'>Food</span> E<span className='text-red-00'>x</span>pre<span className='text-red-00'>ss</span> </h2>
          <div className=" text-3xl text-red-600 md:text-6xl  lg:text-7xl">Order anytime, anywhere!</div>
          </div>
          <p className="py-3 my-6 text-base max-w-5xl m-auto text-center font-roboto">Our food delivery app offers a wide range of products, including fresh fruits, vegetables, ice cream, sandwiches, and desserts. With just a few taps, users can conveniently order their groceries and have them delivered right to their doorstep. Whether you're at home or on the go, The Food Express is here to make your life easier.</p>
          <div className="mt-8 flex items-center justify-center">
            <Link to={`menu/${homeProductCartList[1]._id}`} className="font-bold bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Explore our Dishes</Link>
          </div>
        </div>

        <div className=" md:w-4/5 text-center flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0] ? homeProductCartList.map(el => {
            return (
              <HomeCard
                key={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                id={el._id}
              />
            )
          })
          : loadingArray.map((el,index) => {
            return (
              <HomeCard 
                key={index + "loading"}
                loading={"Loading..."}
              />
            )
          })
        }
        </div>
      </div>

      <div className="p-3 md:p-6 ">
        <div className="flex w-full items-center">  
            <h2 className="font-bold text-2xl text-slate-800 mb-4">Vegetables</h2>
          <div className=" ml-auto flex gap-4">
            <button onClick={prevProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"><GrPrevious /></button>
            <button onClick={nextProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"><GrNext /></button>
          </div>
        </div>
        <div className="flex gap-5 overflow-scroll  scrollbar-none scroll-smooth transition-all" ref={slideProductRef}>
          {homeProductCartListVegetables[0] ? homeProductCartListVegetables.map(el => {
            return (
              <CardFeature 
                key={el._id+"vegetables"}
                id={el._id}
                name={el.name}
                category={el.category}
                price={el.price}
                image={el.image}
              />
            )
          })
          : loadingArrayFeature.map((el, index) => <CardFeature loading="Loading..." key={index+"cartLoading"}/>)
          }
        </div>
      </div>
      <div className="p-3 md:p-6">
      <AllProduct heading="Categories"/>
      </div>
    </div>
  )
}

export default Home