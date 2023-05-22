import './TodoItem.css'

interface TodoItemProps {
  todo: {
    todoTitle: string,
    isCompleted: boolean,
    _id: string,
    createdAt: {
      ago: string
    },
    updatedAt: {
      ago: string
    }
  };
  getMode: (data: string) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

function TodoItem({ todo, onDelete, onComplete }: TodoItemProps) {

  // const handleLogout = () => {
  //   Cookies.remove('todo_token')
  //   toast.success('logged out successful', {
  //     position: 'top-center',
  //     style: {
  //       border: '1px solid green'
  //     }
  //   })
  // }
  // useEffect(() => {
  //   setCompleted(isCompleted)
  // }, [isCompleted])


  // const changeMode = () => {
  //   setCompleted(isCompleted)
  // }



  const handleDelete = () => {
    console.log(todo?._id)
    onDelete(todo?._id);
  };

  const handleComplete = () => {
    console.log(todo?._id)
    onComplete(todo?._id)
  }

  return (
    <>
      <div>
        <hr className='hr-todo' />
      </div>
      <div className='todo-item-container'>
        <div className="todo-item-left">
          {todo?.isCompleted  ?
            <span className="material-symbols-outlined complete" onClick={handleComplete}>
              radio_button_checked
            </span>
            :
            <span className="material-symbols-outlined complete" onClick={handleComplete}>
              radio_button_unchecked
            </span>
          }
        </div>
        <div className="todo-item-center">
          <div className="todo-title-row">
            <span className={todo?.isCompleted ? "title-complete" : "title"}>{todo?.todoTitle}</span>
          </div>
          <div className="todo-time-row">
            <div className="time-row">
              <span className="time">{todo?.createdAt.ago}</span>
            </div>
            {todo?.isCompleted ?
              <div className="time-row">
                <span className="time">Completed: {todo?.updatedAt.ago}</span>
              </div>
              :
              <></>
            }
          </div>
        </div>
        <div className="todo-item-right">
          <span className="material-symbols-outlined delete" onClick={handleDelete}>
            delete
          </span>
        </div>
      </div>
    </>
  )
}

export default TodoItem