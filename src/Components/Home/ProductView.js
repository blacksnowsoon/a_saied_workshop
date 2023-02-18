import React, { useRef } from 'react'


export const ProductView = ({ product }) => {

  const defaultImg = useRef();
  let className;
  let childrens = useRef();

  const changeImage =(e) => {
    Array.from(childrens.current.children).map(div => div.classList.remove("default"));
    e.target.classList.add("default");
    defaultImg.current.style.backgroundImage = e.target.style.backgroundImage;
  }
  return (
    <div className="product-privew">

      <div className="privew-imgs">
        <div ref={defaultImg} className="default-img" style={{backgroundImage: `url(${product.imgsURL[0]})`}}></div>
        <div ref={childrens} className="row-imgs">
        {
          Array.from(product.imgsURL).map((img, index) => {
            index === 0 ? className = "col-img default" : className = "col-img";
            return (<div  key={index} onMouseEnter={changeImage} onClick={changeImage} className={className} style={{backgroundImage: `url(${img})`}}></div>)
          
          })
        }
        </div>
      </div>

      <div className="privew-infos">
        <h1>{product.name}</h1>
        <p><span>الوصف:</span></p>
        <p>.أبجد هوز حطى كلمن هوى ، حسومات محسنة. خطأ الحقيقة أننا يمكن قطعه مفتوحا. قيل موليستياس ، سوف أكون سهلًا عليك ، فقل الألم هو متعة الباني الرئيسي ، ولا الملذات التي قد يرضيها أحدنا في المتاعب والفرار ؛ بالنسبة له ، المحاضر ، من لا أحد من هؤلاء ، خطأ ، وهرب أيضًا؟ أحزان
            الألم في ممارسة عواقبها معه ما لم يتجنب كل متعة
            ليس هناك الكثير من الوقت ، لا ، فنحن نعتبر كل 
          متعة الألم. أو ، ولكن ، منه أنه ، الذي ولدت منه ،
            سأفتح متعة عقلانية ملزمة بالثناء على الأناشيد 
          ، وفي نفس الوقت ، معاناة هؤلاء الجبناء 
          المشينين في أولئك الذين هم من واجبات
            النوع من الملذات ، الرجل الصالح كما هو
            ، للقيام بذلك في وقت واحد. إنها رحلة ممتعة 
          لأنها تأتي شاقة تندد مؤلمة للغاية أبدا سعيدة؟</p>

          <p><span>الخامات: </span>{product.matrial}</p>
          <p><span>الاكسسوار: </span>{product.Accessories}</p>
          <p><span>الالوان: </span></p>
          <p><span>السعر: </span></p>
          <p><span>مدة التنفيذ: </span></p>
          <p><span>السعر: </span></p>
        
      </div>
            

    </div>
  )
}
