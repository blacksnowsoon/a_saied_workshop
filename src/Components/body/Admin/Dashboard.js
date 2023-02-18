import AdminPanel from "../../Headers/AdminPanel";
import ProductsList from "../Client/ProductsList";
import * as api from '../../../Utils/StoreAPI';
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    (async()=>{
      const itemsCount = await api.getCountOfDocs("products", null)
      const kitchens = await api.getCountOfDocs("products", {name: "category", sign: "==", value: "مطابخ"})
      const doors = await api.getCountOfDocs("products", {name: "category", sign: "==", value: "ابواب"})
      const windows = await api.getCountOfDocs("products", {name: "category", sign: "==", value: "نوافذ"})
      const bathes = await api.getCountOfDocs("products", {name: "category", sign: "==", value: "حمام"})
      setCounts({ ...counts, total: itemsCount, kitchens, doors, bathes, windows });
    })();
    
    return () => {
      
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="dashboard-content">
      <AdminPanel />
      
      <ProductsList/>

      <div className="stats">
        <h2>أحصائيات عامة:-</h2>
        <div className="stats-numbers">
          <p> أجمالي عدد المنتجات:-<span>  {counts?.total}</span></p>
          <p>  عدد المطابخ:-<span>  {counts?.kitchens}</span></p>
          <p>  عدد النوافذ:-<span>  {counts?.windows}</span></p>
          <p>  عدد الابواب:-<span>  {counts?.doors}</span></p>
          <p>  عدد قطع للحمام:-<span>  {counts?.bathes}</span></p>
        </div>
        
      </div>
    </div>
  )

}

export default Dashboard;