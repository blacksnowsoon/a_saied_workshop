import React, {useContext} from 'react';
import { Outlet} from 'react-router-dom';
import NavBar from '../Headers/NavBar';
import Footer from '../Footers/Footer';
import AppContext from '../../Context'

export const Layout = () => {
  const { appTheme } = useContext(AppContext);
  
  const mainClasses = ["main", appTheme];
  return (
    <>
      <NavBar />
      <main className={mainClasses.join(" ")}>
        <Outlet path="/home"/>
      </main>
      <Footer />
    </>
    
  )
}

export default Layout;
