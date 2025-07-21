import { ErrorOutline, KeyboardArrowDown } from "@mui/icons-material";
import { Button, Checkbox, CircularProgress, InputBase, MenuItem, Select, Switch } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRegion = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [region, setRegion] = useState({
    logo: null,
    name: "",
    location: "",
    email: "",
    appPassword: "",
    twilioAccountSID: "",
    twilioApiKey: "",
    password: "",
    agreed: false,
    hasdenominations: false,
    currency:'dollar'
  });

  useEffect(() => {
    if (localStorage.getItem("access")) {
      navigate("/dashboard");
    }
  }, []);

  const createRegion = async () => {
    if (region.agreed) {
      try {
        setLoader(true);
        let img = null
      if(region.logo){
        const formData = new FormData();
        formData.append("image", region.logo);
        img = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "upload",
          formData
        );

        console.log(img.data);
      }

        let response = await axios
          .post(process.env.REACT_APP_BACKEND_URL + "region/create", {
            ...region,
            logo: img?.data?.imageUrl || null,
          })
          .then((res) => {
            toast("success");
            setLoader(false);
            console.log(res);
            localStorage.setItem("region", JSON.stringify(res.data.region));
            localStorage.setItem("access", JSON.stringify(res.data.access));
            navigate("/dashboard");
          })
          .catch((err) => {
            toast(err?.response?.data?.error);
            setLoader(false);
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("please agree");
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-4">
        <div className="col-span-1 lg:pt-[50px] pt-[20px]  bg-white lg:min-h-[100vh] min-h-[100vh] relative px-8  lg:my-0">
          <div className="flex items-center justify-center">
            <img src="/icons/login_img.png" className="w-[50px]" />
          </div>
          <div className="text-center lg:text-[16px] mt-4  font-semibold ">
            Sign Up
          </div>

          {errorMsg && (
            <div className="text-center text-red-500 lg:text-[13px] text-[12px] mt-2  font-semibold ">
              <ErrorOutline sx={{ fontSize: "" }} /> {errorMsg}
            </div>
          )}

          <div className="space-y-2 mb-3 ">
            <div className=" lg:text-[14px] text-[13px] "> Name</div>
            <InputBase
              value={region.name}
              onChange={(e) => {
                setRegion({ ...region, name: e.target.value });
              }}
              placeholder="your organization name"
              sx={{
                bgcolor: "#F7F7F8",
                width: "100%",
                px: 2,
                py: "2px",
                fontSize: "14px",
              }}
            />
          </div>

          <div className="space-y-2 mb-3 ">
            <div className=" lg:text-[14px] text-[13px] "> Location</div>
            <InputBase
              value={region.location}
              onChange={(e) => {
                setRegion({ ...region, location: e.target.value });
              }}
              placeholder="your location"
              sx={{
                bgcolor: "#F7F7F8",
                width: "100%",
                px: 2,
                py: "2px",
                fontSize: "14px",
              }}
            />
          </div>

          <div className="space-y-2 mb-3">
            <div className=" lg:text-[14px] text-[13px] ">Email Address</div>
            <InputBase
              value={region.email}
              onChange={(e) => {
                setRegion({ ...region, email: e.target.value });
              }}
              placeholder="your email"
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

          <div className="flex items-center space-x-3  mt-2">
            <div className="flex items-center">
              <Switch
                defaultChecked={false}
                defaultValue={false}
                value={region.hasdenominations || false}
                onChange={(e) => {
                  setRegion({ ...region, hasdenominations: !region.hasdenominations });
                }}
                size="lg"
                sx={{
                  color: "purple",
                  "&.Mui-checked": {
                    color: "purple", // Set color for checked state
                  },
                }}
              />
              <div className="text-[13px]">
              {
                region.hasdenominations ? ' My organization has denominations like parishes and provinces ': 'My organization has no demoninations'
              }
                
              </div>
            </div>
          </div>


          <div className="w-full ">
          <div className=" lg:text-[14px] text-[13px] ">
                Select Currency  
              </div>

              <div className="lg:w-full w-full">
                <Select
                  IconComponent={KeyboardArrowDown}
                  fullWidth
                  defaultValue={'one'}
                  value={region.currency}
                onChange={(e) => {
                  setRegion((prev) => ({
                    ...prev,
                    currency: e.target.value,
                  }));
                }}
                  className="mb-2 bg-[#F7F7F8]"
                  sx={{
                    fontSize: "14px",
                    padding: "4px 8px", // Adjust padding here
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiSelect-select": {
                      padding: "4px 8px", // Adjust padding for the text inside Select
                    },
                  }}
                >
                                 <MenuItem value={'dollar'}>{'Dollar'}</MenuItem>
                </Select>
              </div>
            </div>

            <div className="mt-5 mb-3 flex items-center space-x-5">
  {/* Hidden file input */}
  <input
    hidden
    type="file"
    accept="image/*"
    id="logo"
    onChange={(e) => {
      let file = e.target.files[0];
      setRegion({ ...region, logo: file });
    }}
  />

  {/* Upload Button */}
  <Button
    onClick={() => {
      document.getElementById("logo").click();
    }}
    sx={{
      textTransform: "none",
      bgcolor: "#605BFF",
      color: "white",
      py: "3px",
      px: "24px",
      borderRadius: "10px",
      fontSize: { lg: "15px", xs: "14px" },
      boxShadow: "0 2px 10px rgba(96, 91, 255, 0.3)",
      transition: "background-color 0.3s ease",
      '&:hover': {
        bgcolor: "#4b47d6",
      },
      width: "auto",
    }}
    disabled={loader}
    aria-label="Upload logo"
  >
    {loader ? (
      <CircularProgress size={"1.4rem"} sx={{ color: "white" }} />
    ) : (
      "Upload Logo"
    )}
  </Button>

  {/* Logo preview */}
  {region.logo && (
    <img
      src={URL.createObjectURL(region.logo)}
      alt="Logo Preview"
      className="w-14 h-14 rounded-full border-2 border-purple-600 object-cover shadow-md"
      onLoad={(e) => URL.revokeObjectURL(e.target.src)} // clean up URL object
    />
  )}
</div>


          <div className="flex items-center space-x-3  mt-2">
            <div className="flex items-center">
              <Checkbox
                defaultChecked={false}
                defaultValue={false}
                value={region.agreed || false}
                onChange={(e) => {
                  setRegion({ ...region, agreed: e.target.value });
                }}
                size="lg"
                sx={{
                  color: "#605BFF",
                  "&.Mui-checked": {
                    color: "#605BFF", // Set color for checked state
                  },
                }}
              />
              <div className="text-[13px]">
                By creating an account you agree to the
                <span
                  className="text-[#605BFF] hover:underline cursor-pointer "
                  onClick={() =>
                    window.open("https://terms-and-conditions/", "_blank")
                  }
                >
                  {" "}
                  terms of use{" "}
                </span>
                and our
                <span
                  onClick={() => window.open("https://privacy", "_blank")}
                  className="text-[#605BFF] hover:underline cursor-pointer "
                >
                  {" "}
                  privacy policy
                </span>
                .
              </div>
            </div>
          </div>

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
                boxShadow: "0 2px 10px rgba(96, 91, 255, 0.3)",
              }}
              disabled={loader}
              onClick={createRegion}
            >
              {loader ? (
                <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
              ) : (
                "Register"
              )}
            </Button>
          </div>

          <div className="text-black text-center lg:text-[13px] text-[12px] ">
            Already have an account?{" "}
            <span
              className="text-[#605BFF] hover:underline cursor-pointer "
              onClick={() => navigate("/login")}
            >
              {" "}
              Log in
            </span>
          </div>
        </div>
        <div className="col-span-3 lg:flex justify-center my-auto hidden ">
          <img
            src="/icons/illustration.png"
            className=" w-[580px] h-[500px] "
          />
        </div>
      </div>
    </div>
  );
};

export default CreateRegion;
