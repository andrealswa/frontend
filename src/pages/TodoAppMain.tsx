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
import React, { Component, useEffect, useState } from 'react';
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

	const handleSubmit = (item: any) => {
		handleAddItem();
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
					<Tab
						className={
							displayCompleted ? 'nav-link' : 'nav-link active'
						}
						onClick={() => setDisplayCompleted(false)}>
						Incomplete
					</Tab>
					<Tab
						className={
							displayCompleted ? 'nav-link active' : 'nav-link'
						}
						onClick={() => setDisplayCompleted(true)}>
						Complete
					</Tab>
				</TabList>
			</Tabs>
		);
	};

	const renderTodoItems = () => {
		if (listItems == null) {
			return (
				<Card className="todo-app-main--card">
					<div className="todo-app-main--card-text">
						<CardHeader
							fontSize="2xl"
							className={displayCompleted ? 'completed-todo' : ''}>
							No list items
						</CardHeader>
						<CardBody
							className={displayCompleted ? 'completed-todo' : ''}>
							Please add items to todo list
						</CardBody>
					</div>
				</Card>
			);
		} else {
			const newItems = listItems.filter(
				(item) => item.completed === displayCompleted
			);

			return newItems.map((item) => (
				<Card key={item.id} className="todo-app-main--card">
					<div className="todo-app-main--card-text">
						<CardHeader
							fontSize="2xl"
							className={displayCompleted ? 'completed-todo' : ''}>
							{item.title}
						</CardHeader>
						<CardBody
							className={displayCompleted ? 'completed-todo' : ''}>
							{item.description}
						</CardBody>
					</div>
					<div className="todo-app-main--card-buttons">
						<Button
							colorScheme="teal"
							variant="outline"
							leftIcon={<EditIcon />}>
							Edit
						</Button>
						<Button
							colorScheme="red"
							variant="solid"
							leftIcon={<DeleteIcon />}>
							Delete
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
				Add task
			</Button>
			{isModalOpen && (
				<AddTaskModal
					item={activeItem}
					isOpen={isModalOpen}
					onSave={handleSubmit}
				/>
			)}
		</div>
	);
};
