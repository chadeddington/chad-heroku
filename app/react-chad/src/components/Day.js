import React from 'react';

function Day({classes, date, images = [], dayClick}) {
  function handleClick() {
    const event = new CustomEvent('openDialog', {detail: {items: images}})
    document.dispatchEvent(event);
  }

  return (
    <div className={classes} style={{backgroundImage: `url(${images[0]})`}} onClick={handleClick}>
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