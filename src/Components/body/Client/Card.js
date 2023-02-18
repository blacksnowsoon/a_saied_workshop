import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PreviewSVG, DeleteSVG, EditSVG, FavPlusSVG, HeartSVG } from "../../SVG/Svg16";
import { saveUserData, isUserSignedIn } from "../../../Utils/StoreAPI"
import AppContext from "../../../Context";


const Card = ({ ...props }) => {
  const { setFavs } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isFav, setIsFav] = useState(false);

  const handleShowProduct = (e) => {
    e.preventDefault();
    navigate(`/product/${props?.product.id}`, { state: { product: props?.product } });
  };
  const getThePrice = () => {
    const price = props.product?.afterDiscount || props.product?.price;
    if (parseInt(props.product.afterDiscount) > 0 ) {
      return(
        <>
          <h5 className="price-before">{props.product.price} جم</h5>
          <h5 className="price-after">{props.product.afterDiscount} جم</h5>
        </>
        
      )
    } else {
      return (
        <h5 className="price-after">{price} جم</h5>
      )
    }
  }
  const handelAddToFav = async(e) =>{
    e.preventDefault();
    if (isUserSignedIn()) {
      const node = e.target;
      if (!node.classList.contains("collapsed")) {
        await saveUserData("addProductToFav",props?.product.id).then(() => {
          setFavs([...props.favs, props.product.id])
        });
      } else {
        await saveUserData("removeProductFromFav", props?.product.id).then(() => {
          const filterFavs = props.favs.filter(item => item !== props.product.id);
          setFavs(filterFavs);
        });
      }
      node.classList.toggle("collapsed");
    } else {
      props.onClick("signIn", props.product)
      
    }
  }
  const isCollapsed = Array.from(props.favs).includes(props.product.id) ? "collapsed" : "";
  
  return location.pathname !== "/dashboard" ? (
    // return the client product card
    <div className="product-card" >
      <div className="content" style={{ backgroundImage: `url(${props.product.imgsURL[0]})` }} onClick={handleShowProduct}>
      </div>
      <div className="card-info">
        <h4>{props.product.name}</h4>
        {
          getThePrice()
        }
        {
          parseInt(props.product.afterDiscount) > 0 && <p className="discount">تخفيض</p>
        }
      </div>
      
      <button className={"btn add-to-fav " + isCollapsed } onClick={handelAddToFav} data-toggle={"collapse"}>
        <HeartSVG className={["if-collapsed", "svg16"]} />
        <FavPlusSVG className={["if-not-collapsed", "svg16"]} />
      </button>
    </div>
  )
  :
  // return the admin product card
    <div className={props?.className} key={props.product?.id}>
      <div className='col '>
        
        <img
          className="img"
          src={props.product?.imgsURL[0]}
          alt={props.product?.name}
        />

      </div>

      <div className="info">
        <h5>{props.product?.name}</h5>
        <div >
          <div className="row">

            <div>
              <small>القسم:</small>
              <small> {props.product?.category}</small>
            </div>
            <div>
              <small>قطاع:</small>
              <small> {props.product?.sector}</small>
            </div>
            <div>
              <small>عدد القطع:</small>
              <small> {props.product?.pieces}</small>
            </div>

          </div>

          <div className="row">

            <div>
              <small>الحجم:</small>
              <small> {props.product?.size}</small>
            </div>
            <div>
              <small>السعر:</small>
              <small> {props.product?.price}</small>
            </div>
            <div>
              <small>بعد التخفيص:</small>
              <small> {props.product?.afterDiscount || "0"}</small>
            </div>

          </div>

          <div className="row">

            <div>
              <small>مدة التنفيذ:</small>
              <small> {props.product?.estimatedTime} ايام</small>
            </div>
            <div>
              <small>متاح:</small>
              <small> {props.product?.ava === "yes" ? "نعم" : "لا"}</small>
            </div>
            
          </div>

        </div>
        
      </div>
      <div className="actions">
        <button className="btn" name="view" onClick={handleShowProduct}>
          <PreviewSVG className={["svg16"]} />
        </button>
        <button className="btn" name="edit" onClick={() => props?.onClick("edit", props.product)}>
          <EditSVG className={["svg16"]} />
        </button>
        <button className="btn" name="delete" onClick={() => props?.onClick("delete", props.product)}>
          <DeleteSVG className={["svg16"]} />
        </button>
      </div>
    </div>
};

export default Card;
