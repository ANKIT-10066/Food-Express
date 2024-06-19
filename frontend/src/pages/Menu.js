import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../components/AllProduct";
import { addCartItem } from "../redux/productSlice";
import menubg from '../assets/MenuBg.jpg'
const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.filter((el) => el._id === filterby)[0];

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay))
  };

  const handleBuy = ()=>{
    dispatch(addCartItem(productDisplay))
      navigate("/cart")
  }

  return (
    <div className="relative bg-image2-opacity z-10">
      <div className="w-full max-h-48 opacity-90"><img src={menubg} alt="Menu" className="w-full h-36 object-cover"></img></div>
      <div className="w-full max-w-4xl m-auto flex flex-wrap text-center shadow-md px-2 md:px-6  md:flex-nowrap bg-slate-100 mt-4 mb-9 z-20 ">
        <div className="max-w-sm  overflow-hidden w-full p-5 m-auto">
          <img
            src={productDisplay.image}
            className="hover:scale-105 transition-all h-full  md:m-0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500  font-medium text-2xl">{productDisplay.category}</p>
          <p className=" font-bold md:text-2xl">
            <span className="text-red-500">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-3 justify-center">
          <button  className="bg-red-600 text-white py-1 mt-2 rounded hover:bg-red-700 min-w-[100px]" onClick={handleBuy}>Buy</button>
          <button className="bg-red-600 text-white py-1 mt-2 rounded hover:bg-red-700 min-w-[100px]" onClick={handleAddCartProduct}>Add Cart</button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description : </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Product"} className='p-2 md:p-4'/>
    </div>
  );
};

export default Menu;
