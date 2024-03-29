import React, { forwardRef } from 'react';
// SVG_40
export const MenuSVG = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className} >
      <path d="M5 30v-2.792h30V30Zm0-8.625v-2.75h30v2.75Zm0-8.583V10h30v2.792Z" />
    </svg> 
    
  )
}
export const HomeSVG = ({ ...props }) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className}>
        <path d="M9.458 32.208h5.834v-10.25h9.416v10.25h5.834V16.375L20 8.458 9.458 16.375ZM6.667 35V15L20 5l13.333 10v20H21.958V24.708h-3.916V35ZM20 20.333Z" />
      </svg>
    </>
  )
}
export const ThumbinalSVG = ({...props}) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className} >
        <path d="M13.208 26.792h6.084v-6.084h-6.084Zm0-7.5h6.084v-6.084h-6.084Zm7.5 7.5h6.084v-6.084h-6.084Zm0-7.5h6.084v-6.084h-6.084ZM6.125 33.333q-1.125 0-1.958-.833-.834-.833-.834-1.958V9.458q0-1.125.834-1.958.833-.833 1.958-.833h27.75q1.125 0 1.958.833.834.833.834 1.958v21.084q0 1.125-.834 1.958-.833.833-1.958.833Zm0-2.791h27.75V9.458H6.125v21.084Zm0 0V9.458v21.084Z" />
      </svg>
    </>
    
  )
}
export const DashboardSVG = ({...props}) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className}  >
        <path d="M21.375 15.833V5H35v10.833ZM5 21.375V5h13.625v16.375ZM21.375 35V18.625H35V35ZM5 35V24.167h13.625V35Zm2.792-16.375h8.041V7.792H7.792Zm16.375 13.583h8.041V21.375h-8.041Zm0-19.166h8.041v-5.25h-8.041ZM7.792 32.208h8.041v-5.25H7.792Zm8.041-13.583Zm8.334-5.583Zm0 8.333Zm-8.334 5.583Z" />
      </svg>
    </>
  )
}
export const InfoSVG = ({ ...props }) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className}>
        <path d="M18.708 28.333h2.75v-10h-2.75ZM20 15.167q.625 0 1.042-.417.416-.417.416-1.042t-.416-1.062q-.417-.438-1.042-.438t-1.042.438q-.416.437-.416 1.062t.416 1.042q.417.417 1.042.417Zm0 21.5q-3.458 0-6.479-1.313-3.021-1.312-5.292-3.583t-3.583-5.292Q3.333 23.458 3.333 20t1.313-6.5q1.312-3.042 3.583-5.292t5.292-3.562Q16.542 3.333 20 3.333t6.5 1.313q3.042 1.312 5.292 3.562t3.562 5.292q1.313 3.042 1.313 6.5t-1.313 6.479q-1.312 3.021-3.562 5.292T26.5 35.354q-3.042 1.313-6.5 1.313Zm0-2.792q5.792 0 9.833-4.042 4.042-4.041 4.042-9.833t-4.021-9.833Q25.833 6.125 20 6.125q-5.792 0-9.833 4.021Q6.125 14.167 6.125 20q0 5.792 4.042 9.833 4.041 4.042 9.833 4.042ZM20 20Z" />
      </svg>
    </>

  )
}
export const FavSVG = ({...props}) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className}>
        <path d="m20 34.958-1.958-1.75q-4.334-3.958-7.167-6.833t-4.521-5.146Q4.667 18.958 4 17.104t-.667-3.771q0-3.791 2.563-6.354 2.562-2.562 6.312-2.562 2.334 0 4.334 1.062 2 1.063 3.458 3.021 1.625-2.042 3.583-3.062 1.959-1.021 4.209-1.021 3.75 0 6.312 2.562 2.563 2.563 2.563 6.354 0 1.917-.667 3.771-.667 1.854-2.354 4.125-1.688 2.271-4.521 5.146t-7.167 6.833Zm0-3.666q4.125-3.792 6.812-6.5 2.688-2.709 4.25-4.73 1.563-2.02 2.188-3.604.625-1.583.625-3.125 0-2.666-1.708-4.395-1.709-1.73-4.375-1.73-2.084 0-3.854 1.23-1.771 1.229-2.73 3.395h-2.416q-.959-2.125-2.73-3.375-1.77-1.25-3.854-1.25-2.666 0-4.375 1.73-1.708 1.729-1.708 4.395 0 1.584.625 3.167.625 1.583 2.188 3.625 1.562 2.042 4.25 4.729 2.687 2.688 6.812 6.438Zm0-12.042Z" />
        <text x="24" y="24" style={{ font: "italic 12px sans- serif", textAlign: "center" }}>{props?.count || 0}</text>
      </svg>
    </>
  )
}

export const SunSVG = ({...props}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className}>
      <path d="M18.625 8.042V1.667h2.75v6.375Zm10.792 4.5L27.5 10.583 32 6.042 33.917 8Zm2.541 8.833v-2.75h6.375v2.75ZM18.625 38.333v-6.375h2.75v6.375Zm-8.083-25.875L6.042 8 8 6.083l4.542 4.5ZM32 33.958l-4.5-4.541 1.875-1.917 4.583 4.417ZM1.667 21.375v-2.75h6.375v2.75Zm6.375 12.583L6.083 32l4.459-4.5 1 .958 1.041.959ZM20 30q-4.167 0-7.083-2.917Q10 24.167 10 20t2.917-7.083Q15.833 10 20 10t7.083 2.917Q30 15.833 30 20t-2.917 7.083Q24.167 30 20 30Zm0-2.792q3 0 5.104-2.104T27.208 20q0-3-2.104-5.104T20 12.792q-3 0-5.104 2.104T12.792 20q0 3 2.104 5.104T20 27.208ZM20 20Z"/>
    </svg>
  
  )

}
export const MoonSVG = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className}>
      <path d="M24.25 36.667q-3.583 0-6.771-1.334-3.187-1.333-5.604-3.645-2.417-2.313-3.813-5.376-1.395-3.062-1.395-6.52 0-3.5 1.395-6.584 1.396-3.083 3.813-5.375 2.417-2.291 5.604-3.625 3.188-1.333 6.771-1.333 2.042 0 3.896.458 1.854.459 3.521 1.292-3.75 2.542-6.063 6.458Q23.292 15 23.292 19.75q0 4.792 2.312 8.729 2.313 3.938 6.063 6.396-1.667.833-3.521 1.313-1.854.479-3.896.479Zm0-2.792h1.021q.479 0 .854-.042Q23.5 30.875 22 27.292q-1.5-3.584-1.5-7.5 0-3.959 1.5-7.521 1.5-3.563 4.125-6.563-.375-.083-.854-.083H24.25q-6.083 0-10.438 4.146-4.354 4.146-4.354 10.021 0 5.875 4.354 9.979 4.355 4.104 10.438 4.104ZM20.5 19.75Z" />
    </svg>
  )
}
export const SignInSVG = ({...props}) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className} >
        <path d="M20.25 35v-2.792h11.958V7.792H20.25V5h11.958q1.125 0 1.959.833.833.834.833 1.959v24.416q0 1.125-.833 1.959-.834.833-1.959.833Zm-3.292-7.375-1.958-2 4.25-4.25H5v-2.75h14.208l-4.25-4.25 1.959-2 7.666 7.667Z" />
        </svg>
    </>
  )
}
export const SignOutSVG = ({...props}) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className}>
        <path d="M7.792 35q-1.125 0-1.959-.833Q5 33.333 5 32.208V7.792q0-1.125.833-1.959Q6.667 5 7.792 5H19.75v2.792H7.792v24.416H19.75V35Zm19.583-7.375-1.958-2 4.25-4.25h-14.25v-2.75h14.208l-4.25-4.25 1.958-2L35 20.042Z" />
        </svg>
    </>
  )
}
export const ArrowRightSVG = ({...props}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props.className}>
      <path d="m12.917 36.625-2.542-2.583 14.083-14.084L10.375 5.833l2.542-2.541 16.666 16.666Z" />
    </svg>
  )
}
export const ArrowLeftSVG = ({...props}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props.className}>
      <path d="M16.667 36.667 0 20 16.667 3.333l2.541 2.584L5.125 20l14.083 14.083Z" />
    </svg>
  )
}
export const ArrowDownSVG = ({ ...props }) => {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className}>
        <path d="m20 25.625-10-10 1.958-1.958L20 21.708l8.042-8.041 1.958 2Z" />
      </svg>
  )
}

export const AddSVG = ({...props}) => {
  return(
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" className={props?.className}>
        <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" />
      </svg>
    </>
  )
}

export const UploadSVG = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={props?.className}>
      <path d="M11 18.95h2v-4.2l1.6 1.6 1.4-1.4-4-4.025-4 4.025 1.425 1.375L11 14.75ZM6.075 22.2q-.95 0-1.612-.662-.663-.663-.663-1.613V4.075q0-.95.663-1.613.662-.662 1.612-.662h8L20.2 7.925v12q0 .95-.662 1.613-.663.662-1.613.662Zm6.85-13.125h5l-5-5Z" />
    </svg>
  )
}
export const MarkRightSVG = forwardRef((props, ref) => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={props?.className}>
      <path d="m10.575 16.725 7.15-7.15L16.15 8l-5.575 5.6L7.8 10.8l-1.55 1.575ZM12 22.2q-2.125 0-3.988-.8-1.862-.8-3.237-2.175Q3.4 17.85 2.6 15.988 1.8 14.125 1.8 12t.8-3.988q.8-1.862 2.175-3.237Q6.15 3.4 8.012 2.6 9.875 1.8 12 1.8t3.988.8q1.862.8 3.237 2.175Q20.6 6.15 21.4 8.012q.8 1.863.8 3.988t-.8 3.988q-.8 1.862-2.175 3.237Q17.85 20.6 15.988 21.4q-1.863.8-3.988.8Z" />
    </svg>
  )
})
export const StarFill0SVG = ({...props}) => {
  return(
    
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className}>
        <path d="M13.875 30.875 20 27.208l6.125 3.709-1.625-6.959 5.375-4.666-7.083-.625L20 12.125l-2.792 6.5-7.083.625 5.375 4.708Zm-4.167 5.792 2.709-11.709-9.084-7.875 12-1.041L20 5l4.667 11.042 12 1.041-9.084 7.875 2.709 11.709L20 30.458ZM20 21.958Z" /></svg>
    
  )
}
export const StarHalfSVG = ({...props}) => {

  return(
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props?.className}><path d="m20 27.208 6.125 3.709-1.625-6.959 5.375-4.666-7.083-.625L20 12.125ZM9.708 36.667l2.709-11.709-9.084-7.875 12-1.041L20 5l4.667 11.042 12 1.041-9.084 7.875 2.709 11.709L20 30.458Z" /></svg>
    </>
  )
}

export const CallSVG = ({...props}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props.className}>
      <path d="M33.167 35Q28 35 22.938 32.542q-5.063-2.459-9.042-6.438-3.979-3.979-6.438-9.042Q5 12 5 6.833q0-.791.521-1.312T6.833 5h6.125q.584 0 1.042.396.458.396.542 1.021l1.125 5.458q.083.583-.021 1.063-.104.479-.438.812l-4.125 4.167q2.125 3.583 4.938 6.375 2.812 2.791 6.312 4.75l3.959-4q.375-.459.937-.646.563-.188 1.146-.063l5.208 1.125q.625.125 1.021.604.396.48.396 1.105v6q0 .791-.521 1.312T33.167 35ZM9.708 15.333l3.167-3.208L12 7.792H7.792q.083 1.625.541 3.479.459 1.854 1.375 4.062Zm15.209 15.042q1.708.792 3.604 1.25 1.896.458 3.687.583V28l-4.166-.833ZM9.708 15.333Zm15.209 15.042Z" /></svg>
  )
}
export const MailSVG = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props.className} >
      <path d="M6.125 33.333q-1.125 0-1.958-.833-.834-.833-.834-1.958V9.458q0-1.125.834-1.958.833-.833 1.958-.833h27.75q1.125 0 1.958.833.834.833.834 1.958v21.084q0 1.125-.834 1.958-.833.833-1.958.833ZM20 21.042 6.125 12.083v18.459h27.75V12.083Zm0-2.75 13.792-8.834H6.25ZM6.125 12.083V9.458v21.084Z" />
      </svg>
  )
}
export const ChatSVG = ({...props}) => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" className={props.className}><path d="M13.875 37.5v-9.208h-.25q-4.375-.125-7.333-3.271-2.959-3.146-2.959-7.521 0-4.542 3.146-7.687 3.146-3.146 7.688-3.146H16l-3-3.042 1.958-1.958 6.375 6.375-6.375 6.416L13 12.5l3-3.042h-1.833q-3.334 0-5.688 2.355-2.354 2.354-2.354 5.687t2.229 5.688q2.229 2.354 5.521 2.354h2.792v5.25l5.25-5.25h3.958q3.333 0 5.667-2.354 2.333-2.355 2.333-5.73 0-3.333-2.354-5.666-2.354-2.334-5.688-2.334h-1.75V6.667h1.75q4.5 0 7.667 3.146 3.167 3.145 3.167 7.645 0 4.542-3.146 7.709-3.146 3.166-7.646 3.166h-2.792Z" />
      <text x="24" y="24" style={{ font: "italic 12px sans- serif", textAlign: "center" }}>W</text>
    </svg>
  )
}
export const AtSVG = ({...props}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={props.className} style={{scale: ".7"}}><path d="M12 22.3q-2.125 0-4.012-.825-1.888-.825-3.263-2.2-1.375-1.375-2.2-3.263Q1.7 14.125 1.7 12q0-2.15.825-4.025.825-1.875 2.2-3.25Q6.1 3.35 7.988 2.525 9.875 1.7 12 1.7q2.15 0 4.025.825 1.875.825 3.25 2.2 1.375 1.375 2.2 3.25Q22.3 9.85 22.3 12v1.6q0 1.675-1.088 2.638-1.087.962-2.537.962-.925 0-1.7-.375-.775-.375-1.3-1.05-.7.65-1.662 1.037-.963.388-2.013.388-2.175 0-3.688-1.512Q6.8 14.175 6.8 12q0-2.175 1.512-3.688Q9.825 6.8 12 6.8q2.175 0 3.688 1.512Q17.2 9.825 17.2 12v1.6q0 .55.437 1 .438.45 1.038.45.6 0 1.038-.45.437-.45.437-1V12q0-3.35-2.4-5.75T12 3.85q-3.35 0-5.75 2.4T3.85 12q0 3.35 2.4 5.75t5.75 2.4h5.1v2.15Zm0-7.25q1.275 0 2.163-.888.887-.887.887-2.162t-.887-2.163Q13.275 8.95 12 8.95t-2.162.887Q8.95 10.725 8.95 12t.888 2.162q.887.888 2.162.888Z" /></svg>
  )
}

export const DeleteSVG = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={props.className} >
      <path onClick={props.onClick} d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21Zm2-4h2V8H9Zm4 0h2V8h-2Z" />
    </svg>
  )
}
export const Chart = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={props?.className}>
      <path d="M2.85 21.15v-2.2L5.1 16.7v4.45Zm4.025 0v-6.2l2.25-2.25v8.45Zm4 0V12.7l2.25 2.25v6.2Zm4 0v-6.2l2.25-2.25v8.45Zm4.025 0V10.925l2.25-2.25V21.15ZM2.85 16.1v-3.2L10 5.75l4 4 7.15-7.125v3.2L14 12.975l-4-4Z" />
      </svg>
  )
}
export const GridViewSVG = ({ ...props }) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={props?.className}>
        <path d="M3 11V3h8v8Zm0 10v-8h8v8Zm10-10V3h8v8Zm0 10v-8h8v8Z" />
      </svg>
    </>

  )
}
export const ListViewSVG = ({ ...props }) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={props?.className} >
        <path d="M3 9V5h4v4Zm5 0V5h13v4Zm0 5v-4h13v4Zm0 5v-4h13v4Zm-5 0v-4h4v4Zm0-5v-4h4v4Z" />
      </svg>
    </>

  )
}
export const EditSVG = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={props.className}>
      <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
    </svg>
  )
}
export const ViewSVG = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={props.className}>
      <path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V7H5v12Zm7-2q-2.05 0-3.662-1.113Q6.725 14.775 6 13q.725-1.775 2.338-2.887Q9.95 9 12 9t3.663 1.113Q17.275 11.225 18 13q-.725 1.775-2.337 2.887Q14.05 17 12 17Zm0-1.5q1.4 0 2.55-.663 1.15-.662 1.8-1.837-.65-1.175-1.8-1.838Q13.4 10.5 12 10.5t-2.55.662Q8.3 11.825 7.65 13q.65 1.175 1.8 1.837 1.15.663 2.55.663Zm0-1q-.625 0-1.062-.438Q10.5 13.625 10.5 13t.438-1.062Q11.375 11.5 12 11.5t1.062.438q.438.437.438 1.062t-.438 1.062q-.437.438-1.062.438Z" />
    </svg>
  )
}








