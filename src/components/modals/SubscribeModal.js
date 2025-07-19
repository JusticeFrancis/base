import { Button, CircularProgress, Dialog } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const SubscribeModal = ({open, setOpen}) => {
    const [region, setRegion] = useState(
        JSON.parse(localStorage.getItem("region"))
      );

      const[loader, setLoader] = useState()
    const subscribeToMonthlyPlan = async() => {
        setLoader(true)
        let res = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "stripe/pay",{
            stripe_id: region?.stripe_id,
          }
        );
    
        window.open(res.data.url, '_blank')
    
        setLoader(false)
    
        console.log(res.data)
    
    
      }
    
  return (
    <Dialog
    open={open}
    onClose={()=> {
        setOpen(false)
    }}
    fullWidth={true}
    maxWidth={"sm"}
    BackdropProps={{
      style: { backgroundColor: "rgba(0, 0, 0, 0.2)" }, // Adjust opacity here
    }}
    >
         <button
    onClick={() => setOpen(false)}
    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
    aria-label="Close"
  >
    ✕
  </button>
<div className="bg-white rounded-lg px-6 pb-6 max-w-md mx-auto mt-8 relative">
  {/* Close Button */}
 

  <div className="text-center">
    <h2 className="text-xl font-semibold text-red-600 mb-2">Oops! No Active Plan</h2>
    <p className="text-gray-600 mb-4">Subscribe now to unlock premium features:</p>

    <ul className="text-left text-sm text-gray-700 space-y-2 mb-6">
      <li className="flex items-start gap-2">
        <span className="text-green-500">✓</span> Unlimited access to all features
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500">✓</span> Create members, provinces, parishes
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500">✓</span> Send bulk email to members with Image and link
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500">✓</span> No ads or usage limits
      </li>
    </ul>

    <div className="mt-4">
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
          subscribeToMonthlyPlan();
        }}
      >
        {loader ? (
          <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
        ) : (
          "Subscribe to monthly plan"
        )}
      </Button>
    </div>
  </div>
</div>



    </Dialog>
  )
}

export default SubscribeModal