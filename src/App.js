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
      },
      isToggleOn: true,
      latitude: null,
      longitude: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.setState({ latitude, longitude });
        console.log(latitude, longitude);
      },
      error => console.log(error)
    );
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  celsiusToFahrenheit(C) {
    return C * 1.8 + 32;
  }

  getLocation() {
    Axios.get(
      `https://fcc-weather-api.glitch.me/api/current?lat=${
        this.state.latitude
      }&lon=${this.state.longitude}`
    ).then(res => {
      const weatherData = res.data;
      this.setState({ weatherData });
    });
  }

  render() {
    const { weatherData } = this.state;
    return (
      <div className="App">
        <header className="App-header">Local Weather App</header>
        <main>
          <div className="container">
            <div className="App-body">
              <div className="col-md-6 half">
                <div className="d-flex align-self-center">
                  <h3>You are located in: {weatherData.name}</h3>
                  <h3>
                    Temperature:{" "}
                    {this.state.isToggleOn
                      ? weatherData.main.temp + " C"
                      : this.celsiusToFahrenheit(weatherData.main.temp) + " F"}
                  </h3>
                  <button onClick={this.handleClick}>Converter</button>
                  <button onClick={this.getLocation}>Get Location</button>
                </div>
              </div>
              <div className="col-md-6 half">
                <h4>
                  Min:{" "}
                  {this.state.isToggleOn
                    ? weatherData.main.temp_min + " C"
                    : this.celsiusToFahrenheit(weatherData.main.temp_min) +
                      " F"}
                </h4>
                <h4>
                  Max:{" "}
                  {this.state.isToggleOn
                    ? weatherData.main.temp_max + " C"
                    : this.celsiusToFahrenheit(weatherData.main.temp_max) +
                      " F"}
                </h4>
                <h3>{weatherData.weather[0].description}</h3>
                <img src={weatherData.weather[0].icon} alt="weather" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
