import { ErrorOutline, KeyboardArrowDown } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  InputBase,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AddProvince = ({ open, setOpen, loader, setLoader, selectedProvince, edit, setEdit, getProvinces }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();


  const [province, setProvince] = useState({
    name: edit ? selectedProvince?.name : "",
    password:  "",
    email: edit ? selectedProvince?.email : "",
    location: edit ? selectedProvince?.location : "",
    region_id: JSON.parse(localStorage.getItem('region'))._id
  });




  useEffect(()=> {
    setProvince({ 
      name: edit ? selectedProvince?.name : "",
      password:  "",
      email: edit ? selectedProvince?.email : "",
      location: edit ? selectedProvince?.location : "",
      region_id: JSON.parse(localStorage.getItem('region'))._id
    })
  },[edit, selectedProvince])


 

  const createProvince = async() => {
    setLoader(true)
    let response = await axios.post(process.env.REACT_APP_BACKEND_URL+'province/create',
      province
    ).then((res)=>{
      setLoader(false)
      setProvince({
        region_id: JSON.parse(localStorage.getItem('region'))._id
      })
      setOpen(false)
      toast('success')
      getProvinces()
    })
    .catch((err)=>{
      console.log(err.response.data.error)
      setLoader(false)
      toast(err.response.data.error)
    })

    console.log(response)
   
  }


  const editProvince = async() => {
    let response = await axios.post(process.env.REACT_APP_BACKEND_URL+'province/update',
      {...province, province_id: selectedProvince._id}
    ).then((res)=>{
      setLoader(false)
      setOpen(false)
      toast('success')
      getProvinces()
    })
    .catch((err)=>{
      console.log(err.response.data.error)
      setLoader(false)
      toast(err.response.data.error)
    })

    console.log(response)
  }

  return (
    <Dialog
      open={open}
      onClose={()=> {
        setOpen(false)
        setEdit(false)
      
      }
      }
      fullWidth={true}
      maxWidth={"sm"}
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.2)" }, // Adjust opacity here
      }}
    >
      <div className="lg:px-8 px-4 py-6">
        {errorMsg && (
          <div className="text-center text-red-500 lg:text-[13px] text-[12px] mt-2  font-semibold mb-3">
            <ErrorOutline sx={{ fontSize: "" }} /> {errorMsg}
          </div>
        )}

        <div className="lg:text-[16px]  text-[15px] font-semibold mb-4">
          {" "}
          Add Province
        </div>
        <div className="flex justify-center">
          <div className="lg:space-y-5 space-y-3">
            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Name
              </div>

              <div className="lg:w-[300px] w-full flex items-center space-x-4">
                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  value={province.name}
                  onChange={(e) => {
                    setProvince({ ...province, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Email Address
              </div>

              <div className="lg:w-[300px] w-full">
                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  value={province.email}
                  onChange={(e) => {
                    setProvince({ ...province, email: e.target.value });
                  }}
                />
              </div>
            </div>


         {!edit && (
             <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
             <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
               Password
             </div>

             <div className="lg:w-[300px] w-full">
               <InputBase
                 sx={{
                   bgcolor: "#F7F7F8",
                   width: "100%",
                   px: 2,
                   fontSize: "14px",
                 }}
                 value={province.password}
                 onChange={(e) => {
                   setProvince({ ...province, password: e.target.value });
                 }}
               />
             </div>
           </div> 

         )}
            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Location
              </div>

              <div className="lg:w-[300px] w-full">
                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  value={province.location}
                  onChange={(e) => {
                    setProvince({ ...province, location: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center pt-6 pb-4 space-x-2">
              <Button
                sx={{
                  textTransform: "none",
                  color: "#605BFF",
                  bgcolor: "white",
                  py: "4px",
                  px: "40px",
                  borderRadius: "7px",
                  fontSize: { lg: "14px", xs: "13px" },
                }}
                onClick={() => {
                  setOpen(false);
                  setEdit(false)
                  setProvince({
                    region_id: JSON.parse(localStorage.getItem('region'))._id
                  })
                }}
              >
                Close
              </Button>

              {edit ? (
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
                onClick={editProvince}
              >
                {loader ? (
                  <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
                ) : (
                  " Edit"
                )}
              </Button>
              ) : (
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
                onClick={createProvince}
              >
                {loader ? (
                  <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
                ) : (
                  " Save"
                )}
              </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddProvince;
