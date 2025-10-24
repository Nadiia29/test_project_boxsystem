import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import BrandLogo from './components/BrandLogo/BrandLogo';
import Collection from './components/Colection/Collection';
import Sparkles from './components/Sparkles/Sparkles';
import BackVideo from './components/Video/BackVideo/BackVideo';
import Logo1 from './assets/logoAuto/logo1';
import Logo2 from './assets/logoAuto/logo2';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
	const hallBackgroundRef = React.useRef(null);
	const insideBackgroundRef = React.useRef(null);

	const mainRef = useRef(null);
	const doorLeftRef = useRef(null);
	const doorRightRef = useRef(null);
	const heroRef = useRef(null);
	const heroContentRef = useRef(null);
	const enterButtonRef = useRef(null);
	const scrollHintRef = useRef(null);
	const videoContainerRef = useRef(null);
	const collectionRef = useRef(null);
	const mainTimeline = useRef(null);

	React.useEffect(() => {
		const ctx = gsap.context(() => {
			mainTimeline.current = gsap.timeline({ paused: true });

			mainTimeline.current
				.to(
					doorLeftRef.current,
					{ xPercent: -100, duration: 1.5, ease: 'power2.inOut' },
					'start',
				)
				.to(
					doorRightRef.current,
					{ xPercent: 100, duration: 1.5, ease: 'power2.inOut' },
					'start',
				)

				.to(
					[heroContentRef.current, enterButtonRef.current, scrollHintRef.current],
					{ autoAlpha: 0, duration: 1.5, ease: 'power2.inOut' },
					'start+=0.1',
				)

				.to(
					hallBackgroundRef.current,
					{ opacity: 0, duration: 1.5, ease: 'power2.inOut' },
					'start+=0.1',
				)

				.to(
					insideBackgroundRef.current,
					{ opacity: 1, duration: 1.5, ease: 'power2.inOut' },
					'start+=0.2',
				);

			ScrollTrigger.create({
				animation: mainTimeline.current,
				trigger: heroRef.current,
				start: 'top top',
				end: '+=500',
				scrub: 1.2,
				pin: true,
				anticipatePin: 1,
			});

			ScrollTrigger.create({
				trigger: mainRef.current,
				start: 'top+=100 top',
				onEnter: () => {
					setTimeout(() => {
						gsap.to(videoContainerRef.current, {
							opacity: 1,
							duration: 1.5,
							ease: 'power2.inOut',
						});
					}, 4000);
				},
				onLeaveBack: () =>
					gsap.to(videoContainerRef.current, {
						opacity: 0,
						duration: 1.5,
						ease: 'power2.inOut',
					}),
			});
		}, mainRef);

		return () => {
			ctx.revert();
			mainTimeline.current = null;
		};
	}, []);

	React.useEffect(() => {
		const handleMouseMove = (e) => {
			if (!mainTimeline.current || mainTimeline.current.progress() > 0.1) return;

			const { innerWidth, innerHeight } = window;
			const x = (e.clientX / innerWidth - 0.5) * 2;
			const y = (e.clientY / innerHeight - 0.5) * 2;

			gsap.to([doorLeftRef.current, doorRightRef.current], {
				backgroundPosition: (i, target) => {
					const isLeft = target.classList.contains('door-left');
					const initialXPercent = isLeft ? 0 : 100;
					const newX = initialXPercent - x * 0.8;
					const newY = 50 - y * 1.5;
					return `${newX}% ${newY}%`;
				},
				duration: 0.6,
				ease: 'power2.out',
			});

			gsap.to(heroContentRef.current, {
				x: x * 15,
				y: y * 10,
				duration: 0.6,
				ease: 'power2.out',
			});
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	const handleEnterClick = () => {
		if (mainTimeline.current) {
			gsap.to(mainTimeline.current, {
				progress: 1,
				duration: 2.5,
				ease: 'power2.inOut',
				onComplete: () => {
					setTimeout(() => {
						gsap.to(window, {
							duration: 2,
							scrollTo: { y: collectionRef.current, offsetY: 0 },
							ease: 'power2.inOut',
						});
					}, 500);
				},
			});
		}
	};

	return (
		<>
			<div ref={hallBackgroundRef} className='showroom-exterior-background'></div>
			<div ref={insideBackgroundRef} className='showroom-interior-background'></div>

			<div ref={doorLeftRef} className='door door-left'></div>
			<div ref={doorRightRef} className='door door-right'></div>

			<main ref={mainRef}>
				<section ref={heroRef} className='hero-section'>
					<Sparkles />

					<div ref={heroContentRef} className='hero-content'>
						<Logo1 />
						<Logo2 />
						<h1>Elite Auto Gallery</h1>
						<p>Discover Your Next Drive.</p>
					</div>
					<button
						ref={enterButtonRef}
						className='enter-button'
						onClick={handleEnterClick}
						aria-label='Enter the showroom'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3'
							/>
						</svg>
						<span className='enter-label'>Enter</span>
					</button>
					<p ref={scrollHintRef} className='scroll-hint'>
						Scroll down to enter
					</p>
				</section>

				<BackVideo ref={videoContainerRef} />

				<p ref={scrollHintRef} className='scroll-hint'>
					Scroll down to enter
				</p>

				<Collection ref={collectionRef} />
			</main>

			<BrandLogo />
		</>
	);
}
