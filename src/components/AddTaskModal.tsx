import React, { useState } from 'react';
import {
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from '@chakra-ui/react';

interface AddTaskModalProps {
	className?: string;
	isOpen: boolean;
	onSave: any;
	item: any;
}

export const AddTaskModal = (props: AddTaskModalProps) => {
	const [activeItem, setActiveItem] = useState(props.item);
	const handleOnChange = (e: any) => {
		let { name, value } = e.target;

		if (e.target.type === 'checkbox') {
			value = e.target.checked;
		}

		setActiveItem({ ...props.item, [name]: value });
	};

	return (
		<Modal isOpen={props.isOpen} onClose={() => {}}>
			<ModalHeader>Todo Item</ModalHeader>
			<ModalBody>
				<FormControl>
					<FormLabel>Title</FormLabel>
					<Input
						type="text"
						id="todo-title"
						name="title"
						value={activeItem.title}
						onChange={(e) => handleOnChange(e)}
						placeholder="Enter Todo Title"
					/>
					<FormLabel>Description</FormLabel>
					<Input
						type="text"
						id="todo-description"
						name="description"
						value={activeItem.description}
						onChange={(e) => handleOnChange(e)}
						placeholder="Enter Todo description"
					/>
					<Checkbox
						type="checkbox"
						name="completed"
						checked={activeItem.completed}
						onChange={(e) => handleOnChange(e)}>
						Completed
					</Checkbox>
				</FormControl>
			</ModalBody>
			<ModalFooter>
				<Button
					color="success"
					onClick={() => props.onSave(activeItem)}>
					Save
				</Button>
			</ModalFooter>
		</Modal>
	);
};
