
import * as Icons from '../SVG_24/Icons' 

const ProductCard = ({ product, showProduct }) => {

  const handleShowProduct = (e) => {
    e.preventDefault();
    showProduct(product);
  }

    return (
        <div className='product-card'>
            <div className='content box-shadow-up'>

              {/* front side of the card ---------------------------------------------*/}
              <div className='front'>
                <img src={product.imgsURL[0]} alt={product.name}/>
                <div className='front-info'>
                  <h2>{product.name}</h2>
                  <p>{product.price} جم</p>
                </div>
              </div>
              {/* back side of the card ----------------------------------------------*/}
              <div className='back'>
                <div className='back-img' style={{backgroundImage:`url(${product.imgURL_A})`,opacity: '.4'}}></div>
                <div className='back-info'>
                  <h3>المواصفات</h3>
                  <ul>
                    <li><span>الخامة : </span>{product.matrial}</li>
                    <li><span>الاكسسوارت : </span>{product.Accessories}</li>
                    <li><span>الالوان : </span>{product.matrial}</li>
                    <li><span>مدة التنفيذ : </span>{product.estimatTime} <span>ايام</span></li>
                    <li><span>عدد القطع : </span>{product.pieces}</li>
                  </ul>
                  <ul className='card-actions'>
                    <li><button onClick={handleShowProduct}><Icons.View svgClass={"svg"}/></button></li>
                    <li><button><Icons.Fav svgClass={"svg-fav svg"}/></button></li>
                    <li><button><Icons.Like svgClass={"svg-like svg"}/></button></li>
                    <li className='hide'><button className='edit'><Icons.Edit svgClass={"svg"}/></button><button><Icons.Delete svgClass={"svg"}/></button></li>
      
                  </ul>
                </div>
              </div>

            </div>
          </div>
    )

}


export default ProductCard;