import "./LossModal.css";
import React from "react";
import closeModal from "../../../assets/closeModal.svg";

const LossModal = ({ setResultPopUp }) => {
     return (
          <div className='result-popup'>
        <span>You have lost</span>
        <img src={closeModal} style={{ width: 50, cursor: "pointer" }} onClick={() => setResultPopUp(null)}></img>
      </div>
     );
}

export default LossModal;
