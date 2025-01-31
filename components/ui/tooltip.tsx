'use client'
import React, { ReactNode, useState } from 'react';

interface TooltipProps {
	children: ReactNode;
	text: string;
	direction?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, direction = 'top' }) => {
	const [isHovered, setIsHovered] = useState(false);

	const positionClasses = {
		top: 'bottom-full mb-2 transform -translate-x-1/2',
		bottom: 'top-full mt-2 transform -translate-x-1/2',
		left: 'right-full mr-2 transform -translate-y-1/2',
		right: 'left-full ml-2 transform -translate-y-1/2',
	};

	return (
		<div
			className="relative inline-block"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}

			{isHovered && (
				<div
					className={`absolute ${positionClasses[direction]} px-4 py-2 text-card-foreground bg-card text-sm rounded-md shadow-lg`}
				>
					{text}
				</div>
			)}
		</div>
	);
};

export default Tooltip;
