import { Circle, KeyboardArrowDown, Mail } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  InputBase,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import TemplateModal from "../modals/TemplateModal";

const BulkEmail = () => {
  const [loader, setLoader] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);
  return (
    <div className="pt-7 px-4 ">
      <TemplateModal
        open={openTemplateModal}
        setOpen={setOpenTemplateModal}
        loader={loader}
        setLoader={setLoader}
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

          <div className="flex items-center  space-x-4 mb-5">
            <div className="w-full ">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Province
              </div>

              <div className="lg:w-full w-full">
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

            <div className="w-full ">
              <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
                Parish
              </div>

              <div className="lg:w-full w-full">
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
          </div>

          <div className=" mb-5">
            <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
              Title
            </div>

            <div className=" w-full flex items-center space-x-4">
              <InputBase
                sx={{
                  bgcolor: "#F7F7F8",
                  width: "100%",
                  px: 2,
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          <div className=" mb-5">
            <div className="lg:text-[14px] text-[13px] font-semibold flex items-center">
              Content
            </div>

            <div className=" w-full flex items-center space-x-4">
              <InputBase
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
          <div className="text-[16px] text-center font-semibold mb-2">
            {" "}
            Emails sent
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-4 px-4 bg-white py-2  shadow-md">
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
            </div>

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
                    General Announcement    
                  </div>
                  <div className="text-[11px] text-gray-500">
                    11th Jan 2025, 2:15pm
                  </div>
                </div>
                <div className="relative bottom-[4px] text-[13px] text-gray-600 leading-4">
                  Meeting in Mordern Parish, province 1. For church building.
                </div>
                <div className="underline text-[13px] ">to 20 members</div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkEmail;
