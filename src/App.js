import React, { Component } from "react";
import Axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {
        coord: {},
        weather: [{}],
        main: {}
      }
    };
  }

  componentDidMount() {
    Axios.get(
      "https://fcc-weather-api.glitch.me/api/current?lat=33.92119&lon=-117.864357"
    ).then(res => {
      const weatherData = res.data;
      this.setState({ weatherData });
      console.log(weatherData);
    });
  }

  celsiusToFahrenheit() {}

  fahrenheitToCelsius() {}

  render() {
    const { weatherData } = this.state;
    return (
      <div className="App">
        <header className="App-header">Local Weather App</header>
        <main>
          <div className="App-body">
            <h3>You are located in: {weatherData.name}</h3>
            <h3>Temperature: {weatherData.main.temp}</h3>
            <h4>Min: {weatherData.main.temp_min}</h4>
            <h4>Max: {weatherData.main.temp_max}</h4>
            <h3>{weatherData.weather[0].description}</h3>
            <img src={weatherData.weather[0].icon} alt="weather image" />
            {/* <h2>{navigator.geolocation.getCurrentPosition()}</h2> */}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
