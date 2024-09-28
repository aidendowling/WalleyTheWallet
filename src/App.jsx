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
import Home from './components/Home';

// Import your images
import emptyImage from './assets/empty.png';
import imageTwenty from './assets/20.png';
import imageFourty from './assets/40.png';
import imageEighty from './assets/80.png';
import fullImage from './assets/full.png';
import imageForCompletedChallengeLow from './assets/completed_low.png';
import imageForCompletedChallengeModerate from './assets/completed_moderate.png'; 

function StoreModal({ showModal, handleClose, userPoints, setUserPoints, storeItems, userItems, setUserItems }) {
  const [purchasedItems, setPurchasedItems] = useState({}); // State to track purchased items

  const handlePurchase = (item) => {
    // Check if the item has already been purchased
    if (purchasedItems[item.id]) {
      alert(`You have already purchased a ${item.name}!`);
      return;
    }

    if (userPoints >= item.price) {
      setUserPoints(userPoints - item.price);
      setUserItems([...userItems, item]);
      setPurchasedItems((prev) => ({ ...prev, [item.id]: true })); // Mark item as purchased
      alert(`You bought a ${item.name}!`);
    } else {
      alert('Not enough points!');
    }
  };

  return (
    <div className={`modal ${showModal ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h2 className="text-lg font-bold">Store</h2>
        <p>Your Points: {userPoints}</p>
        <ul>
          {storeItems.map(item => (
            <li key={item.id} className="flex justify-between my-2">
              <span>{item.name}</span>
              <span>{item.price} Points</span>
              <button 
                className="btn btn-primary"
                onClick={() => handlePurchase(item)}
                disabled={purchasedItems[item.id]} // Disable if the item has been purchased
              >
                {purchasedItems[item.id] ? 'Purchased' : 'Buy'}
              </button>
            </li>
          ))}
        </ul>
        <button className="btn btn-outline" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

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

  // Points system and store feature states
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [storeItems, setStoreItems] = useState([
    { id: 1, name: 'Hat', price: 50, itemBought: false },
    { id: 2, name: 'Sunglasses', price: 75, itemBought: false },
    { id: 3, name: 'Backpack', price: 100, itemBought: false },
  ]);
  const [userItems, setUserItems] = useState([]);
  const [userPoints, setUserPoints] = useState(0); // Starting points at 0

  // Challenges state
  const [challenges, setChallenges] = useState([
    { id: 1, description: "Save $50 this week", isCompleted: false },
    { id: 2, description: "Cut out one unnecessary expense", isCompleted: false },
    { id: 3, description: "Spend less than $100 this week", isCompleted: false },
  ]);

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const handleAddStudentLoanExpense = (loan) => {
    setStudentLoans(prevLoans => [...prevLoans, loan]);
    setShowStudentLoanModal(false);
  };

  // Function to complete a challenge
  const completeChallenge = (challengeId) => {
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => 
        challenge.id === challengeId ? { ...challenge, isCompleted: true } : challenge
      )
    );
    setUserPoints(prevPoints => prevPoints + 20); // Reward for completing a challenge
  };

  useEffect(() => {
    const totalBudget = budgets.reduce((total, budget) => total + budget.max, 0);
    const totalExpenses = budgets.reduce((total, budget) => 
      total + getBudgetExpenses(budget.id).reduce((sum, expense) => sum + expense.amount, 0), 
    0);
    
    // Reward points if the user is under budget
    if (totalBudget > 0 && totalExpenses <= totalBudget) {
      const savings = totalBudget - totalExpenses;
      const pointsEarned = Math.floor(savings / 10); // Earn points based on savings
      setUserPoints(prevPoints => prevPoints + pointsEarned);
    }

    if (totalBudget === 0) {
      setBudgetImage(emptyImage); 
      setFullnessRatio(0); 
      return;
    }

    const calculatedFullnessRatio = totalExpenses / totalBudget;
    setFullnessRatio(calculatedFullnessRatio);

    if(storeItems[1][3] === true) {
      setBudgetImage(imageForCompletedChallengeLow);
    }

     else if (calculatedFullnessRatio <= 0.2) {
      setBudgetImage(imageFourty);
    } else if (calculatedFullnessRatio <= 0.5) {
      setBudgetImage(imageFourty);
    } else if (calculatedFullnessRatio <= 0.8) {
      setBudgetImage(imageTwenty);
    } else if (calculatedFullnessRatio <= 0.99) {
      setBudgetImage(imageEighty);
    } else {
      setBudgetImage(fullImage);
    }
  }, [budgets, getBudgetExpenses]);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/app" element={
          <div className="container mx-auto p-4 flex flex-col min-h-screen relative">
            <h1 className="text-2xl font-bold mb-4">Budgets</h1>
            <p className="text-lg font-semibold">Points: {userPoints}</p>
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
              <button className="btn btn-outline btn-success" onClick={() => setShowStoreModal(true)}>
                Visit Store
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
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

            {/* Financial Challenges Section */}
            <div className="flex flex-col mb-4">
              <h2 className="text-xl font-bold">Financial Challenges</h2>
              <div className="grid grid-cols-1 gap-4">
                {challenges.map(challenge => (
                  <div key={challenge.id} className="border p-4 rounded-lg">
                    <p>{challenge.description}</p>
                    {!challenge.isCompleted ? (
                      <button 
                        className="btn btn-success"
                        onClick={() => completeChallenge(challenge.id)}
                      >
                        Complete Challenge
                      </button>
                    ) : (
                      <span className="text-green-600 font-bold">Completed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Image in the Top Right Corner */}
            <div className="absolute top-4 right-10">
              <img
                src={budgetImage}
                alt="Budget Status"
                style={{
                  width: '200px',  // Increased width
                  height: '200px', // Increased height
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        } />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
      
      {/* Keep your modals outside of the Routes */}
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
        userItems={userItems}
        setUserItems={setUserItems}
      />
    </Router>
  );
}

export default App;
