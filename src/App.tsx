import React from 'react';
import logo from './logo.svg';
import { TodoAppMain } from './pages/TodoAppMain';
import { ToggleColorTheme } from './ToggleColorTheme';

function App() {
	return (
		<>
			<ToggleColorTheme />
			<TodoAppMain />
		</>
	);
}

export default App;
