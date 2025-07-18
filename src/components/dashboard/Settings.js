import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Divider,
  InputBase,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TemplateModal from "../modals/TemplateModal";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [loader, setLoader] = useState(false);
  const [access, setAccess] = useState(
    JSON.parse(localStorage.getItem("access"))
  );
  const [appPassword, setAppPassword] = useState('123456')
  const [email, setEmail] = useState(access?.sender_email || access?.email)
  const [service, setService] = useState(access?.service || 'gmail')
  const [port, setPort] = useState(access?.port || 465)
  const [host, setHost] = useState(access?.host || 'smtp.mydomain.com')
  const [region, setRegion] = useState(
    JSON.parse(localStorage.getItem("region"))
  );
  const [province, setProvince] = useState();
  const [parish, setParish] = useState();
 
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
          appPassword ,
          email,
          host, service, port
        }
      ).then((res)=> {
        setLoader(false)
        localStorage.setItem('access', JSON.stringify(res.data.updatedAccess))
        toast('success')
        console.log(res.data)
      })
      .catch((err)=> {
        setLoader(false)
        toast(err.response.data.err)
      })
      console.log(response)
  };

  const updateDenominations = async (hasdenominations) => {
    setLoader(true)
      let response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "denominations",
        { region_id: region._id ,
          hasdenominations 
        }
      ).then((res)=> {
        setLoader(false)
        toast('success')
        localStorage.setItem('region', JSON.stringify(res.data.updatedRegion))
        setTimeout(() => {
          window.location.reload()

        }, 2000);
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


            <div className="flex items-center space-x-3  mt-2">
             
                        <div className="flex items-center">
                          <Switch
                            defaultChecked={region?.hasdenominations || false}
                            defaultValue={region?.hasdenominations || false}
                            value={region?.hasdenominations || false}
                            onChange={(e) => {
                              setRegion({ ...region, hasdenominations: !region.hasdenominations });
                              updateDenominations(!region.hasdenominations)
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


             <div className="w-full ">
                          <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                            Select your email service  
                          </div>
            
                          <div className="lg:w-full w-full">
                            <Select
                              disabled={access.province_id ? true : false}
                              IconComponent={KeyboardArrowDown}
                              fullWidth
                              defaultValue={'one'}
                              value={service}
                            onChange={(e) => {
                              setService(e.target.value);
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
                                             <MenuItem value={'gmail'}>{'GMAIL'}</MenuItem>
                                             <MenuItem value={'domain_email'}>{'MY DOMAIN EMAIL'}</MenuItem>
                            </Select>
                          </div>
                        </div>

          
            <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Email
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  value={email}
                  onChange={(e)=> {
                    setEmail(e.target.value)
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


            {service == 'domain_email' && (
              <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Host
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  value={host}
                  onChange={(e)=> {
                    setHost(e.target.value)
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
            )}


{service == 'domain_email' && (
              <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Port
              </div>

              <div className=" w-full flex items-center space-x-4">
                <InputBase
                  value={port}
                  onChange={(e)=> {
                    setPort(e.target.value)
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
            )}



            {service == 'gmail' && (
              <>
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
            </>
            )}

            {/* <div className="text-[13px] text-gray-600 my-2"> To create app password  <span className="hover:underline text-blue-500 font-bold cursor-pointer" onClick={()=> {
              window.open('https://myaccount.google.com/apppasswords', '_blank')
            }}>click here</span> </div> */}

          {service == 'domain_email' && (
              <div className=" mb-5">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
               Password
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
          )}

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
