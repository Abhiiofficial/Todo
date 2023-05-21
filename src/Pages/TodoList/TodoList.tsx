import './TodoList.css'
import TodoLogin from '../../Components/TodoLogin/TodoLogin'
import TodoSignUp from '../../Components/TodoSignUp/TodoSignUp'
import Todo from '../../Components/Todo/Todo'
import { useState } from 'react'

const TodoList = () => {
  const [mode, setMode] = useState<string>("login")

  const getMode = (data:string) => {
    setMode(data)
  }
  return (
    <div className='todo'>
      <div className="bg-container">
        <img src='https://i.pinimg.com/originals/30/f4/0c/30f40c02566f9981446a10d52ece94bd.png' alt="" className="bg-image" />
      </div>
      {mode === 'login' && <TodoLogin getMode={getMode}/>}
      {mode === 'signup' && <TodoSignUp getMode={getMode}/>}
      {mode === 'todo' && <Todo />}
    </div>
  )
}

export default TodoList