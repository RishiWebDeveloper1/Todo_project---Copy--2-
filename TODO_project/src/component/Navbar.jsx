import React, { useEffect, useState } from 'react'
import './Navbar.css'

const Navbar = () => {
    let [theme, setTheme] = useState('black')

    useEffect(() => {
        let body = document.querySelector('body');
        let megaContainer = document.querySelector('.mega-container');
        let addTodoButton = document.querySelector('.add-todo-button');
        if (theme == "white") {
            body.style.backgroundColor = theme;
            megaContainer.style.color = "black";
            addTodoButton.style.backgroundColor = "black";
            addTodoButton.style.color = "white";
        } else {
            body.style.backgroundColor = theme;
            megaContainer.style.color = "white";
            addTodoButton.style.backgroundColor = "white";
            addTodoButton.style.color = "black";
        }
    }, [theme])

    return (
        <>
            <nav>
                <div className="logo-box">TODO Master</div>
                <div className="navbar">
                    <div className="link-box" onClick={() => { theme == "white" ? setTheme("black") : setTheme("white") }}>Home</div>
                    <div className="link-box">About</div>
                    <div className="link-box">Contact Us</div>
                </div>
            </nav>
        </>
    )
}

export default Navbar