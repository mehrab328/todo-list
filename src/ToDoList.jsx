import React, { useState } from "react";
import "./App.css";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editedTask, setEditedTask] = useState('');

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleEditClick = (index) => {
        setIsEditing(index);
        setEditedTask(tasks[index].text);
    };

    const handleEditChange = (e) => {
        setEditedTask(e.target.value);
    };

    const handleEditSubmit = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: editedTask } : task
        );
        setTasks(updatedTasks);
        setIsEditing(null);
        setEditedTask('');
    };

    const handleDeleteClick = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className="todo-container">
            <h1 className="todo-title">To-Do List</h1>
            <form onSubmit={handleFormSubmit} className="todo-form">
                <input 
                    type="text" 
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Enter a new task"
                    className="todo-input"
                />
                <button type="submit" className="todo-button">Add Task</button>
            </form>
            <ul className="todo-list">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={`todo-item ${task.completed ? 'completed' : ''}`}
                    >
                        {isEditing === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTask}
                                    onChange={handleEditChange}
                                    className="edit-input"
                                />
                                <button onClick={() => handleEditSubmit(index)} className="save-button">Save</button>
                            </>
                        ) : (
                            <>
                                <span onClick={() => toggleTaskCompletion(index)} className="task-text">{task.text}</span>
                                <button onClick={() => handleEditClick(index)} className="edit-button">Edit</button>
                                <button onClick={() => handleDeleteClick(index)} className="delete-button">Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
