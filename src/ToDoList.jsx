import React, { useState } from "react";
import './App.css'

const ToDoList = () => {
    // Define state for tasks and new task input
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('')

    // Handle input change
    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    // Handle task completion toggle
    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
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
                        <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;