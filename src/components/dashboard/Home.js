import { ChurchRounded, HomeFilled, PeopleAlt } from "@mui/icons-material";
import React from "react";
import MoneyOverTimeGraph from "../tools/MoneyOverTimeGraph";

const Home = () => {
  return (
    <div className="pt-7 px-4">
      <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
      <div>
      Dashboard
      </div>


      <div className=" text-green-700">
        $140,0000
      </div>
      </div>



      {/* <div className="pt-7 px-4">
      <div className="lg:text-[17px] text-[15px] font-semibold mb-7">
        Dashboard
      </div> */}

      <div className="lg:flex space-y-3 lg:space-y-0 items-center justify-between lg:space-x-10 mb-4">
        <div className="bg-white flex space-x-3 w-full rounded-md shadow-xs  px-12 py-4">
          <div className="my-auto bg-[#cedefe] p-1 rounded-full">
            <HomeFilled
              sx={{
                color: "#5B93FF",
                position: "relative",
                bottom: 2,
                fontSize: "50px",
              }}
            />
          </div>
          <div className="my-auto">
            <div className="text-[18px] font-bold">100</div>
            <div className="text-[15px] text-gray-600">Provinces</div>
          </div>
        </div>


        <div className="bg-white flex space-x-3 w-full rounded-md shadow-xs  px-12 py-4">
          <div className="my-auto bg-[#fffaed] p-1 rounded-full">
            <ChurchRounded
              sx={{
                color: "#FFC327",
                position: "relative",
                bottom: 2,
                fontSize: "50px",
              }}
            />
          </div>
          <div className="my-auto">
            <div className="text-[18px] font-bold">100</div>
            <div className="text-[15px] text-gray-600">Parishes</div>
          </div>
        </div>



        <div className="bg-white flex space-x-3 w-full rounded-md shadow-xs  px-12 py-4">
          <div className="my-auto bg-[#e6e6f9] p-1 rounded-full">
            <PeopleAlt
              sx={{
                color: "#605BFF",
                position: "relative",
                bottom: 2,
                fontSize: "50px",
              }}
            />
          </div>
          <div className="my-auto">
            <div className="text-[18px] font-bold">100</div>
            <div className="text-[15px] text-gray-600">Members</div>
          </div>
        </div>



       
      </div>


      <div className=''>
      <MoneyOverTimeGraph data={sampleData} />
      </div>
    </div>
  );
};

export default Home;


const sampleData = [
    { timestamp: "2025-04-01T10:00:00Z", amount: 120 },
    { timestamp: "2025-04-02T10:00:00Z", amount: 80 },
    { timestamp: "2025-04-07T10:00:00Z", amount: 150 },
    { timestamp: "2025-04-15T10:00:00Z", amount: 200 },
  ];
  