import { useState } from 'react';
import React from 'react';

import { TextField, Button, Typography } from '@mui/material';

import { useUserLogin } from '../contexts/user-reducer';
import { useSetNotifications } from '../contexts/notification-reducer';

const Login_Form = () => {
	const user = useUserLogin();
	const setNotification = useSetNotifications();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function handleLogin(e) {
		e.preventDefault();
		if (username.length === 0 || password.length === 0) {
			setNotification('Fields cannot be empty', 'error');
			return;
		}
		await user.loginUser({ username, password });
	}
	return (
		<>
			<form
				onSubmit={handleLogin}
				className='blog-form'
				style={{
					maxWidth: '20rem',
					margin: 'auto'
				}}>
				<Typography variant='h4' style={{ margin: '1rem 0' }}>
					Login to post blogs
				</Typography>
				<div className='form-controls'>
					<TextField
						variant='outlined'
						label='username'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div className='form-controls'>
					<TextField
						variant='outlined'
						label='password'
						type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<div>
					<Button
						type='submit'
						variant='contained'
						style={{ margin: '1rem 0' }}>
						Login
					</Button>
				</div>
			</form>
		</>
	);
};

export default Login_Form;
