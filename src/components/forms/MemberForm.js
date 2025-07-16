import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  CircularProgress,
  InputBase,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MemberForm = () => {
  const [loader, setLoader] = useState(false);
  const [family, setFamily] = useState(false);
  const [region, setRegion] = useState();
  const [provinces, setProvinces] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [form_submitted, setFormSubmitted] = useState(false);

  const [member, setMember] = useState({
    gender: "male",
    first_name: "",
    last_name: "",
    password: "1234",
    type: "member",
    email: "",
    phone_number: "",
    password: "",
    spouse_name: "",
    number_of_children: "",
    address: "",
    baptised: false,
    province: null,
    parish: null,
    volunteerInterest: null,
    age: 0,
    dob: null ,
    staffDepartment: null,
  });

  const createMember = async () => {
    let response = await axios
      .post(process.env.REACT_APP_BACKEND_URL + "member/create", {
        name: member.first_name + " " + member.last_name,
        address: member.address,
        email: member.email,
        phoneNumber: member.phone_number,
        gender: member.gender,
        family,
        baptismalStatus: member.baptised,
        spouseName: member.spouse_name,
        numberOfChildren: member.number_of_children,
        volunteerInterest: member.volunteerInterest,
        region_id: region._id,
        province_id: member.province,
        parish_id: member.parish,
        age: member.age,
        staff: member.type == "staff" ? true : false,
        staffDepartment: member.staffDepartment,
        dob: member.dob
      })
      .then((res) => {
        setLoader(false);
        toast("success");
        setFormSubmitted(true);
        setMember({
          gender: "male",
          first_name: "",
          last_name: "",
          password: "1234",
          type: "member",
          email: "",
          phone_number: "",
          password: "",
          spouse_name: "",
          number_of_children: "",
          address: "",
          baptised: false,
          province: null,
          parish: null,
          volunteerInterest: null,
          age: 0,
          staffDepartment: null,
        });
      })

      .catch((err) => {
        console.log(err);
        setLoader(false);
        toast(err.response.data.error);
      });
  };
  const { region_id } = useParams();

  const getRegion = async () => {
    let region = await axios
      .post(process.env.REACT_APP_BACKEND_URL + "get-region", {
        region_id,
      })
      .then((res) => {
        if (!res.data?.region) {
          document.getElementById("error").innerHTML =
            "region id not found , bad form";
          document.getElementById("btnfor").style.display = "none";
        } else {
          setRegion(res.data.region);
        }
      })
      .catch((err) => {
        document.getElementById("error").innerHTML =
          "region id not found , form bad";
        document.getElementById("btnfor").style.display = "none";
      });
  };

  const getProvinces = async () => {
    let provinces = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "get-provinces",
      {
        region_id: region._id,
      }
    );
    console.log(provinces.data);
    setProvinces(provinces.data?.provinces || []);
  };

  const getParishes = async () => {
    let parishes = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "get-parishes",
      {
        region_id: region._id,
      }
    );
    console.log(parishes.data);
    setParishes(parishes.data?.parishes || []);
  };

  useEffect(() => {
    if (!region_id) {
      document.getElementById("error").innerHTML =
        "region id not found , form bad";
      document.getElementById("btnfor").style.display = "none";
    } else {
      getRegion();
    }
  }, []);

  useEffect(() => {
    if (region) {
      getProvinces();
      getParishes();
    }
  }, [region]);

  return (
    <div className="flex items-center justify-center py-5">
      <div className="lg:w-[700px] py-5 px-4    w-full bg-white shadow-md rounded-lg  ">
        <div className="text-center font-bold text-[19px]">Member Form</div>

        <p id="error" className="text-red-500 text-center text-[14px] "></p>

        {form_submitted && (
          <p className="text-green-500 text-center text-[14px] ">
            Form submitted successfully , please reload to add another number
          </p>
        )}
        <div className="text-[20px] font-normal  text-center mx-auto justify-center flex items-center space-x-2  ">
          {!region && (
            <div className="flex items-center justify-center">
              <CircularProgress
                size={"20px"}
                sx={{
                  animation: "",
                  animationDuration: "0.7s",
                  color: "gray",
                }}
              />
            </div>
          )}
          <div className="text-[16px] px-6   text-center font-semibold my-3 flex  space-x-3 items-center">
            <img src={region?.logo} className="w-[30px]" />{" "}
            <div>{region?.name}</div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="lg:space-y-5 space-y-3">
            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Province
              </div>

              <div className="lg:w-[300px] w-full">
                <Select
                  IconComponent={KeyboardArrowDown}
                  value={member.province}
                  onChange={(e) => {
                    setMember({ ...member, province: e.target.value });
                  }}
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
                  <MenuItem value={null}>No Province</MenuItem>
                  {provinces?.map((item, index) => (
                    <MenuItem value={item._id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Parish
              </div>

              <div className="lg:w-[300px] w-full">
                <Select
                  IconComponent={KeyboardArrowDown}
                  fullWidth
                  defaultValue={null}
                  value={member.parish}
                  onChange={(e) => {
                    setMember({ ...member, parish: e.target.value });
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
                  <MenuItem value={null}>No Parish</MenuItem>
                  {parishes?.map((item, index) => (
                    <MenuItem value={item._id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                type
              </div>

              <div className="lg:w-[300px] w-full">
                <Select
                  IconComponent={KeyboardArrowDown}
                  fullWidth
                  value={member.type}
                  onChange={(e) => {
                    setMember({ ...member, type: e.target.value });
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
                  <MenuItem value="member">Member</MenuItem>
                  <MenuItem value="staff">Staff</MenuItem>
                </Select>
              </div>
            </div>

            {member.type == "staff" && (
              <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
                <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                  Staff Department
                </div>

                <div className="lg:w-[300px] w-full">
                  <Select
                    value={member.staffDepartment}
                    onChange={(e) => {
                      setMember({ ...member, staffDepartment: e.target.value });
                    }}
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
                    <MenuItem value="finance">Finance</MenuItem>
                    <MenuItem value="media">Media</MenuItem>
                  </Select>
                </div>
              </div>
            )}

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
                  value={member.first_name}
                  onChange={(e) => {
                    setMember({ ...member, first_name: e.target.value });
                  }}
                />

                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  value={member.last_name}
                  onChange={(e) => {
                    setMember({ ...member, last_name: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              {/* Age */}
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Age
              </div>

              <div className="lg:w-[300px] w-full">
                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  type="number"
                  value={member.age}
                  disabled // Age is now read-only, auto-calculated from DOB
                />
              </div>

              {/* Date of Birth */}
              
            </div>
            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
            <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Date of Birth
              </div>

              <div className="lg:w-[300px] w-full">
                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  type="date"
                  onChange={(e) => {
                    const dob = new Date(e.target.value);
                    const now = new Date();
                    let age = now.getFullYear() - dob.getFullYear();
                    const m = now.getMonth() - dob.getMonth();
                    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
                      age--;
                    }

                    setMember({
                      ...member,
                      dob: dob.getTime(), // timestamp
                      age: age >= 0 ? age : 0, // prevent negative age
                    });
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
                  value={member.email}
                  onChange={(e) => {
                    setMember({ ...member, email: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Address
              </div>

              <div className="lg:w-[300px] w-full">
                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  value={member.address}
                  onChange={(e) => {
                    setMember({ ...member, address: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Phone Number
              </div>

              <div className="lg:w-[300px] w-full">
                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  value={member.phone_number}
                  onChange={(e) => {
                    setMember({ ...member, phone_number: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Gender
              </div>

              <div className="lg:w-[300px] w-full flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="relative bottom-[1.5px] text-[15px]">
                    Male
                  </div>{" "}
                  <Checkbox
                    checked={member.gender == "male" ? true : false}
                    onClick={(e) => {
                      setMember({ ...member, gender: "male" });
                    }}
                  />
                </div>

                <div className="flex items-center">
                  <div className="relative bottom-[1.5px] text-[15px]">
                    Female
                  </div>{" "}
                  <Checkbox
                    checked={member.gender == "female" ? true : false}
                    onClick={(e) => {
                      setMember({ ...member, gender: "female" });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className=" lg:flex items-center  ">
              <div className=" lg:flex items-center lg:space-x-10 lg:space-y-0 space-y-2">
                <div className="lg:text-[14px] w-full text-[13px] font-semibold flex items-center">
                  I have a family
                </div>

                <div className=" w-full flex items-center ">
                  <Switch
                    value={family}
                    onChange={() => {
                      setFamily(!family);
                    }}
                  />
                </div>
              </div>

              <div className="  lg:flex items-center lg:space-x-10 lg:space-y-0 space-y-2 ">
                <div className="lg:text-[14px] w-full text-[13px] font-semibold flex items-center">
                  I have been baptised
                </div>

                <div className=" w-full flex items-center ">
                  <Switch
                    value={member.baptised}
                    onChange={(e) => {
                      setMember({ ...member, baptised: !member.baptised });
                    }}
                  />
                </div>
              </div>
            </div>

            {family && (
              <>
                <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
                  <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                    Spouse Name
                  </div>

                  <div className="lg:w-[300px] w-full">
                    <InputBase
                      sx={{
                        bgcolor: "#F7F7F8",
                        width: "100%",
                        px: 2,
                        fontSize: "14px",
                      }}
                      value={member.spouse_name}
                      onChange={(e) => {
                        setMember({ ...member, spouse_name: e.target.value });
                      }}
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
                  <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                    Number of Children
                  </div>

                  <div className="lg:w-[300px] w-full">
                    <InputBase
                      sx={{
                        bgcolor: "#F7F7F8",
                        width: "100%",
                        px: 2,
                        fontSize: "14px",
                      }}
                      value={member.number_of_children}
                      onChange={(e) => {
                        setMember({
                          ...member,
                          number_of_children: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Volunteer Interest
              </div>

              <div className="lg:w-[300px] w-full">
                <Select
                  value={member.volunteerInterest}
                  onChange={(e) => {
                    setMember({ ...member, volunteerInterest: e.target.value });
                  }}
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
                  <MenuItem value="none">Not Interested</MenuItem>
                  <MenuItem value="media">Media department</MenuItem>
                  <MenuItem value="youth">Youth department</MenuItem>
                </Select>
              </div>
            </div>

            {/* {member.type == "staff" && (
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
                           value={member.password}
                           onChange={(e) => {
                             setMember({ ...member, password: e.target.value });
                           }}
                         />
                       </div>
                     </div>
                   )} */}

            {!form_submitted && (
              <div
                className="flex justify-center pt-6 pb-4 space-x-2"
                id="btnfor"
              >
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
                    window.location.pathname = "/";
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
                  onClick={createMember}
                >
                  {loader ? (
                    <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
                  ) : (
                    " Save"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberForm;
