import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import StudentLoanModal from "./components/StudentLoanModal"; 
import { useState, useEffect } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";

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
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();
  
  // State for current budget fullness image
  const [budgetImage, setBudgetImage] = useState(emptyImage);
  const [fullnessRatio, setFullnessRatio] = useState(0); 

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const handleAddStudentLoanExpense = (expense) => {
    console.log('Added Student Loan Expense:', expense);
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

    // Change image based on fullness ratio
    if (calculatedFullnessRatio <= 0.2) {
        setBudgetImage(emptyImage);
    } else if (calculatedFullnessRatio <= 0.4) {
        setBudgetImage(imageTwenty);
    } else if (calculatedFullnessRatio <= 0.6) {
      setBudgetImage(imageFourty);
    } else if (calculatedFullnessRatio <= 0.8) {
    setBudgetImage(imageSixty);
    } else if (calculatedFullnessRatio <= 0.99) {
  setBudgetImage(imageEighty);
    }  else {
        setBudgetImage(fullImage);
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
        <div 
          style={{
            position: "fixed", 
            bottom: 0, 
            left: 0, 
            width: "100%", 
            height: "150px",  // Adjusted height to a fixed value to avoid shrinking
            zIndex: 1, 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            backgroundColor: "white" // Optional background to make sure the image is clearly visible
          }}
        >
          <img
            src={budgetImage}
            alt="Budget Status"
            style={{ 
              maxHeight: "100%",  // Keeps the image within the height limit
              maxWidth: "100%",    // Keeps the image within the width limit
              objectFit: "contain" // Ensures the image retains its aspect ratio
            }}
          />
        </div>
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
