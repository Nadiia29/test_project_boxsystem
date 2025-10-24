import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Collection.css';

gsap.registerPlugin(ScrollTrigger);

const cars = [
	{
		id: 1,
		name: 'Phantom Apex',
		description:
			'The embodiment of luxury and refined power. The Apex model features a bespoke starlight headliner and a whisper-quiet V12 engine, delivering an unparalleled, serene driving experience.',
		imageUrl:
			'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
	},
	{
		id: 2,
		name: 'Veloce Roadster',
		description:
			'An open-top celebration of Italian passion. The Veloce Roadster combines breathtaking design with a high-revving V8, offering an unfiltered connection to the road and the sky.',
		imageUrl:
			'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
	},
	{
		id: 3,
		name: 'Stallion GT',
		description:
			'American muscle, reimagined. The Stallion GT is an icon of performance, boasting aggressive aerodynamics and a supercharged engine that delivers exhilarating speed with every press of the pedal.',
		imageUrl:
			'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
	},
	{
		id: 4,
		name: 'Furia Rossa',
		description:
			'The heart of Italy, engineered for pure emotion. The Furia Rossa, with its naturally aspirated V12 engine and timeless design, offers a symphony of speed and an unforgettable, visceral driving experience.',
		imageUrl:
			'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
	},
	{
		id: 5,
		name: 'Sentinel 4x4',
		description:
			'The definitive luxury SUV. The Sentinel combines go-anywhere capability with a first-class interior, ensuring absolute comfort and control, whether navigating city streets or conquering wild terrains.',
		imageUrl:
			'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
	},
	{
		id: 6,
		name: 'E-Motion Grand Coupé',
		description:
			'The future of performance is here. This all-electric grand coupé offers blistering acceleration and a cutting-edge digital cockpit, all while producing zero emissions. A silent revolution.',
		imageUrl:
			'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
	},
];

function Overlay({ car, onClose }) {
	React.useEffect(() => {
		const handleEsc = (event) => {
			if (event.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', handleEsc);
		return () => window.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	React.useEffect(() => {
		gsap.fromTo(
			'.collection-overlay',
			{ opacity: 0, scale: 0.95 },
			{ opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
		);
	}, []);

	return (
		<div className='collection-overlay' onClick={onClose}>
			<div className='overlay-content' onClick={(e) => e.stopPropagation()}>
				<div className='overlay-image'>
					<img src={car.imageUrl} alt={car.name} />
				</div>
				<div className='overlay-details'>
					<h3>{car.name}</h3>
					<p>{car.description}</p>
				</div>
			</div>
			<button className='overlay-close-button' onClick={onClose}>
				&times;
			</button>
		</div>
	);
}

const Collection = React.forwardRef((props, ref) => {
	const [selectedCar, setSelectedCar] = React.useState(null);

	React.useLayoutEffect(() => {
		if (!ref || !ref.current) return;

		const ctx = gsap.context(() => {
			const items = gsap.utils.toArray('.grid-item');

			items.forEach((item, i) => {
				const direction = i % 2 === 0 ? -150 : 150;
				gsap.from(item, {
					opacity: 0,
					x: direction,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: item,
						start: 'top 85%',
					},
				});
			});
		}, ref);

		return () => ctx.revert();
	}, [ref]);

	return (
		<>
			<section ref={ref} className='collection-section'>
				<h2>Our Collection</h2>
				<div className='collection-grid'>
					{cars.map((car) => (
						<div
							key={car.id}
							className='grid-item'
							style={{ '--bg-image': `url(${car.imageUrl})` }}
							onClick={() => setSelectedCar(car)}
							role='button'
							tabIndex={0}
						>
							<h3 className='grid-item-title'>{car.name}</h3>
							<div className='click-hint'>Select</div>
						</div>
					))}
				</div>
			</section>

			{selectedCar && <Overlay car={selectedCar} onClose={() => setSelectedCar(null)} />}
		</>
	);
});

export default Collection;
