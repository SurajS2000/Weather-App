import React, { useEffect, useState } from "react";
import "./App.css";
import Clouds from "./assets/cloudy.png";
import Rain from "./assets/rain.png";
import Sunny from "./assets/sunny.png";
import wind from "./assets/wind.png";
import humidity from "./assets/humidity.png";
import axios from "axios";

const App = () => {
  const [city, setcity] = useState("");
  const [data, setdata] = useState();
  const [climate, setclimate] = useState(Sunny);
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
  const location = (e) => {
    setcity(e.target.value);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    axios
      .get(URL)
      .then((response) => {
        switch (response.data.weather[0].main) {
          case "Rain":
            setclimate(Rain);
            break;
          case "Clouds":
            setclimate(Clouds);
            break;
          default:
            setclimate(Sunny);
        }
        setdata(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.statusText);
      });
  };
  return (
    <div className="main">
      <form onSubmit={onsubmit}>
        <input onChange={location} type="text" placeholder="Enter City Name" />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className={`hero ${data && "show"}`}>
        <div className="sec1">
          <div className="subsec">
            <h1>{data && data.name}</h1>
            <img src={climate} alt="" />
            <h2>{data && data.weather[0].main}</h2>
          </div>
          <div className="subsec">
            <h3>
              {data && Math.round(((data.main.temp - 32) * 5) / 9)}&#8451;
            </h3>
            <h4>
              {data && Math.round(((data.main.temp_max - 32) * 5) / 9)}&#8451;/
              {data && Math.round(((data.main.temp_min - 32) * 5) / 9)}&#8451;
            </h4>
          </div>
        </div>
        <div className="sec2">
          <div>
            <h5>Wind</h5>
            <img src={wind} alt="" />
            <p>{data && data.wind.speed}</p>
          </div>
          <div>
            <h6>Humidity</h6>
            <img src={humidity} alt="" />
            <p>{data && data.main.humidity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
