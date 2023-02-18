import "../../CSS/App.css";
import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../body/Client/Home";
import About from "../body/Client/About";
import AppContext from "../../Context";
import Layout from "./Layout";
import ProductsList from "../body/Client/ProductsList";
import Dashboard from "../body/Admin/Dashboard";
import ProductForm from "../body/Admin/ProductFrom";
import ProductView from "../body/Client/ProductView";
import { ClientFav } from "../body/Client/ClientFav";

function App() {
  // graping the app context to the provider
  const {
    appDefaults,
    homePageCarosualArrImgs,
    PROJECT_CONTEXT,
  } = useContext(AppContext);
	// set the app theme state
  const [appTheme, setAppTheme] = useState(PROJECT_CONTEXT.themeColor);
  const [favs, setFavs] = useState([]);
  const [showFavs, setShowFavs] = useState(false)
  return (
    <AppContext.Provider
      value={{
        appDefaults,
        homePageCarosualArrImgs,
        appTheme,
        setAppTheme,
        favs,
        setFavs,
        PROJECT_CONTEXT,
        showFavs, 
        setShowFavs,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="product/:id" element={<ProductView />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add" element={<ProductForm />} />
          <Route path="edit" element={<ProductForm />} />
          <Route path="about" element={<About />} />
          <Route path="favs" element={<ClientFav />} />
        </Route>
      </Routes>
      
    </AppContext.Provider>
  );
}

export default App;
