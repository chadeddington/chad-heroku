var fetch = require('node-fetch');
var today = new Date();
var year = today.getFullYear() - 1;
var month = today.getMonth() + 1
var dateStart = month + '/1/' + year;
var dateEnd;

if (month == 12) {
  dateEnd = '1/1/' + year;
} else {
    dateEnd = month + 1 + '/1/' + year;
}
var pix = [];

// Fetch the batch of photos to process
var getBatch = function(page, id, token) {
  console.log('get batch called');
  var url = "https://picasaweb.google.com/data/feed/api/user/default/albumid/"+id+ "?alt=json&imgmax=d&fields=entry(media:group(media:content,media:thumbnail,media:title),gphoto:timestamp)&max-results=1000&start-index=" + page + "&access_token=" + token;
  var outsideRange = false;
  return fetch(url)
    .then(res => {
      return res.json();
    }).then(json => {
      json.feed.entry.forEach(item => {
        // var picDate = new Date(item.gphoto$timestamp.$t)
        // picDate = picDate.toLocaleDateString();
        // var monthMatch = picDate.match(/^\d{2}/);
        // var yearMatch = picDate.match(/\d{4}$/);

        // Within the timeperiod we want
        if (item.gphoto$timestamp.$t >= Date.parse(dateStart) && item.gphoto$timestamp.$t < Date.parse(dateEnd)) {
          pix.push(item)
        } else if(item.gphoto$timestamp.$t < dateStart) {
          outsideRange = true;
        }
      })
      if (outsideRange || json.feed.entry.length < 1000) {
        // return json;
        console.log(pix);
        return {"pix": pix};
      } else {
        // keep getting fetching
        return getBatch(page += 100, id, token);
      }
    })
}

// The route handler
var getPhotos = function(req, res, next) {
  // var url = "https://picasaweb.google.com/data/feed/api/user/default/albumid/"+req.params.albumId + "?alt=json&imgmax=d&fields=entry(media:group(media:content,media:thumbnail,media:title))&max-results=50&start-index=" + req.query.googlePage + "&access_token=" + req.query.access_token;
  getBatch(1, req.params.albumId, req.query.access_token)
    .then(response => {
      console.log('sent response', response);
      res.send(response)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    });
}

module.exports = {
  getPhotos: getPhotos
}
