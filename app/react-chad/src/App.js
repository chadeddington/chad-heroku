import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Searchbar from './components/Searchbar.js';
import Day from './components/Day.js';

class App extends Component {
  state = {googlePhotos: [], month: new Date().getMonth() + 1, year: new Date().getFullYear()}

  debounce(func, wait) {
    let timeout;
    // return a function to be called as the event handler
    return function() {
      let context = this
      let args = arguments;

      let later = function() {
        timeout = null;
        func.apply(context, args);
      }

      let callNow = !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    }
  }

  componentDidMount() {
    if (window.gapi) {
      // Google Auth API
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          'clientId': '1073743336431-k4mr9nfbtl1f4e83ml13pjbitftu2kpg.apps.googleusercontent.com',
          'scope': 'https://www.googleapis.com/auth/photoslibrary.readonly',
        }).then( () =>{
            this.GOOGLE_AUTH = window.gapi.auth2.getAuthInstance();
            console.log("Google initialized successfully! Good Job!", this.GOOGLE_AUTH)
        }).catch(function(err) {
            console.log("There was an error initializing google", err);
        });
      });
    }

    // fetch('/express-backend').then(res => {
    //   res.json().then(data => {
    //     console.log('testing: ', data);
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // })
  }

  signIn = (searchDate) => {
    // testing
    // this.listMedia(searchDate)
    // return;

    this.GOOGLE_AUTH.signIn().then(e => {
      this.auth_token = this.GOOGLE_AUTH.currentUser.get().getAuthResponse().access_token;
      // this.listAlbums();
      this.listMedia(searchDate);
    });
  }

  listMedia = ({month, year}) => {
    if (this.requestOut) return; //prevent duplicate requests
    this.requestOut = true;
    const filters = {
      filters: {
        dateFilter: {
          dates: [
            {
              month,
              year
            }
          ]
        }
      }
    }
    const config = {
      method: 'POST',
      body: JSON.stringify(filters)
    }
    fetch(`https://photoslibrary.googleapis.com/v1/mediaItems:search?access_token=${this.auth_token}&pageSize=100`, config)
    // fetch('./sample.json')
      .then(res => res.json().then(data => {
        console.log(data)
        // Month does not come in 0 based
        this.setState(state => ({googlePhotos: data.mediaItems, month: month, year})); 
        this.requestOut = false; // Allow new requests to be made
      }))
      .catch(err => {
        console.log(err);
      })
  }

  drawCalendar() {
    // month needs to be 0 based
    let dateObj = new Date(this.state.year, this.state.month - 1);
    let date = dateObj.getDate();
    let weekday = dateObj.getDay()
    const monthDays = new Date(this.state.year, this.state.month, 0).getDate();

    while (date > 1) {
      if (weekday > 0) {
        weekday-- ;
      } else {
        weekday = 6;
      }
      date--;
    }
    var offset = weekday;
    let monthArray = Array(42).fill(null)

    // Add empty days to beginning and end of calendar array
    // dayArray.fill(<Day classes="day empty" />, 0, offset);
    // dayArray.fill(<Day classes="day empty" />, monthDays + offset);

    let dayArray = monthArray.map( (day, i) => {
      if (i < offset || i >= monthDays + offset) {
        return {};
      } else {
        return {date: i - offset + 1, images: []};
      }
    });

    if (this.state.googlePhotos.length) {
      this.state.googlePhotos.forEach( (photo) => {
        let day = photo.mediaMetadata.creationTime.match(/(\d+)/g)[2]
        dayArray[Number(day) + offset - 1].images.push(photo.baseUrl);
        // dayArray[Number(day) + offset - 1] = (
        //   <div className="day" style={{backgroundImage: `url(${photo.baseUrl})`}}>
        //     <span className="cal-date">{day}</span>
        //   </div>
        // )
      })
    }

    return dayArray
  }

  render() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    const dayArray = this.drawCalendar();

    return (
      <div className="App">
        <div className="header">
          <h1>Image Calendar</h1>
        </div>

        <Searchbar search={this.signIn}/>
        <div className="google-logo-container">Powered by <span className="googleLogo"></span></div>

        <h1>{`${months[this.state.month - 1]} ${this.state.year}`}</h1>
        <div className="photo-wrapper">
          {

            dayArray.map(day => {
              if (!day.date) {
                return <Day classes="day empty"/>
              } else {
                return <Day classes="day" {...day} />
              }
            })
          }
        </div>

        <div>
        {
          (this.state.googlePhotos) ? this.state.googlePhotos.map((photo, i) => (
            <div>
              <a href={photo.productUrl} target="_blank" rel="noopener noreferrer">
                <img className="image" key={i} src={photo.baseUrl} alt={photo.filename}></img>
              </a>
            </div>
            )
          ) : ''
        }
        </div>

        
      </div>
    );
  }
}

export default App;
