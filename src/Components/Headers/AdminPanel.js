import { ArrowDownSVG, ArrowUpSVG } from "../SVG/Svg16";
import { Link } from 'react-router-dom'
import AppContext from "../../Context";
import React, {useContext} from "react";

const AdminPanel = () => {
const {PROJECT_CONTEXT} = useContext(AppContext);
const panelContainerClasses = ["panel-container", PROJECT_CONTEXT.themeColor]
const togglePanel = (e) => {
  e.target.parentNode.classList.toggle("collapsed");
  const panel = e.target.parentNode.nextSibling;
  panel.classList.toggle("panel-down");
}
  const handlePanelBtns = (e)=>{
    const action = e.target.name;
    if (action === "states") {
      console.log(e.target.name)
      window.scrollTo({top: window.innerHeight, left:0, behavior: "smooth"})
    }

  }
  
  return (
    <section className={panelContainerClasses.join(" ")}>
      <button className="btn panel-btn collapsed" data-toggle="collapse" onClick={togglePanel}>
        <span className="if-collapsed"><ArrowDownSVG className={["svg16"]} /></span>
        <span className="if-not-collapsed"><ArrowUpSVG className={["svg16"]} /></span>
      </button>
      <ul className="panel">
        <li className="panel-item">
          <Link to={"/add"} className="link" state={{title: "أضافة منتج"}}>
            أضافة منتج
            </Link>
          </li>
        <li className="panel-item">
          <Link to={"/home"} className="link">
            
            أضافة مستخدمين
            </Link>
          </li>
        <li className="panel-item">
          <Link to={"/home"} className="link">
            
            تعديل محتوي الصفحات
            </Link>
          </li>
        <li className="panel-item">
          <button className="link btn" onClick={handlePanelBtns} name={"states"}>
            أحصائيات عامة
            </button>
          </li>
      </ul>
      
    </section>
      
  )
}

export default AdminPanel;