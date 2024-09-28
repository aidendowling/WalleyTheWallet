import { useRef } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";

export default function StudentLoanModal({ showModal, handleClose, defaultBudgetId }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }

  return (
    <dialog id="student_loan_modal" className={`modal ${showModal ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg mb-4">New Student Loan</h3>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Loan Name</span>
            </label>
            <input
              ref={descriptionRef}
              type="text"
              placeholder="Enter loan name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Monthly Payment</span>
            </label>
            <input
              ref={amountRef}
              type="number"
              placeholder="Enter monthly payment"
              className="input input-bordered w-full"
              required
              min={0}
              step={0.01}
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Budget</span>
            </label>
            <select 
              className="select select-bordered w-full"
              defaultValue={defaultBudgetId}
              ref={budgetIdRef}
            >
              <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map(budget => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </select>
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