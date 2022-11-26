import classNames from 'classnames';
import Badge from '../Badge/Badge';
import './List.scss'
import removeSvg from '../../assets/img/closeTask.svg'

import axios from 'axios';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

  const onDelete = (item) => {
    if(window.confirm('Вы уверены что хотите удалить данную задачу?')){
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item)
      })
    }
  }

  return (
    <ul onClick={onClick} className="list">
      {
        items.map((item, i) => (
          <li onClick={() => onClickItem(item)} key={i} className={classNames(item.className, {'active' : item.active ? item.active :  activeItem && activeItem.id === item.id})}>
              {item.icon ? item.icon : <Badge color={item.color.name}/>}
            <span>{item.name}{item.tasks && item.tasks.length > 0 && `(${item.tasks.length})`}</span>
            {isRemovable && <img onClick={() => onDelete(item)} src={removeSvg} className="list__remove-icon" alt="remove icon" />}
          </li>
        ))
      }

    </ul>
  );
};


export default List;