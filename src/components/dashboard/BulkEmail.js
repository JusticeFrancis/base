import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, CircularProgress, InputBase, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import TemplateModal from "../modals/TemplateModal";

const BulkEmail = () => {
    const [loader,setLoader] = useState(false)
    const [openTemplateModal, setOpenTemplateModal] = useState(false)
  return (
    <div className="pt-7 px-4 ">
        <TemplateModal open={openTemplateModal} setOpen={setOpenTemplateModal} loader={loader} setLoader={setLoader} />
      <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
        <div>Bulk Email</div>
      </div>

     <div className="lg:grid-cols-6 lg:grid gap-4">
     <div className=" col-span-4  lg:mx-[50px] bg-white px-10  mb-4 lg:mb-0 pb-5 pt-2">
        <div className="text-[16px] text-center font-semibold mb-10">
          {" "}
          Send Bulk Email{" "}
        </div>

        <div className="flex items-center  space-x-4 mb-5">
          <div className="w-full ">
            <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
              Province
            </div>

            <div className="lg:w-full w-full">
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
                <MenuItem value="admin">Province 1</MenuItem>
                <MenuItem value="user">Province 2</MenuItem>
                <MenuItem value="owner">Province 3</MenuItem>
              </Select>
            </div>
          </div>

          <div className="w-full ">
            <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
              Parish
            </div>

            <div className="lg:w-full w-full">
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
                <MenuItem value="admin">Parish 1</MenuItem>
                <MenuItem value="user">Parish 2</MenuItem>
                <MenuItem value="owner">Parish 3</MenuItem>
              </Select>
            </div>
          </div>
        </div>

        <div className=" mb-5">
          <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
            Title
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
            Content
          </div>

          <div className=" w-full flex items-center space-x-4">
            <InputBase
              rows={5}
              multiline
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
                 onClick={()=> {
                    setOpenTemplateModal(true)
                 }}
               >
                 {loader? (
                           <CircularProgress
                             size={"1.3rem"}
                             sx={{ color: "white" }}
                           />
                         ) : (
                           " Send"
                         )}
               </Button>

        </div>
      </div>


      <div className=" col-span-2 h-fit mx-[10px] bg-white px-10  pb-2  pt-2">
        <div className="text-[16px] text-center font-semibold mb-10">
          {" "}
          Twilio keys
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
      </div>
     </div>
    </div>
  );
};

export default BulkEmail;
