import { ErrorOutline } from "@mui/icons-material";
import { Button, Checkbox, CircularProgress, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
 
  useEffect(()=> {
    if(localStorage.getItem('access')){
      navigate('/dashboard')
    }
  },[])


  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [region, setRegion] = useState({
    name: "",
    location: "",
    email: "",
    twilio_account_sid: "",
    twilio_account_api_key: "",
    password: "",
    agreed: false,
  });



  const login = async() => {
    setLoader(true)
    let response = await axios.post(process.env.REACT_APP_BACKEND_URL+'region/login', {
      email : region.email, password : region.password
    })
    .then((res)=>{
      console.log(res.data)
      setLoader(false)
      localStorage.setItem('region', JSON.stringify(res.data.region))
      localStorage.setItem('access', JSON.stringify(res.data.access))
      navigate('/dashboard')

    })
    .catch((err)=> {
      toast(err?.response?.data?.message)
      setLoader(false)
      console.log(err)
    })
  

    
   

  }
  return (
    <div>
      <div className="grid lg:grid-cols-4">
        <div className="col-span-1 lg:pt-[50px] pt-[20px]  bg-white lg:min-h-[100vh] min-h-[100vh] relative px-8  lg:my-0">
          <div className="flex items-center justify-center">
            <img src="/icons/login_img.png" className="w-[50px]" />
          </div>
          <div className="text-center lg:text-[16px] mt-4  font-semibold ">
            Login
          </div>

          {errorMsg && (
            <div className="text-center text-red-500 lg:text-[13px] text-[12px] mt-2  font-semibold ">
              <ErrorOutline sx={{ fontSize: "" }} /> {errorMsg}
            </div>
          )}


          


          <div className="space-y-2 mb-3 mt-[100px]">
            <div className=" lg:text-[14px] text-[13px] ">Email Address</div>
            <InputBase
              value={region.email}
              onChange={(e) => {
                setRegion({ ...region, email: e.target.value });
              }}
              placeholder="johnmichael@example.com"
              sx={{
                bgcolor: "#F7F7F8",
                width: "100%",
                px: 2,
                py: "2px",
                fontSize: "14px",
              }}
            />
          </div>

          <div className="space-y-2">
            <div className=" lg:text-[14px] text-[13px] ">Password</div>
            <InputBase
              // type={showPassword ? "text" : "password"}
              type={"password"}
              value={region.password}
              onChange={(e) => {
                setRegion({ ...region, password: e.target.value });
              }}
              // endAdornment={
              //   <InputAdornment
              //     position="end"
              //     onClick={handleTogglePassword}
              //     className="cursor-pointer"
              //   >
              //     {showPassword ? <VisibilityOff /> : <Visibility />}
              //   </InputAdornment>
              // }
              sx={{
                bgcolor: "#F7F7F8",
                width: "100%",
                px: 2,
                py: "2px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* <div className="flex items-center justify-between mt-2">
          
            <div
              className="text-[#605BFF] lg:text-[13px] text-[12px] hover:underline cursor-pointer "
              onClick={() => {
                navigate("/forgot-password");

              }}
            >
              Forgot Password ?
            </div>
          </div> */}

        
          <div className="flex justify-center pt-6 pb-4 space-x-2">
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#605BFF",
                color: "white",
                py: "6px",
                px: "40px",
                borderRadius: "7px",
                fontSize: { lg: "14px", xs: "13px" },
                width: "100%",
              }}
              onClick={login}
              disabled={loader}
            >
              {loader ? (
                <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </div>

          <div className="text-black text-center lg:text-[13px] text-[12px] ">
            Dont have an account?{" "}
            <span
              className="text-[#605BFF] hover:underline cursor-pointer "
              onClick={() => navigate("/register")}
            >
              {" "}
            Register
            </span>
          </div>

          
        </div>
        <div className="col-span-3 lg:flex justify-center my-auto hidden ">
        <img src="/icons/illustration.png" className=" w-[580px] h-[500px] " />
      </div>
      </div>
     
    </div>
  );
};

export default Login;
