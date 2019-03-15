import React from 'react';

function Day({classes, date, images = []}) {
  return (
    <div className={classes} style={{backgroundImage: `url(${images[0]})`}}>
      {
      (date)
      ? <span className="cal-date">{date}</span>
      : null
      }
      {
        (images.length)
        ? <span className="image-length">{images.length}</span>
        : null
      }
    </div>
  )
}

export default Day;