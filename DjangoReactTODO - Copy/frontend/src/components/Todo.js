import React, { Component, useEffect, useState } from 'react'
import axios from 'axios';

function Todo() {
    const emptyTodo = [['(No Message)', '(No Name)', -1]]
    const [todos, setTodos] = useState(emptyTodo)
    const [item, setItem] = useState("")
    const [name, setName] = useState("")

    async function refresh() {
        await axios.get('http://localhost:8000/task-list/').then((response) => {
            console.log(response.data.data)
            console.log(response.data.data.length)
            let data = []
            for(var i = 0; i < response.data.data.length; i++){
                data.push([response.data.data[i].todo,response.data.data[i].name,response.data.data[i]._id])
            }
            if (response.data.data.length === 0) {
                setTodos(emptyTodo)
            } else {
                setTodos(data)
            }
        });
    }
    
    function changeHandler(event) {
        setItem(event.target.value)
        console.log(event.target.value)
    }

    function changeHandler2(event) {
        setName(event.target.value)
        console.log(event.target.value)
    }

    async function clickHandler(event) {
        event.preventDefault()
        console.log(item)
        await axios({
            method: 'post',
            url: 'http://localhost:8000/task-create/',
            data: {
                todo: item,
                name: name,
            }
        });
        refresh()
        
    }

    async function editHandler(event, id) {
        event.preventDefault()
        console.log(item)
        await axios({
            method: 'put',
            url: 'http://localhost:8000/task-update/'+id,
            data: {
                todo: item,
                name: name,
            }
          });
        refresh()
    }

    async function deleteHandler(event, id) {
        event.preventDefault()
        console.log(item)
        await axios({
            method: 'delete',
            url: 'http://localhost:8000/task-delete/'+id,
          });
        refresh()
    }

    useEffect(()=>refresh(),[])

        
    return (
        <div>
            <input type="text" onChange={e => changeHandler2(e)} placeholder='Name...'/>
            <input type="text" onChange={e => changeHandler(e)} placeholder="Message..."/>
            <button type="submit" onClick={e => clickHandler(e)}>Add message</button>
            <div>
                <ul>{todos.map((todo, index) => 
                        <div className='listItem'>
                            {(todo[2] !== -1) ? <div> 
                            <li key={index}> {todo[1]}: {todo[0]}</li>
                                <button type='submit' onClick={(e) => deleteHandler(e, todo[2])} key={index}>Delete</button> 
                                <button type='submit' onClick={(e) => editHandler(e, todo[2])} key={index}>Edit</button> 
                                </div>
                                : "There are no items in the list."}
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
    

}

export default Todo