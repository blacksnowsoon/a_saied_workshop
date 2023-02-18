import { useState, useRef, useEffect, useCallback } from "react";
import { UploadSVG, MarkRightSVG } from "../../SVG/Icons";
import { readFileAsDataURL, resizeImage } from "./ImageInput";


export const Input = ({...props}) => {
  const [markRight, setMarkRight] = useState(props?.value || false);
  const changeValue = (e) => {
    const type = e.target.type;
    const value = e.target.value;
    if (type === "text" ) {
      value.length > 0 ? setMarkRight(true) : setMarkRight(false);
      props?.onChange(e);
    } if ( type === "number" || type === "range") {
      value > 0 ? setMarkRight(true) : setMarkRight(false);
      props?.onChange(e)
    }
    
  };
  return (
    <div>
      <label>{props?.label}</label>
      {props?.important ? <span>*</span> : ""}
      <input
        name={props?.name}
        type={props?.type}
        autoComplete={props?.autoComplete}
        onChange={changeValue}
        value={props?.value || ""}
        min={props?.min}
        max={props?.max}
        step={props?.step}
      />
      {props?.unit && <span>{props?.value} {props.unit} </span>}
      {markRight && <MarkRightSVG className="right-mark" />}
    </div>
    
  );
};

export const TextArea = ({...props}) => {
  const [markRight, setMarkRight] = useState(props?.value || false);
  const changeValue = (e) => {
    const value = e.target.value;
    value.length > 0 ? setMarkRight(true) : setMarkRight(false);
    props?.onChange(e)
  };
  return (
    <div>
      <label>{props?.label}</label>
      {props?.important ? <span>*</span> : ""}
      <textarea
        name={props?.name}
        maxLength={100}
        autoComplete={props?.autoComplete}
        rows={props?.rows}
        cols={props?.cols}
        onChange={changeValue}
        value={props?.value || ""}
      />
      {markRight && <MarkRightSVG className="right-mark" />}
    </div>
  );
};

export const Select = ({...props}) => {
  const changeValue = (e) => {
    props?.onChange(e)
  };
  return (
    <div>
      <label>{props?.label}</label>
      <select className={`select ${props?.className}`} name={props?.name} onChange={changeValue} value={props?.defaultValue}>
        {Array.from(props?.options).map(
          (opt) =>
          <option key={Math.random()}>{opt}</option>
        )}
      </select>
    </div>
  );
};

export const InputImages = ({...props}) => {
  let fileInput;
  const [imgs, setImgs] = useState(props?.value || []);
  const inputRef = useRef();
  const addImage = (e) => {
    e.preventDefault();
    if (imgs.length < props?.imagesCount) {
      fileInput = inputRef.current;
      inputRef.current.click();
    } 
  }
  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.type.match(/^image\//)) {
      const canvas = document.createElement("canvas")
      readFileAsDataURL(file)
      .then((originalURL) => {
      resizeImage(originalURL, canvas, props?.maxHeight)
      .then(url =>{
        setImgs([...imgs, url]);
        });
      });
      props?.onChange(imgs);
    } 
  }, [imgs, props]);
  
  const handleFormReset = () => {
    setImgs([]);
  };
  const deleteImage = (img)=>{
    const filter = imgs.filter(url => url !== img );
    setImgs(filter);
  }
  useEffect(() => {
    fileInput && fileInput.form.addEventListener("reset", handleFormReset);
    props?.onChange(imgs);
    return () => {
      if (fileInput) {
        fileInput.form.removeEventListener("reset", handleFormReset);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileInput, imgs]);
  return (
    <div>
      <label>{props?.label}</label>
      {props?.important ? <span>*</span> : ""}
      <input type={"file"} ref={inputRef} className={"file-input"} onChange={handleFileChange} />
      <button className="btn dark" onClick={addImage}>
        <UploadSVG className="svg dark" />
      </button>
      <div className="imgs-container">
        {
          imgs.map((img) => {
            return <Image value={img} onRemove={deleteImage} key={Math.random()
          } />})
        }
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
      <button className="btn" style={{ left: 5, position: "absolute" }} onClick={removeImage}>
        X
      </button>
    </div>
  );
};

export const CheckBox = ({...props}) =>{
  const handleOnChange = (e) =>{
    props?.onChange(e)
  }
  return(
    <div className="item-avaliable">
      <label>أجعله متاحا</label>
      <div>
        <input
          type={"radio"}
          value={"yes"}
          name="ava"
          defaultChecked="true"
          onChange={handleOnChange}
        />
        <label htmlFor="yes">نعم</label>
      </div>
      <div>
        <input
          type={"radio"}
          value={"no"}
          name="ava"
          onChange={handleOnChange}
        />
        <label htmlFor="no">لا</label>
      </div>
    </div>
  )
}

