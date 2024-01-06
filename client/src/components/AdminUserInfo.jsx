import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import AdminTodo from './AdminTodo'
import { server } from '../main'
import { f } from '../utils/DateTimeFormat.js'
import { useFetchGet } from '../utils/useFetch.jsx'

const AdminUserInfo = ({ user, handleUserDelete }) => {
    const [refresh, setRefresh] = useState(false)
    const [isExpand, setIsExpand] = useState(false)

    const { error, _, data } = useFetchGet(`/admin/getAllTasks/${user._id}`, refresh)

    if (error.error) toast.error(error.message)

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${server}/task/${id}`, {
                withCredentials: true,
            })
            toast.success(data.message)
            setRefresh((prevVal) => !prevVal)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleTodoUpdate = async (id) => {
        try {
            const { data } = await axios.put(`${server}/task/${id}`, {}, { withCredentials: true })
            toast.success(data.message)
            setRefresh((prevVal) => !prevVal)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <div className='relative grid grid-cols-[1fr_1fr_1fr_1fr_1fr_0.1fr] items-center rounded-xl bg-gradient-to-br from-[rgb(255,255,255,0.2)] to-transparent px-4 text-white'>
                <div className='flex items-center px-4 py-2 text-left'>
                    <div>
                        <p>{user?.name}</p>
                        <p className='text-sm opacity-40'>{user.username}</p>
                    </div>
                </div>
                <div className='flex items-center justify-center text-2xl'>
                    <p>{data?.tasks?.length}</p>
                </div>
                <div className='flex items-center justify-center text-xl'>
                    <p
                        className={`${
                            user.role === 'visitor'
                                ? 'border-green-200 bg-green-300 text-green-800'
                                : 'border-blue-200 bg-blue-300 text-blue-800'
                        } rounded-3xl border-2 px-5 py-1 opacity-60`}>
                        {user.role}
                    </p>
                </div>
                <div className='flex items-center justify-center text-2xl'>
                    <p>{f.format(new Date(user.createdAt))}</p>
                </div>
                <div className='flex items-center justify-center text-3xl'>
                    <MdDelete
                        className={`${user.role === 'admin' ? 'opacity-60' : ''} fill-red-400`}
                        onClick={() => handleUserDelete(user._id)}
                    />
                </div>
                <IoIosArrowDropdownCircle
                    className={`${
                        data?.tasks?.length > 0 ? 'opacity-100' : 'select-none opacity-0'
                    } cursor-pointer text-2xl transition-[transform_opacity] ${
                        isExpand ? 'rotate-180' : ''
                    }`}
                    onClick={() => setIsExpand((prevVal) => !prevVal)}
                />
            </div>
            {data?.tasks?.length > 0 && (
                <div
                    className={`${
                        isExpand ? '' : 'hidden'
                    } mx-auto w-5/6 rounded-xl bg-gradient-to-br from-[rgb(255,255,255,0.2)] to-transparent text-white`}>
                    {data?.tasks?.map((task) => (
                        <AdminTodo
                            key={task._id}
                            id={task._id}
                            title={task.title}
                            desc={task.description}
                            createdAt={task.createdAt}
                            isCompleted={task.isCompleted}
                            handleDelete={handleDelete}
                            handleTodoUpdate={handleTodoUpdate}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default AdminUserInfo
