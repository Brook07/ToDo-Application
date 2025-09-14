import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import "./App.css";

function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleAddTodo = () => {
        let newTodoItem = {
            title: newTitle,
            description: newDescription,
        };

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    };

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1);

        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setTodos(reducedTodo);

        // Remove completed todo if deleted from the completed screen
        let reducedCompleted = [...completedTodos];
        reducedCompleted.splice(index, 1);
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
    };

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'));
        if (savedTodo) {
            setTodos(savedTodo);
        }
    }, []);

    return (
        <div className="App">
            <h1>My Todo Application</h1>

            <div className='todo-wrapper'> {/* Fixed classname to className */}
                <div className='todo-input'> {/* Fixed classname to className */}

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
                    {isCompleteScreen === false && allTodos.map((item, index) => {
                        return (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>

                                <div>
                                    <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} />
                                    <BsCheck className="check-icon" onClick={() => handleComplete(index)} />
                                </div>
                            </div>
                        );
                    })}

                    {isCompleteScreen === true && completedTodos.map((item, index) => {
                        return (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>Completed on: {item.completedOn}</small></p>
                                </div>

                                <div>
                                    <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
