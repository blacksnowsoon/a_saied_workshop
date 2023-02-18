
import { useState } from "react";
import Controllers from "../Home/Controllers";
import ProductsList from "../Home/ProductsList";
import AddItem from "./AddItem";
import Menu from "./Menu";
import { ProductView } from "../Home/ProductView";

const Dashboard = ({ user, products, categories}) => {
 
  const [disView, setDisView] = useState("dis-grid");
  
  const  product = products[0]
  function OnChangeView(view) {
    setDisView(view);
  }
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* <Menu /> */}
        <div className="dashboard-content">
          {/* <Controllers categories= {categories} changeView={OnChangeView} /> */}
          {/* <ProductsList products={products} disView={disView}/> */}
          {/* <AddItem categories= {categories} /> */}
          <ProductView product={product} />
        </div>

      </div>
      
    </div>
  )

}

export default Dashboard;