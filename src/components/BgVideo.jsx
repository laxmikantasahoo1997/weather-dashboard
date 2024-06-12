import React, { useEffect, useRef } from 'react'

const BgVideo = ({backgroundVideoUrl}) => {
  const videoRef = useRef();

  useEffect(() => {    
    videoRef.current?.load();
  }, [backgroundVideoUrl]);
  return (
    <div>
        <video 
        ref={videoRef}
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
            }}
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
          </video>
    </div>
  )
}

export default BgVideo