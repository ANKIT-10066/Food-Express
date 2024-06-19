import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCartImage from "../assets/empty.gif"
import { toast } from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  
  
  const handlePayment = async()=>{

      if(user.email){ 
         const body={
          items:productCartItem,
         };
        const stripe= await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const token = localStorage.getItem('token');
          await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/create-checkout-session`,body,{
            headers : {
              "content-type" : "application/json",
              'Authorization': `Bearer ${token}`,
            },})
          .then((res)=>{

            const session=res.data;
            //console.log(session) 
            toast("Redirecting to payment Gateway...!")
            
            const result=stripe.redirectToCheckout({sessionId:session.id});
        }).catch((err)=>{
          console.error(err);
          toast.error("Internal Server Error");
        })
      }else{
          toast("You have not Login!")
          setTimeout(()=>{
            navigate("/login")
          },1000)
      }   
  }
  return (
    <>
    
      <div className="p-2 md:p-4 relative bg-image2-opacity z-10  min-h-screen">
        <h2 className="text-2xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-700 to bg-purple-700 ">
          Your Cart Items
        </h2>
        {productCartItem[0] ?
        <div className="my-4 md:my-8 flex flex-wrap  gap-5 lg:gap-3 lg:flex-nowrap lg:justify-normal items-start ">
          {/* display cart items  */}
          <div className="w-full max-w-3xl ">
            {productCartItem.map((el) => {
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>

          {/* total cart item  */}
          <div className="w-full max-w-md mx-auto lg:ml-auto m-1 shadow-md drop-shadow-lg">
            <h2 className=" bg-blue-600 text-white p-2 text-lg text-center">Summary</h2>
            <div className="flex w-full py-2 text-lg border-y bg-slate-200">
              <p className="px-2 text-black">Total Qty :</p>
              <p className="ml-auto w-32 font-bold text-black ">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b border-blue-500 bg-slate-200">
              <p className="px-2 text-black">Total Price</p>
              <p className="ml-auto w-32 font-bold text-black">
                <span className="text-red-500 ">₹</span> {totalPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
              Payment
            </button>
          </div>
        </div>

        : 
        <>
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm"/>
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        </>
      }
      </div>
    
    </>
  );
};

export default Cart;