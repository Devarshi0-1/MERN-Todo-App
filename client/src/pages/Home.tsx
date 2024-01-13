import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import TodoItem from '../components/TodoItem'
import { server } from '../main'
import { isValid } from '../utils/helper'
import { useStore } from '../utils/store'
import { useFetchGet } from '../utils/useFetch'

const Home = () => {
    const { user, setUser, setIsAuthenticated, isAuthenticated } = useStore()

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [tasks, setTasks] = useState<TTask[]>([])
    const [refresh, setRefresh] = useState<boolean>(false)

    const { error, data: tasksData }: TFetchGetTasks = useFetchGet('/task/my', refresh)

    useEffect(() => {
        setTasks(tasksData.tasks)
    }, [tasksData])

    if (error.error) toast.error(error.message)

    const handleUpdate = async (id: string) => {
        setTasks((prev) => {
            return prev.map((task) =>
                task._id === id ? { ...task, isCompleted: !task.isCompleted } : task,
            )
        })
        try {
            const { data } = await axios.put<TBasicRes>(
                `${server}/task/${id}`,
                {},
                { withCredentials: true },
            )
            toast.success(data.message)

            setRefresh((prevVal) => !prevVal)
        } catch (error) {
            setTasks(tasks)
            const err = error as IAxiosErrorResponse
            toast.error(err.response.data.message)
        }
    }

    const handleDelete = async (id: string) => {
        setTasks((prev) => {
            return prev.filter((task) => task._id !== id)
        })
        try {
            const { data } = await axios.delete<TBasicRes>(`${server}/task/${id}`, {
                withCredentials: true,
            })
            toast.success(data.message)
            setRefresh((prevVal) => !prevVal)
        } catch (error) {
            setTasks(tasks)
            const err = error as IAxiosErrorResponse
            toast.error(err.response.data.message)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isValid(title, description)) {
            return toast.error('Title Or Description cannot be Empty or Contain only a Whitespace')
        }

        setLoading(true)

        const optimisticTasks: TTask[] = [
            ...tasks,
            {
                user,
                _id: String(Math.random() + 1),
                title,
                description,
                isCompleted: false,
                createdAt: new Date(Date.now()),
            },
        ]

        setTasks(optimisticTasks)

        try {
            const { data } = await axios.post<TBasicRes>(
                `${server}/task/new`,
                {
                    title,
                    description,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )
            toast.success(data.message)
            setLoading(false)
            setTitle('')
            setDescription('')
            setRefresh((prevVal) => !prevVal)
        } catch (error) {
            setTasks(tasks)
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        axios
            .get<TFetchGetUser>(`${server}/users/me`, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data.user)
                setIsAuthenticated(true)
                setLoading(false)
            })
            .catch(() => {
                setUser(null)
                setIsAuthenticated(false)
                setLoading(false)
            })
    }, [])

    if (!isAuthenticated) return <Navigate to='/login' />

    return (
        <>
            <div className='m-auto mt-24 w-2/4 rounded-lg bg-gradient-to-br from-[rgb(255,255,255,0.2)] to-transparent p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-transparent'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                        name='title'
                        id='title'
                        autoComplete='on'
                        required
                        className='rounded-lg border-[1px] border-[rgb(255,255,255,0.2)] bg-transparent p-3 text-2xl text-white outline-none'
                    />
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                        name='description'
                        id='description'
                        autoComplete='on'
                        required
                        className='rounded-lg border-[1px] border-[rgb(255,255,255,0.2)] bg-transparent p-3 text-2xl text-white outline-none'
                    />

                    <button
                        type='submit'
                        disabled={loading}
                        className='m-auto w-fit rounded-lg border-2 bg-white px-3 py-2 text-xl text-black'>
                        Add Task
                    </button>
                </form>
            </div>
            <section className='scrollbar m-auto mt-10 flex max-h-[250px] w-1/2 flex-col items-center gap-3 overflow-y-auto overflow-x-hidden pr-3 text-white'>
                {tasks?.map((task) => (
                    <TodoItem
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        desc={task.description}
                        isCompleted={task.isCompleted}
                        loading={loading}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                ))}
            </section>
        </>
    )
}
export default Home
