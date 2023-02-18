import React , { useContext } from 'react';
import { ArrowLeftSVG, ArrowRightSVG } from '../SVG/Svg16';
import AppContext from '../../Context';

// paging products view for both admin and client
export const Paging = ({...props}) => {
  const onPagingClicked = (e) =>{
    const action = e.target.name;
    props?.onClick(action);
  }
  return (
    <div className='paging-container box-shadow-up'>
      <button disabled={props.pageNumber === Math.ceil(props?.numberOfPages / 5)} className='btn' name='next' onClick={onPagingClicked}><ArrowRightSVG className={["svg16"]}/></button>
      <>
        <span>{props?.pageNumber}</span>
        <span> من </span>
        <span>{((Math.ceil(props?.numberOfPages / 5)).toString())}</span>

      </>
      <button disabled={props?.pageNumber - 1 === 0} className='btn' name='prev' onClick={onPagingClicked}><ArrowLeftSVG className={["svg16"]} /></button>
    </div>
  )
}

// sorting products bu category for admin dashboard
export const Sorting = ({...props}) => {
  const { appDefaults, appTheme } = useContext(AppContext);
  const containerClasses = ["sorting-container", "box-shadow-down" ];


  const handleSelectedItem = (e) =>{
    props?.onChangeValue(e.target.value);
  }
  return(
    <div className={containerClasses.join(" ")}>
      <h4>تصفية</h4>
      <select className={`select ${appTheme}`} onChange={handleSelectedItem} value={props?.defValue}>
        {
          appDefaults?.categories.map(cat => {return <option key={Math.random()}>{cat}</option>})
        }
      </select>
    </div>
  )
}
