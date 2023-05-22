import './Todo.css'
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import TodoItem from '../TodoItem/TodoItem';

function Todo() {
  const [showPicker, setShowPicker] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.unified);
    setInputValue((prevValue) => prevValue + emojiData.emoji);
  }

  console.log(selectedEmoji)


  return (
    <div className='todo-list'>
      <div className="todo-list-container">
        <div className="todo-title">
          <div className="todo-left">
            <div className="todo-left-item">
              <span className="todo-title-name">TODO</span>
            </div>
          </div>
          <div className="todo-right">
            <div className="todo-right-item">
              <button className="logout">LOGOUT</button>
            </div>
          </div>
        </div>

        <div className="todo-new-task">
          <div className="new-task-row">
            <div className="new-task-left">
              <div className="emoji-left">
                <span className="material-symbols-outlined emoji-icon" onClick={() => setShowPicker(!showPicker)}>
                  mood
                </span>
              </div>
            </div>
            <div className="new-task-center">
              <div className="new-task-input">
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" className='todo-input' placeholder='Add a new task ! Eg: Coding, Hacking' />
              </div>
            </div>
            <div className="new-task-right">
              <div className="new-task-send">
                <span className="material-symbols-outlined emoji-icon">
                  send
                </span>
              </div>
            </div>
          </div>
          {showPicker &&
            <div className="emoji-picker-container" >
              <EmojiPicker height={370} onEmojiClick={onClick} />
            </div>
          }
        </div>

        <div className="added-todo-container">
          <div className="todo-info-row">
            <div className="todo-info-left">
              <div className="info-left">
                <span className="info">All Tasks: <button className="info-count-left">1</button></span>
              </div>
            </div>
            <div className="todo-info-right">
              <div className="info-right">
                <span className="info">Completed Tasks: <button className="info-count">1 of 9</button></span>
              </div>
            </div>
          </div>
          {/* <hr className='hr-todo'/> */}
          <div className="todo-item-row">
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
          </div>
          <div className="todo-action-row">
            <div className="action-left">
              <span className="actions">CLEAR ALL</span>
            </div>
            <div className="action-center">
              <div className="action-center-item">
                <span className="actions">ALL TASKS</span>
              </div>
              <div className="action-center-item">
                <span className="actions">ACTIVE</span>
              </div>
              <div className="action-center-item">
                <span className="actions">COMPLETED</span>
              </div>
            </div>
            <div className="action-right">
            <span className="actions">CLEAR COMPLETED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo