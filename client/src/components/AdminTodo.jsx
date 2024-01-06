import { f } from '../utils/DateTimeFormat.js'

const AdminTodo = ({ id, title, desc, createdAt, isCompleted, handleDelete, handleTodoUpdate }) => {
    return (
        <div
            className='grid grid-cols-4 place-items-center text-xl outline-1 py-1'
            key={id}>
            <p>{title}</p>
            <p>{desc}</p>
            <p>{f.format(new Date(createdAt))}</p>
            <div className='flex items-center justify-center gap-2'>
                <input
                    type='checkbox'
                    checked={isCompleted}
                    onChange={() => handleTodoUpdate(id)}
                    className='m-1 aspect-square scale-[2]'
                />
                <button
                    className='rounded-xl border-2 border-white px-2 text-white'
                    onClick={() => handleDelete(id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}
export default AdminTodo
