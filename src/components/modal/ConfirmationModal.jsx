import "./ConfirmationModal.css";
import React, { useState } from "react";
import Modal from "react-modal";

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Xác nhận"
      className="confirmation-modal"
    >
      <div className="confirmation-modal-content">
        <p className="confirmation-title">Please confirm</p>
        <br />
        <p>{message}</p>
        <div className="confirmation-modal-buttons">
          <button onClick={onConfirm}>Xác nhận</button>
          <button onClick={onCancel}>Hủy</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;