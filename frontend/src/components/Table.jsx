import axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
function Table({ todo, newTodo, loading }) {

    const handleDelete = async (id) => {
        try{
        console.log("Deleting todo with ID:", id);
        await axios.delete(`http://127.0.0.1:8000/todo/${id}/`);
        const newList = todo.filter(element => element.id !== id);
        newTodo(newList);
        }
        catch(error) {
            console.log(error);
            
        }
    }

    const handleEdit = async (id,value) => {
        try{
            const response = await axios.patch(`http://127.0.0.1:8000/todo/${id}/`, value)
            const newList = todo.map(element => element.id === id ? response.data : element)
            newTodo(newList)
        }
        catch(error) {
            console.log(error);
            
        }
    }

    const handleCheckbox = async (id,value) => {
        handleEdit(id,{
            'completed' : !value
        })
    }




    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }

    if (!Array.isArray(todo)) {
        return <p>No todos available.</p>; // Handle case where todo is not an array
    }

    return (
        <div className="container">
            <table className="table table-bordered table-striped text-center">
                <thead>
                    <tr>
                        <th className="p-3">CheckBox</th>
                        <th className="p-3">Todo Item</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date Created</th>
                        <th className="p-3">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center p-3">
                                <input type="checkbox" defaultChecked={item.completed} onClick={() => handleCheckbox(item.id, item.completed)}/>
                            </td>
                            <td className="text-center p-3">
                                {item.completed ?  <strike>{item.body}</strike>: item.body }
                            </td>
                            <td className="text-center p-3">
                                <span>{item.completed ? 'Completed' : 'Pending'}</span>
                            </td>
                            <td className="text-center p-3">{new Date (item.created_at).toLocaleString()}</td>
                            <td className="text-center p-3">
                                <button className='cursor-pointer'>Edit</button>
                                <button className="mx-3 cursor-pointer" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </div>
    );
}

export default Table;