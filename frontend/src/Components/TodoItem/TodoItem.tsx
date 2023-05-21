import './TodoItem.css'

function TodoItem() {
  return (
    <>
   <div>
   <hr className='hr-todo'/>
   </div>
    <div className='todo-item-container'>
      <div className="todo-item-left">
        <span className="material-symbols-outlined complete">
          radio_button_unchecked
        </span>
      </div>
      <div className="todo-item-center">
        <div className="todo-title-row">
          <span className="title">CODING</span>
        </div>
        <div className="todo-time-row">
          <span className="time">4 min ago</span>
        </div>
      </div>
      <div className="todo-item-right">
        <span className="material-symbols-outlined delete">
          delete
        </span>
      </div>
    </div>
    </>
  )
}

export default TodoItem