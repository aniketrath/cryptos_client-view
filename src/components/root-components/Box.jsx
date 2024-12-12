import React from 'react';

export default function Box({ children, className = '', horizontal = false, onClick }) {
	if (horizontal) {
		return <div onClick={onClick} className={`flex flex-row ${className}`}>{children}</div>;
	}

	return <div onClick={onClick} className={`flex flex-col ${className}`}>{children}</div>;
}
