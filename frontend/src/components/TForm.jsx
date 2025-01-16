import { useState } from "react";
import axios from 'axios';


function Tform({fetchData}) {
    const [newTodo, setNewTodo] = useState({
        'body': ''
        })

    const handleChange = (e) =>{
        setNewTodo(prev => ({
            ...prev,
            'body' : e.target.value
        }))
        // console.log(newTodo);
    }

    const postTodo = async () => {
        try {
        await axios.post('http://127.0.0.1:8000/todo/', newTodo);
        fetchData();
        setNewTodo({'body': ""})
        } catch(error) {
            console.log(error);    
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            postTodo();
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center pb-4">
            <div className="input-group">
                <input className="form-control m-2" type="text" placeholder="Enter your task" onChange={(e) => handleChange(e)} value={newTodo.body} onKeyPress={handleKeyPress} />
                <button className="btn btn-primary m-2" onClick={postTodo}>Add</button>
            </div>
        </div>
    );
}

export default Tform;