import { MdDelete } from 'react-icons/md'

const TodoItem = ({ id, title, desc, isCompleted, loading, handleUpdate, handleDelete }) => {
    return (
        <div
            className='w-full flex items-center justify-between rounded-2xl bg-gradient-to-br from-[rgb(255,255,255,0.1)] to-transparent px-4 py-2'
            style={{ opacity: loading ? 0.5 : null }}>
            <div className=''>
                <p className='text-3xl'>{title}</p>
                <p className='text-[rgb(255,255,255,0.6)]'>{desc}</p>
            </div>
            <div className='flex items-center gap-3'>
                <input
                    type='checkbox'
                    checked={isCompleted}
                    onChange={() => handleUpdate(id)}
                    className='scale-[2] cursor-pointer p-10'
                />
                <MdDelete
                    onClick={() => handleDelete(id)}
                    className='cursor-pointer fill-red-400  text-4xl'
                />
            </div>
        </div>
    )
}
export default TodoItem
