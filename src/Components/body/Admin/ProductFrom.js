import { useContext, useState } from "react";
import AppContext from '../../../Context';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Input,
  Select,
  TextArea,
  InputImages,
  CheckBox,
} from "./FormInputs";
import BackBar from "../../Headers/BackBar";
import { addProductDocToFirestore, updateProductDocToFirestore } from "../../../Utils/StoreAPI";
import Loading from "../../../Utils/Loading";
import { Dialog } from "../../../Utils/Dialog";


const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appDefaults, appTheme } = useContext(AppContext);
  const formClasses = ["product-form", appTheme.color];
  const categories = appDefaults.categories.filter(cat => cat !== "الكل" && cat);
  const [product, setProduct] = useState(location?.state?.product || appDefaults.productDefVal);
  const [loading, setLoading] = useState(false);
  const [addMore, setAddMore] = useState(false);
  const [notValied, setNotvalied] = useState(true);
  // onChange values for the products inputs
  const handleOnChange = (e) => {
    setProduct((prev)=>({...prev, [e.target.name]: e.target.value }));
    validateForm(product).length === 0 && setNotvalied(false);
  }
  // onChange values for the product images
  const onChangeImage = (e) => {
    setProduct((prev)=> 
      ({...prev, imgsURL: e})
    )
    validateForm(product).length === 0 && setNotvalied(false);
  }
  // onSubmit product form
  const submitProduct = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      if (!product.id) {
        await addProductDocToFirestore(product).then(() => {
          setLoading(false);
          setAddMore(true);
          setProduct(appDefaults.productDefVal);
          setNotvalied(true);
        })

      } else {
        const oldProduct = location?.state?.product;
        await updateProductDocToFirestore(product, oldProduct).then(() => {
          setLoading(false);
          setAddMore(true);
        })
      }
    } catch (err) {
      console.error("Error Saving the Product : ", err)
      setLoading(false);
    }
    
  }
  const handleDialogClick = (name) =>{
    if (name === "addMore") {
      setAddMore(false)
    } else if(name === "no") {
      navigate(-1);
    }
  }
  return (
    <div className="form-container">
      <BackBar theme={appTheme} title={location.state?.title} container={"path"} />
      {
        loading ?
          <Loading />
          
          :
          <form className={formClasses.join(" ")} onSubmit={submitProduct}>
            <Input
              name={"name"}
              label={"اسم المنتج"}
              type={"text"}
              important={true}
              autoComplete={"on"}
              onChange={handleOnChange}
              value={product?.name} />
            <TextArea
              name={"dis"}
              label={"الوصف"}
              rows={"5"}
              cols={"30"}
              important={true}
              autoComplete={"on"}
              onChange={handleOnChange}
              value={product?.dis} />
            <Input
              name={"matrials"}
              label={"الخامات"}
              type={"text"}
              important={true}
              autoComplete={"on"}
              onChange={handleOnChange}
              value={product?.matrials}
            />
            <Input
              name={"size"}
              label={"المقاس"}
              type={"text"}
              important={true}
              autoComplete={"on"}
              onChange={handleOnChange}
              value={product?.size}
            />
            <Input
              name={"estimatedTime"}
              label={"مدة التنفيذ"}
              type={"range"}
              important={true}
              autoComplete={"on"}
              onChange={handleOnChange}
              unit={"يوم"}
              min={1}
              max={30}
              value={product?.estimatedTime || "1"}
            />
            <Select
              className={appTheme.color}
              name={"sector"}
              label={"القطاع"}
              onChange={handleOnChange}
              options={appDefaults.sectors}
              defaultValue={product?.sector}
            />
            <Select
              className={appTheme.color}
              name={"category"}
              label={" القسم"}
              onChange={handleOnChange}
              options={categories}
              defaultValue={product?.category}
            />
            <Select
              className={appTheme.color}
              name={"accessory"}
              label={" اكسسوار"}
              onChange={handleOnChange}
              options={appDefaults.accessories}
              defaultValue={product?.accessory}
            />
            <Input
              name={"pieces"}
              label={"عدد القطع"}
              type={"number"}
              onChange={handleOnChange}
              value={product?.pieces || "1"}
              min={"1"}
            />

            <Input
              name={"price"}
              label={" السعر"}
              type={"number"}
              onChange={handleOnChange}
              value={product?.price || "0"}
              min={"0"}
              unit={"ج.م"}
              step={"10"}
            />
            <Input
              name={"afterDiscount"}
              label={" بعد التخفيض"}
              type={"number"}
              onChange={handleOnChange}
              value={product?.afterDiscount || "0"}
              min={"0"}
              unit={"ج.م"}
              step={"10"}
            />
            <InputImages
              name={"imgsURL"}
              label={"الصور"}
              className={"imgs-container"}
              maxHeight={400}
              imagesCount={3}
              important={true}
              onChange={onChangeImage}
              value={product?.imgsURL}
            />

            <CheckBox onChange={handleOnChange} value={product?.ava} />

            <div className="item-btns">
              <button disabled={notValied}  className="item-save" type="submit">حفظ</button>
              <button className="item-cancel">الغاء</button>
            </div>
          </form>
      }
      {
        !location?.state.product ?
        addMore && <Dialog message={"عملية ناجحة ! هل ترغب في أضافة منتج آخر؟"}
            onClick={handleDialogClick} noCaption={"لا"} yesCaption={"نعم"} name={"addMore"}/>
        :
        addMore && <Dialog message={"عملية ناجحة !"}
            onClick={handleDialogClick} noCaption={"لا"} />
      }
      
    </div>
    
  );
};
function validateForm(product) {
  const emptyFields = [];
  for (const [key, value] of Object.entries(product)) {
    if (value.length === 0 || value === 0) { 
      emptyFields.push(key);
    }
  }
  return emptyFields;
}
export default ProductForm;
