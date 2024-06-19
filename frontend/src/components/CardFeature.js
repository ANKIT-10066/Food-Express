import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem} from "../redux/productSlice";
import axios from "axios";
import toast from "react-hot-toast";
const CardFeature = ({ image, name, price, category, loading,id,text="Add To Cart"}) => {
  const dispatch = useDispatch()
  const userData=useSelector((state)=>state.user);
  const handleAddCartProduct = (e) => {
    dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image
    }))
  };
  const handleDelete=async(id)=>{

       await axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/deleteProduct/${id}`)
       .then((res)=>{
              const responseData=res.data;
              toast.success(responseData.message);
       }).catch((err)=>{
        toast.error(err.response.data.error || 'An error occurred');
        console.log(err);
       })
   
  }

  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500  font-medium">{category}</p>
            <p className=" font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-red-600 py-1 mt-2 rounded hover:bg-red-700 w-full text-white"
            onClick={(text==="Add To Cart")?handleAddCartProduct:()=>{handleDelete(id);}}
          >
            {text}
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
