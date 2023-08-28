const TodoItem = ({
	id,
	title,
	desc,
	isCompleted,
	loading,
	handleUpdate,
	handleDelete,
}) => {
	return (
		<div
			className='todo'
			style={{ opacity: loading ? 0.5 : null }}>
			<div>
				<h4>{title}</h4>
				<p>{desc}</p>
			</div>
			<div>
				<input
					type='checkbox'
					checked={isCompleted}
					onChange={() => handleUpdate(id)}
				/>
				<button
					className='btn'
					onClick={() => handleDelete(id)}>
					Delete
				</button>
			</div>
		</div>
	);
};
export default TodoItem;
