import React from 'react';
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
import { TodoFields } from '../pages/TodoAppMain';

interface AddTaskModalProps {
	className?: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSave: any;
	activeItem: TodoFields;
	setActiveItem: React.Dispatch<React.SetStateAction<TodoFields>>;
	handleOnChange: (
		e: React.ChangeEvent<HTMLInputElement>,
		item: TodoFields
	) => void;
}

export const AddTaskModal = (props: AddTaskModalProps) => {
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
								value={props.activeItem.title}
								onChange={(e) =>
									props.handleOnChange(e, props.activeItem)
								}
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
								value={props.activeItem.description}
								onChange={(e) =>
									props.handleOnChange(e, props.activeItem)
								}
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
								isChecked={props.activeItem.completed}
								checked={props.activeItem.completed}
								onChange={(e) =>
									props.handleOnChange(e, props.activeItem)
								}>
								<Text>Completed</Text>
							</Checkbox>
						</FormControl>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="teal"
						variant="secondary"
						onClick={() => {
							props.setIsOpen(false);
						}}>
						<Text>Cancel</Text>
					</Button>
					<Button
						colorScheme="teal"
						variant="solid"
						onClick={() => props.onSave(props.activeItem)}>
						<Text>Save</Text>
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
