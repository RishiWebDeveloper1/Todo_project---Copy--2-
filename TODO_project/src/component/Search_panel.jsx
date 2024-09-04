import React, { useState } from 'react'
import axios from 'axios'
import './Search_panel.css'

const Search_panel = ({ fetchTodo }) => {
    const [task, setTask] = useState('');

    const handlerAdd = () => {
        axios.post(`https://todo-master-server.vercel.app/add`, { task })
            .then(result => {
                setTask('');
                fetchTodo();
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="todo-input-box">
                <textarea type="text" name="todo_input" value={task} onChange={(e) => setTask(e.target.value)} className="todo-input"></textarea>
                <div className="add-todo-button-box">
                    <input type="button" value="ADD" onClick={handlerAdd} className="add-todo-button" />
                </div>
            </div>
        </>
    )
}

export default Search_panel
