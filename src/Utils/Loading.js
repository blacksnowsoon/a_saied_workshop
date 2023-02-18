import React, {useContext} from 'react';
import AppContext from '../Context';

export const Loading = () => {
  const {appTheme} = useContext(AppContext);
  const containerClasses = ["loaderRectangle"]
  return (
    <div className={containerClasses.join(" ")}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loading;
