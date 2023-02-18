import { useState, useRef, useEffect, Suspense } from "react";
import { Upload, Cancel } from "../SVG_24/Icons";
import { readFileAsDataURL, resizeImage } from "./ImageInput";
import "../../CSS/loading.css";

export const InputText = ({
  _className,
  _lable,
  _important,
  _onChangeItemProp,
  _name,
}) => {
  const changeProp = (e) => {
    if (e.target.value !== "") {
      _onChangeItemProp(_name, e.target.value);
    }
  };

  return (
    <div className={_className}>
      <label>{_lable}</label>
      {_important ? <span>*</span> : ""}
      <input
        name={_name}
        type={"text"}
        autoComplete="on"
        onChange={changeProp}
      />
    </div>
  );
};

export const InputNumber = ({
  _className,
  _lable,
  _important,
  _min,
  _max,
  _step,
  _defValue,
  _onChangeItemProp,
  _name,
}) => {
  const changeProp = (e) => {
    if (e.target.value !== "") {
      _onChangeItemProp(_name, e.target.value);
    }
  };

  return (
    <div className={_className}>
      <label>{_lable}</label>
      {_important ? <span>*</span> : ""}
      <input
        name={_name}
        type={"number"}
        min={_min}
        max={_max}
        step={_step}
        defaultValue={_defValue}
        onChange={changeProp}
      />
    </div>
  );
};

export const InputRange = ({
  _className,
  _lable,
  _important,
  _min,
  _max,
  _step,
  _defValue,
  _unit,
  _onChangeItemProp,
  _name,
}) => {
  const [actualTime, setActualTime] = useState(15.0);

  function incremental(e) {
    e.preventDefault();
    let value = e.target.value;
    setActualTime(value);
    _onChangeItemProp(_name, value);
  }
  return (
    <div className={_className}>
      <label>{_lable}</label>
      {_important ? <span>*</span> : ""}
      <input
        name={_name}
        type={"range"}
        min={_min}
        max={_max}
        step={_step}
        defaultValue={_defValue}
        onInput={incremental}
      />
      <span htmlFor="range-value">
        {actualTime} {_unit}
      </span>
    </div>
  );
};

export const TextArea = ({
  _className,
  _lable,
  _important,
  _onChangeItemProp,
  _name,
}) => {
  const changeProp = (e) => {
    if (e.target.value !== "") {
      _onChangeItemProp(_name, e.target.value);
    }
  };
  return (
    <div className={_className}>
      <label>{_lable}</label>
      {_important ? <span>*</span> : ""}
      <textarea
        name={_name}
        maxLength={100}
        autoComplete="on"
        rows="7"
        cols="25"
        onChange={changeProp}
      />
    </div>
  );
};

export const SelectOption = ({
  _className,
  _lable,
  _options,
  _onChangeItemProp,
  _name,
}) => {
  const changeProp = (e) => {
    if (e.target.value !== "") {
      _onChangeItemProp(_name, e.target.value);
    }
  };
  return (
    <div className={_className}>
      <label>{_lable}</label>
      <select name={_name} onChange={changeProp}>
        {Array.from(_options).map(
          (opt) =>
            _options.indexOf(opt) !== 0 && (
              <option key={Math.random()}>{opt}</option>
            )
        )}
      </select>
    </div>
  );
};

export const InputImages = ({
  _className,
  _imagesCount,
  _maxHeight,
  _lable,
  _important,
  _onChangeItemProp,
  _name,
}) => {
  let fileInput;
  const [images, setImages] = useState([]);
  const [canvas, setCanvas] = useState(document.createElement("canvas"));
  const [disableCancel, setDisableCancel] = useState(false);
  const [disableUpload, setDisableupload] = useState(false);
  const pickImage = useRef();

  const clearImages = (e) => {
    e.preventDefault();
    const imgs = [];
    setImages(imgs);
    _onChangeItemProp(_name, imgs);
  };
  const removeImage = (value) => {
    const imgs = images.filter((img) => img !== value);
    setImages(imgs);
    _onChangeItemProp(_name, imgs);
    pickImage.current.value = "";
  };
  const uploadImage = (e) => {
    e.preventDefault();
    if (images.length < _imagesCount) {
      pickImage.current.click();
      fileInput = pickImage;
    } else {
      setDisableupload(true);
    }
  };
  const addImage = (e) => {
    const file = e.target.files[0];

    if (file && file.type.match(/^image\//)) {
      readFileAsDataURL(file).then((originalURL) => {
        resizeImage(originalURL, canvas, _maxHeight).then((url) => {
          let imgs = [...images, url];
          setImages(imgs);
          // _onChangeItemProp(_name, images);
          pickImage.current.value = "";
        });
      });
    }
    setImages(images)
  };

  useEffect(() => {
    setCanvas(document.createElement("canvas"));
    fileInput && fileInput.form.addEventListener("reset", addImage);
    _onChangeItemProp(_name, images);
    return () => {
      fileInput && fileInput.form.removeEventListener("rest", addImage);
      console.log(images);
    };
  }, [fileInput]);

  return (
    <div>
      <label>{_lable}</label>
      {_important ? <span>*</span> : ""}
      <div className="item-imgs-container">
        <div className="imgs-btns">
          <button
            disabled={disableUpload}
            onClick={uploadImage}
            className="img-add"
          >
            <Upload className="svg" />
          </button>
          <button
            disabled={disableCancel}
            onClick={clearImages}
            className="img-cancel"
          >
            <Cancel className="svg" />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={pickImage}
            onChange={addImage}
          />
        </div>

        <div className="imgs-container">
          <Suspense
            fallback={
              <div className="loaderRectangle">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            }
          >
            {images.map((image) => {
              return (
                <Image
                  key={Math.random()}
                  value={image}
                  onRemove={removeImage}
                />
              );
            })}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const Image = ({ value, onRemove }) => {
  const removeImage = (e) => {
    e.preventDefault();
    onRemove(value);
  };
  const style = {
    position: "relative",
    minWidth: "8rem",
    minHeight: "10rem",
  };

  if (value) {
    style.backgroundImage = `url("${value}")`;
    style.backgroundRepeat = "no-repeat";
    style.backgroundPosition = "center";
    style.backgroundSize = "cover";
  } else {
    style.backgroundImage = `none`;
  }
  return (
    <div style={style} className={"box-shadow-down"}>
      <button style={{ left: 0, position: "absolute" }} onClick={removeImage}>
        X
      </button>
    </div>
  );
};
