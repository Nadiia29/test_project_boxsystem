import * as React from 'react';
import Logo1 from '../../assets/logoAuto/logo1';
import Logo2 from '../../assets/logoAuto/logo2';

export default function BrandLogo() {
	return (
		<div className='brand-corner-frame'>
			<Logo1 />
			<Logo2 />
			<div className='rich-logo'>
				rich<sup>TM</sup>
			</div>
		</div>
	);
}
