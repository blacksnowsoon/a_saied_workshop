import { useEffect, useRef, useState, forwardRef } from "react";

import {
  InputNumber,
  InputText,
  SelectOption,
  TextArea,
  InputRange,
  InputImages,
} from "./FormInputs";
import { PropTypes } from "prop-types";

const AddItem = ({ categories }) => {
  const [item, setItem] = useState({});
  let product = {}
  const onChangeItemProp = (prop, value) => {
    console.log(`${prop } :`, value);
    product[`${prop}`] = value;
    // setItem(item.append({prop, value}))
    console.log(product)
  };
  return (
    <form className="add-new-item">
      <InputText
        _name={"name"}
        _lable={"اسم المنتج"}
        _important={true}
        _onChangeItemProp={onChangeItemProp}
      />

      <TextArea
        _name={"dis"}
        _lable={"الوصف"}
        _important={true}
        _onChangeItemProp={onChangeItemProp}
      />

      <SelectOption
        _name={"category"}
        _lable={"القسم"}
        _options={categories}
        _onChangeItemProp={onChangeItemProp}
      />

      <InputText
        _name={"matrial"}
        _lable={"الخامات"}
        _important={true}
        _onChangeItemProp={onChangeItemProp}
      />

      <InputText
        _name={"accessories"}
        _lable={"الاكسسوارت"}
        _important={true}
        _onChangeItemProp={onChangeItemProp}
      />

      <InputText
        _name={"sector"}
        _lable={"القطاع"}
        _important={true}
        _onChangeItemProp={onChangeItemProp}
      />

      <InputText
        _name={"size"}
        _lable={"الحجم"}
        _important={true}
        _onChangeItemProp={onChangeItemProp}
      />

      <InputNumber
        _name={"pieces"}
        _lable={"عدد القطع"}
        _min={"1"}
        _max={"15"}
        _defValue={"1"}
        _onChangeItemProp={onChangeItemProp}
      />

      <InputRange
        _name={"estimatTime"}
        _lable={"وقت التنفيذ"}
        _min={"1"}
        _max={"30"}
        _unit={"يوم"}
        _onChangeItemProp={onChangeItemProp}
      />

      <InputText
        _name={"colors"}
        _lable={"الالوان"}
        _important={true}
        _onChangeItemProp={onChangeItemProp}
      />

      <InputImages
        _name={"imgsURL"}
        _lable={"الصور"}
        _className={"item-imgs-container"}
        _maxHeight={400}
        _imagesCount={3}
        _important={true}
        _onChangeItemProp={onChangeItemProp}
      />

      <div className="item-avaliable">
        <label>أجعله متاحا</label>
        <div>
          <input
            type={"radio"}
            value="yes"
            name="ava"
            id="product-avaliable"
            defaultChecked="true"
          />
          <label htmlFor="yes">نعم</label>
        </div>
        <div>
          <input
            type={"radio"}
            value="no"
            name="ava"
            id="product-not-avaliable"
          />
          <label htmlFor="no">لا</label>
        </div>
      </div>

      <div className="item-btns">
        <button className="item-save">حفظ</button>
        <button className="item-cancel">الغاء</button>
      </div>
    </form>
  );
};

export default AddItem;
