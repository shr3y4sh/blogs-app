import { useState } from 'react';

import { TextField, Button, Typography } from '@mui/material';

import { useUserLogin } from '../contexts/user-reducer';
import { signUp } from '../services/users';
import { useSetNotifications } from '../contexts/notification-reducer';

const SignupForm = () => {
	const [username, setusername] = useState('');
	const [name, setFullName] = useState('');
	const [password, setPassword] = useState('');
	const setNotification = useSetNotifications();

	const user = useUserLogin();

	async function handleFormSubmit(e) {
		e.preventDefault();
		if (username === '' || password === '' || name === '') {
			setNotification('Fields cannot be empty', 'error');
			return;
		}

		if (password.length < 6) {
			setNotification('Password must be atleast six characters', 'error');
			return;
		}

		await signUp({ username, name, password });
		await user.loginUser({ username, password });
	}

	return (
		<form
			onSubmit={handleFormSubmit}
			style={{
				maxWidth: '20rem',
				margin: 'auto',
				marginBottom: '1rem'
			}}>
			<Typography variant='h3' style={{ margin: '1rem 0' }}>
				Sign Up
			</Typography>
			<div>
				<TextField
					label='username'
					value={username}
					onChange={({ target }) => setusername(target.value)}
				/>
			</div>

			<div>
				<TextField
					label='full name'
					value={name}
					onChange={({ target }) => setFullName(target.value)}
				/>
			</div>

			<div>
				<TextField
					type='password'
					label='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>

			<div>
				<Button
					type='submit'
					variant='contained'
					style={{ margin: '1rem 0' }}>
					Sign Up
				</Button>
			</div>
		</form>
	);
};

export default SignupForm;
