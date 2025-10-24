import * as React from 'react';
import { gsap } from 'gsap';
import './Sparkles.css';

const NUM_SPARKLES = 50;

export default function Sparkles() {
	const containerRef = React.useRef(null);

	React.useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const sparkles = [];
		for (let i = 0; i < NUM_SPARKLES; i++) {
			const sparkle = document.createElement('div');
			sparkle.className = 'sparkle';
			container.appendChild(sparkle);
			sparkles.push(sparkle);
		}

		const ctx = gsap.context(() => {
			sparkles.forEach((sparkle) => {
				gsap.set(sparkle, {
					x: gsap.utils.random(0, container.offsetWidth),
					y: gsap.utils.random(0, container.offsetHeight),
					scale: gsap.utils.random(0.5, 1.5),
				});

				const tl = gsap.timeline({
					repeat: -1,
					delay: gsap.utils.random(0, 5),
					repeatRefresh: true,
				});

				tl.to(sparkle, {
					opacity: 1,
					duration: gsap.utils.random(0.3, 0.7),
					ease: 'power1.inOut',
				})
					.to(sparkle, {
						opacity: 0,
						duration: gsap.utils.random(0.3, 0.7),
						ease: 'power1.inOut',
					})
					.to(
						sparkle,
						{
							x: () => gsap.utils.random(0, container.offsetWidth),
							y: () => gsap.utils.random(0, container.offsetHeight),
							duration: 0,
						},
						'>',
					);
			});
		}, containerRef);

		return () => {
			ctx.revert();
			if (container) {
				container.innerHTML = '';
			}
		};
	}, []);

	return <div ref={containerRef} className='sparkle-container' aria-hidden='true'></div>;
}
