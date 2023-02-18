import React, {useContext} from 'react';
import { useQueryClient, useQuery } from 'react-query';
import AppContext from '../../../Context';
import BackBar from '../../Headers/BackBar';
import { getClientFavs, isUserSignedIn } from '../../../Utils/StoreAPI';
import { DeleteSVG, PreviewSVG } from '../../SVG/Svg16';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from '../../../Utils/StoreAPI';

export const ClientFav = () => {
  const {favs, setFavs} = useContext(AppContext);
  const queryClient = useQueryClient()
  const { data: favsItems, isFetched } = useQuery(["clientFavs", {count: favs.length}], () => getClientFavs(favs))

  const handleRemoveItem = async (itemId)=> {
    if (isUserSignedIn) {
        await saveUserData("removeProductFromFav ", itemId).then(() => {
        const filterFavs = favs.filter(item => item !== itemId);
        setFavs(filterFavs);
        queryClient.invalidateQueries(["clientFavs", { count: favs.length }]);
      });
    } else {

    }
  }
  useEffect(() => {
    isFetched && window.document.body.classList.add("no-scrolle")
    return () => {
      // window.document.body.classList.add("no-scrolle")
    };
  }, [isFetched]);

  return (
    <div className='flow-container'>
      <BackBar title={"المفضلة"} container={"path"} />
        <div className='fav-list'>
          {
            isFetched &&
            favsItems.map(item =>  {return <FavCard key={Math.random()} item={item} removeItem={handleRemoveItem}/>})
          }
        </div>
    </div>
  )
}
const FavCard = ({item, removeItem}) => {

  const navigate = useNavigate();

  const handleProductPreview = (e)=>{
    e.preventDefault();
    navigate(`/product/${item.id}`, { state: { product: item } });
  }
  const handelRemoveFromFavs = (e) =>{
    e.preventDefault();
    removeItem(item.id)
  }
  const postPrice = (price, afterDiscount) =>{
    if (parseInt(afterDiscount) > 0) {
      return (
        <>
          <h5 >السعر : <span className="price-before">{price}</span></h5>
          <h5 className="price-after">بعد التخفيض : {afterDiscount}</h5>
        </>
      )
    } else {
      <h3>السعر : {price}</h3>
    }
  }
  return (
    <div className='fav-card'>
      <img src={item.imgsURL[0]} alt={item.name} className="fav-img" />
      <div className='fav-details'>
        <h4>{item.name}</h4>
        {
          postPrice(item.price, item.afterDiscount)
        }
      </div>
      <div className='fav-actions'>
        <button className='btn' onClick={handleProductPreview}><PreviewSVG className={["svg16"]} /></button>
        <button className='btn' onClick={handelRemoveFromFavs}><DeleteSVG className={["svg16"]} /></button>
      </div>
    </div>
  )
}
