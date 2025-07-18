import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  InputBase,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TemplateModal from "../modals/TemplateModal";
import axios from "axios";
import { toast } from "react-toastify";

const Remittance = () => {
  const [loader, setLoader] = useState(false);
  const [remittance, setRemittance] = useState({
    region_id: JSON.parse(localStorage.getItem("region"))?._id,
    province_id: "",
    parish_id: "",
    amount: 0,
    type: "",
    reason: "",
  });
  const [provinces, setProvinces] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [region, setRegion] = useState(
    JSON.parse(localStorage.getItem("region"))
  );

  const getProvinces = async () => {
    let provinces = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "get-provinces",
      {
        region_id: region._id,
      }
    );
    setProvinces(provinces.data?.provinces || []);
  };

  const getParishesForProvince = async () => {
    let response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "get-parishes-by-province-id",
      {
        province_id: remittance.province_id,
      }
    );

    console.log(response);
    setParishes(response.data.parishes);
  };

  const createRemittance = async () => {
    setLoader(true)
    let response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "remittance/create",
      remittance
    ).then((res)=> {
      setLoader(false)
      toast('success')
      getRemittances();
      setRemittance({
        region_id: JSON.parse(localStorage.getItem("region"))?._id,
        province_id: "",
        parish_id: "",
        amount: 0,
        type: "",
        reason: "",
      })
    })
    .catch((err)=> {
      setLoader(false)
      toast(err.response.data.err)
    })
    console.log(response);
  };

  const [remittances, setRemittances] = useState([]);
  const getRemittances = async () => {
    let response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "get-remittances",
      {
        region_id: region._id,
      }
    );
    console.log(response);
    setRemittances(response.data.remittances);
  };

  useEffect(() => {
    getProvinces();
    getRemittances();
  }, []);

  useEffect(() => {
    if (remittance.province_id) {
      getParishesForProvince();
    }
  }, [remittance.province_id]);
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

                <div className="col-span-1 text-gray-500 ">Amount ({region?.currency == 'dollar' && '$'})</div>

                <div className="col-span-2 text-gray-500 text-center">Reason</div>
              </div>

              {remittances &&
                remittances.map((item, index) => {

                  const getProvince = async () => {
                    let province = await axios.post(
                      process.env.REACT_APP_BACKEND_URL + "province/get",
                      {
                        province_id: item.province_id,
                      }
                    )
                    document.getElementById('province-name-'+index).innerHTML = province?.data?.province?.name || 'null'
                  };


                  const getParish = async () => {
                    let parish = await axios.post(
                      process.env.REACT_APP_BACKEND_URL + "parish/get",
                      {
                        parish_id: item.parish_id,
                      }
                    )
                     document.getElementById('parish-name-'+index).innerHTML = parish?.data.parish?.name || 'null'
                  };


                  getProvince()
                  getParish()

                  return (
                    <div
                      className={ "grid grid-cols-11 gap-4 text-[15px] mt-4 bg-white  shadow-sm hover:shadow-lg cursor-pointer rounded-lg py-4  px-2 border-[1px] border-gray-400 "
                        }
                    >
                      <div className="col-span-2 text-black">{(new Date(item.createdAt)).toLocaleString([], {
                         year: 'numeric',
                         month: '2-digit',
                         day:'2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true, // set to false if you want 24-hour format
})}</div>

                      <div className="col-span-3 text-black" id={'province-name-'+index}>...</div>
                      <div className="col-span-3 text-black" id={'parish-name-'+index}>...</div>

                      <div className="col-span-1 text-black">
                          <div className={item?.type == 'credit'? "bg-green-300 text-green-900 text-center w-fit px-2  rounded-lg text-[14px]": 
                            "bg-red-300 text-red-900 text-center w-fit px-2  rounded-lg text-[14px]"
                          }>
                            {" "}
                          {item?.amount}
                          </div>
                      </div>

                      <div
                        className="col-span-2 text-center text-black"
                        id={"memberscount-" + index}
                      >
                        {item?.reason}
                      </div>

                      <div></div>
                    </div>
                  );
                })}

              
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
                value={remittance.province_id}
                onChange={(e) => {
                  setRemittance((prev) => ({
                    ...prev,
                    province_id: e.target.value,
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
                {provinces?.map((item, index) => (
                  <MenuItem value={item._id}>{item.name}</MenuItem>
                ))}
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
                value={remittance.parish_id}
                onChange={(e) => {
                  setRemittance((prev) => ({
                    ...prev,
                    parish_id: e.target.value,
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
                {parishes?.map((item, index) => (
                  <MenuItem value={item._id}>{item.name}</MenuItem>
                ))}
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
                value={remittance.type}
                onChange={(e) => {
                  setRemittance((prev) => ({
                    ...prev,
                    type: e.target.value,
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
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="debit">Debit</MenuItem>
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
                value={remittance.reason}
                onChange={(e) => {
                  setRemittance((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }));
                }}
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
                <MenuItem value="offering">Offering</MenuItem>
                <MenuItem value="tithes">Tithes</MenuItem>
              </Select>
            </div>
          </div>

          <div className=" mb-5">
            <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
              Amount
            </div>

            <div className=" w-full flex items-center space-x-4">
              <InputBase
                type="number"
                value={remittance.amount}
                onChange={(e) => {
                  setRemittance((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }));
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
              onClick={createRemittance}
            >
              {loader ? (
                <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
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
