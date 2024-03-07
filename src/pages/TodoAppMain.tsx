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
import React, { Component, useState } from 'react';
import './TodoAppMain.scss';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

export interface TodoAppMainProps {
	className?: string;
}

export const TodoAppMain: React.FC = (props: TodoAppMainProps) => {
	const [displayCompleted, setDisplayCompleted] =
		useState<boolean>(false);

	const defaultTodoItems = [
		{
			id: 1,
			title: 'Make Breakfast',
			description: 'Make parfait and brew coffee',
			completed: true,
		},
		{
			id: 2,
			title: 'Work out',
			description: 'Go to gym for 1hr',
			completed: false,
		},
		{
			id: 3,
			title: 'Finish project',
			description: 'Go to cafe and wrap up django-react app',
			completed: true,
		},
		{
			id: 4,
			title: 'Date night',
			description: 'Movies at 7pm',
			completed: false,
		},
	];

	const renderTabList = () => {
		return (
			<Tabs colorScheme="teal">
				<TabList>
					<Tab
						className={
							displayCompleted ? 'nav-link active' : 'nav-link'
						}
						onClick={() => setDisplayCompleted(true)}>
						Complete
					</Tab>
					<Tab
						className={
							displayCompleted ? 'nav-link' : 'nav-link active'
						}
						onClick={() => setDisplayCompleted(false)}>
						Incomplete
					</Tab>
				</TabList>
			</Tabs>
		);
	};

	const renderTodoItems = () => {
		const newItems = defaultTodoItems.filter(
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
	};

	return (
		<div className="todo-app-main--container">
			<Heading>Todo app</Heading>

			{renderTabList()}
			{renderTodoItems()}
			<Button
				className="add-button"
				colorScheme="teal"
				variant="solid"
				leftIcon={<AddIcon />}>
				Add task
			</Button>
		</div>
	);
};
