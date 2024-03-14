import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Checkbox,
	FormControl,
	Heading,
	Tab,
	TabList,
	Tabs,
	Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import './TodoAppMain.scss';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { AddTaskModal } from '../components/AddTaskModal';
import axios from 'axios';

export interface TodoFields {
	id?: string;
	title: string;
	description: string;
	completed: boolean;
}

export const TodoAppMain: React.FC = () => {
	const [displayCompleted, setDisplayCompleted] =
		useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [activeItem, setActiveItem] = useState<TodoFields>({
		title: '',
		description: '',
		completed: false,
	});
	const [listItems, setListItems] = useState<TodoFields[]>([]);

	const refreshList = () => {
		axios
			.get('/api/todos/')
			.then((res) => setListItems([...res.data]))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		refreshList();
	}, [setListItems]);

	const handleAddItem = () => {
		const item = { title: '', description: '', completed: false };
		setActiveItem(item);
		setIsModalOpen(!isModalOpen);
	};

	const handleEditItem = (item: TodoFields) => {
		setActiveItem(item);
		setIsModalOpen(!isModalOpen);
	};

	const handleDeleteItem = (item: TodoFields) => {
		axios.delete(`/api/todos/${item.id}/`).then(refreshList);
	};

	const handleSubmit = (item: TodoFields) => {
		setIsModalOpen(!isModalOpen);

		if (item.id) {
			axios.put(`/api/todos/${item.id}/`, item).then(refreshList);
			return;
		}

		axios.post('/api/todos/', item).then(refreshList);
	};

	const renderTabList = () => {
		return (
			<Tabs colorScheme="teal">
				<TabList>
					<Tab onClick={() => setDisplayCompleted(false)}>
						<Text>Incomplete</Text>
					</Tab>
					<Tab onClick={() => setDisplayCompleted(true)}>
						<Text>Complete</Text>
					</Tab>
				</TabList>
			</Tabs>
		);
	};

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		item: TodoFields
	) => {
		const { name, value } = e.target;
		const updatedItem: TodoFields = { ...item, [name]: value };

		if (e.target.type === 'checkbox') {
			updatedItem.completed = e.target.checked;

			setListItems(
				listItems.map((todo) =>
					todo.id == item.id ? { ...updatedItem } : todo
				)
			);

			item = updatedItem;
			setActiveItem(updatedItem);
		}

		if (activeItem.title === '') {
			setActiveItem(updatedItem);
		} else {
			setActiveItem(updatedItem);
		}
	};

	const renderTodoItems = () => {
		const displayItems =
			Array.isArray(listItems) &&
			listItems.filter((item) => item.completed === displayCompleted);
		if (
			displayItems == null ||
			!displayItems ||
			(displayItems && displayItems.length === 0)
		) {
			return (
				<Card className="todo-app-main--card">
					<div className="todo-app-main--card-text">
						<CardHeader fontSize="2xl">
							<Text>No list items</Text>
						</CardHeader>
						<CardBody>
							<Text>Please add items to todo list</Text>
						</CardBody>
					</div>
				</Card>
			);
		} else {
			return listItems
				.filter((item) => item.completed === displayCompleted)
				.map((item, index) => (
					<Card key={index} className="todo-app-main--card">
						<div className="todo-app-main--card-text">
							<form>
								<FormControl>
									<Checkbox
										key={item.id}
										colorScheme="teal"
										type="checkbox"
										name="completed"
										isChecked={item.completed}
										checked={item.completed}
										onChange={(e) => handleOnChange(e, item)}>
										<Text>Completed</Text>
									</Checkbox>
								</FormControl>
							</form>
							<CardHeader fontSize="2xl">
								<Text>{item.title}</Text>
							</CardHeader>
							<CardBody>
								<Text>{item.description}</Text>
							</CardBody>
						</div>
						<div className="todo-app-main--card-buttons">
							<Button
								onClick={() => handleEditItem(item)}
								colorScheme="teal"
								variant="outline"
								leftIcon={<EditIcon />}>
								<Text>Edit</Text>
							</Button>
							<Button
								onClick={() => handleDeleteItem(item)}
								colorScheme="red"
								variant="solid"
								leftIcon={<DeleteIcon />}>
								<Text>Delete</Text>
							</Button>
						</div>
					</Card>
				));
		}
	};

	return (
		<div className="todo-app-main--container">
			<div className="todo-app-main--header-wrapper">
				<Heading>Todo app</Heading>
				<Button
					className="add-button"
					onClick={handleAddItem}
					colorScheme="teal"
					variant="solid"
					leftIcon={<AddIcon />}>
					<Text>Add task</Text>
				</Button>
			</div>
			{renderTabList()}
			{renderTodoItems()}
			{isModalOpen && (
				<AddTaskModal
					activeItem={activeItem}
					setActiveItem={setActiveItem}
					isOpen={isModalOpen}
					setIsOpen={setIsModalOpen}
					onSave={handleSubmit}
					handleOnChange={handleOnChange}
				/>
			)}
		</div>
	);
};
