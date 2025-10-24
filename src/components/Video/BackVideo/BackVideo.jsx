import React, { useEffect, useRef, forwardRef } from 'react';
import MyVideo from '../../../assets/video/auto.mov';

const BackVideo = forwardRef((props, ref) => {
	const videoRef = useRef(null);
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 0.8;
		}
	}, []);

	return (
		<div
			ref={ref}
			className='showroom-interior-video'
			aria-hidden='true'
			style={{ opacity: 1 }}
		>
			<video ref={videoRef} autoPlay muted loop playsInline poster={MyVideo}>
				<source src={MyVideo} type='video/mp4' />
				<source src={MyVideo} type='video/quicktime' />
				Ваш браузер не підтримує відео.
			</video>
		</div>
	);
});

export default BackVideo;
