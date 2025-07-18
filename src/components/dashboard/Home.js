import {
  Celebration,
  ChurchRounded,
  Forward,
  HomeFilled,
  NotificationsActive,
  PeopleAlt,
  Send,
  Share,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import MoneyOverTimeGraph from "../tools/MoneyOverTimeGraph";
import GenderDonutChart from "../tools/GenderGraph";
import AgeDistributionChart from "../tools/AgeDistributionGraph";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  console.log('access',JSON.parse(localStorage.getItem('access')))
  const [region, setRegion] = useState(JSON.parse(localStorage.getItem('region')))
  console.log('region', region)
  const [provinces , setProvinces] = useState([])
  const [parishes, setParishes] = useState([])
  const [members, setMembers] = useState([])
  const [remittances,setRemittances] = useState([])

  //get analytics

  const getProvinces = async() => {
    let provinces = await axios.post(process.env.REACT_APP_BACKEND_URL+'get-provinces',{
      region_id : region._id
    })
    console.log(provinces.data)
    setProvinces(provinces.data?.provinces || [])
  }


  const getParishes = async() => {
    let parishes = await axios.post(process.env.REACT_APP_BACKEND_URL+'get-parishes',{
      region_id : region._id
    })
    console.log(parishes.data)
    setParishes(parishes.data?.parishes || [])
  }


  const getRemittances = async() => {
    let res = await axios.post(process.env.REACT_APP_BACKEND_URL+'get-remittances',{
      region_id : region._id
    })
    console.log(res.data)
    setRemittances(res.data?.remittances || [])
  }

  const getMembers = async() => {
    let memebers = await axios.post(process.env.REACT_APP_BACKEND_URL+'get-members',{
      region_id : region._id
    })
    console.log(memebers.data)
    setMembers(memebers.data?.members || [])
  }


  useEffect(()=> {
getProvinces()
getParishes()
getMembers()
getRemittances()


  },[])


  return (
    <div className="pt-7 px-4">
      <div className=" flex justify-between lg:text-[17px] text-[15px] font-semibold mb-7">
        <div>Dashboard</div>

        
        <div className="flex items-center">
          <div
          onClick={()=> {
             navigator.clipboard.writeText('https://churchdb-three.vercel.app/membership-form/'+region?._id);
             toast('link copied to clipboard')
          }}
          className="text-[13px] mr-2 hover:underline hover:text-blue-500 cursor-pointer"> Share membership form for region <Send sx={{fontSize:"", position:'relative', bottom: 1}}/></div>
        <div className=" text-green-700">({region?.currency == 'dollar' && '$'})  {remittances.reduce((sum, remit) => sum + remit.amount, 0)}</div>
        </div>
      </div>

      {/* <div className="pt-7 px-4">
      <div className="lg:text-[17px] text-[15px] font-semibold mb-7">
        Dashboard
      </div> */}

      <div className="lg:flex space-y-3 lg:space-y-0 items-center justify-between lg:space-x-10 mb-4">
       
        {region?.hasdenominations && (
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
            <div className="text-[18px] font-bold">{provinces.length}</div>
            <div className="text-[15px] text-gray-600">Provinces</div>
          </div>
        </div>
        )}




       {region?.hasdenominations && (
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
           <div className="text-[18px] font-bold">{parishes.length}</div>
           <div className="text-[15px] text-gray-600">Parishes</div>
         </div>
       </div>
       )}

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
            <div className="text-[18px] font-bold">{members.length}</div>
            <div className="text-[15px] text-gray-600">Members</div>
          </div>
        </div>
      </div>

      <div className="lg:grid lg: grid-cols-4 gap-4">
        <div className="lg:col-span-3">
        <MoneyOverTimeGraph
  data={remittances?.map(remit => ({
    timestamp: remit.createdAt,
    amount: remit.amount
  }))}
/>
        </div>

        <div className="mt-4 lg:mt-0">
          <GenderDonutChart members={members} />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-5 gap-4 mt-4">
        <div className="lg:col-span-3">
          <AgeDistributionChart members={members} />
        </div>

        <div className="lg:col-span-2 mt-4">
          <div className="bg-white shadow-lg rounded-lg px-4 py-3">
            <div className="text-[15px font-semibold py-4  flex justify-between items-center">
             <div> Activities {" "}</div>
              {/* <div className="underline hover:text-blue-700 cursor-pointer text-[13px] font-normal">
                see more
              </div>{" "} */}
            </div>

            <div className="space-y-3">
              {/* <div className="flex items-center space-x-4 px-4">
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
              </div> */}

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
