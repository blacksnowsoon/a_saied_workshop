import React, { useContext, useState } from "react";
import { GridViewSVG, ListViewSVG } from "../SVG/Icons";
import AppContext from "../../Context";
import { useLocation } from "react-router-dom";
import { GridSVG } from "../SVG/Svg16";

const Controllers = ({ changeView, onSortByCategory, onSortByOrder }) => {
  const { appDefaults, appTheme } = useContext(AppContext);
  const containerClassList = ['controller-container', appTheme, "box-shadow-down"];
  const [val, setVal] = useState(localStorage.getItem("cat") || "");

  // handle the view change evenet
  const handleChangeView = (e) => {
    if (e.target.name === "dis-list") {
      e.target.nextSibling.classList.remove("active-view");
      e.target.classList.add("active-view");
      changeView("list");

    } if (e.target.name === "dis-grid") {
      e.target.previousSibling.classList.remove("active-view");
      e.target.classList.add("active-view");
      changeView("grid");
    }
  }
  const handleSortingByCategory = (e) => {
    localStorage.setItem("cat", e.target.value)
    onSortByCategory(e.target.value)
    setVal(e.target.value);
  }
  
  return (
    <div className={containerClassList.join(" ")}>
      <div className='sorting'>
        <div>
            <label>عرض القسم: </label>
          <Select children={appDefaults.categories} theme={appTheme} onChange={handleSortingByCategory} defValue={val} />
        </div>
        <div>
            <label>ترتيب حسب: </label>
          <Select children={appDefaults.orderBy} theme={appTheme} onChange={onSortByOrder} />
        </div>
        </div>
        <div className='display'>
          <button name="dis-list" className='btn hide' onClick={handleChangeView} ><ListViewSVG className={"hide"} /></button>
        <button name="dis-grid" className='btn active-view' onClick={handleChangeView} ><GridSVG className={["svg16"]} /></button>
        </div>
    </div>
  )

}

export default Controllers;


const Select = ({...props}) => {
  const className = ["select" , props?.theme]
  return (
    <select onChange={props?.onChange} className={className.join(" ")} value={props?.defValue}>
      {
        props?.children.map(val => <option key={Math.random()}>{val}</option>)
      }
    </select>
  )
}