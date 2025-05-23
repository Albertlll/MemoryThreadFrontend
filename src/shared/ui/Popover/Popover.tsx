import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface PopoverProps {
	trigger: ReactNode;
	content: ReactNode;
	position?: "top" | "right" | "bottom" | "left";
	className?: string;
	isOpen?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
}

export const Popover = ({
	trigger,
	content,
	position = "bottom",
	className = "",
	isOpen: controlledIsOpen,
	onOpenChange,
}: PopoverProps) => {
	const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
	const popoverRef = useRef<HTMLDivElement>(null);

	// Handle controlled state
	useEffect(() => {
		if (controlledIsOpen !== undefined) {
			setIsOpen(controlledIsOpen);
		}
	}, [controlledIsOpen]);

	const handleToggle = () => {
		const newIsOpen = !isOpen;
		setIsOpen(newIsOpen);
		onOpenChange?.(newIsOpen);
	};

	// Close popover when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				onOpenChange?.(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onOpenChange]);

	// Position classes
	const positionClasses = {
		top: "bottom-full mb-2",
		right: "left-full ml-2",
		bottom: "top-full mt-2",
		left: "right-full mr-2",
	};

	return (
		<div className="relative inline-block" ref={popoverRef}>
			<button
				onClick={handleToggle}
				className="cursor-pointer bg-transparent border-0 p-0 m-0 text-left"
				type="button"
			>
				{trigger}
			</button>

			{isOpen && (
				<div
					className={`absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg p-4 ${positionClasses[position]} ${className}`}
				>
					{content}
				</div>
			)}
		</div>
	);
};
