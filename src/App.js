import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import "./App.css";

function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);
    const [currentEdit, setCurrentEdit] = useState(null);
    const [currentEditedItem, setCurrentEditedItem] = useState({ title: '', description: '' });

    const handleAddTodo = () => {
        if (newTitle.trim() === "" || newDescription.trim() === "") {
        alert("Title and Description cannot be empty!");
        return; // Prevent adding empty todos
        }
        let newTodoItem = {
            title: newTitle,
            description: newDescription,
        };

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

        setNewTitle("");  // Clear title
        setNewDescription("");  // Clear description
    };

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1);

        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setTodos(reducedTodo);

        // Remove completed todo if deleted from the completed screen
        let reducedCompleted = [...completedTodos];
        reducedCompleted.splice(index, 1);
        localStorage.setItem('completedTodos', JSON.stringify(reducedCompleted)); // Save updated completed todos
        setCompletedTodos(reducedCompleted);
    };

    const handleComplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

        let filteredItem = {
            ...allTodos[index],
            completedOn: completedOn,
        };

        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filteredItem);
        setCompletedTodos(updatedCompletedArr);

        // Remove the completed todo from the 'allTodos' array
        let updatedAllTodos = [...allTodos];
        updatedAllTodos.splice(index, 1);
        setTodos(updatedAllTodos);
        localStorage.setItem('todolist', JSON.stringify(updatedAllTodos));

        // Save completed todos to localStorage
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
    };

    const handleDeleteCompletedTodo = (index) => {
        let reducedCompleted = [...completedTodos];
        reducedCompleted.splice(index, 1);

        localStorage.setItem('completedTodos', JSON.stringify(reducedCompleted));
        setCompletedTodos(reducedCompleted);
    };

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'));
        let savedCompleted = JSON.parse(localStorage.getItem('completedTodos'));
        if (savedTodo) {
            setTodos(savedTodo);
        }
        if (savedCompleted) {
            setCompletedTodos(savedCompleted);
        }
    }, []);

    const handleEdit = (index, item) => {
        setCurrentEdit(index);
        setCurrentEditedItem({ title: item.title, description: item.description });
    };

    const handleUpdateTitle = (value) => {
        setCurrentEditedItem(prev => ({
            ...prev,
            title: value
        }));
    };

    const handleUpdatedDescription = (value) => {
        setCurrentEditedItem(prev => ({
            ...prev,
            description: value
        }));
    };

    const handleUpdateTodo = () => {
        let updatedTodos = [...allTodos];
        updatedTodos[currentEdit] = currentEditedItem; // Update the todo at currentEdit index
        setTodos(updatedTodos);
        localStorage.setItem('todolist', JSON.stringify(updatedTodos));
        setCurrentEdit(null); // Reset the edit state
    };

    return (
        <div className="App">
            <h1>My Todo Application</h1>

            <div className='todo-wrapper'>
                <div className='todo-input'>
                    <div className='todo-input-item'>
                        <label>Title</label>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the task?" />
                    </div>

                    <div className="todo-input-item">
                        <label>Description</label>
                        <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the Description?" />
                    </div>

                    <div className="todo-input-item">
                        <button type="button" onClick={handleAddTodo} className="primaryBtn">
                            Add
                        </button>
                    </div>
                </div>

                <div className='btn-area'>
                    <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
                    <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
                </div>

                <div className="todo-list">
                    {isCompleteScreen === false &&
                        allTodos.map((item, index) => {
                            if (currentEdit === index) {
                                return (
                                    <div className='edit_wrapper' key={index}>
                                        <input placeholder='Updated Title'
                                            onChange={(e) => handleUpdateTitle(e.target.value)}
                                            value={currentEditedItem.title}
                                        />
                                        <textarea placeholder='Updated Description'
                                            rows={4}
                                            onChange={(e) => handleUpdatedDescription(e.target.value)}
                                            value={currentEditedItem.description}
                                        />
                                        <button type="button" onClick={handleUpdateTodo} className="primaryBtn">
                                            Update
                                        </button>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className='todo-list-item' key={index}>
                                        <div>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                        <div>
                                            <AiOutlineDelete className='icon'
                                                onClick={() => handleDeleteTodo(index)}
                                                title="Delete?"
                                            />
                                            <BsCheckLg className="check-icon"
                                                onClick={() => handleComplete(index)}
                                                title="Complete?"
                                            />
                                            <AiOutlineEdit className="check-icon"
                                                onClick={() => handleEdit(index, item)}
                                                title="Edit?"
                                            />
                                        </div>
                                    </div>
                                );
                            }
                        })
                    }

                    {isCompleteScreen === true &&
                        completedTodos.map((item, index) => (
                            <div className='todo-list-item' key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p>Completed on: {item.completedOn}</p> {/* Show completion time */}
                                </div>
                                <div>
                                    <AiOutlineDelete className='icon'
                                        onClick={() => handleDeleteCompletedTodo(index)}
                                        title="Delete Completed?"
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
