import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, CircularProgress, InputBase, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import TemplateModal from "../modals/TemplateModal";

const Remittance = () => {
    const [loader,setLoader] = useState(false)
  return (
    <div className="pt-7 px-4 ">
      <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
        <div>Remittance</div>
      </div>

     <div className="lg:grid-cols-6 lg:grid gap-4">
     <div className=" col-span-4 pb-5 pt-2">
     <div className=" max-w-[100vw] lg:max-w-full overflow-auto  ">
              <div className="w-[800px] lg:max-w-full ">
                <div className="grid grid-cols-11 gap-2 text-[14px]  ">
                <div className="col-span-2 text-gray-500">Date</div>
                  <div className="col-span-3 text-gray-500 ">Parish Name</div>
  
                  <div className="col-span-3 text-gray-500 ">Province Name</div>
  
                  <div className="col-span-2 text-gray-500 ">Amount</div>
  
                  <div className="col-span-1 text-gray-500 ">Reason</div>
                 
                </div>
  
                <div className="grid grid-cols-11 gap-4 text-[15px] mt-4 bg-white  shadow-sm hover:shadow-lg cursor-pointer rounded-lg py-4  px-2 ">
                <div className="col-span-2 text-black">11/2/34</div>
                 
                  <div className="col-span-3 text-black">Malibu Parish 2</div>
  
                  <div className="col-span-3 text-black">
                   Province 1
                  </div>
  
                  <div className="col-span-2  text-green-700 font-bold"> $100</div>
  
                  <div className="col-span-1 text-black">Offering</div>
  
                  <div>
                  </div>
                </div>
              </div>
            </div>
      </div>


      <div className=" col-span-2 h-fit mx-[10px] bg-white px-10  pb-2  pt-2">
        <div className="text-[16px] text-center font-semibold mb-10">
          {" "}
        Add Remittance
        </div>


        <div className="w-full mb-5 ">
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

          <div className="w-full mb-5 ">
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


          <div className="w-full mb-5 ">
            <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
              Type
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
                <MenuItem value="admin">Credit</MenuItem>
                <MenuItem value="user">Debit</MenuItem>
              </Select>
            </div>
          </div>

          <div className="w-full mb-5 ">
            <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
              Reason
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
                <MenuItem value="admin">Offering</MenuItem>
                <MenuItem value="user">Tithes</MenuItem>
              </Select>
            </div>
          </div>

        <div className=" mb-5">
          <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
          Amount
          </div>

          <div className=" w-full flex items-center space-x-4">
          <InputBase
              type='number'
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
                           "Save"
                         )}
               </Button>

        </div>
      </div>
     </div>
    </div>
  );
};

export default Remittance;
