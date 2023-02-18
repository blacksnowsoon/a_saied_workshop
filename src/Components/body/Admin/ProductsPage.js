import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../Client/Card';
export const ProductsPage = ({...props}) => {

  const location = useLocation();
  
  return location.pathname === "/dashboard" ?
    props?.productsArr.map(product => {
      return <Card className={props?.cardClasses} favs={props.favs} product={product} key={Math.random()} onClick={props?.onClick}/>
    })
  :
  props?.productsArr.map(product=>{
    return <Card product={product} favs={props.favs} key={Math.random()} onClick={props?.onClick} />
  })
}

export default ProductsPage;