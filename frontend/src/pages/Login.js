import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link,useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data,setData] = useState({
    email: "",
    password: "",
  });

  const userData = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
};

 // console.log(data);
/*console.log(process.env.REACT_APP_SERVER_DOMAIN) */
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, password} = data;
    if (email && password) {
           await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/login`,data,{
            headers : {
              "content-type" : "application/json"
            },}).then((response)=>{
              const responseData = response.data;
              //console.log(responseData)
              if(responseData.alert){
                 // Store the token in local storage
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('user', JSON.stringify(responseData.data));
                toast.success(responseData.message);
                dispatch(loginRedux({data:responseData.data}));
                setTimeout(()=>{
                  navigate("/")
                },1000);
              }else {
                toast.error(responseData.message);
              }
              console.log(userData)
            })
            .catch((err)=>{
              //console.log(err);
              toast.error("Internal Server Error.Please try after some time.");
            })
    } else {
      toast("Please Enter required fields");
    }
  };

  return (
    <div className="p-3 md:p-4 min-h-screen relative bg-image2-opacity z-10">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4 mt-14 shadow-md drop-shadow-md rounded-md">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img src={loginSignupImage} className="w-full h-full" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
        
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
              className=" w-full bg-slate-200 border-none outline-none "
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
          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't  have an account ?{" "}
          <Link to={"/signUp"} className="text-red-500 underline">
             Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
