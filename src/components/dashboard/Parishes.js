import {
  Add,
  AddCircle,
  Email,
  LocationCitySharp,
  MoreHoriz,
  Phone,
} from "@mui/icons-material";
import { Button, CircularProgress, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddParish from "../modals/AddParishModal";
import ParishGraph from "../tools/ParishGraph";
import AddDepartment from "../modals/AddDepartment";
import axios from "axios";
import SubscribeModal from "../modals/SubscribeModal";

const Parishes = () => {
  const [region, setRegion] = useState(
    JSON.parse(localStorage.getItem("region"))
  );
  const [edit, setEdit] = useState(false)
  const [loader, setLoader] = useState(true);
  const [openAddDepartmentModal, setOpenDepartmentModal] = useState(false);
  const [access, setAccess] = useState(JSON.parse(localStorage.getItem('access')))
  const [department, setDepartment] = useState({
    name: "",
    leader: "",
    members: [],
  });
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const [open, setOpen] = useState(false);

  const [parishes, setParishes] = useState([]);
  const [selectedParish, setSelectedParish] = useState(null);

  const getParishes = async () => {
    let parishes = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "get-parishes",
      {
        region_id: region._id,
      }
    );
    console.log(parishes.data);
    setParishes(parishes.data?.parishes || []);
    setSelectedParish(parishes.data?.parishes ? parishes.data?.parishes[0] : null)
  };

  useEffect(() => {
    getParishes();
  }, []);

  const [stripeCustomer, setStripeCustomer] = useState();
  const getStripeCustomer = async () => {
    console.log("hi");
    let stripe_customer = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "stripe/get",
      {
        stripe_id: region?.stripe_id,
      }
    );
    console.log("stripe_customer", stripe_customer.data);
    setStripeCustomer(stripe_customer.data.subscription);
  };
  useEffect(() => {
    getStripeCustomer();
  }, []);
  return (
    <div className="grid grid-cols-9  lg:px-0 px-4 py-4">
       {stripeCustomer && stripeCustomer.status == "active" ? (
         <AddParish
         open={open}
         setOpen={setOpen}
         loader={loader}
         setLoader={setLoader}
         setEdit={setEdit}
         edit = {edit}
         selectedParish={selectedParish}
         getParishes={getParishes}
       />
      ) : (
        <SubscribeModal open={open} setOpen={setOpen} />
      )}
   

      <div className="lg:col-span-5 col-span-9 lg:order-1 order-2 mb-4 lg:mb-0 ">
        <div className="pt-7 px-4">
          <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
            <div>Parishes</div>

            {!access.parish_id && (
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
                    <Add sx={{ position: "relative", bottom: 1 }} /> Add Parish
                  </>
                )}
              </Button>
            </div>
            )}
          </div>

          <div className=" max-w-[100vw] lg:max-w-full overflow-auto  ">
            <div className="w-[800px] lg:max-w-full ">
              <div className="grid grid-cols-10 gap-2 text-[14px] ">
                <div className="col-span-3 text-gray-500 ">Parish Name</div>

                <div className="col-span-3 text-gray-500 ">Province Name</div>
                <div className="col-span-2 text-gray-500 ">Status</div>

                <div className="col-span-1 text-gray-500 ">Members</div>
                <div></div>
              </div>

              {parishes &&
                parishes.map((item, index) => {
                  const getMembers = async () => {
                    let members = await axios.post(
                      process.env.REACT_APP_BACKEND_URL +
                        "get-members-by-parish-id",
                      {
                        parish_id: item._id,
                      }
                    );
                    console.log(members.data);
                    document.getElementById("memberscount-" + index).innerHTML =
                      members.data?.members?.length || 0;
                  };

                  getMembers();

                  return (
                    <div
                      className={
                        selectedParish._id == item._id
                          ? "grid grid-cols-10 gap-4 text-[15px] mt-4 bg-white  shadow-sm hover:shadow-lg cursor-pointer rounded-lg py-4  px-2 border-[1px] border-gray-400 "
                          : "grid grid-cols-10 gap-4 text-[15px] mt-4 bg-white  shadow-sm hover:shadow-lg cursor-pointer rounded-lg py-4  px-2 "
                      }
                      onClick={() => {
                        setSelectedParish(item);
                      }}
                    >
                      <div className="col-span-3 text-black">{item.name}</div>

                      <div className="col-span-3 text-black">{item.email}</div>

                      <div className="col-span-2 text-black">
                        {item.status == "active" ? (
                          <div className="bg-green-300 text-green-900 text-center w-fit px-2  rounded-lg text-[14px]">
                            {" "}
                            Active{" "}
                          </div>
                        ) : (
                          <div className="bg-yellow-300 text-yellow-900 text-center w-fit px-2  rounded-lg text-[14px]">
                            {" "}
                            Active{" "}
                          </div>
                        )}
                      </div>

                      <div
                        className="col-span-1 text-black"
                        id={"memberscount-" + index}
                      >
                        15
                      </div>

                      <div></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-4 col-span-9 bg-white w-full lg:order-2 order-1  flex flex-col   py-3">
        <div className="text-center text-[16px] font-bold">
          {selectedParish?.name}
        </div>
        <div className="text-gray-500 text-center text-[15px]">
          (Parish under Province 1)
        </div>

        <Divider sx={{ my: 4 }} />

        <div className="px-4">
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
            <div>{selectedParish?.email}</div>
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
            <div>+12344232</div>
          </div>
          <Divider sx={{ my: 2 }} />

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
            <div>{selectedParish?.location}</div>
          </div>
          <Divider sx={{ my: 2 }} />
        </div>

        {/* <div className="">
          <ParishGraph data={sampleData} />
        </div> */}


{
  (
    !access.parish_id || 
    selectedParish?._id === access.parish_id
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



        <AddDepartment
          open={openAddDepartmentModal}
          setOpen={setOpenDepartmentModal}
          loader={loader}
          setLoader={setLoader}
        />

        {/* <div className="px-7">
          <div className="flex items-center justify-between">
            <div className="text-[15px] font-semibold mb-2">Departments</div>
            <div>
              {" "}
              <AddCircle
                sx={{ color: "green", cursor: "pointer" }}
                onClick={() => {
                  setOpenDepartmentModal(!openAddDepartmentModal);
                }}
              />{" "}
            </div>
          </div>

          <div className="text-[13px] mb-4">
            <div className="font-semibold flex items-center justify-between">
              <div>1. Youth Department </div>

              <div className="flex items-center space-x-3">
                <div className="text-red-900 font-normal hover:underline cursor-pointer">
                  Remove
                </div>
                <div className="text-blue-900 font-normal hover:underline cursor-pointer">
                  Edit
                </div>
              </div>
            </div>
            <div>Mr John (team lead)</div>
            <div>The department for every member between ages 20 - 45</div>
            <div>meeting : Every Saturday 4pm @ church premises</div>
          </div>
        </div> */}

        
      </div>
    </div>
  );
};

export default Parishes;

const sampleData = [
  { timestamp: "2025-04-01T10:00:00Z", amount: 120 },
  { timestamp: "2025-04-02T10:00:00Z", amount: 80 },
  { timestamp: "2025-04-07T10:00:00Z", amount: 150 },
  { timestamp: "2025-04-15T10:00:00Z", amount: 200 },
];
