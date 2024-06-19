import './App.css';
import HashLoader from "react-spinners/HashLoader";
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/Footer';
import useAuth from'./hooks/useAuth'
import ScrollToTop from './components/ScrollToTop';
function App() {
  const productData=useSelector((state)=>state.product);
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(true);
  const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5rem",
    borderColor: "red",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`);
        if (!res.ok) {
          toast.error("Error  in the server");
        }
        const responseData = await res.json();
        dispatch(setDataProduct(responseData));
        
      } catch (error) {
        console.error('Error fetching product data:', error);
      }finally{
        setLoading(false);
      }
    };
  
    fetchData();
  }, [dispatch]);
  useAuth();
    //console.log(productData)
  return (
    <>
    <Toaster/>
  {
   (!loading)? 
     (<div className="relative bg-image2-opacity z-10">
     <Header/>
     <main className='pt-12 bg-slate-100 min-h-[calc(100vh)]'>
     <ScrollToTop/>
      <Outlet/>
     </main>
     <Footer/>
     </div>):(<div className="flex h-screen justify-center items-center bg-slate-200">
          <HashLoader
            color="#0891b2"
            loading={loading}
            cssOverride={override}
            size={90}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>)
  } 
    </>
  );
}
export default App;