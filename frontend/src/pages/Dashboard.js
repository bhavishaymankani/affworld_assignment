import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { fetchTasks, addTask, updateTaskStatus, deleteTask } from '../api/apiService';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({ title: '', description: '' });

  //const statuses = ['Pending', 'In Progress', 'Completed'];
  const statuses = ['Pending', 'Completed', 'Done'];

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    getTasks();
  }, []);

  const handleAddTask = async () => {
    if (taskInput.title && taskInput.description) {
      try {
        const newTask = await addTask({
          title: taskInput.title,
          description: taskInput.description,
          status: 'pending',
        });
        setTasks([...tasks, newTask]);
        setTaskInput({ title: '', description: '' });
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task._id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const moveTask = async (id, newStatus) => {
    try {
      await updateTaskStatus(id, newStatus);
      setTasks(tasks.map((task) => (task._id === id ? { ...task, status: newStatus } : task)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mt-5">
        <h2 className="text-center mb-4 fw-bold text-primary">Task Management Dashboard</h2>

        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3 text-secondary">Add New Task</h4>
          <div className="row g-3">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Task Title"
                value={taskInput.title}
                onChange={(e) => setTaskInput({ ...taskInput, title: e.target.value })}
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Task Description"
                value={taskInput.description}
                onChange={(e) => setTaskInput({ ...taskInput, description: e.target.value })}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-primary" onClick={handleAddTask}>
                <FaPlus className="me-1" /> Task
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          {statuses.map((statusCode) => (
            <TaskColumn
              key={statusCode}
              status={statusCode}
              tasks={tasks}
              moveTask={moveTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

const TaskColumn = ({ status, tasks, moveTask, handleDeleteTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, status.toLowerCase()),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const filteredTasks = tasks.filter((task) => task.status === status.toLowerCase());

  return (
    <div ref={drop} className="col-md-4">
      <div className={`card shadow-lg mb-4 ${isOver ? 'border-primary' : ''}`}>
        <div className="card-header bg-primary text-white text-center fw-bold">{status}</div>
        <div className="card-body bg-light" style={{ minHeight: '200px' }}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem key={task._id} task={task} handleDeleteTask={handleDeleteTask} />
            ))
          ) : (
            <p className="text-center text-muted">No tasks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

const TaskItem = ({ task, handleDeleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  return (
    <div ref={drag} 
    className={`card mb-3 shadow-sm `}
    style={{
      cursor: 'grab',
      opacity: isDragging ? 'unset' : 'unset', // Force full opacity during drag
      backgroundColor: 'white', // Ensures consistent background color
      boxShadow: isDragging ? '0px 5px 15px rgba(0,0,0,0.2)' : 'none',
    }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-0 fw-bold text-primary">{task.title}</h6>
          <p className="mb-0 text-muted">{task.description}</p>
        </div>
        <button className="btn btn-link p-0  fw-bold" 
          style={{ fontSize: '1.5rem', textDecoration: 'none' }} onClick={() => handleDeleteTask(task._id)}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
