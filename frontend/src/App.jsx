import { useEffect, useState } from 'react';
import Table from './components/Table.jsx';
import TForm from './components/Tform.jsx';
import axios from 'axios';

function App() {

  const [todo, newTodo] = useState("")

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    try{
        const response = await axios.get('http://127.0.0.1:8000/todo/')
        console.log(response);
        console.log('completed');
        
        
    } catch(error){
      console.log(error);
      
    }
  }

  return (
    <>
    <h1 className='text-center p-3'>Todo App</h1>
    <TForm />
    <Table />
    </>
  );
}

export default App;