import React, {useEffect} from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
// import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";
// import { useEffect } from "react";

const AddTodo = React.lazy(()=> import('./Todo/AddTodo'))

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading]=React.useState(true)

  // [
  //     {id: 1, completed:false, title:'Купить хлеб'},
  //     {id: 2, completed:true, title:'Купить масло'},
  //     {id: 3, completed:false, title:'Купить молоко'}
  //   ]

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(()=>{
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
    
  }

  function removeTodo(id) {
   setTodos(todos.filter(todo => todo.id !== id)) 
  }
  
  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id:Date.now(), 
      completed:false
    }]))
  }

  return (
    <Context.Provider value={{removeTodo:removeTodo}}>
    <div className='wrapper'>
    
    <h1>react tutorial</h1>
    <Modal/>
    <React.Suspense fallback={<p>Loading....</p>}>
      <AddTodo onCreate={addTodo} />
    </React.Suspense>
    {loading && <Loader/> }
    {todos.length ? (
      <TodoList todos={todos} onTougle={toggleTodo}/>
    ) : (
     loading ? null :  <p>no todos</p>
    )}
    
    </div>
    </Context.Provider>

  )
  }

export default App;
