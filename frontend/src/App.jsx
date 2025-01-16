import { useEffect, useState } from 'react';
import Table from './components/Table.jsx';
import TForm from './components/Tform.jsx';
import axios from 'axios';

function App() {

  const [todo, newTodo] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    try{
        const response = await axios.get('http://127.0.0.1:8000/todo/')
        newTodo(response.data)
        setLoading(false)
        
    } catch(error){
      console.log(error);
      
    }
  }

  return (
    <>
    <h1 className='text-center p-3'>Todo App</h1>
    <TForm fetchData = {fetchData}/>
    <Table todo = {todo} 
            newTodo = {newTodo} 
            loading = {loading}/>
    </>
  );
}

export default App;