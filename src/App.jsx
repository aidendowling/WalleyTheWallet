import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import StoreModal from './components/StoreModal';
import Home from './components/Home';
import Header from './components/Header';
import Mascot from './components/Mascot';
import FinancialChallenges from './components/FinancialChallenges';

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster"

// Import your images
import emptyImage from './assets/empty.png'; 
import imageTwenty from './assets/20.png'; 
import imageFourty from './assets/40.png';
import imageEighty from './assets/80.png';
import fullImage from './assets/full.png';
import Sempty from './assets/Sempty.png';
import S20 from './assets/S20.png';
import S40 from './assets/S40.png';
import S80 from './assets/S80.png';
import Sfull from './assets/Sfull.png';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showStudentLoanModal, setShowStudentLoanModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [studentLoans, setStudentLoans] = useState([]);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  const [budgetImage, setBudgetImage] = useState(emptyImage);
  const [fullnessRatio, setFullnessRatio] = useState(0); 

  const [purchasedItems, setPurchasedItems] = useState({});
  const [storeItems] = useState([
    { id: 1, name: 'Hat', price: 50 },
    { id: 2, name: 'Sunglasses', price: 75 },
    { id: 3, name: 'Backpack', price: 100 },
  ]);

  const [userPoints, setUserPoints] = useState(0);

  const [challenges, setChallenges] = useState([
    { id: 1, description: "Save $50 this week", isCompleted: false },
    { id: 2, description: "Cut out one unnecessary expense", isCompleted: false },
    { id: 3, description: "Spend less than $100 this week", isCompleted: false },
  ]);

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const handleAddStudentLoanExpense = (loan) => {
    setStudentLoans(prevLoans => [...prevLoans, loan]);
    setShowStudentLoanModal(false);
  };

  const completeChallenge = (challengeId) => {
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => 
        challenge.id === challengeId ? { ...challenge, isCompleted: true } : challenge
      )
    );
    setTimeout(() => {
      setUserPoints(prevPoints => prevPoints + 20);
    }, 1000); // Delay the point increase by 1 second
  };

  useEffect(() => {
    const totalBudget = budgets.reduce((total, budget) => total + budget.max, 0);
    const totalExpenses = budgets.reduce((total, budget) => 
      total + getBudgetExpenses(budget.id).reduce((sum, expense) => sum + expense.amount, 0), 
    0);
    
    if (totalBudget > 0 && totalExpenses <= totalBudget) {
      const savings = totalBudget - totalExpenses;
      const pointsEarned = Math.floor(savings / 10);
      setUserPoints(prevPoints => prevPoints + pointsEarned);
    }
  
    if (totalBudget === 0) {
      setBudgetImage(emptyImage);
      setFullnessRatio(0);
      return;
    }
  
    const calculatedFullnessRatio = totalExpenses / totalBudget;
    setFullnessRatio(calculatedFullnessRatio);
  
    const selectedImage = purchasedItems[2]
      ? calculatedFullnessRatio <= 0.2 ? Sempty
        : calculatedFullnessRatio <= 0.5 ? S20
        : calculatedFullnessRatio <= 0.8 ? S40
        : calculatedFullnessRatio <= 0.99 ? S80
        : Sfull
      : calculatedFullnessRatio <= 0.2 ? emptyImage
        : calculatedFullnessRatio <= 0.5 ? imageTwenty
        : calculatedFullnessRatio <= 0.8 ? imageFourty
        : calculatedFullnessRatio <= 0.99 ? imageEighty
        : fullImage;
  
    setBudgetImage(selectedImage);
  }, [budgets, getBudgetExpenses, purchasedItems]);
  
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/app" element={
          <div className="container mx-auto p-4 flex flex-col min-h-screen relative">
            <Header title="Budgets" points={userPoints} />
            <Mascot image={budgetImage} />
            
            <div className="flex flex-wrap items-center mb-4 gap-2">
              <Button variant="default" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
              <Button variant="outline" onClick={openAddExpenseModal}>Add Expense</Button>
              <Button variant="secondary" onClick={() => setShowStudentLoanModal(true)}>Add Student Loan Expense</Button>
              <Button variant="ghost" onClick={() => setShowStoreModal(true)}>Visit Store</Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
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
                    onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                  />
                );
              })}
              {studentLoans.map((loan, index) => (
                <StudentLoanCard key={index} loan={loan} />
              ))}
              <UncategorizedBudgetCard
                onAddExpenseClick={openAddExpenseModal}
                onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
              />
              <TotalBudgetCard />
            </div>

            <FinancialChallenges challenges={challenges} completeChallenge={completeChallenge} />
          </div>
        } />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
      
      {/* Keep all the modal components */}
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
      <StoreModal 
        showModal={showStoreModal} 
        handleClose={() => setShowStoreModal(false)}
        userPoints={userPoints}
        setUserPoints={setUserPoints}
        storeItems={storeItems}
        purchasedItems={purchasedItems}
        setPurchasedItems={setPurchasedItems}
      />
      <Toaster />
    </Router>
  );
}

export default App;