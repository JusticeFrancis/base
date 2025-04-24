import {
    Button,
    CircularProgress,
    Drawer,
    Menu,
    MenuItem,
    Radio,
    Select,
  } from "@mui/material";
  import {
    Dashboard as DashboardIcon,
    DashboardCustomize,
    ErrorOutline,
    KeyboardArrowDown,
    SettingsInputComponent,
    KeyboardArrowRight,
    Logout,
    Support,
    SupportAgent,
    Money,
    Email,
    Sms,
    People,
    Church,
    Castle,
  } from "@mui/icons-material";
  import React, { useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  
  const Sidebar = ({ open, setOpen, orgs }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  
    const [err_msg, setErrorMsg] = useState(null);
    const [loader, setLoader] = useState(false);
    
    console.log();
  
     const [anchorEl, setAnchorEl] = useState(null);
      const open_ = Boolean(anchorEl);
    
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    return (
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="text-[16px] space-y-3 bg-white   flex-1 w-[200px]">
          {location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/call-details') ? (
            <div
              onClick={() => {
                setOpen(false);
                navigate("/dashboard");
              }}
              className="cursor-pointer flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3">
              {" "}
              <img src="/icons/dash-active.png" className="w-[20px] mr-2" />{" "}
              Dashboard{" "}
            </div>
          ) : (
            <div
              className="cursor-pointer flex items-center py-2 px-3 text-[#7f7f92]"
              onClick={() => {
                setOpen(false);
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
  
          {location.pathname.startsWith('/dashboard/Provinces') 
            ? (
              <div
                onClick={() => {
                  setOpen(false);
                  navigate("/dashboard/Provinces");
                }}
                className="cursor-pointer flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3">
                {" "}
                <Castle
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              /> Provinces
              </div>
            ) : (
              <div
                className="cursor-pointer flex items-center py-2 px-3 text-[#7f7f92]"
                onClick={() => {
                  setOpen(false);
                  navigate("/dashboard/Provinces");
                }}
              >
                {" "}
                <Castle
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
              Provinces
              </div>
            )}
  
          {location.pathname.startsWith('/dashboard/Parishes') ? (
            <div
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/Parishes");
              }}
              className="cursor-pointer flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3">
              {" "}
              <Church
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
             Parishes
            </div>
          ) : (
            <div
              className="cursor-pointer flex items-center py-2 px-3 text-[#7f7f92]"
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/Parishes");
              }}
            >
              {" "}
              <Church
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
             Parishes
            </div>
          )}
  
          {location.pathname.startsWith('/dashboard/members') ? (
            <div
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/members");
              }}
              className="cursor-pointer flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3">
              {" "}
              <People
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
            Members
            </div>
          ) : (
            <div
              className="cursor-pointer flex items-center py-2 px-3 text-[#7f7f92]"
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/members");
              }}
            >
              {" "}
              <People
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
            Members
            </div>
          )}
  
          {location.pathname.startsWith('/dashboard/bulk-sms') ? (
            <div
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/bulk-sms");
              }}
              className="cursor-pointer flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3">
              {" "}
              <Sms
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
            Bulk Sms
            </div>
          ) : (
            <div
              className="cursor-pointer flex items-center py-2 px-3 text-[#7f7f92]"
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/bulk-sms");
              }}
            >
              {" "}
              <Sms
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
            Bulk Sms
            </div>
          )}
  
          {location.pathname.startsWith('/dashboard/bulk-email') ? (
            <div
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/bulk-email");
              }}
              className="cursor-pointer flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3">
              {" "}
              <Email
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
            Bulk Emails
            </div>
          ) : (
            <div
              className="cursor-pointer flex items-center py-2 px-3 text-[#7f7f92]"
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/bulk-email");
              }}
            >
              {" "}
              <Email
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
            Bulk Emails
            </div>
          )}


{location.pathname.startsWith('/dashboard/remittance') ? (
            <div
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/remittance");
              }}
              className="cursor-pointer flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3">
              {" "}
              <Money
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
             Remmittance
            </div>
          ) : (
            <div
              className="cursor-pointer flex items-center py-2 px-3 text-[#7f7f92]"
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/remittance");
              }}
            >
              {" "}
              <Money
              sx={{ 
                fontSize:'20px',
                mr:'9px'
              }}
              />
             Remmittance
            </div>
          )}
          {location.pathname.startsWith('/dashboard/settings') ? (
            <div
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/settings");
              }}
              className="cursor-pointer flex items-center text-[#605CFF] bg-gradient-to-r from-[#EBEBFC] to-[#fff] py-2 px-3">
              {" "}
              <img
                src="/icons/settings-active.png"
                className="w-[20px] mr-2"
              />{" "}
             Settings
            </div>
          ) : (
            <div
              className="cursor-pointer flex items-center py-2 px-3 text-[#7f7f92]"
              onClick={() => {
                setOpen(false);
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
  
  
  
        {/* <div className=" flex justify-center  items-center py-2 px-3 font-semibold ">
          {" "}
          <div className="space-y-2">
            <div className="text-left w-[130px]">
              {" "}
              {
                JSON.parse(localStorage.getItem("organization"))?.organization_name
                  .S
              }{" "}
            </div>
  
            <div className="w-[180px] mx-auto ">
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
            </div>
            <div className="flex justify-center">
              <Button
                sx={{
                  textTransform: "none",
                  bgcolor: "#E6E6E6",
                  color: "#244F62",
                  py: "10px",
                  px: "9px",
                  borderRadius: "6px",
                  fontSize: { lg: "14px", xs: "14px" },
                  width: "40vw",
                }}
              >
                Support
              </Button>
            </div>
  
            <div className="flex justify-center">
              <Button
                sx={{
                  textTransform: "none",
                  bgcolor: "#605BFF",
                  color: "white",
                  py: "10px",
                  px: "9px",
                  borderRadius: "6px",
                  fontSize: { lg: "14px", xs: "14px" },
                  width: "40vw",
                }}
                onClick={() => {
                  localStorage.clear("user");
                  localStorage.clear("organization");
                  navigate("/login");
                }}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div> */}
  
        <div className="px-3  left-[10%]   absolute w-[80%] bottom-4 mt-auto bg-[#F7F7F8] py-1 rounded-lg">
                          <div className=" text-[14px]  font-semibold flex"  >
                          Admin <span className="text-[13px] font-normal">(Province)</span>
                            <img src="/icons/Logout.png" className="w-[20px] ml-2 cursor-pointer" 
                    onClick={()=> {
                      localStorage.clear('user')
                      localStorage.clear('organization')
                      navigate('/login')
                    }}
                    />{" "}
                          </div>
        
                          <div className='text-[13px] text-black flex items-center justify-between'>
                            <div>
                            adminrccg@gmail.com
                            </div>
        
                           
        
     
                          </div>
                        </div>
      </Drawer>
    );
  };
  
  export default Sidebar;
  