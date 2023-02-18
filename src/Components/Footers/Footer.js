import AppContext from "../../Context";
import React, { useContext } from "react";
import { AtSVG, ChatSVG } from "../SVG/Icons";
import { MailSVG, CallBW, WhatsAppSVG, AltMailSVG } from "../SVG/Svg16";
const Footer = () => {
  const { appTheme } = useContext(AppContext);
  const footerClasses = ["footer", appTheme];

  return (
    <footer className={footerClasses.join(" ")}>
      <div className="address">
        <div className="contact-us">
          <a className="link" href="tel:+201016426353"><button className="btn" ><CallBW className={["svg16"]} />
          </button></a>
          <a className="link" href="mailto:ahmed.saied42@gmail.com"><button className="btn" ><MailSVG className={["svg16"]} /></button></a>
          <a className="link" href="https://wa.me/201016426353">
            <button className="btn"><WhatsAppSVG className={["svg16"]} /></button>
          </a>
        </div>
        <h4>السويس مساكن شيل الجديدة بجوار مقهي الخديوي</h4>
      </div>
      <div className="copy">
        <small>CopyRight 2022</small>
        <p>Designed By Gharieb Khalifa</p>
        <a className="link" href="mailto:blacksnow.soon@gmail.com">
          <small>Contact The Developer</small>
          <AltMailSVG className={["svg16"]}/>
        </a>
      </div>
    </footer>
  )
}

export default Footer;