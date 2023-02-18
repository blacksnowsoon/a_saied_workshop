import React, { useRef, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BackBar from "../../Headers/BackBar";
import { WhatsAppSVG, ShareSVG } from "../../SVG/Svg16";
import { getProductByID } from "../../../Utils/StoreAPI";

const ProductView = () => {
  const location = useLocation();
  const defaultImg = useRef();
  let className;
  let childrens = useRef();
  const { id } = useParams();
  
  const [product, setProduct] = useState(location.state?.product);

  const changeImage = (e) => {
    Array.from(childrens.current.children).map((div) =>
      div.classList.remove("default")
    );
    e.target.classList.add("default");
    defaultImg.current.style.backgroundImage = e.target.style.backgroundImage;
  };
  const getThePrice = () => {
    const price = product?.afterDiscount || product?.price;
    if (parseInt(product.afterDiscount) > 0) {
      return (
        <>
          <small className="price-before">{product.price} جم</small><br></br> <small className="price-after">{product.afterDiscount} جم</small>
          
        </>

      )
    } else {
      return (
        <p className="price-after">{price} جم</p>
      )
    }
  }
  const handleShareProduct = async (e)=>{
    e.preventDefault();
    window.open(`whatsapp://send?text=${encodeURIComponent(document.location.href)}`);
  }
  useEffect(() => {
    !product && (async ()=>{
      const val = await getProductByID(id);
      setProduct(val.data());
    })();
    return () => {
      product && getProductByID(id)
    };
  }, [id, product]);
  return product && (
    <>
      <BackBar title={product?.name} container={"path"} />
      <div className="product-privew">
        <div className="privew-imgs">
          <div
            ref={defaultImg}
            className="default-img"
            style={{ backgroundImage: `url(${product?.imgsURL[0]})` }}
          ></div>
          <div ref={childrens} className="row-imgs">
            {product &&
              Array.from(product?.imgsURL).map((img, index) => {
                index === 0
                  ? (className = "col-img default")
                  : (className = "col-img");
                return (
                  <div
                    key={index}
                    onMouseEnter={changeImage}
                    onClick={changeImage}
                    className={className}
                    style={{ backgroundImage: `url(${img})`}}
                  ></div>
                );
              })}
          </div>
        </div>
        <div className="privew-infos">
          <h1>{product?.name}</h1>
          <div>
            <strong>الوصف</strong>
            <p>{product?.dis}</p>
          </div>
          <div className="preview-details">
            <p>
              <strong>عدد القطع: </strong>
              {product?.pieces}
            </p>
            <p>
              <strong>القطاع: </strong>
              {product?.sector}
            </p>
            <p>
              <strong>الخامات: </strong>
              {product?.matrials}
            </p>
            <p>
              <strong>الاكسسوار: </strong>
              {product?.accessory}
            </p>
            <p>
              <strong>المقاس: </strong>
              {product?.size}
            </p>
            <p>
              <strong>السعر: </strong>
              {getThePrice()} 
            </p>
            <p>
              <strong>مدة التنفيذ: </strong>
              {product?.estimatedTime} يوم
            </p>
          </div>
          <div className="product-prview-action">
            <a className="link" href={`https://wa.me/201016426353/?text=${encodeURIComponent(document.location.href) }`}>
              <button className="btn"><ShareSVG className={["svg16"]} /></button>
            </a>
            {/* <a className="link" href="https://wa.me/201016426353"> */}
              <button className="btn" onClick={handleShareProduct}><WhatsAppSVG className={["svg16"]} /></button>
            {/* </a> */}
            
          </div>
          <div className="preview-notes">
            <small>
              نظراً لعدم أستقرار سعر الخامات قد يكون هناك تغيير بسيط بسعر المنتج
              حسب الوقت الذي قد يتم الطلب فيه
            </small>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default ProductView;
