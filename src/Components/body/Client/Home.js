import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../Context";
import Carosual from "../Carosual";
import greyWindowHomePage from "../../../Assets/JPG/grayWindowHomePage.jpg";
import brownDoorHomePage from "../../../Assets/JPG/brownDoorHomePage.jpg";
import bathBlueHomePage from "../../../Assets/JPG/bathBlueHomePage.jpg";
import brownKitchenHomePage from "../../../Assets/JPG/brownKitchenHomePage.jpg";
import logo200X200 from "../../../Assets/PNG/logo200x200.png"

const Home = () => {
  const {  PROJECT_CONTEXT } = useContext(AppContext);
  const homeClasses = ["app-container", PROJECT_CONTEXT.themeColor];
  const navigate = useNavigate();
  const handleShowSecProducts = (e)=> {
    localStorage.setItem("cat", e.target.name)
    navigate("/products", {state: {filter: localStorage.getItem("cat")}})
  }
  
  return (
    <div className={homeClasses.join(" ")}>
      <section className="hero">
        <img src={logo200X200} alt={"logo"}/>
        <div className="hero-title">
          <h1>أحمد سعيد للالوميتال</h1>
          <p>ثقة تميز احترافية</p>
        </div>
      </section>
      <section >
        <Carosual />
      </section>
      <section >
        <article className="home-grid">

          <div className="col-lrg" style={{backgroundImage:`url(${brownKitchenHomePage})`}}>
            
            <p className="home-sec-title">مطابخ ولوازمها</p>
            <div className="home-sec-dis">
              <p>مهما كانت مساحة مطبخك سنعطيك اكثر من تصميم يلبي كل احتياجاتك ويستغل اكبر مساحة ممكنة
              </p>
              <button name="مطابخ" className="btn-home-sec" onClick={handleShowSecProducts}>عرض</button>
            </div>
          </div>
          <div className="col-sml" style={{ backgroundImage: `url(${brownDoorHomePage})` }}>
            <p className="home-sec-title">ابواب</p>
            <div className={"home-sec-dis"}>
              <p>نماذج رائعة ومتعددة من تصاميم للابواب تناسب جميع الاماكن وتتماشي مع الشكل العام
              </p>
              <button name="ابواب" className="btn-home-sec" onClick={handleShowSecProducts}>عرض</button>
            </div>
          </div>
          
        </article>
      </section>
      <section >
        <article className="home-reverse-grid">
          <div className="col-lrg" style={{ backgroundImage: `url(${greyWindowHomePage})` }}>
            <p className={"home-sec-title"}>نوافذ</p>
            <div className={"home-sec-dis"}>
              <p>تصاميم والوان رائعة للنوافذ تطفي ملمس من الجمال الي مكانك
              </p>

              <button name="شبابيك" className="btn-home-sec" onClick={handleShowSecProducts}>عرض</button>
            </div>
          </div>
          <div className="col-sml" style={{ backgroundImage: `url(${bathBlueHomePage})` }}>

            <p className="home-sec-title">أثاث توليت</p>
            <div className={"home-sec-dis"}>
              <p>باقة من أفضل التصميمات الايطالية و الامريكية بأفضل الاسعار وأجود الخامات
              </p>
              <button name="حمام" className="btn-home-sec" onClick={handleShowSecProducts}>عرض</button>
            </div>
          </div>

        </article>
      </section>
      {
        // showFavs && <ClientFav />
      }
    </div>

  );
};

export default Home;
