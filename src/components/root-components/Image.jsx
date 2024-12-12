import React from 'react';

export default function Image({ src, alt = '', rotate = 0, className = '' }) {
	return (
		<img
			src={src}
			alt={alt}
			className={`${className} select-none ${rotate === 90
				? 'rotate-90'
				: rotate === 180
					? 'rotate-180'
					: rotate === 270
						? 'rotate-270'
						: ''
				}`}
		/>
	);
}