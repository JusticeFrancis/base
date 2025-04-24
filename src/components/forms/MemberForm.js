import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Checkbox, CircularProgress, InputBase, MenuItem, Select, Switch } from "@mui/material";
import React, { useState } from "react";

const MemberForm = () => {
      const [family, setFamily] = useState(false);
    
      const [member, setMember] = useState({
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
        baptised: false
      });
  return (
    <div className="flex items-center justify-center py-5">
      <div className="lg:w-[700px] py-5 px-4    w-full bg-white shadow-md rounded-lg  ">
        <div className="text-center font-bold text-[19px]">Member Form</div>

        <div className="text-[20px] font-normal  text-center mx-auto justify-center flex items-center space-x-2  ">
          <div className="text-[16px] px-6   text-center font-semibold my-3 flex  space-x-3 items-center">
            <img src="/icons/login_img.png" className="w-[30px]" />{" "}
            <div>RCCG Region 1</div>
          
          </div>
        </div>
       <div className=" flex justify-center w-full">
       <div className=" flex flex-wrap justify-center     gap-4 ">
              <div className=" ">
                <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                  Province
                </div>

                <div className="lg:w-[300px] w-full">
                  <Select
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
                    <MenuItem value="admin">Province 1</MenuItem>
                    <MenuItem value="user">Province 2</MenuItem>
                    <MenuItem value="owner">Province 3</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="">
                <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                  Parish
                </div>

                <div className="lg:w-[300px] w-full">
                  <Select
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
                    <MenuItem value="admin">Parish 1</MenuItem>
                    <MenuItem value="user">Parish 2</MenuItem>
                    <MenuItem value="owner">Parish 3</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="">
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
                <div className="">
                  <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                    Staff Type
                  </div>

                  <div className="lg:w-[300px] w-full">
                    <Select
                      IconComponent={KeyboardArrowDown}
                      fullWidth
                      defaultValue={"admin"}
                      className="mb-2 bg-[#F7F7F8]"
                      sx={{
                        fontSize: "14px",
                        padding: "4px 8px", // Adjust padding here
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSelect-select": {
                          padding: "4px 8px", // Adjust padding for the text inside Select
                        },
                      }}
                    >
                      <MenuItem value="admin">Finance</MenuItem>
                      <MenuItem value="user">Media</MenuItem>
                    </Select>
                  </div>
                </div>
              )}

              <div className="">
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
                      setMember({ ...member, last_name: e.target.value });
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
              <div className="">
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

              <div className="">
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

              <div className="">
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

              <div className="">
                <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                  Gender
                </div>

                <div className="lg:w-[300px] w-full flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="relative bottom-[1.5px] text-[15px]">
                      Male
                    </div>{" "}
                    <Checkbox />
                  </div>

                  <div className="flex items-center">
                    <div className="relative bottom-[1.5px] text-[15px]">
                      Female
                    </div>{" "}
                    <Checkbox />
                  </div>
                </div>
              </div>

              <div className="  items-center  ">
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
                        setMember({ ...member, baptised: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>

              {family && (
                <>
                  <div className="">
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

                  <div className="">
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
                        value={member.spouse_name}
                        onChange={(e) => {
                          setMember({ ...member, spouse_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="">
                <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                  Volunteer Interest
                </div>

                <div className="lg:w-[300px] w-full">
                  <Select
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
                    <MenuItem value="admin">Not Interested</MenuItem>
                    <MenuItem value="user">Media department</MenuItem>
                    <MenuItem value="user">Youth department</MenuItem>
                  </Select>
                </div>
              </div>

              {member.type == "staff" && (
                <div className="">
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
              )}

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
                >
                    Save
                </Button>
              </div>
            </div>
       </div>
      </div>
    </div>
  );
};

export default MemberForm;
