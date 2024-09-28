import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import StudentLoanModal from "./components/StudentLoanModal"; // Import the new modal
import { useState, useEffect } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";

// Import your images
import emptyImage from './assets/empty.png';
import halfFullImage from './assets/half-full.jpeg';
import fullImage from './assets/full.jpg';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showStudentLoanModal, setShowStudentLoanModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();
  
  // State for current budget fullness image
  const [budgetImage, setBudgetImage] = useState(emptyImage);

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const handleAddStudentLoanExpense = (expense) => {
    console.log('Added Student Loan Expense:', expense);
    setShowStudentLoanModal(false); // Close the modal after adding
  };

  useEffect(() => {
    const totalBudget = budgets.reduce((total, budget) => total + budget.max, 0);
    const totalExpenses = budgets.reduce((total, budget) => 
        total + getBudgetExpenses(budget.id).reduce((sum, expense) => sum + expense.amount, 0), 
    0);

    // Check if totalBudget is 0
    if (totalBudget === 0) {
        setBudgetImage(fullImage); // Set to empty if no budget
        return; // Exit early to avoid further calculations
    }

    const fullnessRatio = totalExpenses / totalBudget;

    // Change image based on fullness ratio
    if (fullnessRatio <= 0.25) {
        setBudgetImage(fullImage);
    } else if (fullnessRatio <= 0.75) {
        setBudgetImage(halfFullImage);
    } else {
        setBudgetImage(emptyImage);
    }
}, [budgets, getBudgetExpenses]);


  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
          <Button variant="outline-secondary" onClick={() => setShowStudentLoanModal(true)}>
            Add Student Loan Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>

        {/* Display the current budget image */}
        <img
          src={budgetImage}
          alt="Budget Status"
          style={{ width: "100%", height: "auto", position: "fixed", bottom: 0, left: 0, zIndex: -1 }}
        />
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
      <StudentLoanModal 
        show={showStudentLoanModal} 
        defaultStudentLoan={addExpenseModalBudgetId}
        handleClose={() => setShowStudentLoanModal(false)}
      />
    </>
  );
}

export default App;
