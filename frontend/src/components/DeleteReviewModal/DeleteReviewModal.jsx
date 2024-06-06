// frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx
import './DeleteReviewModal.css';

const DeleteReviewModal = ({ onDelete, onCancel }) => {
  return (
    <div className="delete-review-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="button-container">
        <button className="delete-button" onClick={onDelete}>Yes (Delete Review)</button>
        <button className="cancel-button" onClick={onCancel}>No (Keep Review)</button>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
