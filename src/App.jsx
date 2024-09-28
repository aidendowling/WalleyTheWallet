import { useState, useEffect } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import StudentLoanModal from "./components/StudentLoanModal"; 
import StudentLoanCard from "./components/StudentLoanCard";

// Import your images
import emptyImage from './assets/empty.png';
import imageTwenty from './assets/20.png';
import imageFourty from './assets/40.png';
import imageSixty from './assets/60.png';
import imageEighty from './assets/80.png';
import fullImage from './assets/full.png';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showStudentLoanModal, setShowStudentLoanModal] = useState(false);
  const [studentLoans, setStudentLoans] = useState([]);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();
  
  const [budgetImage, setBudgetImage] = useState(emptyImage);
  const [fullnessRatio, setFullnessRatio] = useState(0); 

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const handleAddStudentLoanExpense = (loan) => {
    setStudentLoans(prevLoans => [...prevLoans, loan]);
    setShowStudentLoanModal(false);
  };
  

  useEffect(() => {
    const totalBudget = budgets.reduce((total, budget) => total + budget.max, 0);
    const totalExpenses = budgets.reduce((total, budget) => 
        total + getBudgetExpenses(budget.id).reduce((sum, expense) => sum + expense.amount, 0), 
    0);

    if (totalBudget === 0) {
        setBudgetImage(emptyImage); 
        setFullnessRatio(0); 
        return;
    }

    const calculatedFullnessRatio = totalExpenses / totalBudget;
    setFullnessRatio(calculatedFullnessRatio);

    if (calculatedFullnessRatio <= 0.2) setBudgetImage(emptyImage);
    else if (calculatedFullnessRatio <= 0.4) setBudgetImage(imageTwenty);
    else if (calculatedFullnessRatio <= 0.6) setBudgetImage(imageFourty);
    else if (calculatedFullnessRatio <= 0.8) setBudgetImage(imageSixty);
    else if (calculatedFullnessRatio <= 0.99) setBudgetImage(imageEighty);
    else setBudgetImage(fullImage);
  }, [budgets, getBudgetExpenses]);

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Budgets</h1>
      <div className="flex flex-wrap items-center mb-4 gap-2">
        <button className="btn btn-primary" onClick={() => setShowAddBudgetModal(true)}>
          Add Budget
        </button>
        <button className="btn btn-outline btn-primary" onClick={openAddExpenseModal}>
          Add Expense
        </button>
        <button className="btn btn-outline btn-secondary" onClick={() => setShowStudentLoanModal(true)}>
          Add Student Loan Expense
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-36">
        {budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <div key={budget.id} className="w-full">
              <BudgetCard
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
              />
            </div>
          );
        })}
        {studentLoans.map((loan, index) => (
          <StudentLoanCard key={index} loan={loan} />
        ))}
        <div className="w-full">
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
        </div>
        <div className="w-full">
          <TotalBudgetCard />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-36 z-10 flex justify-center items-center bg-white">
        <img
          src={budgetImage}
          alt="Budget Status"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <AddBudgetModal
        showModal={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        showModal={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
      <StudentLoanModal 
        showModal={showStudentLoanModal} 
        handleClose={() => setShowStudentLoanModal(false)}
        onAddStudentLoan={handleAddStudentLoanExpense}
      />
    </div>
  );
}

export default App;