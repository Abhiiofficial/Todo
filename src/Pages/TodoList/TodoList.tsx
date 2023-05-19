import { useEffect, useState } from "react";
import "./TodoList.css";
import Modal from "../../Components/Modal/Modal";
import SignupModal from "../../Components/Modal/SignupModal";
import LoginModal from "../../Components/Modal/LoginModal";
import signup from '../../Assets/signup1.png'
import login from '../../Assets/login.png'
import ErrorModal from "../../Components/ErrorModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import EmojiPicker from 'emoji-picker-react';

interface item {
  id: number,
  todoName: string,
  isCompleted: boolean
}

interface User {
  email: string;
  password: string;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<item[]>([]);
  const [user, setUser] = useState<User | null>(null)
  const [testTodos, setTestTodos] = useState<item[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [inputdata, setInputData] = useState('')
  const [inputUpdatedata, setInputUpdatedata] = useState('')
  const [hoverIndex, setHoverIndex] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
  const [hover, setHover] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [chosenEmoji, setChosenEmoji] = useState<string>('');
  // const [emojiSelect, setEmojiSelect] = useState(false)

  // const handleEmojiSelect = (emoji: string): void => {
  //   setChosenEmoji(emoji);
  // };

  const notify = (data: string) => {
    toast.success(data, {
      theme: "colored",
      className: 'toast-message',
      autoClose: 2000
    });
  }

  const ErrorNotify = (data: string) => {
    toast.error(data, {
      theme: "colored",
      className: 'toast-message',
      autoClose: 2000
    });
  }

  const handleSignup = () => {
    const user = { email, password };
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Signed up successful!', {
      theme: "colored",
      autoClose: 2000
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    notify('Logout successful!')
  };

  const handleLogin = () => {
    const user = { email, password };
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Login successful!');
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSignupModal(false)
    setLoginModal(false)
    setErrorModal(false)
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
      setTestTodos(JSON.parse(storedTodos));
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      setUser(user)
    }
  }, []);

  const AuthUser = localStorage.getItem('user')

  const handleAddTodo = () => {

    const newTodo: item = { id: Date.now(), todoName: inputdata, isCompleted: false }
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setInputData('')
  }



  const updateTodo = (id: number, todoName: string,) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          todoName: todoName,
          isCompleted: true,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };


  const updateTodoName = (id: number | null) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          todoName: inputUpdatedata,
        };
      }
      return todo;
    });
    closeModal()
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };


  const deleteTodo = (id: number | null) => {

    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);

      localStorage.setItem('todos', JSON.stringify(todos));

      setTodos(todos);
    }
  };


  const filterTodos = (filter: string) => {

    let filteredTodos = testTodos;
    if (filter === 'all') {
      filteredTodos = testTodos;
    } else if (filter === 'completed') {
      filteredTodos = testTodos.filter(todo => todo?.isCompleted);
    } else if (filter === 'active') {
      filteredTodos = testTodos.filter(todo => !todo?.isCompleted);
    }
    setTodos(filteredTodos)
    return filteredTodos;
  };


  const clearCompletedTodos = () => {

    const activeTodos = testTodos.filter(todo => !todo?.isCompleted);

    localStorage.setItem('todos', JSON.stringify(activeTodos));

    setTodos(activeTodos);
  };

  return (
    <>
      <div className="todo-container">
        <div className="todo-box">
          <div className="todo-title-row">
            <div className="todo-title-row1">
              <div className="todo-title">
                <span className="todo-titele">
                  TODO
                </span>
              </div>
              <div className="todo-title" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <span className="material-symbols-outlined account">
                  account_circle
                </span>
                {hover &&
                  <div className="todo-pop">
                    <div className="pop-title">
                      <div className="pop-title-div">
                        {AuthUser ?
                          <span className="pop-title-name">{user?.email}</span>
                          :
                          <span className="pop-title-name">Your Account</span>
                        }
                      </div>
                      <div className="pop-title">
                        {AuthUser ?
                          <span className="pop-sub">Now you can add, edit, delete todos.</span>
                          :
                          <span className="pop-sub">Login to your account to add Todo.</span>
                        }
                      </div>
                    </div>
                    <hr className="hr-pop" />
                    <div className="pop-title">
                      {!AuthUser ?
                        <>
                          <div className="pop-actions">
                            <button className="pop-login" onClick={() => setLoginModal(true)}>
                              LOGIN
                            </button>
                          </div>
                          <div className="pop-actions">
                            <button className="pop-signup" onClick={() => setSignupModal(true)}>
                              SIGNUP
                            </button>
                          </div>
                        </>
                        :
                        <div className="pop-actions">
                          <button className="pop-logout" onClick={handleLogout}>
                            LOGOUT
                          </button>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="todo-input-row">
            {/* <div className="todo-input-item-3">
              <span className="material-symbols-outlined send-icon" onClick={() => setEmojiSelect(!emojiSelect)}>
                add_reaction
              </span>
            </div> */}
            <div className="todo-input-item-1">
              <input maxLength={25} value={inputdata} type="text" className="todo-input" placeholder="Add Something !" onChange={(e) => setInputData(e.currentTarget.value)} />
            </div>
            <div className="todo-input-item-2">
              {!AuthUser ?
                <span className="material-symbols-outlined send-icon" onClick={() => setErrorModal(true)}>
                  send
                </span>
                :
                <span className="material-symbols-outlined send-icon" onClick={handleAddTodo}>
                  send
                </span>
              }
            </div>

            {/* {emojiSelect &&
              <div className="emoji-box">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} height={350} width={410} />
              </div>
            } */}
          </div>

          <div className="todo-items-box">
            <div className="todo-col">
              {todos && todos.map((todo, index) => (
                <div key={index}>
                  {todo ?
                    <div>
                      <div className='todo-item-container' onMouseEnter={() => setHoverIndex(todo?.id)} onMouseLeave={() => setHoverIndex(0)}>
                        <div className="todo-item-left">
                          {todo?.isCompleted ?
                            <span className="material-symbols-outlined todo-icon">
                              check_circle
                            </span>
                            :
                            <span className="material-symbols-outlined todo-icon" onClick={() => updateTodo(todo.id, todo.todoName)}>
                              radio_button_unchecked
                            </span>
                          }
                        </div>
                        <div className="todo-item-center">
                          <span className="todo-item-name" style={{ textDecoration: todo?.isCompleted ? 'line-through' : 'none' }}>
                            {todo?.todoName.slice(0, 25)}
                          </span>
                        </div>

                        <div className="todo-item-right">
                          {!AuthUser ?
                            <span title="Update todo" style={{ display: hoverIndex === todo?.id ? 'flex' : 'none' }} className="material-symbols-outlined todo-icon todo-icon1" onClick={() => setErrorModal(true)}>
                              update
                            </span>
                            :
                            <span title="Update todo" style={{ display: hoverIndex === todo?.id ? 'flex' : 'none' }} className="material-symbols-outlined todo-icon todo-icon1" onClick={() => { openModal(); setSelectedTodo(todo?.id) }}>
                              update
                            </span>
                          }

                          {!AuthUser ?
                            <span title="Remove" style={{ display: hoverIndex === todo?.id ? 'flex' : 'none' }} className="material-symbols-outlined todo-icon" onClick={() => setErrorModal(true)}>
                              cancel
                            </span>
                            :
                            <span title="Remove" style={{ display: hoverIndex === todo?.id ? 'flex' : 'none' }} className="material-symbols-outlined todo-icon" onClick={() => { deleteTodo(todo.id); }}>
                              cancel
                            </span>
                          }
                        </div>

                      </div >
                      <hr className='hr-todo' />
                    </div>
                    :
                    <div className="">
                      <span className="todo-item-name">
                        Sorry. Nothing to show !
                      </span>
                    </div>
                  }
                </div>
              ))}
            </div>
            <div className="todo-actions">
              <div className="action">
                <span className="count">{todos?.length} Todos left</span>
              </div>
              <div className="action-row">
                <div className="action">
                  {!AuthUser ?
                    <span className="count" onClick={() => ErrorNotify('Please login to continue')}>All</span>
                    :
                    <span className="count" onClick={() => filterTodos('all')}>All</span>
                  }
                </div>
                <div className="action">
                  {!AuthUser ?
                    <span className="count" onClick={() => ErrorNotify('Please login to continue')}>Active</span>
                    :
                    <span className="count" onClick={() => filterTodos('active')}>Active</span>
                  }
                </div>
                <div className="action">
                  {!AuthUser ?
                    <span className="count" onClick={() => ErrorNotify('Please login to continue')}>Completed</span>
                    :
                    <span className="count" onClick={() => filterTodos('completed')}>Completed</span>
                  }
                </div>
              </div>
              <div className="action">
                {!AuthUser ?
                  <span className="count" onClick={() => ErrorNotify('Please login to continue')}>Clear completed</span>
                  :
                  <span className="count" onClick={clearCompletedTodos}>Clear completed</span>
                }
              </div>
            </div>
            <div className='footer'>
              <span className="made-with">Made with &#x1F49D;</span>
            </div>
          </div>
        </div>
        <Modal isOpen={modalOpen} onClose={closeModal} >
          <div className="modal-container">
            <div className="modal-row">
              <span className="modal-title">EDIT TODO</span>
            </div>
            <div className="modal-row">
              <input maxLength={25} value={inputUpdatedata} type="text" className="add-todo-input" aria-label='add' placeholder='Add something !' onChange={(e) => setInputUpdatedata(e.currentTarget.value)} />
            </div>
            <div className="modal-row">
              <button onClick={() => updateTodoName(selectedTodo)} className="add-todo"><span className="add-name">ADD</span></button>
            </div>
          </div>
        </Modal>

        <LoginModal isOpen={loginModal} onClose={closeModal} >
          <div className="signup-modal-container">
            <div className="signup-left">
              <img src={login} alt="" className="signup" />
            </div>
            <div className="signup-right">
              <form action="" onSubmit={handleLogin}>
                <div className="signup-col">
                  <div className="signup-input">
                    <span className="signup-title">LOGIN</span>
                  </div>
                  <div className="signup-input">
                    <input type="text" className="input-signup" placeholder="Username" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                  </div>
                  <div className="signup-input">
                    <input type="text" className="input-signup" placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                  </div>
                  <div className="signup-input">
                    <button className="signup-button">LOGIN</button>
                  </div>
                  <div className="signup-input-action">
                    <span className="signup-input-action-name">New to Todo ?<span className="high" onClick={() => { setLoginModal(false); setSignupModal(true) }}>SIGN-UP</span></span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </LoginModal>

        <SignupModal isOpen={signupModal} onClose={closeModal} >
          <div className="signup-modal-container">
            <div className="signup-left">
              <img src={signup} alt="" className="signup" />
            </div>
            <div className="signup-right">
              <form action="" onSubmit={handleSignup}>

                <div className="signup-col">
                  <div className="signup-input">
                    <span className="signup-title">SIGN-UP</span>
                  </div>
                  <div className="signup-input">
                    <input type="text" className="input-signup" placeholder="Username" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                  </div>
                  <div className="signup-input">
                    <input type="text" className="input-signup" placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                  </div>
                  <div className="signup-input">
                    <button className="signup-button" type="submit">SIGN UP</button>
                  </div>
                  <div className="signup-input-action">
                    <span className="signup-input-action-name">Already have account ? <span className="high" onClick={() => { setLoginModal(true); setSignupModal(false) }}>SIGNIN</span></span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </SignupModal>

        <ErrorModal isOpen={errorModal} onClose={closeModal} >
          <div className="modal-container">
            <div className="error-row">
              <span className="error">PLEASE LOGIN TO CONTINUE !!!</span>
            </div>
            <div className="error-row">
              <button className="pop-login" onClick={() => { setLoginModal(true); setErrorModal(false) }}>Login</button>
            </div>
          </div>
        </ErrorModal>
      </div >
      <ToastContainer />
    </>
  )
};
