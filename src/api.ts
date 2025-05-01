import axios from "axios";
interface LocationData {
  lat: number;
  lon: number;
}

export const getWeather: any = async ({ lat, lon }: LocationData) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6abb31d82a2d02fbbff55ac8e732e0b0`;

  try {
    const response = await axios.get(api);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLocation = (query: string) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=6abb31d82a2d02fbbff55ac8e732e0b0`;

  return axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
