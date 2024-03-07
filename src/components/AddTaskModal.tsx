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
} from '@chakra-ui/react';

interface AddTaskModalProps {
	className?: string;
	isOpen: boolean;
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
		<Modal isOpen={props.isOpen} onClose={() => {}}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Todo Item</ModalHeader>
				<ModalBody>
					<form>
						<FormControl>
							<FormLabel>Title</FormLabel>
							<Input
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
								type="checkbox"
								name="completed"
								checked={activeItem.completed}
								onChange={handleOnChange}>
								Completed
							</Checkbox>
						</FormControl>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						color="success"
						onClick={() => props.onSave(activeItem)}>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
