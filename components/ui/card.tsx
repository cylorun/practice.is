// components/ui/card.tsx

import React, { ReactNode } from 'react';

interface CardProps {
	children: ReactNode;
	className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
	return (
		<div
			className={`bg-card text-card-foreground p-6 rounded-[var(--radius)] shadow-lg shadow-black ${className}`}
		>
			{children}
		</div>
	);
};

interface CardHeaderProps {
	children: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
	return <div className="mb-4">{children}</div>;
};

interface CardTitleProps {
	children: ReactNode;
	className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
	return (
		<h2 className={`text-2xl font-semibold text-center ${className}`}>
			{children}
		</h2>
	);
};

interface CardContentProps {
	children: ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
	return <div className="mt-4">{children}</div>;
};
