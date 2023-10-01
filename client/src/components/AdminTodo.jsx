import { f } from '../utils/DateTimeFormat.js';

const AdminTodo = ({
	id,
	title,
	desc,
	createdAt,
	isCompleted,
	handleDelete,
	handleTodoUpdate,
}) => {
	return (
		<div
			className='adminTodo'
			key={id}>
			<p>{title}</p>
			<p>{desc}</p>
			<p>{f.format(new Date(createdAt))}</p>
			<div className='todoMutations'>
				<input
					type='checkbox'
					checked={isCompleted}
					onChange={() => handleTodoUpdate(id)}
				/>
				<button
					className='btn'
					onClick={() => handleDelete(id)}>
					Delete Item
				</button>
			</div>
		</div>
	);
};
export default AdminTodo;
