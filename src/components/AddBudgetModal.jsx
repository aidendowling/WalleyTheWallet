import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ showModal, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  }

  return (
    <dialog id="add_budget_modal" className={`modal ${showModal ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg mb-4">New Budget</h3>
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Enter budget name"
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text">Maximum Spending</span>
            </label>
            <input
              ref={maxRef}
              type="number"
              step="0.01"
              placeholder="Enter maximum amount"
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Add</button>
            <button type="button" className="btn" onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}