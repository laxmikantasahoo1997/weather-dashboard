import React from 'react'

const BgVideo = ({backgroundVideoUrl}) => {
  return (
    <div>
        <video 
            autoPlay 
            loop 
            muted 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
            //   filter: 'blur(5px)' // Optional: Add blur to the background video
            }}
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
          </video>
    </div>
  )
}

export default BgVideo