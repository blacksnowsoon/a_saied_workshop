import { useLocation, useNavigate } from "react-router-dom";
import { createRef, useCallback, useContext, useState, useEffect } from "react";
import AppContext from "../../Context";
import {
  initFirebaseAuth,
  login,
  logout,
  isUserSignedIn,
  isAdmin,
  getUserFavs,
} from "../../Utils/StoreAPI";
import { LoginSVG, LogoutSVG, MenuBW, MenuFW, MoonSvg, SunSVG, FavSVG } from "../SVG/Svg16";

const NavBar = () => {
  const { appTheme, setAppTheme, PROJECT_CONTEXT, favs, setFavs, setShowFavs } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const NavBarClassName = ["layout-nav", appTheme];
  const navMenu = createRef();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const handleOnClickMenuBtn = useCallback(
    (e) => {
      e.preventDefault();
      const node = e.target;
      if (node.name === "toggle-theme") {
        node.classList.toggle("collapsed");
        const color = appTheme === "light" ? "dark" : "light";
        localStorage.setItem("color", color);
        setAppTheme(color);
      } else if (node.name === "toggle-menu") {
        e.target.nextSibling.classList.toggle("nav-menu-down");
        node.classList.toggle("collapsed");
      } else if (node.name === "logout") {
        logout();
      } else if (node.name === "login") {
        login();
      } else if (node.name === "show_my_favs")  {
        setShowFavs(true)
        navigate("favs")
      }
    },
    [appTheme, navigate, setAppTheme, setShowFavs]
  );
    
  useEffect(() => {
    !isUserSignedIn() &&
      initFirebaseAuth((u) => {
        if (u) {
          setUser({
            userName: u.displayName,
            profileIMG: u.photoURL,
            email: u.email,
            uid: u.uid,
          });
          (async () =>
            await isAdmin(u.uid).then((results) => {
              setAdmin(results);
            }))();
          (async () =>
            await getUserFavs(u.uid).then((results) => {
              setFavs(results);
            }))();
          
        } else {
          setUser(null);
          setAdmin(false);
          setFavs([])
        }
      });
  }, [setFavs]);

  return (
    <>
      <nav className={NavBarClassName.join(" ")}>
        {PROJECT_CONTEXT.menu_btn({
          icons: [
            <MenuFW className={["svg16", "if-not-collapsed"]} key={"menu1"} />,
            <MenuBW className={["svg16", "if-collapsed"]} key={"menu2"} />,
          ],
          name: "toggle-menu",
          onClick: handleOnClickMenuBtn,
          className: "menu-btn",
        })}
        {PROJECT_CONTEXT.navigationMenu({ admin, navMenu, location: location.pathname.slice(1) })}

        <div className="user-props">

          {
            PROJECT_CONTEXT.menu_btn({
              icons: [
                <SunSVG className={["svg16", "if-collapsed"]} key={"sun"} />,
                <MoonSvg className={["svg16", "if-not-collapsed"]} key={"moon"} />,
              ],
              name: "toggle-theme",
              onClick: handleOnClickMenuBtn,
              className: "",
            })
          }
          <button name="show_my_favs" className="btn" onClick={handleOnClickMenuBtn}><FavSVG className={["svg16"]} count={favs.length || 0} /></button>
          {
            !user ?
              PROJECT_CONTEXT.menu_btn({
                icons:
                  [<LoginSVG className={["svg16"]} key={"login"} />],
                name: "login",
                onClick: handleOnClickMenuBtn,
                className: "",
              })
              :
              PROJECT_CONTEXT.menu_btn({
                icons: [
                  <LogoutSVG className={["svg16"]} key={"logout"} />,
                  <img
                    key={"logout_img"}
                    src={user?.profileIMG}
                    alt={user?.userName}
                  />
                ],
                name: "logout",
                onClick: handleOnClickMenuBtn,
                className: "",
              })
          }
        </div>
      </nav>
      
    </>
    
  );
};
export default NavBar;



