import React from "react";

import Modal from "../Modal/Modal";

import { useState } from "react";
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";

const CloseAcc = ({ deleteAcc, deleting }) => {
  const [activeModal, setModal] = useState(false);

  useEffect(() => {
    window.addEventListener("mousedown", shouldYouCloseModal);
    return () => window.removeEventListener("mousedown", shouldYouCloseModal);
  });

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const shouldYouCloseModal = (e) => {
    if (e.target.classList.contains("delete_recipe_modal")) {
      setModal(false);
    }
  };

  let modalContClasses = activeModal
    ? "delete_recipe_modal_card open_modal"
    : "delete_recipe_modal_card close_modal_real";

  let modalClasses = activeModal
    ? "delete_recipe_modal"
    : "delete_recipe_modal_close";
  return (
    <div className="user-tabpanel">
      <div className="user-tabpanel-heading">
        <h2>Close Account</h2>
        <p>Close your account permanently.</p>
      </div>
      <div className="user-delete">
        <p>
          <span>Warning: </span>
          If you close your account, you will be unsubscribed from all your 6
          courses, and will lose access forever.
        </p>
        <button onClick={openModal} className="clasic-btn">
          Close Account
        </button>
      </div>
      <Modal>
        <div className={modalClasses}>
          <div className={modalContClasses}>
            <div className="close_icon_cont">
              <IconContext.Provider value={{ className: "close_modal" }}>
                <IoMdClose onClick={closeModal} />
              </IconContext.Provider>
            </div>
            <h2 className="delete_recipe_modal_note">
              This Account will be permanently deleted and you will lose access
              to all your recipes forever.
            </h2>
            <h3 className="delete_recipe_modal_note2">
              Are you sure you want to continue?
            </h3>
            <button
              disabled={deleting}
              onClick={deleteAcc}
              className="delete_recipe_permanent"
            >
              {deleting ? "Loading..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CloseAcc;
