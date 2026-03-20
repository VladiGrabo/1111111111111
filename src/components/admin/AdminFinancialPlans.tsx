import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ArrowUpDown, Users, TrendingUp, Target, Wallet, Receipt } from 'lucide-react';
import toast from 'react-hot-toast';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

interface Income {
  id: string;
  source: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
}

interface Expense {
  id: string;
  category: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
}

interface UserFinancialPlan {
  userId: string;
  userName: string;
  userEmail: string;
  goals: Goal[];
  incomes: Income[];
  expenses: Expense[];
  monthlySavings: number;
  yearlySavings: number;
  createdAt: string;
  updatedAt: string;
}

export function AdminFinancialPlans() {
  const [plans, setPlans] = useState<UserFinancialPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<UserFinancialPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFinancialPlans();
  }, []);

  async function loadFinancialPlans() {
    try {
      // Get all profiles first
      const profilesSnapshot = await getDocs(collection(db, 'profiles'));
      const profilesMap = new Map();
      profilesSnapshot.docs.forEach(doc => {
        const data = doc.data();
        profilesMap.set(doc.id, {
          name: data.name || 'Нет данных',
          email: data.email || 'Нет данных'
        });
      });

      // Get all financial plans
      const plansSnapshot = await getDocs(collection(db, 'financial_plans'));
      
      const plansData = plansSnapshot.docs.map(doc => {
        const data = doc.data();
        const userProfile = profilesMap.get(doc.id) || {
          name: 'Нет данных',
          email: 'Нет данных'
        };

        // Calculate monthly and yearly totals
        const monthlyIncome = data.incomes?.reduce((sum: number, income: Income) => 
          sum + (income.frequency === 'monthly' ? income.amount : income.amount / 12), 0) || 0;
        
        const yearlyIncome = data.incomes?.reduce((sum: number, income: Income) => 
          sum + (income.frequency === 'yearly' ? income.amount : income.amount * 12), 0) || 0;
        
        const monthlyExpenses = data.expenses?.reduce((sum: number, expense: Expense) => 
          sum + (expense.frequency === 'monthly' ? expense.amount : expense.amount / 12), 0) || 0;
        
        const yearlyExpenses = data.expenses?.reduce((sum: number, expense: Expense) => 
          sum + (expense.frequency === 'yearly' ? expense.amount : expense.amount * 12), 0) || 0;
        
        const monthlySavings = monthlyIncome - monthlyExpenses;
        const yearlySavings = yearlyIncome - yearlyExpenses;

        // Calculate total goals amount
        const totalGoalsAmount = data.goals?.reduce((sum: number, goal: Goal) => 
          sum + goal.targetAmount, 0) || 0;

        return {
          userId: doc.id,
          userName: userProfile.name,
          userEmail: userProfile.email,
          goals: data.goals || [],
          incomes: data.incomes || [],
          expenses: data.expenses || [],
          monthlyIncome,
          yearlyIncome,
          monthlyExpenses,
          yearlyExpenses,
          monthlySavings,
          yearlySavings,
          totalGoalsAmount,
          createdAt: data.createdAt || data.created_at || new Date().toISOString(),
          updatedAt: data.updatedAt || data.updated_at || new Date().toISOString()
        };
      });

      setPlans(plansData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading financial plans:', error);
      setError('Ошибка при загрузке финансовых планов');
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Некорректная дата';
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (selectedPlan) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Финансовый план: {selectedPlan.userName}
          </h2>
          <button
            onClick={() => setSelectedPlan(null)}
            className="text-burgundy-600 hover:text-burgundy-700"
          >
            Вернуться к списку
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <Users className="h-10 w-10 text-burgundy-600" />
              <div>
                <p className="text-gray-600">Клиент</p>
                <p className="text-lg font-medium">{selectedPlan.userName}</p>
                <p className="text-sm text-gray-500">{selectedPlan.userEmail}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <Target className="h-10 w-10 text-burgundy-600" />
              <div>
                <p className="text-gray-600">Финансовые цели</p>
                <p className="text-lg font-medium">{selectedPlan.goals.length}</p>
                <p className="text-sm text-gray-500">
                  Общая сумма: {formatMoney(selectedPlan.totalGoalsAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-10 w-10 text-burgundy-600" />
              <div>
                <p className="text-gray-600">Накопления</p>
                <p className="text-lg font-medium text-green-600">
                  {formatMoney(selectedPlan.monthlySavings)} / мес
                </p>
                <p className="text-sm text-gray-500">
                  {formatMoney(selectedPlan.yearlySavings)} / год
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold">Доходы</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">В месяц:</span>
                <span className="font-medium text-green-600">{formatMoney(selectedPlan.monthlyIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">В год:</span>
                <span className="font-medium text-green-600">{formatMoney(selectedPlan.yearlyIncome)}</span>
              </div>
            </div>
          </div>

          {/* Expenses Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Receipt className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold">Расходы</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">В месяц:</span>
                <span className="font-medium text-red-600">{formatMoney(selectedPlan.monthlyExpenses)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">В год:</span>
                <span className="font-medium text-red-600">{formatMoney(selectedPlan.yearlyExpenses)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Финансовые цели</h3>
          <div className="space-y-4">
            {selectedPlan.goals.map((goal, index) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              return (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{goal.name}</h4>
                    <span className="text-sm text-gray-600">
                      {formatMoney(goal.currentAmount)} / {formatMoney(goal.targetAmount)}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-burgundy-600 bg-burgundy-200">
                          {progress.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-burgundy-200">
                      <div
                        style={{ width: `${progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-burgundy-600"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            {selectedPlan.goals.length === 0 && (
              <p className="text-center text-gray-500 py-4">Нет финансовых целей</p>
            )}
          </div>
        </div>

        {/* Income Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Источники дохода</h3>
          <div className="space-y-4">
            {selectedPlan.incomes.map((income, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{income.source}</h4>
                    <p className="text-sm text-gray-600">
                      {income.frequency === 'monthly' ? 'Ежемесячно' : 'Ежегодно'}
                    </p>
                  </div>
                  <p className="text-lg font-medium text-green-600">
                    {formatMoney(income.amount)}
                  </p>
                </div>
              </div>
            ))}
            {selectedPlan.incomes.length === 0 && (
              <p className="text-center text-gray-500 py-4">Нет источников дохода</p>
            )}
          </div>
        </div>

        {/* Expenses Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Расходы</h3>
          <div className="space-y-4">
            {selectedPlan.expenses.map((expense, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{expense.category}</h4>
                    <p className="text-sm text-gray-600">
                      {expense.frequency === 'monthly' ? 'Ежемесячно' : 'Ежегодно'}
                    </p>
                  </div>
                  <p className="text-lg font-medium text-red-600">
                    {formatMoney(expense.amount)}
                  </p>
                </div>
              </div>
            ))}
            {selectedPlan.expenses.length === 0 && (
              <p className="text-center text-gray-500 py-4">Нет расходов</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Финансовые планы клиентов</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.userId}
            className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedPlan(plan)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{plan.userName}</h3>
                <p className="text-sm text-gray-500">{plan.userEmail}</p>
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(plan.updatedAt)}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Месячные накопления</p>
                <p className="text-lg font-medium text-green-600">
                  {formatMoney(plan.monthlySavings)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Финансовые цели</p>
                <p className="text-lg font-medium">{plan.goals.length}</p>
              </div>
            </div>
          </div>
        ))}
        {plans.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500">
            Нет финансовых планов
          </div>
        )}
      </div>
    </div>
  );
}