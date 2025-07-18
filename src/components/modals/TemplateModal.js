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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TemplateModal = ({ open, setOpen, loader, setLoader, bulkEmail, setBulkEmail, getEmails }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const [template, setTemplate] = useState(1)

  const sendEmail = async () => {
    let img 
    setLoader(true)
    if(bulkEmail.img){
      const formData = new FormData();
    formData.append("image", bulkEmail.img);
     img = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "upload",
      formData
    );

    console.log(img.data);
    }



    console.log(img.data.imageUrl)
  
    let email = await axios.post(
     
      process.env.REACT_APP_BACKEND_URL + "email/send-email-in-bulk",
      {
        ...bulkEmail, template, img_link: bulkEmail.img ? img.data.imageUrl : null
      }

   
    ).then((res)=> {
      setLoader(false)
      toast('Successful')
      console.log(res.data)
      setOpen(false)
     setBulkEmail({
        link: null,
        img: null,
          id : JSON.parse(localStorage.getItem('region'))._id,
          title:'',
          body:'',
          access_id: JSON.parse(localStorage.getItem('access'))._id,
          covers: 'region'
        })

        getEmails()
      
    })
    .catch((err)=> {
       setLoader(false)
      toast(err.response.data.error)
    })

  };

  return (
    <Dialog
      open={open}
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
          Choose Template Color
        </div>
        <div className="lg:flex justify-center">
          <div className="lg:space-y-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div 
                onClick={()=> {
                    setTemplate(1)
                  }}
              className={ template == 1 ? "border-[1.5px] w-[200px] h-[100px] cursor-pointer  border-purple-700 bg-purple-400 " : 'border-2 w-[200px] h-[100px] cursor-pointer'  }> </div>
              <div
              onClick={()=> {
                setTemplate(2)
              }}
              className={ template == 2  ? "border-[1.5px] w-[200px] h-[100px] cursor-pointer border-blue-700 bg-blue-400 " : 'border-2 w-[200px] h-[100px] cursor-pointer'  }></div>
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
                }}
              >
                Close
              </Button>

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
                onClick={sendEmail}
              >
                {loader ? (
                  <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
                ) : (
                  " Send"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default TemplateModal;
