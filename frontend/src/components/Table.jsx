import axios from 'axios';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Table({ todo, newTodo, loading }) {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [editText, setEditText] = useState({
        'body' : ''
    })

    const [CurrentEditId, setCurrentEditId] = useState(null);

    const handleShow = (id, body) => {
        setCurrentEditId(id);
        setEditText({'body':body});
        setShow(true);
    }
    
    

    const handleDelete = async (id) => {
        try{
        // console.log("Deleting todo with ID:", id);
        await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
        const newList = todo.filter(element => element.id !== id);
        newTodo(newList);
        }
        catch(error) {
            console.log(error);
            
        }
    }

    const handleEdit = async (id,value) => {
        try{
            const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
            const newList = todo.map(element => element.id === id ? response.data : element)
            newTodo(newList)
        }
        catch(error) {
            console.log(error);
            
        }
        handleClose();
    }

    const handleCheckbox = async (id,value) => {
        handleEdit(id,{
            'completed' : !value
        })
    }

    const handleChange = (e) =>{
        setEditText(prev => ({
            ...prev,
            'body' : e.target.value
        }))
        // console.log(editText);
        
    }

    const handleClick = (id, value) =>{
        handleEdit(id, {
            'body': value
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
                                <button className='cursor-pointer' onClick={() =>handleShow(item.id,item.body)}>Edit</button>
                                <button className="mx-3 cursor-pointer" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" value={editText.body} onChange={(e)=>handleChange(e)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary"  onClick={() => handleEdit(CurrentEditId,editText)}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Table;