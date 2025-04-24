import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, CircularProgress, Divider, InputBase, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import TemplateModal from "../modals/TemplateModal";

const Settings = () => {
    const [loader,setLoader] = useState(false)
    const [tab, setTab] = useState(1)
  return (
    <div className="pt-7 px-4 ">
      <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
        <div>Settings</div>
      </div>



      <div className="mb-4 px-3">
        <div className="flex  items-center lg:w-[500px] text-[15px] justify-between">

            <div 
            onClick={()=>{
                setTab(1)
            }}
            className={tab == 1 ? ' cursor-pointer text-purple-800 underline underline-offset-4':
             'cursor-pointer text-gray-500' }>Personal Information</div>


        <div 
            onClick={()=>{
                setTab(2)
            }}
            className={tab == 2 ? ' cursor-pointer text-purple-800 underline underline-offset-4 ':
             'cursor-pointer text-gray-500' }> Bulk SMS setup</div>

<div 
            onClick={()=>{
                setTab(3)
            }}
            className={tab == 3 ? 'cursor-pointer text-purple-800 underline underline-offset-4 ':
             'cursor-pointer text-gray-500' }> Bulk Email setup</div>

        </div>


        

        


        

        
        <Divider className="lg:w-[500px]"/>
      </div>

     <div className=" gap-4 ">


     {
        tab == 1 && (
            <div className=" col-span-2 h-fit mx-[10px]  bg-white lg:w-[300px]  px-5  pb-2  pt-2">
         <div className="text-[16px] text-center font-semibold mb-10">
                  {" "}
                  Edit Personal Information
                </div>
        
        
         
          <div className=" mb-5">
                  <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                    Full Name
                  </div>

                  <div className="flex items-center space-x-4"> 
        
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
        
                
            </div>


                <div className=" mb-5">
                  <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                 Email
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
                  Phone Number
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
                           fontSize: {lg:"14px", xs:"13px"},
                         }}
         
                         disabled={loader}
                        
                       >
                         {loader? (
                                   <CircularProgress
                                     size={"1.3rem"}
                                     sx={{ color: "white" }}
                                   />
                                 ) : (
                                   " Save and Change"
                                 )}
                       </Button>
        
                </div>


        <div>
       

        </div>
      </div>
        )
       }



    
       {
        tab == 2 && (
            <div className=" lg:col-span-2 h-fit mx-[10px]  bg-white lg:w-[300px]  px-5  pb-2  pt-2">
         <div className="text-[16px] text-center font-semibold ">
                  {" "}
                  Twilio keys
                </div>

                <div className="text-center text-[14px] mb-8 text-gray-400">  Use Twilio Keys to setup bulk SMS </div>
        
        
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
                           fontSize: {lg:"14px", xs:"13px"},
                         }}
         
                         disabled={loader}
                        
                       >
                         {loader? (
                                   <CircularProgress
                                     size={"1.3rem"}
                                     sx={{ color: "white" }}
                                   />
                                 ) : (
                                   " Save and Change"
                                 )}
                       </Button>
        
                </div>


        <div>
       

        </div>
      </div>
        )
       }

{
        tab == 3 && (
            <div className=" col-span-2 h-fit mx-[10px]  bg-white lg:w-[300px]  px-5  pb-2  pt-2">
         <div className="text-[16px] text-center font-semibold mb-10">
                  {" "}
                 Setup SMTP for bulk email
                </div>
        
         <div className="">
                      <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                        Email service
                      </div>
        
                      <div className=" w-full">
                        <Select
                          IconComponent={KeyboardArrowDown}
                          fullWidth
                          defaultValue={"admin"}
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
                          <MenuItem value="admin">Gmail</MenuItem>
                          <MenuItem value="user">t-mobile</MenuItem>
                        </Select>
                      </div>
                    </div>
         
    


                <div className=" mb-5">
                  <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                 Email
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
                 App Password
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
                           fontSize: {lg:"14px", xs:"13px"},
                         }}
         
                         disabled={loader}
                        
                       >
                         {loader? (
                                   <CircularProgress
                                     size={"1.3rem"}
                                     sx={{ color: "white" }}
                                   />
                                 ) : (
                                   " Save and Change"
                                 )}
                       </Button>
        
                </div>


        <div>
       

        </div>
      </div>
        )
       }

      
     </div>
    </div>
  );
};

export default Settings;
