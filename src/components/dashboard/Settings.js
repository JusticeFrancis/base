import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Divider,
  InputBase,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TemplateModal from "../modals/TemplateModal";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [loader, setLoader] = useState(false);
  const [appPassword, setAppPassword] = useState('123456')
  const [region, setRegion] = useState(
    JSON.parse(localStorage.getItem("region"))
  );
  const [province, setProvince] = useState();
  const [parish, setParish] = useState();
  const [access, setAccess] = useState(
    JSON.parse(localStorage.getItem("access"))
  );
  const [tab, setTab] = useState(1);

  const getProvince = async () => {
    let province = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "province/get",
      {
        province_id: access?.province_id,
      }
    );
    console.log(province.data);
    setProvince(province.data?.province);
  };

  const getParish = async () => {
    let parish = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "parish/get",
      {
        parish_id: access?.parish_id,
      }
    );
    setParish(parish.data?.parish);
  };

  const addAppPassword = async () => {
    setLoader(true)
      let response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "access/update",
        { access_id: access._id ,
          appPassword 
        }
      ).then((res)=> {
        setLoader(false)
        toast('success')
      })
      .catch((err)=> {
        setLoader(false)
        toast(err.response.data.err)
      })
      console.log(response)
  };

  useEffect(() => {
    getProvince();
    getParish();
  }, []);
  return (
    <div className="pt-7 px-4 ">
      <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
        <div>Settings</div>
      </div>

      <div className="mb-4 px-3">
        <div className="flex  items-center lg:w-[300px] text-[15px] justify-between">
          <div
            onClick={() => {
              setTab(1);
            }}
            className={
              tab == 1
                ? " cursor-pointer text-purple-800 underline underline-offset-4"
                : "cursor-pointer text-gray-500"
            }
          >
            Personal Information
          </div>

          {/* <div
            onClick={() => {
              setTab(2);
            }}
            className={
              tab == 2
                ? " cursor-pointer text-purple-800 underline underline-offset-4 "
                : "cursor-pointer text-gray-500"
            }
          >
            {" "}
            Bulk SMS setup
          </div> */}

          <div
            onClick={() => {
              setTab(3);
            }}
            className={
              tab == 3
                ? "cursor-pointer text-purple-800 underline underline-offset-4 "
                : "cursor-pointer text-gray-500"
            }
          >
            {" "}
            Bulk Email setup
          </div>
        </div>

        <Divider className="lg:w-[300px]" />
      </div>

      <div className=" gap-4 ">
        {tab == 1 && (
          <div className=" col-span-2 h-fit mx-[10px]  bg-white lg:w-[300px]  px-5  pb-2  pt-2">
            <div className="text-[16px] text-center font-semibold mb-10">
              {" "}
              Account Information
            </div>

            <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Email
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  readOnly
                  value={access?.email}
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Access Level
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  readOnly
                  value={access?.access_level}
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Region
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  readOnly
                  value={region?.name}
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Province
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  readOnly
                  value={province?.name || "null"}
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Parish
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  readOnly
                  value={parish?.name || "null"}
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div></div>
          </div>
        )}

        {/* {tab == 2 && (
          <div className=" lg:col-span-2 h-fit mx-[10px]  bg-white lg:w-[300px]  px-5  pb-2  pt-2">
            <div className="text-[16px] text-center font-semibold ">
              {" "}
              Twilio keys
            </div>

            <div className="text-center text-[14px] mb-8 text-gray-400">
              {" "}
              Use Twilio Keys to setup bulk SMS{" "}
            </div>

            <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                API key
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                API Secret
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div>
              <Button
                sx={{
                  textTransform: "none",
                  bgcolor: "#605BFF",
                  color: "white",
                  py: "4px",
                  px: "40px",
                  borderRadius: "7px",
                  fontSize: { lg: "14px", xs: "13px" },
                }}
                disabled={loader}
              >
                {loader ? (
                  <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
                ) : (
                  " Save and Change"
                )}
              </Button>
            </div>

            <div></div>
          </div>
        )} */}

        {tab == 3 && (
          <div className=" col-span-2 h-fit mx-[10px]  bg-white lg:w-[300px]  px-5  pb-2  pt-2">
            <div className="text-[16px] text-center font-semibold mb-10">
              {" "}
              Setup SMTP for bulk email
            </div>

          
            <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Email
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  value={access?.email}
                  readOnly
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div className="text-[13px] text-gray-600 my-2"> To create app password  <span className="hover:underline text-blue-500 font-bold cursor-pointer" onClick={()=> {
              window.open('https://myaccount.google.com/apppasswords', '_blank')
            }}>click here</span> </div>

            <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                App Password
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                type="password"
                  value={appPassword}
                  onChange={(e)=> {
                    setAppPassword(e.target.value)
                  }}
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div>
              <Button
                sx={{
                  textTransform: "none",
                  bgcolor: "#605BFF",
                  color: "white",
                  py: "4px",
                  px: "40px",
                  borderRadius: "7px",
                  fontSize: { lg: "14px", xs: "13px" },
                }}
                
                disabled={loader}
                onClick={addAppPassword}
              >
                {loader ? (
                  <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
                ) : (
                  " Save and Change"
                )}
              </Button>
            </div>

            <div></div>
          </div>
        )}
      </div>
    </div>
  );

};

export default Settings;
