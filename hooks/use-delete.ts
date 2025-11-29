import { useState } from "react";

interface ConfirmationOptions {
	title: string;
	message: string;
	onConfirm: () => void;
}

export const useConfirmation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [confirmationOptions, setconfirmationOptions] = useState<ConfirmationOptions | null>();

	const confirm = (options: ConfirmationOptions) => {
		setconfirmationOptions(options);
		setIsOpen(true);
	};

	const handleConfirm = () => {
		confirmationOptions?.onConfirm();
		setIsOpen(false);
	};

	const handleCancel = () => {
		setIsOpen(false);
	};

	return {
		isOpen,
		confirm,
		handleConfirm,
		handleCancel,
		confirmationOptions
	};
};
