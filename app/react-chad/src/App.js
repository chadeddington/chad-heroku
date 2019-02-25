import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {googlePhotos: [], page: ''}

  googleSignIn = () => {
    this.GOOGLE_AUTH.signIn().then(e => {
      this.googleToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
      debugger;
   }).catch(e => {
     console.error(e)
     debugger;
   })
  }

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

    // Add scroll listener

    // let photoWrapper = document.querySelector('.photo-wrapper');
    // console.log('photo wrapper ', photoWrapper);
    window.addEventListener('scroll', this.debounce(_ => {
        console.log('scroll')
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight
        // If the user scrolls within 100 px of the bottom
        if (scrollHeight - 100 < clientHeight + document.documentElement.scrollTop) {
          this.listMedia();
        }
      }, 500)
    )

    // fetch('/express-backend').then(res => {
    //   res.json().then(data => {
    //     console.log('testing: ', data);
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // })
  }

  signIn = () => {
    this.GOOGLE_AUTH.signIn().then(e => {
      this.auth_token = this.GOOGLE_AUTH.currentUser.get().getAuthResponse().access_token;
      // this.listAlbums();
      this.listMedia();
    });
  }

  listAlbums = () => {
    console.log('list items called');

    fetch(`https://photoslibrary.googleapis.com/v1/albums?access_token=${this.auth_token}`)
      .then(res => res.json().then(data => {
        console.log(data)
      }))
      .catch(err => {
        console.log(err);
      })
  }

  listMedia = () => {
    if (this.requestOut) return; //prevent duplicate requests
    this.requestOut = true;
    fetch(`https://photoslibrary.googleapis.com/v1/mediaItems?access_token=${this.auth_token}&pageToken=${this.state.page}`)
      .then(res => res.json().then(data => {
        // Concat new array of photos to existing array of photos
        // Update the page to fetch next
        this.setState(state => ({googlePhotos: state.googlePhotos.concat(data.mediaItems), page: data.nextPageToken})); 
        this.requestOut = false; // Allow new requests to be made
      }))
      .catch(err => {
        console.log(err);
      })
  }


  render() {
    return (
      <div className="App">
        <button onClick={this.signIn}>List Albums</button>
        <div className="photo-wrapper">
        {
          (this.state.googlePhotos) ? this.state.googlePhotos.map((photo, i) => (
            (photo.mimeType.indexOf('video') === -1) ? <div>
              <a href={photo.productUrl} target="_blank" rel="noopener noreferrer">
                <img className="image" key={i} src={photo.baseUrl} alt={photo.filename}></img>
              </a>
            </div> : ''
            )
          ) : ''
        }
        </div>
      </div>
    );
  }
}

export default App;
