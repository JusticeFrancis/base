import {
  Add,
  Email,
  LocationCitySharp,
  MoreHoriz,
  Phone,
} from "@mui/icons-material";
import { Button, CircularProgress, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoneyOverTimeGraph from "../tools/MoneyOverTimeGraph";
import ProvinceGraph from "../tools/ProvinceGraph";
import AddProvince from "../modals/AddProvince";
import axios from "axios";

const Province = () => {
    const [region, setRegion] = useState(JSON.parse(localStorage.getItem('region')))
    const [edit, setEdit] = useState(false)
  const [loader, setLoader] = useState(true);


  

  const [access, setAccess] = useState(JSON.parse(localStorage.getItem('access')))
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
   const [provinces , setProvinces] = useState([])
   const [selectedProvince, setSelectedProvince] = useState(null)

   const getProvinces = async() => {
    let provinces = await axios.post(process.env.REACT_APP_BACKEND_URL+'get-provinces',{
      region_id : region._id
    })
    console.log(provinces.data)
    setProvinces(provinces?.data?.provinces || [])
    setSelectedProvince(provinces?.data?.provinces  ? provinces.data.provinces[0] : null)
  }



  useEffect(()=> {
    getProvinces()
  },[])
  return (
    <div className="grid grid-cols-9  lg:px-0 py-4 px-4">
        <AddProvince getProvinces={getProvinces} open={open} setOpen={setOpen} loader={loader} setLoader={setLoader} selectedProvince={selectedProvince} edit={edit} setEdit={setEdit} />
       
      <div className="lg:col-span-6 col-span-9 lg:order-1 order-2 mb-4 lg:mb-0 ">
        <div className="pt-7 px-4">
          <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
            <div>Provinces</div>

           {!access.province_id && (
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
                   Province
                 </>
               )}
             </Button>
           </div>
           )}
          </div>

          <div className=" max-w-[100vw] lg:max-w-full overflow-auto  ">
            <div className="w-[800px] lg:max-w-full ">
              <div className="grid grid-cols-10 gap-2 text-[14px] ">
                <div className="col-span-3 text-gray-500 ">Province Name</div>

                <div className="col-span-3 text-gray-500 ">Email</div>

                <div className="col-span-2 text-gray-500 ">Status</div>

                <div className="col-span-1 text-gray-500 ">Members</div>
                <div></div>
              </div>

              {provinces && provinces?.map((item,index)=> {


const getMembers = async() => {
  let members = await axios.post(process.env.REACT_APP_BACKEND_URL+'get-members-by-province-id',{
    province_id : item._id
  })
  console.log(members.data)
  document.getElementById('memberscount-'+index).innerHTML = members.data?.members?.length || 0

}

getMembers()

                
                return(
                <div className={
                  selectedProvince._id == item._id ? 
                  "grid grid-cols-10 gap-4 text-[15px] mt-4 bg-white  shadow-sm hover:shadow-lg cursor-pointer rounded-lg py-4  px-2 border-[1px] border-gray-400 " : 
                  "grid grid-cols-10 gap-4 text-[15px] mt-4 bg-white  shadow-sm hover:shadow-lg cursor-pointer rounded-lg py-4  px-2 "
                }
                
                onClick={()=> {
                  setSelectedProvince(item)
                }}>
                <div className="col-span-3 text-black">{item.name}</div>

                <div className="col-span-3 text-black">
                 {item.email}
                </div>

                <div className="col-span-2 text-black">{item.status =='active' ? (
 <div className="bg-green-300 text-green-900 text-center w-fit px-2  rounded-lg text-[14px]"> Active </div>
                ):(
                  <div className="bg-yellow-300 text-yellow-900 text-center w-fit px-2  rounded-lg text-[14px]"> Active </div>
                )}
               
                </div>

                <div className="col-span-1 text-black" id={'memberscount-'+index}>15</div>

                <div>
                </div>
              </div>
              )})}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 col-span-9 bg-white w-full lg:order-2 order-1   py-3 flex flex-col h-[70vh]">
        <div className="text-center text-[16px] font-bold">{selectedProvince?.name}</div>
        <div className="text-gray-500 text-center text-[15px]">(Province)</div>

        <Divider sx={{ my: 4 }} />

        <div className="px-4 flex-1">
          <div className="text-[14px] font-bold mb-5">Contact Information</div>
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
            <div>{selectedProvince?.email}</div>
          </div>
          <Divider sx={{ my: 2 }} />

          {/* <div className="flex items-center text-[14px] space-x-1">
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
            <div></div>
          </div> */}
          {/* <Divider sx={{ my: 2 }} /> */}

          <div className="flex items-center text-[14px] space-x-1">
            <div>
              <LocationCitySharp
                sx={{
                  color: "gray",
                  fontSize: "18px",
                  position: "relative",
                  bottom: 1,
                }}
              />
            </div>
            <div>{selectedProvince?.location}</div>
          </div>
          <Divider sx={{ my: 2 }} />
        </div>

        {/* <div className="">
          <ProvinceGraph data={sampleData} />
        </div> */}

{
  (
    !access.province_id ||
    selectedProvince?._id === access.province_id
  ) && (
    <div className="flex justify-between px-[30px]">
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
        onClick={() => {
          setEdit(true);
          setOpen(true);
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
  )
}

      </div>
    </div>
  );
};

export default Province;

const sampleData = [
  { timestamp: "2025-04-01T10:00:00Z", amount: 120 },
  { timestamp: "2025-04-02T10:00:00Z", amount: 80 },
  { timestamp: "2025-04-07T10:00:00Z", amount: 150 },
  { timestamp: "2025-04-15T10:00:00Z", amount: 200 },
];
