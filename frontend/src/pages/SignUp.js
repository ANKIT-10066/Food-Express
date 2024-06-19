import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImageToBase64 } from "../utility/ImageToBase64";
import { toast } from "react-hot-toast";
import axios from "axios";
import bcrypt from 'bcryptjs';
function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName:"",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [isStrongPassword,setIsStrongPassword]=useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
     setShowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if(name==="password"){
      if(checkPasswordStrength(value)){
        setIsStrongPassword(true);
      }else setIsStrongPassword(false);
    }
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
const checkPasswordStrength = (password) => {
    var strengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#_])[A-Za-z\d$@$!%*?&#_]{8,}$/;
    return strengthRegex.test(password);
};
  const handleUploadProfileImage = async (e) => {
    try {
      const data = await ImageToBase64(e.target.files[0]);
      setData((prev) => {
        return {
          ...prev,
          image: data,
        };
      });
    } catch (error) {
      toast("An unknown error occurred! ")
      //console.error("An error occurred while converting the image:", error);
    }
  };
//  console.log(data);
  //console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const{firstName, email,password,confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword){
        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        const userData = {
          ...data,
          password:hashedPassword,
          confirmPassword:hashedPassword,
        };

       await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/signUp`,userData)
       .then((response)=>{
          const responseData=response.data;
          if(responseData.alert){
            toast.success(responseData.message);
            navigate("/login");
          }else toast.error(responseData.message);
        }).catch((error)=>{

          toast.error("Internal Server Error.SignUp Failed.")
        })
        }else{
          toast.error("password and confirm password do not match.");
        }
      }else {
        toast.error("Please Enter required fields");
      }
      }
    return (
    <div className="p-3 md:pt-12 pt-10 min-h-screen relative bg-image2-opacity z-10">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col ">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img
            src={data.image ? data.image : loginSignupImage }
            className="w-full h-full"
          />

          {
            <label htmlFor="profileImage">
              <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                <p className="text-sm p-1 text-white">Upload</p>
              </div>
              <input
                type={"file"}
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleUploadProfileImage}
              />
            </label>
          }
        </div>

        <form className="w-full p-3 flex flex-col shadow-md rounded" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
         {((!isStrongPassword) && data.password)&&(<p className='text-red-600 text-xs'>password must contain atleast 8 characters,including uppercase, lowercase, numbers, and special characters</p>)}
          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto  bg-red-600 hover:bg-red-700 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
          <p className="text-left text-sm mt-4">
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
        </form>
        
      </div>
    </div>
  );
}

export default Signup;
