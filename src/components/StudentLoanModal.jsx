import { useRef, useState } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function StudentLoanModal({ showModal, handleClose, onAddStudentLoan }) {
  const nameRef = useRef();
  const amountRef = useRef();
  const interestRateRef = useRef();
  const graduationDateRef = useRef();
  const [isSubsidized, setIsSubsidized] = useState(false);

  const { addExpense } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    const studentLoan = {
      name: nameRef.current.value,
      amount: parseFloat(amountRef.current.value),
      interestRate: parseFloat(interestRateRef.current.value),
      graduationDate: graduationDateRef.current.value,
      isSubsidized: isSubsidized,
    };
    onAddStudentLoan(studentLoan);
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
              ref={nameRef}
              type="text"
              placeholder="Enter loan name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Loan Amount</span>
            </label>
            <input
              ref={amountRef}
              type="number"
              placeholder="Enter loan amount"
              className="input input-bordered w-full"
              required
              min={0}
              step={0.01}
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Interest Rate (%)</span>
            </label>
            <input
              ref={interestRateRef}
              type="number"
              placeholder="Enter interest rate"
              className="input input-bordered w-full"
              required
              min={0}
              step={0.01}
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Expected Graduation Date</span>
            </label>
            <input
              ref={graduationDateRef}
              type="date"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label cursor-pointer">
              <span className="label-text">Is this loan subsidized?</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={isSubsidized}
                onChange={(e) => setIsSubsidized(e.target.checked)}
              />
            </label>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Add Loan</button>
            <button type="button" className="btn" onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}