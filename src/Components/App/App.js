import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import "../../CSS/App.css";
import AdminBoard from "../Dashboard/AdminBoard";
import { func } from "prop-types";
import * as data from "../../Utils/Data";

function App() {

  const [user, setUser] = useState(true);
  const [products, setProducts] = useState(data.products);
	const [categories, setCategories] = useState(data.categories);

  // useEffect(()=>{
	// 	fetch()
  //   setProducts(Array.from(data.products).map(pro=>pro));
	// 	setCategories(Array.from(data.categories).map(cat=>cat));
	// 	console.log(categories)
  // }, []);

  
  return(
  	<BrowserRouter>
    	<Routes>

      	<Route path="/"  element={<Home pathName='/home' 
				products ={products}
				categories={categories} />} />

      	<Route path="/admin" element={<AdminBoard 
				user={user} 
				products ={products}
				categories={categories} />} />

    	</Routes>
  
    </BrowserRouter>
  )

}

export default App;
