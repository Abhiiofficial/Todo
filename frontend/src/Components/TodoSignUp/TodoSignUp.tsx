import './TodoSignUp.css'
import signup from '../../Assets/signup.svg'
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

interface TodoSignUpProps {
    getMode: (data: string) => void;
}
const TodoSignUp: React.FC<TodoSignUpProps> = ({ getMode }) => {

    const [visible, setVisible] = useState(false)

    return (
        <div className="todo-component">
            <div className="todo-signup-left">
                <div className="todo-signup">
                    <img src={signup} alt="" className="todo-signup-image" />
                </div>
            </div>
            <hr className="vertical-hr " />
            <div className="todo-signup-right">
                <div className="signup-col">
                    <div className="signup-title">
                        <span className="signup-title-name">SIGN-UP</span>
                    </div>
                    <div className="signup-form">
                        <div className="signup-input-row">
                            <TextField
                                InputProps={{
                                    sx: {
                                        borderRadius: '35px',
                                        padding: '2px 5px'
                                    },
                                }}
                                className='signup-input'
                                required
                                label='Username'
                                type='text' />
                        </div>
                        <div className="signup-input-row">
                            <TextField
                                className='signup-input'
                                required
                                label='Password'
                                type={!visible ? 'password' : 'text'}
                                InputProps={{
                                    sx: {
                                        borderRadius: '35px',
                                        padding: '2px 5px'
                                    },
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            {visible ?
                                                <Visibility className='ey-icon' onClick={() => setVisible(false)} />
                                                :
                                                <VisibilityOff className='ey-icon' onClick={() => setVisible(true)} />
                                            }
                                        </InputAdornment>
                                    ),
                                }} />
                        </div>
                        <div className="signup-input-row">
                            <TextField
                                className='signup-input'
                                required
                                label='Confirm Password'
                                type='password' InputProps={{
                                    sx: {
                                        borderRadius: '35px',
                                        padding: '2px 5px'
                                    },
                                    // endAdornment: (
                                    //     <InputAdornment position="start">
                                    //         <Visibility />
                                    //     </InputAdornment>
                                    // ),
                                }} />
                        </div>
                        <div className="signup-input-row">
                            <button className="signup">SIGN-UP</button>
                        </div>
                        <div className="signup-input-row">
                            <span className="sign-nav">Already have an account ? <span className="sign-high" onClick={() => getMode('login')}>LOGIN</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoSignUp