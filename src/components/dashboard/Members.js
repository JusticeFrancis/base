import {
    Add,
    Email,
    LocationCitySharp,
    MoreHoriz,
    Person,
    Phone,
  } from "@mui/icons-material";
  import { Button, CircularProgress, Divider } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import MoneyOverTimeGraph from "../tools/MoneyOverTimeGraph";
  import ProvinceGraph from "../tools/ProvinceGraph";
  import AddProvince from "../modals/AddProvince";
import AddParish from "../modals/AddParishModal";
import ParishGraph from "../tools/ParishGraph";
import AddMembers from "../modals/AddMemberModal";
  
  const Members = () => {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }, []);
  
    const [open, setOpen] = useState(false)
    return (
      <div className="grid grid-cols-9  lg:px-0 px-4 py-4">
          <AddMembers open={open} setOpen={setOpen} loader={loader} setLoader={setLoader} />
        <div className="lg:col-span-6 col-span-9 lg:order-1 order-2 mb-4 lg:mb-0 ">
          <div className="pt-7 px-4">
            <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
              <div>Members</div>
  
              <div className="flex justify-center ">
                <Button
                  sx={{
                    textTransform: "none",
                    bgcolor: "#605BFF",
                    color: "white",
                    py: "4px",
                    px: "40px",
                    borderRadius: "7px",
                    fontSize: { lg: "15px", xs: "14px" },
                  }}
                  onClick={()=> {
                      setOpen(true)
                  }}
                >
                  {loader ? (
                    <CircularProgress
                      size={"1.2rem"}
                      sx={{ color: "white", animationDuration: "0.7s" }}
                    />
                  ) : (
                    <>
                      <Add sx={{ position: "relative", bottom: 1 }} /> Add
                      Members
                    </>
                  )}
                </Button>
              </div>
            </div>
  
            <div className=" max-w-[100vw] lg:max-w-full overflow-auto  ">
              <div className="w-[800px] lg:max-w-full ">
                <div className="grid grid-cols-10 gap-2 text-[14px] ">
                  <div className="col-span-3 text-gray-500 ">Parish Name</div>
  
                  <div className="col-span-3 text-gray-500 ">Province Name</div>
  
                  <div className="col-span-2 text-gray-500 ">Name</div>
  
                  <div className="col-span-1 text-gray-500 ">Type</div>
                  <div></div>
                </div>
  
                <div className="grid grid-cols-10 gap-4 text-[15px] mt-4 bg-white  shadow-sm hover:shadow-lg cursor-pointer rounded-lg py-4  px-2 ">
                  <div className="col-span-3 text-black">Malibu Parish</div>
  
                  <div className="col-span-3 text-black">
                  Maragu Province
                  </div>
  
                  <div className="col-span-2 text-black"> malg@gmail.com</div>
  
                  <div className="col-span-1 text-black"> <span className="bg-green-800 px-2 py-1 rounded-md  text-white" >member</span> </div>
  
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 col-span-9 bg-white w-full lg:order-2 order-1   py-3">
          <div className="text-center text-[16px] font-bold">David Mark</div>
          <div className="text-gray-500 text-center text-[15px]">(member @ maraga parish - province 1 )</div>
  
          <Divider sx={{ my: 4 }} />
  
          <div className="px-4">
            <div className="text-[14px] font-bold mb-5 flex justify-between">
                <div>
                Contact Information
                </div>

                <span className="bg-green-800 px-2 py-1 rounded-lg text-[14px] text-white" >member</span>
            </div>

            <div className="flex items-center text-[14px] space-x-1">
              <div>
                <Person
                  sx={{
                    color: "gray",
                    fontSize: "18px",
                    position: "relative",
                    bottom: 1,
                  }}
                />
              </div>
              <div>David Mark</div>
            </div>
            <Divider sx={{ my: 2 }} />


            <div className="flex items-center text-[14px] space-x-1">
              <div>
                <Email
                  sx={{
                    color: "gray",
                    fontSize: "18px",
                    position: "relative",
                    bottom: 1,
                  }}
                />
              </div>
              <div>davidmark@gmail.com</div>
            </div>
            <Divider sx={{ my: 2 }} />
  
            <div className="flex items-center text-[14px] space-x-1">
              <div>
                <Phone
                  sx={{
                    color: "gray",
                    fontSize: "18px",
                    position: "relative",
                    bottom: 1,
                  }}
                />
              </div>
              <div>+12019320409</div>
            </div>
            <Divider sx={{ my: 2 }} />
  
            
          </div>
  
       
          <div className="flex justify-between px-[30px] ">
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#605BFF",
                color: "white",
                py: "4px",
                px: "40px",
                borderRadius: "7px",
                fontSize: { lg: "15px", xs: "14px" },
              }}
            >
              {loader ? (
                <CircularProgress
                  size={"1.2rem"}
                  sx={{ color: "white", animationDuration: "0.7s" }}
                />
              ) : (
                <>Edit</>
              )}
            </Button>
  
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#E71D36",
                color: "white",
                py: "4px",
                px: "40px",
                borderRadius: "7px",
                fontSize: { lg: "15px", xs: "14px" },
              }}
            >
              {loader ? (
                <CircularProgress
                  size={"1.2rem"}
                  sx={{ color: "white", animationDuration: "0.7s" }}
                />
              ) : (
                <>Delete</>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Members;
  
  const sampleData = [
    { timestamp: "2025-04-01T10:00:00Z", amount: 120 },
    { timestamp: "2025-04-02T10:00:00Z", amount: 80 },
    { timestamp: "2025-04-07T10:00:00Z", amount: 150 },
    { timestamp: "2025-04-15T10:00:00Z", amount: 200 },
  ];
  