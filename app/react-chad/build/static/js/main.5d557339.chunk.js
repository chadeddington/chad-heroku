(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},17:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var o=n(0),c=n.n(o),a=n(2),i=n.n(a),s=(n(14),n(3)),l=n(4),r=n(6),u=n(5),g=n(7),h=(n(16),n(17),function(e){function t(){var e,n;Object(s.a)(this,t);for(var o=arguments.length,c=new Array(o),a=0;a<o;a++)c[a]=arguments[a];return(n=Object(r.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).state={googlePhotos:[],page:""},n.googleSignIn=function(){n.GOOGLE_AUTH.signIn().then(function(e){n.googleToken=window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token}).catch(function(e){console.error(e)})},n.signIn=function(){n.GOOGLE_AUTH.signIn().then(function(e){n.auth_token=n.GOOGLE_AUTH.currentUser.get().getAuthResponse().access_token,n.listMedia()})},n.listAlbums=function(){console.log("list items called"),fetch("https://photoslibrary.googleapis.com/v1/albums?access_token=".concat(n.auth_token)).then(function(e){return e.json().then(function(e){console.log(e)})}).catch(function(e){console.log(e)})},n.listMedia=function(){n.requestOut||(n.requestOut=!0,fetch("https://photoslibrary.googleapis.com/v1/mediaItems?access_token=".concat(n.auth_token,"&pageToken=").concat(n.state.page)).then(function(e){return e.json().then(function(e){n.setState(function(t){return{googlePhotos:t.googlePhotos.concat(e.mediaItems),page:e.nextPageToken}}),n.requestOut=!1})}).catch(function(e){console.log(e)}))},n}return Object(g.a)(t,e),Object(l.a)(t,[{key:"debounce",value:function(e,t){var n;return function(){var o=this,c=arguments,a=!n;clearTimeout(n),n=setTimeout(function(){n=null,e.apply(o,c)},t),a&&e.apply(o,c)}}},{key:"componentDidMount",value:function(){var e=this;window.gapi&&window.gapi.load("client:auth2",function(){window.gapi.client.init({clientId:"1073743336431-k4mr9nfbtl1f4e83ml13pjbitftu2kpg.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/photoslibrary.readonly"}).then(function(){e.GOOGLE_AUTH=window.gapi.auth2.getAuthInstance(),console.log("Google initialized successfully! Good Job!",e.GOOGLE_AUTH)}).catch(function(e){console.log("There was an error initializing google",e)})}),window.addEventListener("scroll",this.debounce(function(t){console.log("scroll");var n=document.documentElement.clientHeight;document.documentElement.scrollHeight-100<n+document.documentElement.scrollTop&&e.listMedia()},500))}},{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement("button",{onClick:this.signIn},"List Albums"),c.a.createElement("div",{className:"photo-wrapper"},this.state.googlePhotos?this.state.googlePhotos.map(function(e,t){return-1===e.mimeType.indexOf("video")?c.a.createElement("div",null,c.a.createElement("a",{href:e.productUrl,target:"_blank",rel:"noopener noreferrer"},c.a.createElement("img",{className:"image",key:t,src:e.baseUrl,alt:e.filename}))):""}):""))}}]),t}(o.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(19)}},[[8,2,1]]]);
//# sourceMappingURL=main.5d557339.chunk.js.map