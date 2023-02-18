
import ProductCard from './ProductCard';


const ProductsList = ({ products, disView }) => {

  const onShowProduct = (product) => {
    console.log(product)
  }
  return(
    <div className={disView}>
      {
        Array.from(products).map(product => product.avaliable && 
        <ProductCard 
        key={product.id}
        product={product} 
        showProduct={onShowProduct} 
        />)
      }  
    </div>
  )

}


export default ProductsList;