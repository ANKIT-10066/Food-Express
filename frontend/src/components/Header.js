import React, { useState,useRef, useEffect} from 'react'
import logo from "../assets/logo.png"
import { FaHome } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaInfo } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {Link,useNavigate} from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
const Header = () => {
  const [showMenu,setShowMenu]=useState(false);
  const [showMobileNav,setShowMobileNav]=useState(false);
  //const [activeLink, setActiveLink] = useState("");
  const userData = useSelector((state) => state.user);
  const productData=useSelector((state)=>state.product.productList)
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const menuRef=useRef(null);
  const MobilemenuRef=useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  useEffect(() => {
    const handleClickOutsideMobile = (event) => {
      if (MobilemenuRef.current && !MobilemenuRef.current.contains(event.target)) {
        setShowMobileNav(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideMobile);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMobile);
    };
  }, [showMobileNav]);
  const handleShowMenu=()=>{
    setShowMenu(prev=>!prev);
  }
  const handleShowMobileNav=()=>{
  
    setShowMobileNav((prev)=>!prev);
  }
  const handleLogout = () => {
    setTimeout(()=>{
      dispatch(logoutRedux(""));
      toast.success("Logout successful");
      navigate("/");
    },1000)
  };
  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  //console.log(process.env.REACT_APP_ADMIN_EMAIL)
  return (
   <header className='fixed shadow-md w-full h-14 px-2 md:px-4 z-50 font-ballubhai bg-white'>
        <div className='flex items-center h-full justify-between'>
          <Link to={""} className='w-32  h-14 overflow-hidden'>
            <div className='w-full h-16 overflow-hidden'>
               <img src={logo} className='w-full h-full'/>
            </div>
          </Link>
        <div className='flex items-center gap-4 md:gap-7'>
          <nav className="gap-4 md:gap-10 text-base md:text-lg hidden md:flex">
             <Link  to={""} className={`inline-flex justify-center items-center gap-1 hover:scale-105`}><FaHome/>Home</Link>
             <Link  to={`menu/${productData[5]._id}`} className={`inline-flex justify-center items-center gap-1 hover:scale-105`}><BiSolidFoodMenu/>Menu</Link>
             <Link  to={"about"} className={`inline-flex justify-center items-center gap-1 hover:scale-105`}><FaInfo/>About</Link>
             <Link  to={"services"} className={`inline-flex justify-center items-center gap-1 hover:scale-105`}><FaServicestack/>Services</Link>
          </nav>
          </div>
          <div className=' h-full flex gap-3 sm:gap-10 items-center '>
          <div className=' text-2.5xl text-slate-600 relative'>
          <Link to={"cart"}>
              <BsCartFill className='hover:text-sky-950 hover:scale-110'/>
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center flex justify-center items-center ">
                <p className='inline text-center'>{cartItemNumber.length}</p>
              </div>
            </Link>
          </div>
          <div className='text-slate-600'>
            <div className='text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md'>
            {
              userData.image?<img src={userData.image} className='w-full h-full hover:scale-105' onClick={handleShowMenu}/>:<FaRegUserCircle className='hover:scale-105 hover:text-sky-950' onClick={handleShowMenu}/>
            }
            </div>
            {showMenu &&(<div className='absolute min-w-44 right-1 top-15 my-3 bg-white   shadow drop-shadow-md flex flex-col text-center text-sm font-roboto-mono' ref={menuRef}>
           {(userData.email===process.env.REACT_APP_ADMIN_EMAIL) &&(<Link to={"new-product"} onClick={handleShowMenu} className="whitespace-nowrap px-2 py-2 cursor-pointer text-center text-white bg-red-500 border-1 rounded border-solid border-white  hover:bg-red-600 m-0 hover:scale-105"><div className='flex justify-center items-center gap-2'><FaFileUpload/><span>Upload Product</span></div></Link>)}
           {(userData.email===process.env.REACT_APP_ADMIN_EMAIL) &&(<Link to={"delete-product"} onClick={handleShowMenu} className="whitespace-nowrap px-2 py-2 cursor-pointer text-center text-white bg-red-500 border-1 rounded border-solid border-white  hover:bg-red-600 m-0 hover:scale-105"><div className='flex justify-center items-center gap-2'><MdDelete/><span>Delete Product</span></div></Link>)}
             {
               userData.email ? <div className=' w-44 cursor-pointer text-white px-2 bg-red-500 text-center border-1 rounded border-solid border-white py-2 hover:bg-red-600 m-0 ' onClick={handleLogout}><div className='flex justify-center items-center gap-2'><AiOutlineLogin/><span>Logout<br/>{`(${userData.firstName.substr(0,1).toUpperCase()+userData.firstName.substr(1)})`}</span></div></div>:<Link to={"login"} onClick={handleShowMenu} className="whitespace-nowrap cursor-pointer px-2  text-center text-white bg-red-500 border-1 rounded border-solid border-white hover:bg-red-600 m-0 hover:scale-105 py-2"><div className='flex justify-center items-center gap-1'><AiOutlineLogin/><span>Login</span></div></Link>
              }            
            </div>
          )}
          </div>
          <div>
         {showMobileNav?<RxCross2 className='relative  text-2.5xl text-slate-600 hover:text-sky-950 hover:scale-105 mr-4 md:hidden'onClick={handleShowMobileNav}  /> :<GiHamburgerMenu className='relative  md:hidden text-2.5xl text-slate-600 hover:text-sky-950 hover:scale-105 mr-4'onClick={handleShowMobileNav} />}
           {showMobileNav&&(<nav className=" md:hidden min-w-32 px-2 text-base font-roboto-mono flex flex-col  absolute gap:0 pt-4 top-15 -right-2"ref={MobilemenuRef}>
                  <Link to={""} className="px-2 py-2  text-center min-w-32 text-white bg-red-500 border-1 rounded border-solid  border-white hover:bg-red-600 m-0 hover:scale-105">
                    <div className='flex justify-center gap-2 items-center'><FaHome/><span>Home</span></div>
                  </Link>
                  <Link
                    to={`menu/${productData[5]._id}`}
                    className="px-2 py-2 w-48 text-center text-white bg-red-500 border-1 rounded border-solid border-white hover:bg-red-600 m-0 hover:scale-105"
                    >
                    <div className='flex justify-center gap-2 items-center'><BiSolidFoodMenu/><span>Menu</span></div>
                  </Link>
                  <Link to={"about"} className="px-2 py-2  text-center min-w-32 text-white bg-red-500 border-1 rounded border-solid border-white transition-colors hover:bg-red-600 m-0 hover:scale-105">
                  <div className='flex justify-center gap-2 items-center'><FaInfo/><span>About</span></div>
                  </Link>
                  <Link to={"services"} className="px-2 py-2  text-center min-w-32 text-white bg-red-500 border-1 rounded border-solid border-white hover:bg-red-600 m-0">
                  <div className='flex justify-center gap-2 items-center'><FaServicestack/><span>Services</span></div>
                  </Link>
                </nav>)}
          </div>
          </div>
        </div>

   </header>
  )
}

export default Header