import { ErrorOutline, KeyboardArrowDown } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  InputBase,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = ({ open, setOpen, loader, setLoader }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    name: "",
    meeting_location: "",
    meeting_time: "",
    meeting_day: "",
    leader: "",
    description:''
  });

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
          Add Department
        </div>
        <div className="flex justify-center">
          <div className="lg:space-y-5 space-y-3">
            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
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

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
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

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Department Name
              </div>

              <div className="lg:w-[300px] w-full flex items-center space-x-4">
                <InputBase
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  value={department.name}
                  onChange={(e) => {
                    setDepartment({ ...department, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-3 items-start lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Description
              </div>

              <div className="lg:w-[300px] w-full">
                <InputBase
                  multiline
                  rows={5}
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  value={department.description}
                  onChange={(e) => {
                    setDepartment({ ...department, description: e.target.value });
                  }}
                />
              </div>
            </div>

            

            <div className="font-bold">Meeting details</div>

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Day of the week
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

            <div className="grid lg:grid-cols-3 items-center lg:space-x-10 lg:space-y-0 space-y-2">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Time
              </div>

              <div className="lg:w-[300px] w-full">
                <InputBase
                  type="number"
                  sx={{
                    bgcolor: "#F7F7F8",
                    width: "100%",
                    px: 2,
                    fontSize: "14px",
                  }}
                  value={department.meeting_time}
                  onChange={(e) => {
                    setDepartment({ ...department, meeting_time: e.target.value });
                  }}
                />
              </div>
            </div>

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
                  value={department.location}
                  onChange={(e) => {
                    setDepartment({ ...department, location: e.target.value });
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
              >
                {loader ? (
                  <CircularProgress size={"1.3rem"} sx={{ color: "white" }} />
                ) : (
                  " Save"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddDepartment;
