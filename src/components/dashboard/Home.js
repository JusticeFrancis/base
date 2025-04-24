import {
  Celebration,
  ChurchRounded,
  HomeFilled,
  NotificationsActive,
  PeopleAlt,
} from "@mui/icons-material";
import React from "react";
import MoneyOverTimeGraph from "../tools/MoneyOverTimeGraph";
import GenderDonutChart from "../tools/GenderGraph";
import AgeDistributionChart from "../tools/AgeDistributionGraph";

const Home = () => {
  return (
    <div className="pt-7 px-4">
      <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
        <div>Dashboard</div>

        <div className=" text-green-700">$140,0000</div>
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

        <div className="bg-white flex space-x-3 w-full rounded-lg  shadow-xs  px-12 py-4">
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

        <div className="bg-white flex space-x-3 w-full rounded-lg  shadow-xs  px-12 py-4">
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

      <div className="lg:grid lg: grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <MoneyOverTimeGraph data={sampleData} />
        </div>

        <div className="mt-4 lg:mt-0">
          <GenderDonutChart />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-5 gap-4 mt-4">
        <div className="lg:col-span-3">
          <AgeDistributionChart data={sampleData} />
        </div>

        <div className="lg:col-span-2 mt-4">
          <div className="bg-white shadow-lg rounded-lg px-4 py-3">
            <div className="text-[15px font-semibold py-4  flex justify-between items-center">
             <div> Activities (10){" "}</div>
              <div className="underline hover:text-blue-700 cursor-pointer text-[13px] font-normal">
                see more
              </div>{" "}
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-4 px-4">
                <div className="bg-blue-600 rounded-lg  p-[2px]">
                  <Celebration sx={{ color: "white", fontSize: "40px" }} />
                </div>

                <div>
                  <div className="text-[16px]">Birthdays today</div>
                  <div className="relative bottom-[4px] text-[13px] text-gray-600 leading-4">
                    5 members have birthdays today,{" "}
                    <span className="underline hover:text-blue-700 cursor-pointer">
                      click here
                    </span>{" "}
                    to wish them
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 px-4">
                <div className="bg-green-600 rounded-md p-[2px]">
                  <NotificationsActive sx={{ color: "white", fontSize: "40px" }} />
                </div>

                <div>
                  <div className="text-[16px]">Message from the Region Admin</div>
                  <div className="relative bottom-[4px] text-[13px] text-gray-600 leading-4">
                   Meeting at HQ on friday for a Night with God fellowship.
                    <span className="underline hover:text-blue-700 cursor-pointer">
                      click here
                    </span>{" "}
                    to see more
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
