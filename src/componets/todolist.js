import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Tasks saved!');
  };

  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  };

  const exportTasks = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "tasks.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="container mx-auto mt-10 p-5 max-w-xl">
      <h1 className="text-3xl font-bold mb-5 text-center">To-Do List</h1>
      <div className="flex mb-5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for "Enter" key press
          placeholder="Add a new task"
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <button 
          onClick={addTask}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <ul className="list-none p-0">
        {tasks.map((task, index) => (
          <li 
            key={index} 
            className={`p-2 mb-2 border border-gray-300 rounded-md flex items-center`}
          >
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleTaskCompletion(index)} 
              className="mr-2"
            />
            <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
            <button 
              onClick={() => deleteTask(index)} 
              className="ml-auto p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-5">
        <button 
          onClick={saveTasks}
          className="p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Save Tasks
        </button>
        <button 
          onClick={loadTasks}
          className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Load Tasks
        </button>
        <button 
          onClick={exportTasks}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Export Tasks
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
