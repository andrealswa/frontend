import React, { useState } from 'react';
import {
	Button,
	Checkbox,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';

interface AddTaskModalProps {
	className?: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSave: any;
	item: any;
}

export const AddTaskModal = (props: AddTaskModalProps) => {
	const [activeItem, setActiveItem] = useState(props.item);
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const updatedItem = { ...activeItem, [name]: value };

		if (e.target.type === 'checkbox') {
			updatedItem[name] = e.target.checked;
		}

		setActiveItem(updatedItem);
	};

	return (
		<Modal
			isOpen={props.isOpen}
			closeOnOverlayClick
			onClose={() => props.setIsOpen(false)}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Todo Item</ModalHeader>
				<ModalBody>
					<form>
						<FormControl>
							<FormLabel>Title</FormLabel>
							<Input
								focusBorderColor="teal.400"
								type="text"
								id="todo-title"
								name="title"
								value={activeItem.title}
								onChange={handleOnChange}
								placeholder="Enter Todo Title"
							/>
							<FormHelperText>
								Enter a todo task title.
							</FormHelperText>
						</FormControl>
						<FormControl>
							<FormLabel>Description</FormLabel>
							<Input
								focusBorderColor="teal.400"
								type="text"
								id="todo-description"
								name="description"
								value={activeItem.description}
								onChange={handleOnChange}
								placeholder="Enter Todo description"
							/>
							<FormHelperText>
								Enter a description of the task.
							</FormHelperText>
						</FormControl>
						<FormControl>
							<Checkbox
								colorScheme="teal"
								type="checkbox"
								name="completed"
								checked={activeItem.completed}
								onChange={handleOnChange}>
								<Text>Completed</Text>
							</Checkbox>
						</FormControl>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="teal"
						variant="secondary"
						onClick={() => props.onSave(activeItem)}>
						<Text>Cancel</Text>
					</Button>
					<Button
						colorScheme="teal"
						variant="solid"
						onClick={() => props.onSave(activeItem)}>
						<Text>Save</Text>
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
