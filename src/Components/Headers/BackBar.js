import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import AppContext from '../../Context';
import { ArrowLeftSVG } from '../SVG/Svg16';

const BackBar = ({...props}) => {
  const { appTheme, setShowFavs } = useContext(AppContext);
  const navigate = useNavigate();
  const className = ['back-bar',"box-shadow-down", appTheme];
  const handleGoBack =()=> {
    if (props.container === "flow") {
      window.document.body.classList.remove("no-scrolle")
      setShowFavs(false)
    } else if (props.container === "path") {
      navigate(-1);
      window.document.body.classList.remove("no-scrolle");
    }
  }
  return (
    <div className={className.join(" ")}>
      <h4>{props?.title}</h4>
      <button className='btn-back btn' onClick={handleGoBack}><ArrowLeftSVG className={["svg16"]} /></button>
    </div>
  )
}

export default BackBar;
