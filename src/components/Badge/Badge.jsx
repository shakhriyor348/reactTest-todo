
import './Badge.scss'

import classNames from 'classnames';


const Badge = ({color, onClick, className}) => {
    return (
        <div>
            <i onClick={onClick} className={classNames('badge', {[`badge__${color}`]: color}, className) }></i>
        </div>
    );
};



export default Badge;