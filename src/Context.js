import React, { createContext } from "react";
import { Link } from "react-router-dom";
import {
  
  FavSVG,
  
} from "./Components/SVG/Icons";
import grayKitchenHomePage from "./Assets/JPG/brownKitchenHomePage.jpg";
import blackDoorHomePage from "./Assets/JPG/blackDoorHomePage.jpg";
import whiteBathHomePage from "./Assets/JPG/whiteBathHomePage.jpg";
import yellowKitchenHomePage from "./Assets/JPG/yellowKitchenHomePage.jpg";
import blueDoorHomePage from "./Assets/JPG/blueDoorHomePage.jpeg";
import brownKitchenHomePage from "./Assets/JPG/brownKitchenHomePage.jpg";
import cafeBathHomePage from "./Assets/JPG/cafeBathHomePage.jpg";
import {
  CallBW,
  CallFW,
  CatalogBW,
  CatalogFW,
  DashboardBW,
  DashboardFW,
  HomeBW,
  HomeFW,
  InfoBW,
  InfoFW,
} from "./Components/SVG/Svg16";

const homePageCarosualArrImgs = [
  grayKitchenHomePage,
  blackDoorHomePage,
  whiteBathHomePage,
  yellowKitchenHomePage,
  blueDoorHomePage,
  brownKitchenHomePage,
  cafeBathHomePage,
];

// declear the app default menus or lists
const categories = ["الكل", "ابواب", "شبابيك", "حمام", "مطابخ"];
const sectors = ["السعدى", "بى اس ص", "بى اس ك", "تيكنال", "جامبو"];
const accessories = ["ايطالي", "صينى", "مصري"];
const orderBy = ["أقل سعر", "أعلي سعر"];
// product default model
const productDefVal = {
  name: "",
  ava: "yes",
  size: "",
  accessory: accessories[0],
  estimatedTime: "1",
  sector: sectors[0],
  category: categories[1],
  imgsURL: [],
  pieces: "1",
  price: "0",
  dis: "",
  matrials: "",
};
// declear the app default values
const appDefaults = {
  accessories: accessories,
  categories: categories,
  orderBy: orderBy,
  sectors: sectors,
  productDefVal: productDefVal,
};

const userFavs = {
  // the number of favorit items will be passed to the props of the FavSVG
  favs: [],
  icon: (props) => {
    return <FavSVG {...props} />;
  },
  
};

// create a button component for all SVG buttons
const SVG_BTN = ({ ...props }) => {
  const className = ["btn", props?.className];
  return (
    <button
      className={className.join(" ")}
      data-toggle="collapse"
      name={props?.name}
      onClick={props?.onClick}
    >
      {props.icons}
    </button>
  );
};

const nav_list = [
  {
    path: "",
    name: "الرئيسية",
    icons: [
      <HomeFW className={["svg16", "if-collapsed"]} key={"home1"} />,
      <HomeBW className={["svg16", "if-not-collapsed"]} key={"home2}"} />,
    ],
  },
  {
    path: "products",
    name: "المنتجات",
    icons: [
      <CatalogFW className={["svg16", "if-collapsed"]} key={"catalog1"} />,
      <CatalogBW className={["svg16", "if-not-collapsed"]} key={"catalog2"} />,
    ],
  },
  {
    path: "about",
    name: "من نحن",
    icons: [
      <InfoFW className={["svg16", "if-collapsed"]} key={"info1"} />,
      <InfoBW className={["svg16", "if-not-collapsed"]} key={"info2"} />,
    ],
  },
  {
    path: "call",
    name: "أتصل بنا",
    icons: [
      <CallFW className={["svg16", "if-collapsed"]} key={"call1"} />,
      <CallBW className={["svg16", "if-not-collapsed"]} key={"call2"} />,
    ],
  },
];
const dashboard = {
  path: "dashboard",
  name: "لوحة التحكم",
  icons: [
    <DashboardFW className={["svg16", "if-collapsed"]} key={"dashboard1"} />,
    <DashboardBW
      className={["svg16", "if-not-collapsed"]}
      key={"dashboard2"}
    />,
  ],
};
const createNavigationMenu = ({ ...props }) => {
  const handelOnNavItemClicked = (e) => {
    e.preventDefault();
    // handel the collapsed clicked items first
    const ul = e.target.parentNode.parentNode;
    const target = e.target;
    Array.from(ul.children).forEach((li) => {
      if (li.firstElementChild.classList.contains("collapsed")) {
        li.firstElementChild.classList.toggle("collapsed");
      }
      window.innerWidth <= 752 && ul.classList.toggle("nav-menu-down")
    });
    target.classList.toggle("collapsed");
  };
  return (
    <ul ref={props?.navMenu} className="nav-menu">
      {nav_list.map((item) => {
        if (item.path === "call") {
          return (
            <li
              className="nav-item"
              key={item.path}
              onClick={handelOnNavItemClicked}
            >
              <a
                className="link"
                href="tel:+201016426353"
                data-toggle="collapse"
              >
                {item.icons}
                {item.name}
              </a>
            </li>
          );
        } else {
          return (
            <li
              className={`nav-item ${props?.location === item.path ? "active" : ""}`}
              key={item.path === ""? "home": item.path}
              onClick={handelOnNavItemClicked}
            >
              <Link
                to={"/" + item.path}
                className={`link ${props?.location === item.path ? "collapsed" : ""}`}
                data-toggle="collapse"
              >
                {item.icons}
                {item.name}
              </Link>
            </li>
          );
        }
      })}
      {props?.admin && (
        <li className={`nav-item ${props?.location === dashboard.path ? "active" : ""}`} 
        key={dashboard.path}
        onClick={handelOnNavItemClicked}>
          <Link
            to={"/" + dashboard.path}
            className={`link ${props?.location === dashboard.path ? "collapsed" : ""}`}
            data-toggle="collapse"
          >
            {dashboard.icons}
            {dashboard.name}
          </Link>
        </li>
      )}
    </ul>
  );
};
const PROJECT_CONTEXT = {
  productModel: productDefVal,
  optionsSelectList: (list) => {
    Array.from(list).map((item) => <option key={item}>{item}</option>);
  },
  menu_btn: SVG_BTN,
  navigationMenu: createNavigationMenu,
  themeColor: localStorage.getItem("color") || "light",
  userFavs,
};

const AppContext = createContext({
  appDefaults,
  homePageCarosualArrImgs,
  PROJECT_CONTEXT,
});

export default AppContext;
