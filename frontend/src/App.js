
import './App.css';
import React, { useState } from 'react';
import { Route, HashRouter, Switch } from "react-router-dom";



const api = {
  key: "a8dbabeb48ef2565ae8f17d6ac7d4d4a",
  base: "https://api.openweathermap.org/data/2.5/"
}
let unit = 'metric';
var u = 'C';

const App = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={WeatherApp} />
          <Route exact path="/home" component={WeatherApp} />
          <Route exact path="/404" component={NotFound} />
          {/* <Redriect from='/404/' to="/home/" /> */}
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </div>
  );
};



function WeatherApp() {
  const [query, setQuery] = useState('');
  const [w, setWeather] = useState({});
  const [icn, setIcon] = useState('');
  //const [cee, setCee] = useState('');




  const search = evt => {
    if (evt.key === "Enter") {


      try {


        try {
          if (document.getElementsByClassName("ccBox")[0].checked) {
            unit = 'imperial'
            u = 'F';
          }
          else {
            unit = 'metric';
            u = 'C';
          }
        }

        catch (err) {
          console.log("Same undefined thing");
          unit = 'metric';
          u = 'C';
        }



        fetch(`${api.base}weather?zip=${query},ZA&units=${unit}&appid=${api.key}`)

          .then(res => res.json())
          .then(result => {
            setWeather(result);

            setIcon(result.weather[0].icon);
            setQuery('')
          }).catch(err => {
            console.log(err);
            setQuery('');
          });
      }
      catch (err) {

        console.log("OUR ERROR");
        console.log(err);
        //Put pop up here

      }




    }






  }


  const dateBuild = (d) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let days = ["Sunday", "Monday", "Tuesday",
      "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;

  }

  let source = `http://openweathermap.org/img/wn/${icn}@2x.png`;


  return (
    <div className="app">
      <main>

        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            maxLength="4"
            pattern="[0-9]{4}"
            onKeyPress={search}></input>
        </div>
        {(typeof w.main != 'undefined') ? (
          <div><div className="locationBox">
            <div className="location">{w.name}, {w.sys.country}</div>
            <div className="date">{dateBuild(new Date())}</div>



            <div className="tog">
              &#176;C &nbsp;

              <label className="switch">
                <input className="ccBox" type="checkbox" />
                <span className="slider"></span>
              </label>

&nbsp;
&#176;F
            </div>
          </div>






            <div className="weatherBox">

              <div className="temp">{Math.round(w.main.temp)} &#176;{u}</div>


              <div className="weather">{w.weather[0].main}</div>


              <div className="icon"><img className="img" src={source} alt="alternatetext"></img></div>



            </div>
          </div>
        ) : ('')}

      </main>
    </div>
  );
}

const NotFound = () => {
  return (
    <div className="app">
      <main>
        <div className="weatherBox">
          <div className="temp">404</div>
          <div className="weather">Oops... seems something went wrong. Don't worry we'll redirect you now.</div>
        </div>
      </main>
    </div>
  );
}


export default App;
