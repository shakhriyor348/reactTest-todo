import { useEffect, useState } from "react";

import {List, Badge} from '../index'

import closeSvg from '../../assets/img/close.svg'

import './AddButtonList.scss'
import axios from "axios";


const AddButtonList = ({ colors, onAddList }) => {

    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')


    // console.log(colors[0].id);
    useEffect(() => {
        if(Array.isArray(colors)) {
            setSelectedColor(colors[0].id)
        }
    }, [colors])

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        setSelectedColor(colors[0].id)
    }

    const addList = () => {
        if(!inputValue) {
            alert('Введите название папки')
            return
        }

        // colors.filter(c => c.id === selectedColor)[0].name
        setIsLoading(true)
        axios.post('http://localhost:3001/lists', {   name: inputValue, colorId: setSelectedColor}).then(({data}) => {
            const color = colors.filter(c => c.id === selectedColor)[0]
            const listObj = {...data, color, tasks: []}
            onAddList(listObj)
            onClose()
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const popUpOpenClicked = () => {
        setVisiblePopup(true)
    }
    const popUpCloseClicked = () => {
        onClose()
    }

    const inputOnChange = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <div className="add-list">
            <List onClick={popUpOpenClicked}
                items={[
                    {
                        className: 'list__button',
                        icon: (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="todo__list-plus" />

                        </svg>),
                        name: 'Добавить список'
                    },

                ]} />

            {visiblePopup && <div className="add-list-popup">
                <img onClick={popUpCloseClicked} src={closeSvg} alt="CloseBtn" className="add-list-popup-closeBtn" />
                <input value={inputValue} onChange={(e) => inputOnChange(e)} className="field" type="text" placeholder="Название папки" />
                <ul className="add-list-popup-colors">
                    {
                        colors.map(color => <Badge onClick={() => setSelectedColor(color.id)} key={color.id} color={color.name}  className={selectedColor === color.id && 'active'}/>)
                    }
                </ul>
                <button onClick={addList} className="btn">
                    {isLoading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>}
        </div>
    );
};



export default AddButtonList;