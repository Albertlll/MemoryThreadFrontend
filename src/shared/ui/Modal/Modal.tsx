import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	className?: string;
}

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	className = "",
}: ModalProps) => {
	const [isVisible, setIsVisible] = useState(isOpen);
	const modalRef = useRef<HTMLDivElement>(null);

	// Handle ESC key press
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEsc);
		}

		return () => {
			document.removeEventListener("keydown", handleEsc);
		};
	}, [isOpen, onClose]);

	// Handle clicks outside the modal
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	// Sync isVisible with isOpen prop
	useEffect(() => {
		setIsVisible(isOpen);
	}, [isOpen]);

	// Prevent body scrolling when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isVisible ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 100 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-all duration-300 "
				>
					<div
						ref={modalRef}
						className={`bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto ${className}`}
					>
						<div className="flex justify-between items-center p-4 border-b">
							<div className="flex-1">
								{title && <h3 className="text-lg font-medium">{title}</h3>}
							</div>
							<button
								type="button"
								onClick={onClose}
								className="text-gray-400 hover:text-gray-500 focus:outline-none"
								aria-label="Закрыть"
							>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div className="p-4">{children}</div>
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};
