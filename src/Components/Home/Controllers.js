import { useEffect, useRef, useState } from "react";
import { GridView, ListView } from "../SVG_24/Icons";

const Controllers = ({categories, changeView}) => {

  const [cates, setCates] = useState([]);
  const [defaultCat, setDefaultCat] = useState(categories[0]);
  const listRef = useRef();
  const gridRef = useRef()
  useEffect(()=>{
    setCates(Array.from(categories).map(cat=> cat))
  }, [])
  // chnage the display to list view
  function handleListView (e) {
    e.preventDefault();
    changeView("dis-list")
    listRef.current.classList.add('active-view');
    gridRef.current.classList.remove('active-view');
  }
  // change the display to grid view
  function handleGridView (e) {
    e.preventDefault()
    changeView("dis-grid");
    listRef.current.classList.remove('active-view');
    gridRef.current.classList.add('active-view')
  }
  return (
    <div className='controller-container box-shadow-down'>
      <div className='dis-sorting'>
        <div className='dis-category'>
            <label>عرض القسم: </label>
            <select>
                {
                  Array.from(cates).map(cat => <option key={Math.random()}>{cat}</option>)
                }
            </select>
        </div>
        <div className='dis-in-order'>
            <label>ترتيب حسب: </label>
            <select>
                <option>الأحدث</option>
                <option>الأكثر طلبا</option>
                <option>أقل سعر</option>
            </select>
        </div>
        </div>
        <div className='btns-dis'>
          <button ref={listRef} className='btn-dis-list' onClick={handleListView}><ListView /></button>
          <button ref={gridRef} className='btn-dis-grid active-view' onClick={handleGridView}><GridView /></button>
            
        </div>
    </div>
  )

}

export default Controllers;