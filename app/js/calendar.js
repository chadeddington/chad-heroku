// load google API
var googleAuth;
var googleToken = '';
var autoBackupAlbumRef = '';
var googlePage = 1;
var googleAlbum = '';
var today = new Date();
var year = today.getFullYear() - 1;
var month = today.getMonth() + 1
var dateStart = month + '/1/' + year;
var dateEnd;
if (month == 12) {
  year++;
  dateEnd = '1/1/' + year;
} else {
  dateEnd = month + 1 + '/1/' + year;
}
var outsideRange = false;
var pix = [];
var count = 2;
// Selector alias
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

// Google Auth API
gapi.load('client:auth2', function() {
    gapi.client.init({
      'clientId': '1073743336431-k4mr9nfbtl1f4e83ml13pjbitftu2kpg.apps.googleusercontent.com',
      'scope': 'https://picasaweb.google.com/data/',
    }).then(function () {
        googleAuth = gapi.auth2.getAuthInstance();
    }).catch(function(err) {
        console.log("There was an error initializing google", err);
    });
  });

// Log in with Google
function login() {
  $('.spinner').style.visibility = 'visible';
  $('.loading-text').innerText = "Logging in to Google...";
   googleAuth.signIn().then(function(e) {
     googleToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    startPhotosFetch();
  });
}

// Fetch the photos
function startPhotosFetch() {
  $('.loading-text').innerText = "Looking for Google Photos. This may take a while...";
  getAutoBackupRef().then(res => {
    if (res) getPhotosFromAlbum(res);
  }).catch(err => {console.log('Error ', err)});
}

// Get auto back up ref
function getAutoBackupRef() {
  return fetch('https://picasaweb.google.com/data/feed/api/user/default?alt=json&access_token=' + googleToken)
    .then(res => {
      return res.json()
    }).then(json => {
      googleAlbum = json.feed.entry[0].gphoto$id.$t;
      return googleAlbum;
      // return json.feed.entry[0].id.$t;
    }).catch(err => console.log('error', err));
}

// Get photos from album
function getPhotosFromAlbum(id) {
  getBatch();
}

// Grab a batch of photos
function getBatch() {
  count++;
  var script = document.createElement('script');
  script.setAttribute('id', 'google-photos-jsonp');
  script.src = "https://picasaweb.google.com/data/feed/api/user/default/albumid/" + googleAlbum + "?alt=json&imgmax=1024&fields=entry(media:group(media:content,media:thumbnail,media:title),gphoto:timestamp)&thumbsize=400u&max-results=1000&start-index=" + googlePage + "&access_token=" + googleToken + "&callback=handleGooglePhotosResponse";
  document.querySelector('body').appendChild(script);
}

// Handle the JSONP response
function handleGooglePhotosResponse(response) {
  $('.loading-text').innerText = "Sorting through photos...";
  response.feed.entry.forEach(item => {
    // Within the timeperiod we want
    if (item.gphoto$timestamp.$t >= Date.parse(dateStart) && item.gphoto$timestamp.$t < Date.parse(dateEnd)) {
      pix.push(item)
    } else if(item.gphoto$timestamp.$t < dateStart) {
      outsideRange = true;
    }
  })
  if (count > 15 || outsideRange || response.feed.entry.length < 1000) {
    console.log(pix);
    // grab dates for pictures
    var results = pix.map(pic => {
      var result = {};
      var picDate = new Date(parseInt(pic.gphoto$timestamp.$t));
      result.date = picDate.toLocaleString().match(/\/(\d+)\//)[1];
      console.log(result.date);
      result.thumb = pic.media$group.media$thumbnail[0].url;
      result.full = pic.media$group.media$content[0].url;
      result.type = pic.media$group.media$content[0].type;
      return result;
    })
    console.log("Results: ", results);
    displayImages(results);
  } else {
    // keep getting fetching
    googlePage += 1000
    getBatch();
  }
}

// Assign the image links to the img tag
function displayImages(images) {
  images.forEach(image => {
    var img = document.querySelector('#date-'+image.date);
    img.all = (img && img.all) ? img.all.concat([image.full]) : [];
    img.querySelector('.img-count').innerText = img.all.length || 1;
    img.querySelector('.img-count-wrapper').style.display = 'block';
    img.style.backgroundImage = 'url('+image.thumb+')';
    img.style.cursor = 'pointer';
    img.style.backgroundPosition = 'center';
    img.style.backgroundSize = 'cover';
    img.thumb = image.thumb;
    img.full = image.full;
  })
  $('.loading-text').innerText = "";
  $('.spinner').style.visibility = 'hidden';
}

// Run immediately to display the calendar
/********************
* Draw the calendar
*******************/
var dateObj = new Date();
var months = ['January', 'February', 'March','April','May','June','July','August','September','October','November','December'];
// Display the Month Name
document.querySelector('.month-header').innerText = months[month - 1];

var cal = document.querySelector('.cal-wrapper');
cal.innerHTML = '';

var weekday = dateObj.getDay();
var date = dateObj.getDate();
var monthDays = new Date(dateObj.getYear(), month, 0).getDate();

while (date > 1) {
  if (weekday > 0) {
    weekday-- ;
  } else {
    weekday = 6;
  }
  date--;
}
var offset = weekday;

var activeImageCollection = [];
var activeImageIndex = 0;

// Next image handler
var nextImg = function(e) {
  activeImageIndex < activeImageCollection.length - 1 ? activeImageIndex++ : activeImageIndex = 0;
  $('.preview').src = activeImageCollection[activeImageIndex];
  e.stopPropagation();
}
// Prev image handler
var prevImg = function(e) {
  activeImageIndex > 0 ? activeImageIndex-- : activeImageIndex = activeImageCollection.length - 1;
  $('.preview').src = activeImageCollection[activeImageIndex];
  e.stopPropagation();
}

// Listners
$('.next-btn').addEventListener('click', nextImg);
$('.prev-btn').addEventListener('click', prevImg);

for (var i = 0; i < 42; i++) {
  var day = document.createElement('div');
  day.setAttribute('class', 'day placeholder');
  if (i >= offset && i < monthDays + offset) {
    // The calendar day
    day.setAttribute('class', 'day');
    // The date span
    var dateEl = document.createElement('span');
    var dateText = i - offset + 1;
    dateEl.innerText = dateText;
    dateEl.setAttribute('class', 'date');
    // The image for the day
    var img = document.createElement('div');
    img.setAttribute('class', 'img');
    img.id = 'date-'+dateText;
    // The image repeatCount
    var imgCountWrapper = document.createElement('span');
    imgCountWrapper.setAttribute('class', 'img-count-wrapper');
    var imgCount = document.createElement('span');
    imgCount.setAttribute('class', 'img-count');
    // The Image Icon
    var icon = document.createElement('i');
    icon.setAttribute('class', 'img-icon');
    imgCountWrapper.appendChild(icon);
    imgCountWrapper.appendChild(imgCount);
    img.appendChild(imgCountWrapper);
    day.appendChild(dateEl);
    day.appendChild(img);
    img.addEventListener('click', e => {
      var target = e.currentTarget;
      activeImageCollection = target.all;
      $('.preview').src = target.full ? target.full : '';
      // Reset index;
      activeImageIndex = activeImageCollection.length - 1;
      // Controls for next prev
      if (activeImageCollection && activeImageCollection.length) {
        $('.img-controls').style.visibility = 'visible';
      } else {
        // Hide the controls
        $('.img-controls').style.visibility = 'hidden';
      }
      $('.overlay').style.zIndex = 10;
      $('.modal').style.visibility = 'visible';
    });
  }
  cal.appendChild(day);
}

// Close for the modal
$('.modal').addEventListener('click', function() {
  $('.img-controls').style.visibility = 'hidden';
  this.style.zIndex = -1;
  this.style.visibility = 'hidden';
  var image = $('.preview');
  image.src = '';
})
