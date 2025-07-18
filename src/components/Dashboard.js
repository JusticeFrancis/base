import {
  Castle,
  Church,
  Dashboard as DashboardIcon,
  Email,
  ErrorOutline,
  KeyboardArrowRight,
  Logout,
  Menu as MenuIcon,
  Money,
  People,
  Sms,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Radio,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./dashboard/Home";
import Sidebar from "./layout/Sidebar";
import Province from "./dashboard/Province";
import Parishes from "./dashboard/Parishes";
import Members from "./dashboard/Members";
import BulkSms from "./dashboard/BulkSms";
import BulkEmail from "./dashboard/BulkEmail";
import Remittance from "./dashboard/Remittance";
import Settings from "./dashboard/Settings";

const Dashboard = () => {
   const [region, setRegion] = useState(JSON.parse(localStorage.getItem('region')))
    const [access, setAccess] = useState(JSON.parse(localStorage.getItem('access')))
    useEffect(()=>{

      if(!localStorage.getItem('access')){
        navigate('/login')
      }

    },[])
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //check if user has twilio_information and exist

  const [err_msg, setErrorMsg] = useState(null);
  const [loader, setLoader] = useState(false);

  const [loadState, setLoadState] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadState(false);
    }, 2000);
  }, []); // Runs only once when the component mounts

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
      {loadState ? (
        <div
          className="bg-white"
          style={{
            width: "100vw",
            height: "100vh",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <div className="flex items-center text-black text-[15px] font-semibold">
              <div
                style={{ display: "flex", gap: "0.5rem", marginRight: "10px" }}
              >
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <style jsx>{`
                .dot {
                  width: 12px;
                  height: 12px;
                  background-color: rgb(74, 69, 234); /* Starting color */
                  border-radius: 50%;
                  animation: bounce 1.5s infinite, colorChange 1.5s infinite;
                }
                .dot:nth-child(2) {
                  animation-delay: 0.2s;
                }
                .dot:nth-child(3) {
                  animation-delay: 0.4s;
                }
                @keyframes bounce {
                  0%,
                  80%,
                  100% {
                    transform: scale(0);
                  }
                  40% {
                    transform: scale(1);
                  }
                }
                @keyframes colorChange {
                  0%,
                  100% {
                    background-color: #605bff; /* Color at the start and end */
                  }
                  50% {
                    background-color: rgb(
                      255,
                      91,
                      91
                    ); /* Color at the middle of the animation */
                  }
                }
              `}</style>
              Base Loading
            </div>
          </Box>
        </div>
      ) : (
        <>
          <div
            className=" flex items-center lg:justify-between px-4 lg:hidden bg-white 
        lg:bg-transparent pb-4 pt-4 lg:pt-0 lg:pb-0 rounded-br-[20px] rounded-bl-[20px] lg:rounded-br-[20px] lg:rounded-bl-[20px] 
        "
          >
            <MenuIcon
              onClick={() => {
                setOpenSidebar(!openSidebar);
              }}
              sx={{
                color: { lg: "black", xs: "#FFCC00" },
              }}
            />

            <div className="text-[20px] font-normal  text-center mx-auto flex items-center space-x-2  ">
              <img src="/icons/login_img.png" className="w-[30px] hidden" />
              <div className="text-[16px] px-6   text-center font-semibold my-3 flex  space-x-3 items-center">
                <img src={region?.logo} className="w-[30px]" />{" "}
                <div>{region?.name}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-2 w-[220px]   flex-col min-h-[100vh] h-full hidden lg:flex ">
              <div className="bg-white relative  min-h-[100vh] h-full ">
                <div className="text-[16px] px-6   text-center font-semibold my-3 flex  space-x-3 items-center">
                  <img src={region?.logo} className="w-[30px]" />{" "}
                  <div>{region?.name}</div>
                </div>
                <div className="text-[16px]  pr-6 space-y-3  flex-1">
                  {location.pathname === "/dashboard" ||
                  location.pathname.startsWith("/dashboard/call-details") ? (
                    <div
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                      className="cursor-pointer  pl-9 flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3"
                    >
                      {" "}
                      <img
                        src="/icons/dash-active.png"
                        className="w-[20px] mr-2"
                      />{" "}
                      Dashboard{" "}
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer   pl-9 flex items-center py-2 px-3 text-[#7f7f92]"
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                    >
                      {" "}
                      <img
                        src="/icons/dash-inactive.png"
                        className="w-[20px] mr-2"
                      />{" "}
                      Dashboard{" "}
                    </div>
                  )}

                {region?.hasdenominations && (
                  <>
                    {  location.pathname.startsWith("/dashboard/provinces") ? (
                    <div
                      onClick={() => {
                        navigate("/dashboard/provinces");
                      }}
                      className="cursor-pointer pl-9 flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3"
                    >
                      {" "}
                      <Castle
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Provinces{" "}
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer pl-9   flex items-center py-2 px-3 text-[#7f7f92]"
                      onClick={() => {
                        navigate("/dashboard/provinces");
                      }}
                    >
                      {" "}
                      <Castle
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Provinces{" "}
                    </div>
                  )}

                  {location.pathname.startsWith("/dashboard/parishes") ? (
                    <div
                      onClick={() => {
                        navigate("/dashboard/parishes");
                      }}
                      className="cursor-pointer pl-9 flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3"
                    >
                      {" "}
                      <Church
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Parishes
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer pl-9 flex items-center py-2 px-3 text-[#7f7f92]"
                      onClick={() => {
                        navigate("/dashboard/parishes");
                      }}
                    >
                      {" "}
                      <Church
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Parishes
                    </div>
                  )}

</>
                )}
                  {location.pathname.startsWith("/dashboard/members") ? (
                    <div
                      onClick={() => {
                        navigate("/dashboard/members");
                      }}
                      className="cursor-pointer pl-9 flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3"
                    >
                      {" "}
                      <People
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Members
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer pl-9 flex items-center py-2 px-3 text-[#7f7f92]"
                      onClick={() => {
                        navigate("/dashboard/members");
                      }}
                    >
                      {" "}
                      <People
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Members
                    </div>
                  )}

                  {/* {location.pathname.startsWith("/dashboard/bulk-sms") ? (
                    <div
                      onClick={() => {
                        navigate("/dashboard/bulk-sms");
                      }}
                      className=" cursor-pointer pl-9 flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3"
                    >
                      {" "}
                      <Sms
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Bulk Sms
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer pl-9 flex items-center py-2 px-3 text-[#7f7f92]"
                      onClick={() => {
                        navigate("/dashboard/bulk-sms");
                      }}
                    >
                      {" "}
                      <Sms
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Bulk Sms
                    </div>
                  )} */}

                  {location.pathname.startsWith("/dashboard/bulk-email") ? (
                    <div
                      onClick={() => {
                        navigate("/dashboard/bulk-email");
                      }}
                      className="cursor-pointer pl-9 flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3"
                    >
                      {" "}
                      <Email
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Bulk Email
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer pl-9 flex items-center py-2 px-3 text-[#7f7f92]"
                      onClick={() => {
                        navigate("/dashboard/bulk-email");
                      }}
                    >
                      {" "}
                      <Email
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Bulk Email
                    </div>
                  )}

                  {location.pathname.startsWith("/dashboard/remittance") ? (
                    <div
                      onClick={() => {
                        navigate("/dashboard/remittance");
                      }}
                      className="cursor-pointer pl-9 flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3"
                    >
                      {" "}
                      <Money
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Remmittance
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer pl-9 flex items-center py-2 px-3 text-[#7f7f92]"
                      onClick={() => {
                        navigate("/dashboard/remittance");
                      }}
                    >
                      {" "}
                      <Money
                        sx={{
                          fontSize: "20px",
                          mr: "9px",
                        }}
                      />
                      Remmittance
                    </div>
                  )}

                  {location.pathname.startsWith("/dashboard/settings") ? (
                    <div
                      onClick={() => {
                        navigate("/dashboard/settings");
                      }}
                      className="cursor-pointer pl-9 flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3"
                    >
                      {" "}
                      <img
                        src="/icons/settings-active.png"
                        className="w-[20px] mr-2"
                      />{" "}
                      Settings
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer pl-9 flex items-center py-2 px-3 text-[#7f7f92]"
                      onClick={() => {
                        navigate("/dashboard/settings");
                      }}
                    >
                      {" "}
                      <img
                        src="/icons/settings-inactive.png"
                        className="w-[20px] mr-2"
                      />{" "}
                      Settings
                    </div>
                  )}
                </div>
                {err_msg && (
                  <div className="text-center text-red-500 lg:text-[13px] text-[12px] mt-2  font-semibold ">
                    <ErrorOutline sx={{ fontSize: "" }} /> {err_msg}
                  </div>
                )}

                {/* <div className="mt-4">
                    {loader ? (
                      <CircularProgress size={"1.3rem"} sx={{ color: "blue" }} />
                    ) : (
                      <Select
                        IconComponent={KeyboardArrowDown}
                        fullWidth
                        value={
                          user?.relatedOrgs.L.filter(
                            (e) =>
                              e?.M.org_id.S ===
                              JSON.parse(localStorage.getItem("organization")).orgId.S
                          )[0]?.M.org_id.S
                        }
                        onChange={(f) => {
                          changeOrganization(f.target.value);
                        }}
                        className="mb-2 bg-[#F7F7F8]"
                        sx={{
                          fontSize: "13px",
                          padding: "2px 8px", // Adjust padding here
                          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                          "& .MuiSelect-select": {
                            padding: "2px 8px", // Adjust padding for the text inside Select
  
                          },
                        }}
                      >
                        {user?.relatedOrgs.L.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item?.M.org_id.S}>{orgs?.find((e) => e.orgId.S === item?.M.org_id.S)?.organization_name.S}</MenuItem>
                          );
                        })}
                      </Select>
                    )}
   
                  </div> */}

                <div className="px-3  left-[10%]   absolute w-[80%] bottom-4 mt-auto bg-[#F7F7F8] py-1 rounded-lg">
                  <div className=" text-[14px]  font-semibold flex capitalize">
                  {access?.access_level}
                    {/* <span className="text-[13px] font-normal">(Province)</span> */}
                    <img
                      src="/icons/Logout.png"
                      className="w-[20px] ml-2 cursor-pointer"
                      onClick={() => {
                        localStorage.clear('region')
                      localStorage.clear('access')
                        navigate("/login");
                      }}
                    />{" "}
                  </div>

                  <div className="text-[13px] text-black flex items-center justify-between">
                    <div>{access?.email}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-10 col-span-12  lg:py-2 pb-2 lg:px-12 ">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/provinces" element={<Province />} />
                <Route path="/parishes" element={<Parishes />} />
                <Route path="/members" element={<Members />} />
                <Route path="/bulk-sms" element={<BulkSms />} />
                <Route path="/bulk-email" element={<BulkEmail />} />
                <Route path="/remittance" element={<Remittance />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
