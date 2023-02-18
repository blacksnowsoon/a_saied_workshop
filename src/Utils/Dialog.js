import React, {useContext} from 'react';
import AppContext from '../Context';
/**
 * useing this dialog as a general dialog works for info and confirmtion message
 * the props holding the logics of the return elements 
 * - props.message hold the message will be dispalyed on the dialog
 * - props.onClick will hold the click event for the dialog the event will fire the click-event
 *  and passing the name of the clicked button yes or no. so you can act with those 2 otiopn
 * - props for using the dialog {message="text", onClick=event(), noBtn=Boolean} 
 * - noBtn = true in case of confime dialog
 * - noBtn = false in case of info dialog
 */

export const Dialog = ({...props}) => {
  const { PROJECT_CONTEXT } = useContext(AppContext);
  const containerClasses = ["dialog-container"];
  const handleOnClick = (e) => {
    e.preventDefault();
    const name = e.target.name;
    props?.onClick(name);
  }

  return (
    <div className={containerClasses.join(" ")}>
      <div className={`${PROJECT_CONTEXT.themeColor} dialog`}>
        <div className="dialog-message">
          {
            props?.message
          }
        </div>
        <>
          {
            props?.onClick &&
            <div className='dialog-actions'>
              <button className='btn dialog-btn' autoFocus={true} name={props?.name} onClick={handleOnClick}>{props?.yesCaption || "نعم"}
              </button>

              {
                props?.noCaption &&
                <button className='btn dialog-btn' name="no" onClick={handleOnClick}>
                  {props?.noCaption || "لا"}
                </button>
              }

            </div>
          }
        </>
        
      </div>
    </div>
  )
}
