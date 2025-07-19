import {
  Add,
  Celebration,
  Email,
  HeatPumpSharp,
  Home,
  LocalFireDepartment,
  LocationCitySharp,
  MoreHoriz,
  People,
  Person,
  Phone,
  Water,
  Work,
} from "@mui/icons-material";
import { Button, CircularProgress, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoneyOverTimeGraph from "../tools/MoneyOverTimeGraph";
import ProvinceGraph from "../tools/ProvinceGraph";
import AddProvince from "../modals/AddProvince";
import AddParish from "../modals/AddParishModal";
import ParishGraph from "../tools/ParishGraph";
import AddMembers from "../modals/AddMemberModal";
import axios from "axios";
import SubscribeModal from "../modals/SubscribeModal";

const Members = () => {
  
  const [region, setRegion] = useState(
    JSON.parse(localStorage.getItem("region"))
  );


  const [stripeCustomer, setStripeCustomer] = useState();
  const getStripeCustomer = async () => {
    console.log("hi");
    let stripe_customer = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "stripe/get",
      {
        stripe_id: region?.stripe_id,
      }
    );
    console.log('stripe_customer',stripe_customer.data);
    setStripeCustomer(stripe_customer.data.subscription);
  };
  useEffect(()=> {
    getStripeCustomer()
  },[])

  const [access, setAccess] = useState(
    JSON.parse(localStorage.getItem("access"))
  );

  const [loader, setLoader] = useState(true);
  const [selectedMember, setSelectedMember] = useState();

  const [members, setMembers] = useState([]);
  const [edit, setEdit] = useState(false);

  const getMembers = async () => {
    let memebers = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "get-members",
      {
        region_id: region._id,
      }
    );
    console.log(memebers.data);
    setMembers(memebers.data?.members || []);
    setSelectedMember(
      memebers.data?.members ? memebers.data?.members[0] : null
    );
  };

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const [open, setOpen] = useState(false);


  function formatDOB(timestamp) {
    const date = new Date(timestamp);
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    // Get ordinal suffix (st, nd, rd, th)
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };
  
    const monthNames = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
  
    return `${day}${getOrdinal(day)} ${monthNames[monthIndex]} ${year}`;
  }


  return (
    <div className="grid grid-cols-9  lg:px-0 px-4 py-4">
      {(stripeCustomer && stripeCustomer.status == 'active') ? (
        <AddMembers
        open={open}
        setOpen={setOpen}
        loader={loader}
        setLoader={setLoader}
        edit={edit}
        setEdit={setEdit}
        selectedMember={selectedMember}
        getMembers1={getMembers}
      />
      ): (
        <SubscribeModal
        open={open}
        setOpen={setOpen}
      />
      )}
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
                onClick={() => {
                  setOpen(true);
                }}
              >
                {loader ? (
                  <CircularProgress
                    size={"1.2rem"}
                    sx={{ color: "white", animationDuration: "0.7s" }}
                  />
                ) : (
                  <>
                    <Add sx={{ position: "relative", bottom: 1 }} /> Add Members
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className=" max-w-[100vw] lg:max-w-full overflow-auto  ">
            <div className="w-[800px] lg:max-w-full ">
              <div className="grid grid-cols-10 gap-2 text-[14px] ">
                <div className="col-span-3 text-gray-500 ">Province Name</div>

                <div className="col-span-3 text-gray-500 ">Parish Name</div>

                <div className="col-span-2 text-gray-500 ">Name</div>

                <div className="col-span-1 text-gray-500 ">Type</div>
                <div></div>
              </div>

              {members &&
                members.map((item, index) => {
                  const getParish = async () => {
                    let res = await axios.post(
                      process.env.REACT_APP_BACKEND_URL + "parish/get",
                      {
                        parish_id: item.parish_id,
                      }
                    );
                    document.getElementById("parish_name-" + index).innerHTML =
                      res?.data?.parish?.name || "No parish";
                  };

                  getParish();

                  const getProvince = async () => {
                    let res = await axios.post(
                      process.env.REACT_APP_BACKEND_URL + "province/get",
                      {
                        province_id: item.province_id,
                      }
                    );
                    document.getElementById(
                      "province_name-" + index
                    ).innerHTML = res?.data?.province?.name || "No province";
                  };

                  getProvince();

                  return (
                    <div
                      className={
                        selectedMember?._id == item._id
                          ? "grid grid-cols-10 gap-4 text-[15px] mt-4 bg-white  shadow-sm hover:shadow-lg cursor-pointer rounded-lg py-4  px-2 border-[1px] border-gray-400 "
                          : "grid grid-cols-10 gap-4 text-[15px] mt-4 bg-white  shadow-sm hover:shadow-lg cursor-pointer rounded-lg py-4  px-2 "
                      }
                      onClick={() => {
                        setSelectedMember(item);
                      }}
                    >
                      <div
                        className="col-span-3 text-black"
                        id={"province_name-" + index}
                      >
                        {" "}
                        ...
                      </div>

                      <div
                        className="col-span-3 text-black"
                        id={"parish_name-" + index}
                      >
                        {" "}
                        ...{" "}
                      </div>

                      <div className="col-span-2 text-black">{item.name}</div>

                      <div
                        className="col-span-1 text-black"
                        id={"memberscount-" + index}
                      >
                        {item.staff ? (
                          <div className="bg-green-300 text-green-900 text-center w-fit px-2  rounded-lg text-[14px]">
                            {" "}
                            Staff{" "}
                          </div>
                        ) : (
                          <div className="bg-yellow-300 text-yellow-900 text-center w-fit px-2  rounded-lg text-[14px]">
                            {" "}
                            Member{" "}
                          </div>
                        )}
                      </div>

                      <div></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 col-span-9 bg-white w-full lg:order-2 order-1   py-3">
        <div className="text-center text-[16px] font-bold">
          {selectedMember?.name}
        </div>
        <div className="text-gray-500 text-center text-[15px]">
          ( {selectedMember?.age} yrs old {selectedMember?.gender})
        </div>

        <Divider sx={{ my: 4 }} />

        <div className="px-4">
          <div className="text-[14px] font-bold mb-5 flex justify-between">
            <div>Contact Information</div>

            {selectedMember?.staff ? (
              <span className="bg-green-800 px-2 py-1 rounded-lg text-[14px] text-white">
                Staff
              </span>
            ) : (
              <span className="bg-yellow-500 px-2 py-1 rounded-lg text-[14px] text-white">
                Member
              </span>
            )}
          </div>

          <div className="flex items-center text-[14px] space-x-1">
            <div>
              <Email
                sx={{
                  color: "gray",
                  fontSize: "18px",
                  position: "relative",
                  bottom: 1,
                  mr: 1,
                }}
              />
            </div>
            <div>{selectedMember?.email}</div>
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
                  mr: 1,
                }}
              />
            </div>
            <div>{selectedMember?.phoneNumber}</div>
          </div>
          <Divider sx={{ my: 2 }} />

          <div className="flex items-center text-[14px] space-x-1">
            <div>
              <Home
                sx={{
                  color: "gray",
                  fontSize: "18px",
                  position: "relative",
                  bottom: 1,
                  mr: 1,
                }}
              />
            </div>
            <div>{selectedMember?.address}</div>
          </div>
          <Divider sx={{ my: 2 }} />

          <div className="flex items-center text-[14px] space-x-1">
            <div>
              <Celebration
                sx={{
                  color: "gray",
                  fontSize: "18px",
                  position: "relative",
                  bottom: 1,
                  mr: 1,
                }}
              />
            </div>
            <div>{ selectedMember?.dob && formatDOB(selectedMember?.dob)}</div>
          </div>
          <Divider sx={{ my: 2 }} />

          {selectedMember?.staff && (
            <>
              <div className="flex items-center text-[14px] space-x-1">
                <div>
                  <LocalFireDepartment
                    sx={{
                      color: "gray",
                      fontSize: "18px",
                      position: "relative",
                      bottom: 1,
                      mr: 1,
                    }}
                  />
                </div>
                <div>{selectedMember?.staffDepartment}</div>
              </div>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {selectedMember?.family && (
            <>
              <div className="text-[14px] font-bold mb-5 flex justify-between">
                <div>Family</div>
              </div>

              <div className="flex items-center text-[14px] space-x-1">
                <div className="flex items-center ">
                  <HeatPumpSharp
                    sx={{
                      color: "gray",
                      fontSize: "18px",
                      position: "relative",
                      bottom: 1,
                      mr: 1,
                    }}
                  />
                  Spouse :
                </div>
                <div className="pl-2">{selectedMember?.spouseName} </div>
              </div>
              <Divider sx={{ my: 2 }} />

              <div className="flex items-center text-[14px] space-x-1">
                <div className="flex items-center">
                  <People
                    sx={{
                      color: "gray",
                      fontSize: "18px",
                      position: "relative",
                      bottom: 1,
                      mr: 1,
                    }}
                  />
                  Number of Children :
                </div>
                <div className="pl-2">{selectedMember?.numberOfChildren} </div>
              </div>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          <div className="text-[14px] font-bold mb-5 flex justify-between">
            <div>Others</div>
          </div>

          <div className="flex items-center text-[14px] space-x-1">
            <div className="flex items-center">
              <Water
                sx={{
                  color: "gray",
                  fontSize: "18px",
                  position: "relative",
                  bottom: 1,
                  mr: 1,
                }}
              />
              Baptismal Status :
            </div>
            <div className="pl-2">
              {selectedMember?.baptismalStatus ? (
                <div className="bg-green-300 text-green-900 text-center w-fit px-2  rounded-lg text-[14px]">
                  {" "}
                  Baptised{" "}
                </div>
              ) : (
                <div className="bg-red-300 text-red-900 text-center w-fit px-2  rounded-lg text-[14px]">
                  {" "}
                  Non{" "}
                </div>
              )}{" "}
            </div>
          </div>
          <Divider sx={{ my: 2 }} />

          <div className="flex items-center text-[14px] space-x-1">
            <div className="flex items-center">
              <Work
                sx={{
                  color: "gray",
                  fontSize: "18px",
                  position: "relative",
                  bottom: 1,
                  mr: 1,
                }}
              />
              Volunteer Interest:
            </div>
            <div className="pl-2">{selectedMember?.volunteerInterest} </div>
          </div>
          <Divider sx={{ my: 2 }} />
        </div>


       {(
  (!access.province_id && !access.parish_id) ||
  (selectedMember?.province_id === access.province_id) ||
  (selectedMember?.parish_id === access.parish_id)
) && (
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

export default Members;

const sampleData = [
  { timestamp: "2025-04-01T10:00:00Z", amount: 120 },
  { timestamp: "2025-04-02T10:00:00Z", amount: 80 },
  { timestamp: "2025-04-07T10:00:00Z", amount: 150 },
  { timestamp: "2025-04-15T10:00:00Z", amount: 200 },
];
