import './Tasks.scss'
import pencilSvg from '../../assets/img/pencil.svg'

import axios from 'axios'
import AddTasksForm from './AddTasksForm'
import Task from './Task'
import { Link } from 'react-router-dom'


const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTaskText, onCompleteTask }) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name)

        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка')
            })
        }
    }


    return (
        <div className="tasks" key={list.id}>
            <Link to={`/lists/${list.id}`}>
                <h2 style={{ color: list.color.hex }} className="tasks__title">
                    {list.name}
                    <img onClick={editTitle} src={pencilSvg} alt="edit icon" className='tasks__edit-icon' />
                </h2>
            </Link>

            <div className="tasks__items">

                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {
                    list.tasks && list.tasks.map(task =>
                        <Task key={task.id} {...task} list={list} onRemoveTask={onRemoveTask} onEditTaskText={onEditTaskText} onCompleteTask={onCompleteTask} />
                    )
                }

            </div>
            <AddTasksForm list={list} onAddTask={onAddTask} />
        </div>
    )
}

export default Tasks