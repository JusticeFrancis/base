import { Circle, KeyboardArrowDown, Mail } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  InputBase,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TemplateModal from "../modals/TemplateModal";
import axios from "axios";
import EmailTemplates from "./EmailTemplates";

const BulkEmail = () => {

  const [template, setTemplate] = useState({
    img: false,
    link: false
  })
  const [loader, setLoader] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [region, setRegion] = useState(
      JSON.parse(localStorage.getItem("region"))
    );

    const [access, setAccess] = useState(
      JSON.parse(localStorage.getItem("access"))
    );

   


  const [bulkEmail, setBulkEmail] = useState({
    id : access.parish_id || access.province_id || access.region_id,
    title:'',
    body:'',
    access_id: JSON.parse(localStorage.getItem('access'))._id,
    covers: 'region',
    province_id: access.province_id,
    parish_id: access.parish_id,
    link: null,
    img: null,
  })
  const [openTemplateModal, setOpenTemplateModal] = useState(false);


 
  const getProvinces = async () => {
    let provinces = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "get-provinces",
      {
        region_id: region._id,
      }
    ).then((res)=> {
      setProvinces(res.data?.provinces || []);
    })
    .catch((err)=> {
      console.log(err)
      
    })
    
  };

  const [emails, setEmails] = useState()

  const getEmails = async () => {
    let emails = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "email/get",
      {
        region_id: region._id,
      }
    );
    setEmails(emails.data?.emails || []);
  };


  const getParishesForProvince = async () => {
    let response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "get-parishes-by-province-id",
      {
        province_id: bulkEmail.province_id,
      }
    ).then((res)=> {
      setParishes(res.data.parishes);
    })

    .catch((err)=>{
      console.log(err)
    })

    
  };



    useEffect(() => {
      getProvinces();
      getEmails()
    }, []);
  
    useEffect(() => {
      if (bulkEmail.province_id) {
        getParishesForProvince();
      }
    }, [bulkEmail.province_id]);
  return (
    <div className="pt-7 px-4 ">
      <TemplateModal
        open={openTemplateModal}
        setOpen={setOpenTemplateModal}
        loader={loader}
        setLoader={setLoader}
        bulkEmail={bulkEmail}
        setBulkEmail={setBulkEmail}
        getEmails= {getEmails}
      />
      <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
        <div>Bulk Email</div>
      </div>




      <div className="lg:grid-cols-6 lg:grid gap-4">
        <div className=" col-span-4  lg:mx-[50px] bg-white px-10  mb-4 lg:mb-0 pb-5 pt-2">
          <div className="text-[16px] text-center font-semibold mb-10">
            {" "}
            Send Bulk Email{" "}
          </div>

          <div className="w-full ">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Select Email template  
              </div>

             <div className="flex items-center">
                                      <Switch
                                        defaultChecked={template?.img || false}
                                        defaultValue={template?.img || false}
                                        value={template?.img || false}
                                        onChange={(e) => {
                                          setTemplate({ ...template, img: !template.img });
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
                                        template.img ? 'My email has a Image': 'My email has no Image'
                                      }
                                        
                                      </div>
                                    </div>


                                    <div className="flex items-center">
                                      <Switch
                                        defaultChecked={template?.link || false}
                                        defaultValue={template?.link || false}
                                        value={template?.link || false}
                                        onChange={(e) => {
                                          setTemplate({ ...template, link: !template.link });
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
                                        template.link ? 'My email has a link': 'My email has no link'
                                      }
                                        
                                      </div>
                                    </div>
            </div>


          <div className="lg:flex items-center  lg:space-x-4 space-y-4 lg:space-y-0 mb-5">




  



            {region?.hasdenominations && (
              <>
              <div className="w-full ">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Province  
              </div>

              <div className="lg:w-full w-full">
                <Select
                  disabled={access.province_id ? true : false}
                  IconComponent={KeyboardArrowDown}
                  fullWidth
                  defaultValue={'one'}
                  value={bulkEmail.province_id}
                onChange={(e) => {
                  setBulkEmail((prev) => ({
                    ...prev,
                    province_id: e.target.value,
                    id: e.target.value,
                    covers:'province'
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
                   <MenuItem value={'one'} disabled>All Provinces</MenuItem>
                {provinces?.map((item, index) => (
                                 <MenuItem value={item._id}>{item.name}</MenuItem>
                               ))}
                </Select>
              </div>
            </div>

            <div className="w-full ">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Parish
              </div>

              <div className="lg:w-full w-full">
                <Select
                 disabled={access.parish_id ? true : false}
                  IconComponent={KeyboardArrowDown}
                  fullWidth
                  defaultValue={"one"}
                  value={bulkEmail.parish_id}
                  onChange={(e) => {
                    setBulkEmail((prev) => ({
                      ...prev,
                      parish_id: e.target.value,
                      id: e.target.value,
                      covers:'parish'
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
                   <MenuItem value={'one'} disabled>All Parishes</MenuItem>
                 {parishes?.map((item, index) => (
                                  <MenuItem value={item._id}>{item.name}</MenuItem>
                                ))}
                </Select>
              </div>
            </div>
            </>
            )}
          </div>

          <div className=" mb-5">
            <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
              Title
            </div>

            <div className=" w-full flex items-center space-x-4">
              <InputBase
               value ={bulkEmail.title}
               onChange={(e)=> {
                setBulkEmail({...bulkEmail, title: e.target.value})
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

{template.link && (
   <div className=" mb-5">
   <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
     Link
   </div>

   <div className=" w-full flex items-center space-x-4">
     <InputBase
      value ={bulkEmail.link}
      onChange={(e)=> {
       setBulkEmail({...bulkEmail, link: e.target.value})
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


{template.img && (
   <div className="mt-[20px] mb-3 flex items-center space-x-4 ">
              <input
                hidden
                type="file"
                accept="image/*"
                id="logo"
                onChange={(e) => {
                  let file = e.target.files[0];
                  setBulkEmail({ ...bulkEmail, img: file });
                }}
              />
  
              <Button
                onClick={() => {
                  let logo = document.getElementById("logo");
                  logo.click();
                }}
                sx={{
                  textTransform: "none",
                  bgcolor: "#605BFF",
                  color: "white",
                  py: "2px",
                  px: "20px",
                  borderRadius: "7px",
                  fontSize: { lg: "14px", xs: "13px" },
                  width: "fit",
                }}
                disabled={loader}
              >
                {loader ? (
                  <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
                ) : (
                  "Upload Image"
                )}
              </Button>
              <img
                src={bulkEmail.img && URL.createObjectURL(bulkEmail.img)}
                className="w-[50px] border-[1px] rounded-full"
              />
            </div>
)}
          <div className=" mb-5">
            <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
              Content
            </div>

            <div className=" w-full flex items-center space-x-4">
              <InputBase
               value ={bulkEmail.body}
               onChange={(e)=> {
                setBulkEmail({...bulkEmail, body: e.target.value})
               }}
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
                fontSize: { lg: "14px", xs: "13px" },
              }}
              disabled={loader}
              onClick={() => {
                setOpenTemplateModal(true);
              }}
            >
              {loader ? (
                <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
              ) : (
                " Send"
              )}
            </Button>
          </div>
        </div>

        <div className=" col-span-2 h-fit mx-[10px]    pb-2  pt-2">
         

          <div className="space-y-3">
            {/* <div className="flex items-center space-x-4 px-4 bg-white py-2  shadow-md">
              <div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="text-[15px]">
                    {" "}
                    <Circle
                      sx={{
                        color: "red",
                        fontSize: "10px",
                        position: "relative",
                        bottom: "2px",
                      }}
                    />{" "}
                    Birthdays Wishes
                  </div>
                  <div className="text-[11px] text-gray-500">
                    11th Jan 2025, 2:15pm
                  </div>
                </div>
                <div className="relative bottom-[4px] text-[13px] text-gray-600 leading-4">
                  Happy Birthday beloved brethrens in Christ , happy birthday.
                </div>
                <div className="underline text-[13px] ">to 5 members</div>{" "}
              </div>
            </div> */}


            <EmailTemplates template={template} email={bulkEmail}  />


            {/* <div className="text-[16px] text-center font-semibold mb-2">
            {" "}
            Emails sent
          </div>

         {emails?.map((item,index)=> (
             <div className="flex items-center space-x-4 px-4 bg-white py-2  shadow-md">
             <div>
               <div className="flex items-center justify-between space-x-4">
                 <div className="text-[15px]">
                   {" "}
                   <Circle
                     sx={{
                       color: "green",
                       fontSize: "10px",
                       position: "relative",
                       bottom: "2px",
                     }}
                   />{" "}
                 {item?.title}
                 </div>
                 <div className="text-[11px] text-gray-500">
                  {(new Date(item.createdAt)).toLocaleString([], {
                         year: 'numeric',
                         month: '2-digit',
                         day:'2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true, // set to false if you want 24-hour format
})}
                 </div>
               </div>
               <div className="relative bottom-[4px] text-[13px] text-gray-600 leading-4">
                {item?.body}
               </div>
               <div className="underline text-[13px] ">to {item?.numberOfRecipients} members</div>{" "}
             </div>
           </div>
         ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};





export default BulkEmail;