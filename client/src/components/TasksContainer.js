import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TasksContainer = () => {
	const [tasks, setTasks] = useState({
		pending: {
			title: "pending",
			items: [
				{
					id: Math.random().toString(36).substring(2, 10),
					title: "Send the Figma file to Dima",
					comments: [],
				},
			],
		},
		ongoing: {
			title: "ongoing",
			items: [
				{
					id: Math.random().toString(36).substring(2, 10),
					title: "Review GitHub issues",
					comments: [
						{
							name: "David",
							text: "Ensure you review before merging",
							id: Math.random().toString(36).substring(2, 10),
						},
					],
				},
			],
		},
		completed: {
			title: "completed",
			items: [
				{
					id: Math.random().toString(36).substring(2, 10),
					title: "Create technical contents",
					comments: [
						{
							name: "Dima",
							text: "Make sure you check the requirements",
							id: Math.random().toString(36).substring(2, 10),
						},
					],
				},
			],
		},
	})

	useEffect(() => {
		/*function fetchTasks() {
			fetch("http://localhost:4000/api")
				.then((res) => res.json())
				.then((data) => setTasks(data));
		}*/

		// setTasks
		// fetchTasks();
	}, []);


	const handleDragEnd = ({ destination, source }) => {
		if (!destination) return;
		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		)
			return;
	};
	return (
		<div className='container'>
			<DragDropContext onDragEnd={handleDragEnd}>
				{Object.entries(tasks).map((task) => (
					<div
						className={`${task[1].title.toLowerCase()}__wrapper`}
						key={task[1].title}
					>
						<h3>{task[1].title} Tasks</h3>
						<div className={`${task[1].title.toLowerCase()}__container`}>
							<Droppable droppableId={task[1].title}>
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										{task[1].items.map((item, index) => (
											<Draggable
												key={item.id}
												draggableId={item.id}
												index={index}
											>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className={`${task[1].title.toLowerCase()}__items`}
													>
														<p>{item.title}</p>
														<p className='comment'>
															<Link
																to={`/comments/${task[1].title}/${item.id}`}
															>
																{item.comments.length > 0
																	? `View Comments`
																	: "Add Comment"}
															</Link>
														</p>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					</div>
				))}
			</DragDropContext>
		</div>
	);
};

export default TasksContainer;