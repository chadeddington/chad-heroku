import React from 'react';
import Dialog from '@material-ui/core/Dialog';

function ImageViewer() {
  const [imageIndex, setImageIndex] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [images, setImages] = React.useState([]);

  React.useEffect( () => {
    document.addEventListener('openDialog', (e) => {
      console.log('event fired', e.detail);
      setOpenModal(true)
      setImageIndex(0)
      setImages(e.detail.items)
    })
  }, [])

  function close() {
    setOpenModal(false)
  }

  function previous() {
    if (imageIndex === 0) {
      setImageIndex(images.length - 1)
    } else {
      setImageIndex(imageIndex - 1)
    }
  }

  function next() {
    if (imageIndex === (images.length - 1)) {
      setImageIndex(0)
    } else {
      setImageIndex(imageIndex + 1)
    }
  }


  return (
    <Dialog open={openModal} onBackdropClick={close} classes={{paper: 'dialog-content'}}>
      <img src={images[imageIndex]} style={{width: '100%'}}/>
      <div style={{display: 'flex'}}>
        <button onClick={previous} style={{flex: 1, height: 50}}>Previous</button>
        <button onClick={next} style={{flex: 1, height: 50}}>Next</button>
      </div>
      
    </Dialog>
  )
}

export default ImageViewer;