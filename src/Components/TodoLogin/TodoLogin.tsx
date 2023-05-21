import './TodoLogin.css'
import login from '../../Assets/login.svg'
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { Tune, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

interface TodoLoginProps {
    getMode: (data: string) => void;
  }

const TodoLogin : React.FC<TodoLoginProps> = ({getMode}) =>{

    const [visible, setVisible] = useState(false)

    return (
        <div className="todo-component">
            <div className="todo-login-left">
                <div className="todo-login">
                    <img src={login} alt="" className="todo-login-image" />
                </div>
            </div>
            <hr className="vertical-hr " />
            <div className="todo-login-right">
                <div className="login-col">
                    <div className="login-title">
                        <span className="login-title-name">LOGIN</span>
                    </div>
                    <div className="login-form">
                        <div className="login-input-row">
                            <TextField
                                InputProps={{
                                    sx: {
                                        borderRadius: '35px',
                                        padding: '2px 5px'
                                    },
                                }}
                                className='login-input'
                                required
                                label='Username'
                                type='text' />
                        </div>
                        <div className="login-input-row">
                            <TextField
                                className='login-input'
                                required
                                label='Password'
                                type={!visible ? 'password' : 'text'} InputProps={{
                                    sx: {
                                        borderRadius: '35px',
                                        padding: '2px 5px'
                                    },
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            {visible ? <VisibilityOff className='eye-icon' onClick={() => setVisible(false)}/>
                                                :
                                                <Visibility className='eye-icon' onClick={() => setVisible(true)} />
                                            }
                                        </InputAdornment>
                                    ),
                                }} />
                        </div>
                        <div className="login-input-row">
                            <button className="login">LOGIN</button>
                        </div>
                        <div className="login-input-row">
                            <span className="sign-nav">New user ? <span className="sign-high" onClick={() => getMode('signup')}>SIGN-UP</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoLogin