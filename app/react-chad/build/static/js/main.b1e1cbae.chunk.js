(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(21)},16:function(e,t,a){},18:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},19:function(e,t,a){},21:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(4),i=a.n(r),l=(a(16),a(5)),c=a(6),s=a(8),u=a(7),g=a(9),h=(a(18),a(19),a(1)),m=a(2);var d=function(e){var t=e.search,a=(new Date).getFullYear(),n=o.a.useState((new Date).getMonth()+1),r=Object(m.a)(n,2),i=r[0],l=r[1],c=o.a.useState(a),s=Object(m.a)(c,2),u=s[0],g=s[1],d={height:35,padding:0,boxSizing:"content-box",margin:5,borderRadius:4,fontSize:18,textAlign:"center"};return o.a.createElement("div",null,o.a.createElement("select",{onChange:function(e){l(e.target.value)},style:Object(h.a)({},d),value:i},["January","February","March","April","May","June","July","August","September","October","November","December"].map(function(e,t){return o.a.createElement("option",{value:t+1},e)})),o.a.createElement("input",{type:"text",placeholder:(new Date).getFullYear(),onChange:function(e){g(e.target.value)},style:Object(h.a)({},d,{width:100})}),o.a.createElement("button",{onClick:function(e){t({month:i,year:u})},style:Object(h.a)({},d,{padding:"0 10"})},"Get Photos"))},p=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={googlePhotos:[],month:(new Date).getMonth()+1,year:(new Date).getFullYear()},a.signIn=function(e){a.GOOGLE_AUTH.signIn().then(function(t){a.auth_token=a.GOOGLE_AUTH.currentUser.get().getAuthResponse().access_token,a.listMedia(e)})},a.listMedia=function(e){var t=e.month,n=e.year;if(!a.requestOut){a.requestOut=!0;var o={filters:{dateFilter:{dates:[{month:t,year:n}]}}},r={method:"POST",body:JSON.stringify(o)};fetch("https://photoslibrary.googleapis.com/v1/mediaItems:search?access_token=".concat(a.auth_token,"&pageSize=100"),r).then(function(e){return e.json().then(function(e){console.log(e),a.setState(function(a){return{googlePhotos:e.mediaItems,month:t,year:n}}),a.requestOut=!1})}).catch(function(e){console.log(e)})}},a}return Object(g.a)(t,e),Object(c.a)(t,[{key:"debounce",value:function(e,t){var a;return function(){var n=this,o=arguments,r=!a;clearTimeout(a),a=setTimeout(function(){a=null,e.apply(n,o)},t),r&&e.apply(n,o)}}},{key:"componentDidMount",value:function(){var e=this;window.gapi&&window.gapi.load("client:auth2",function(){window.gapi.client.init({clientId:"1073743336431-k4mr9nfbtl1f4e83ml13pjbitftu2kpg.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/photoslibrary.readonly"}).then(function(){e.GOOGLE_AUTH=window.gapi.auth2.getAuthInstance(),console.log("Google initialized successfully! Good Job!",e.GOOGLE_AUTH)}).catch(function(e){console.log("There was an error initializing google",e)})})}},{key:"drawCalendar",value:function(){for(var e=new Date(this.state.year,this.state.month-1),t=e.getDate(),a=e.getDay(),n=new Date(this.state.year,this.state.month,0).getDate();t>1;)a>0?a--:a=6,t--;var r=a,i=Array(42).fill(o.a.createElement("div",{className:"day"}));if(i.fill(o.a.createElement("div",{className:"day empty"}),0,r),i.fill(o.a.createElement("div",{className:"day empty"}),n+r),this.state.googlePhotos)for(var l=0;l<this.state.googlePhotos.length;l++){var c=this.state.googlePhotos[l],s=c.mediaMetadata.creationTime.match(/(\d+)/g)[2];i[Number(s)+r]=o.a.createElement("div",{className:"day",style:{backgroundImage:"url(".concat(c.baseUrl,")")}})}return i}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"header"},o.a.createElement("h1",null,"Image Calendar")),o.a.createElement(d,{search:this.signIn}),o.a.createElement("div",{className:"google-logo-container"},"Powered by ",o.a.createElement("span",{className:"googleLogo"})),o.a.createElement("h1",null,"".concat(["January","February","March","April","May","June","July","August","September","October","November","December"][this.state.month-1]," ").concat(this.state.year)),o.a.createElement("div",null,this.drawCalendar()),o.a.createElement("div",{className:"photo-wrapper"},this.state.googlePhotos?this.state.googlePhotos.map(function(e,t){return o.a.createElement("div",null,o.a.createElement("a",{href:e.productUrl,target:"_blank",rel:"noopener noreferrer"},o.a.createElement("img",{className:"image",key:t,src:e.baseUrl,alt:e.filename})))}):""))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,2,1]]]);
//# sourceMappingURL=main.b1e1cbae.chunk.js.map