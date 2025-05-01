import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline, IoSearchSharp } from "react-icons/io5";
import { getLocation, getWeather } from "./api";
interface WeatherData {
  temp: number;
  desc: string;
}

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState("Southampton");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setToggle(!toggle);
  };

  // getWeather()
  //   .then((res: any) => {
  //     console.log(res);
  //   })
  //   .catch((error: Error) => {
  //     console.error(error);
  //   });
  // getLocation(location)
  //   .then((res: any) => {
  //     console.log(res);
  //   })
  //   .catch((error: Error) => {
  //     console.error(error);
  //   });

  const handleSearch = async () => {
    try {
      const data = await getLocation(query);
      console.log(data);
      const { lat, lon } = data[0];

      const weather = await getWeather({ lat, lon });
      setWeatherData({
        temp: weather.main.temp,
        desc: weather.weather[0].description,
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(weatherData?.desc);
  return (
    <div>
      <div
        className={`w-full h-screen p-12  ${
          toggle ? "dark:bg-[#21242d] dark:text-white" : "bg-white"
        } `}
      >
        <div className="w-full h-full flex">
          <div className="w-[50%] h-full  p-8 flex items-center flex-col">
            <header className="flex justify-between w-full">
              <div>Weather App</div>
              <button onClick={toggleTheme} className="text-[20px] ">
                {toggle ? <MdOutlineWbSunny /> : <IoMoonOutline />}
              </button>
            </header>
            <div className="mt-[150px] w-[50%]">
              <h1 className="text-[80px] font-bold leading-20">
                Weather & Forcast o Application
              </h1>
              <p className="mt-10 text-[20px]">
                Check the weather condition of any location at any time and
                place.
              </p>
            </div>
            <div className="flex gap-4 items-center mt-[40px] ">
              <input
                placeholder="Search location"
                className="pl-2 pr-[30px] py-[10px] border border-[#2f727c] "
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div
                className="bg-[#2f727c] text-[20px] p-3 rounded-full text-white "
                onClick={handleSearch}
              >
                <IoSearchSharp />
              </div>
            </div>
          </div>
          <div
            className={`${
              toggle ? "dark:bg-[#282b34]" : " bg-[#dde4e6]  text-white"
            } w-[50%] h-full  p-8 flex items-center justify-center relative`}
          >
            <div className="bg-amber-500 w-[500px] h-[670px] rounded-[30px] absolute top-30 right-40 rotate-7" />
            <div className="bg-[#2f727c] w-[500px] h-[650px] rounded-[30px] relative flex justify-cente items-center flex-col p-10 ">
              <h2 className="text-[25px] font-semibold ">{query}</h2>
              <h2>Weather chances</h2>
              <div className="mt-11 text-[8rem] font-bold relative ">
                {" "}
                {weatherData ? Math.round(weatherData.temp - 273) : 999}
                <sup>°</sup>{" "}
              </div>
              {/* <div className="absolute text-[150px] top-42  ">⛈️</div> */}
              <div className="flex">
                <div className="mt-20">
                  <div className="text-[30px] ">{weatherData?.desc}</div>
                  <p>2:00 AM</p>
                  <p className="text-[25px] font-semibold ">
                    32<sup>°</sup>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
