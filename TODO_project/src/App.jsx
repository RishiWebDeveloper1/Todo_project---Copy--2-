import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Search_panel from './component/Search_panel';
import Todo_container from './component/Todo_container';
import axios from 'axios';
import { io } from "socket.io-client";

function App() {
    const [todos, setTodo] = useState([]);

    useEffect(() => {
        fetchTodo();

        const socket = io("https://todo-master-server.vercel.app");
        
        socket.on("todoAdded", (newTodo) => {
            setTodo(prevTodos => [...prevTodos, newTodo]); // Update todos list
        });

        return () => {
            socket.disconnect(); // Clean up the socket connection
        };
    }, []);

    function fetchTodo() {
        axios.get('https://todo-master-server.vercel.app/get')
            .then(result => setTodo(result.data))
            .catch(err => console.log(err));
    }

    return (
        <>
            <Navbar />
            <Search_panel fetchTodo={fetchTodo} />
            <Todo_container todos={todos} fetchTodo={fetchTodo} />
        </>
    );
}

export default App;
