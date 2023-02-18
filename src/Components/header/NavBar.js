import { useRef } from "react";

const NavBar = () => {
  const homeRef = useRef();
  const aboutRef = useRef();

  return (
    <div className="home-nav-bar">
      <ul className="nav-menu">
        <li key={Math.random()}>
          <svg className="svg-color home" ref={homeRef} xmlns="http://www.w3.org/2000/svg" height="48" width="48" >
            <path d="M8 42V18L24.1 6 40 18v24H28.3V27.75h-8.65V42Z"/>
          </svg>
        </li>

        <li key={Math.random()}>

        </li>

        <li key={Math.random()}>

        </li>
        <li key={Math.random()}>
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M27.95 43.15q-.9.9-2.175.9t-2.175-.9L4.85 24.4q-.5-.5-.675-1.05Q4 22.8 4 22.2V7q0-1.3.85-2.15Q5.7 4 7 4h15.2q.6 0 1.2.175t1.1.675L43.15 23.5q.95.95.95 2.225 0 1.275-.95 2.225ZM25.9 41.1l15.2-15.2L22.2 7H7v15.2ZM12.25 14.8q1.05 0 1.825-.775.775-.775.775-1.825 0-1.05-.775-1.825Q13.3 9.6 12.25 9.6q-1.05 0-1.825.775-.775.775-.775 1.825 0 1.05.775 1.825.775.775 1.825.775ZM7 7Z"/></svg>
        </li>
        <li key={Math.random()}>
        <svg className="svg-color" ref={aboutRef} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
          <path d="M22.65 34h3V22h-3ZM24 18.3q.7 
          0 1.175-.45.475-.45.475-1.15t-.475-1.2Q24.7
           15 24 15q-.7 0-1.175.5-.475.5-.475 1.2t.475 
           1.15q.475.45 1.175.45ZM24 44q-4.1 
           0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 
           28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 
           6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 
           4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 
           3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 
           23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 
           12.025Q16.95 41 24.05 41ZM24 24Z"/>
        </svg>
        </li>
      </ul>

    </div>
      
  )

}

export default NavBar;