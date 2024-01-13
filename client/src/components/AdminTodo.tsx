import { f } from '../utils/helper';
import { useStore } from '../utils/store';

type TProp = {
	id: string;
	title: string;
	desc: string;
	createdAt: Date;
	isCompleted: boolean;
	handleDelete: (id: string) => void;
	handleTodoUpdate: (id: string) => void;
};

const AdminTodo = ({
	id,
	title,
	desc,
	createdAt,
	isCompleted,
	handleDelete,
	handleTodoUpdate,
}: TProp) => {
	const { user: loggedInUser } = useStore();

	return (
		<div
			className='grid grid-cols-4 place-items-center py-1 text-xl outline-1'
			key={id}>
			<p>{title}</p>
			<p>{desc}</p>
			<p>{f.format(new Date(createdAt))}</p>
			<div className='flex items-center justify-center gap-2'>
				<input
					type='checkbox'
					checked={isCompleted}
					onChange={() => handleTodoUpdate(id)}
					className={`${
						loggedInUser?.role === 'testAdmin'
							? 'opacity-30 cursor-not-allowed'
							: null
					} m-1 aspect-square scale-[2]`}
				/>
				<button
					className={`${
						loggedInUser?.role === 'testAdmin'
							? 'opacity-30 cursor-not-allowed'
							: null
					} rounded-md border-2 bg-white border-black px-2 text-black`}
					onClick={() => handleDelete(id)}>
					Delete
				</button>
			</div>
		</div>
	);
};
export default AdminTodo;
