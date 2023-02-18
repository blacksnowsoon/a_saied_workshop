import { useEffect, useState } from 'react';
import Controllers from './Controllers';
import ProductsList from './ProductsList';
import NavBar from '../header/NavBar';
import Footer from '../footer/Footer';
import { ProductView } from './ProductView';

const Home = ({ products, categories}) => {

  const [disView, setDisView] = useState("dis-grid");
  const [cat, setCat] = useState(categories[0]);
  const [prods, setProds] = useState(products)
  const [product, setProduct] = useState(null);

  const OnChangeView = (view) => {
    setDisView(view);
  }
  const sortCat = (cat) => {
    setCat(cat);
    setProds(Array.from(products).map(product=> cat !== categories[0]?
      product.category === cat : product));
  }
  
  const showMe = (product) => {
    setProduct(product);

  }
   
  return (
    <div className="home-container" >
      {/* nav bar */}
      <NavBar />
      {/* hero view */}
      <div className='hero'>
        <div>
          
        </div>
        <div>
          <h1></h1>
          <h3>الورشة الفنية لتصميم وتصنيع منتجات الالوميتال</h3>
        </div>
        


      </div>
      {/* cataloge view */}
      <div className="home-body">

        {
          !product ?
            <div>
            <Controllers categories= {categories} changeView={OnChangeView} />
            {/* thumbnails view -------------------------------------------------------*/}
            <ProductsList products= {prods} disView={disView}/>
          </div>
          :
          <ProductView product={product} />
        }
        
        

      </div>
      {/* footer view */}
      <Footer />
    </div>
  )
}

export default Home;