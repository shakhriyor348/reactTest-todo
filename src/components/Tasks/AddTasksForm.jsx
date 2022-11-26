import axios from 'axios'
import React, { useState } from 'react'
import addSvg from '../../assets/img/add.svg'

const AddTasksForm = ({ list, onAddTask }) => {

    const [visibleForm, setVisibleForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isSending, setIsSending] = useState(false)


    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        if (inputValue) {
            setIsSending(true)
            const obj = {
                "listId": list.id,
                "text": inputValue,
                "completed": false
            }

            axios.post('http://localhost:3001/tasks', obj).then(({ data }) => {
                onAddTask(list.id, data)
                toggleFormVisible()
            }).finally(() => {
                setIsSending(false)
            })
        }
    }

    return (
        <div className="tasks__form">
            {!visibleForm ?
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="add icon" />
                    <span>Новая задача</span>
                </div> : <div className="tasks__form-block">
                    <input value={inputValue} onChange={e => setInputValue(e.target.value)} className="field" type="text" placeholder="Текст задачи" />
                    <button disabled={!inputValue} onClick={addTask} className="btn">
                        {isSending ? 'Добавление ждите...' : 'Добавить'}
                    </button>
                    <button onClick={toggleFormVisible} className="btn btn--gray">
                        Отмена
                    </button>
                </div>}
        </div>
    )
}

export default AddTasksForm