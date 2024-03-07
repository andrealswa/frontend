import {
	Button,
	Card,
	CardBody,
	CardHeader,
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
			.then((res) => setListItems(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		refreshList();
	}, []);

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

	const renderTodoItems = () => {
		const displayItems =
			listItems &&
			listItems.filter((item) => item.completed === displayCompleted);
		if (displayItems.length === 0) {
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
			return displayItems.map((item) => (
				<Card key={item.id} className="todo-app-main--card">
					<div className="todo-app-main--card-text">
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
			<Heading>Todo app</Heading>

			{renderTabList()}
			{renderTodoItems()}
			<Button
				className="add-button"
				onClick={handleAddItem}
				colorScheme="teal"
				variant="solid"
				leftIcon={<AddIcon />}>
				<Text>Add task</Text>
			</Button>
			{isModalOpen && (
				<AddTaskModal
					item={activeItem}
					isOpen={isModalOpen}
					setIsOpen={setIsModalOpen}
					onSave={handleSubmit}
				/>
			)}
		</div>
	);
};
