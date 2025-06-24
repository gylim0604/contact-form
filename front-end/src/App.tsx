import './App.css';
import QueryForm from './QueryForm';

function App() {
	return (
		<div className='min-h-screen bg-green-50 flex items-center justify-center p-4'>
			<div className='bg-white rounded-2xl shadow-md w-full max-w-xl p-8'>
				<QueryForm></QueryForm>
			</div>
		</div>
	);
}

export default App;
