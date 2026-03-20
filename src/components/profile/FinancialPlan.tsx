import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
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

export function FinancialPlan() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadFinancialData();
    }
  }, [user]);

  const loadFinancialData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, 'financial_plans', user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setGoals(data.goals || []);
        setIncomes(data.incomes || []);
        setExpenses(data.expenses || []);
      } else {
        const initialData = {
          goals: [],
          incomes: [],
          expenses: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        await setDoc(docRef, initialData);
        setGoals([]);
        setIncomes([]);
        setExpenses([]);
      }
    } catch (error) {
      console.error('Error loading financial data:', error);
      setError('Не удалось загрузить финансовый план. Пожалуйста, попробуйте позже.');
      toast.error('Ошибка при загрузке финансового плана');
    } finally {
      setLoading(false);
    }
  };

  const saveFinancialData = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, 'financial_plans', user.id);
      await setDoc(docRef, {
        goals,
        incomes,
        expenses,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      toast.success('Финансовый план сохранен');
    } catch (error) {
      console.error('Error saving financial data:', error);
      toast.error('Не удалось сохранить изменения');
    }
  };

  const addGoal = () => {
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      name: '',
      targetAmount: 0,
      currentAmount: 0
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(goals.map(goal => {
      if (goal.id !== id) return goal;
      
      if ('targetAmount' in updates) {
        updates.targetAmount = Number(updates.targetAmount) || 0;
      }
      if ('currentAmount' in updates) {
        updates.currentAmount = Number(updates.currentAmount) || 0;
      }
      
      return { ...goal, ...updates };
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const addIncome = () => {
    const newIncome: Income = {
      id: crypto.randomUUID(),
      source: '',
      amount: 0,
      frequency: 'monthly'
    };
    setIncomes([...incomes, newIncome]);
  };

  const updateIncome = (id: string, updates: Partial<Income>) => {
    setIncomes(incomes.map(income => {
      if (income.id !== id) return income;
      
      if ('amount' in updates) {
        updates.amount = Number(updates.amount) || 0;
      }
      
      return { ...income, ...updates };
    }));
  };

  const deleteIncome = (id: string) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  const addExpense = () => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      category: '',
      amount: 0,
      frequency: 'monthly'
    };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(expenses.map(expense => {
      if (expense.id !== id) return expense;
      
      if ('amount' in updates) {
        updates.amount = Number(updates.amount) || 0;
      }
      
      return { ...expense, ...updates };
    }));
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Calculate monthly and yearly totals
  const monthlyIncome = incomes.reduce((sum, income) => 
    sum + (income.frequency === 'monthly' ? income.amount : income.amount / 12), 0);
  const yearlyIncome = incomes.reduce((sum, income) => 
    sum + (income.frequency === 'yearly' ? income.amount : income.amount * 12), 0);
  
  const monthlyExpenses = expenses.reduce((sum, expense) => 
    sum + (expense.frequency === 'monthly' ? expense.amount : expense.amount / 12), 0);
  const yearlyExpenses = expenses.reduce((sum, expense) => 
    sum + (expense.frequency === 'yearly' ? expense.amount : expense.amount * 12), 0);
  
  const monthlySavings = monthlyIncome - monthlyExpenses;
  const yearlySavings = yearlyIncome - yearlyExpenses;

  // Calculate years to reach goal
  const calculateYearsToReachGoal = (targetAmount: number, currentAmount: number) => {
    if (monthlySavings <= 0) return Infinity;
    const remainingAmount = targetAmount - currentAmount;
    const yearsToReach = remainingAmount / (monthlySavings * 12);
    return Math.max(0, yearsToReach);
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadFinancialData}
          className="mt-4 text-sm text-red-600 hover:text-red-700"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Income Card */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-base font-medium text-gray-900 mb-3">Доходы</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">В месяц</p>
              <p className="text-xl font-semibold text-green-600">
                {monthlyIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">В год</p>
              <p className="text-lg font-semibold text-green-600">
                {yearlyIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-base font-medium text-gray-900 mb-3">Расходы</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">В месяц</p>
              <p className="text-xl font-semibold text-red-600">
                {monthlyExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">В год</p>
              <p className="text-lg font-semibold text-red-600">
                {yearlyExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
          </div>
        </div>

        {/* Savings Potential Card */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-base font-medium text-gray-900 mb-3">Потенциал накоплений</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">В месяц</p>
              <p className="text-xl font-semibold text-burgundy-600">
                {monthlySavings.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">В год</p>
              <p className="text-lg font-semibold text-burgundy-600">
                {yearlySavings.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Goals Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Финансовые цели</h2>
        </div>

        <div className="p-4">
          {/* Goals Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Общая сумма целей</p>
              <p className="text-lg font-semibold whitespace-nowrap">
                {goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
                  .toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Накоплено</p>
              <p className="text-lg font-semibold text-green-600 whitespace-nowrap">
                {goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
                  .toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Осталось накопить</p>
              <p className="text-lg font-semibold text-burgundy-600 whitespace-nowrap">
                {goals.reduce((sum, goal) => sum + (goal.targetAmount - goal.currentAmount), 0)
                  .toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
          </div>

          {/* Goals List */}
          <div className="space-y-4">
            {goals.map(goal => {
              const progress = goal.targetAmount > 0 
                ? (goal.currentAmount / goal.targetAmount) * 100 
                : 0;
              const yearsToReach = calculateYearsToReachGoal(goal.targetAmount, goal.currentAmount);

              return (
                <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="text"
                      value={goal.name}
                      onChange={(e) => updateGoal(goal.id, { name: e.target.value })}
                      placeholder="Название цели"
                      className="text-base font-medium bg-transparent border-none p-0 focus:ring-0"
                    />
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          progress === 0 ? 'bg-gray-300' :
                          progress < 50 ? 'bg-burgundy-600' :
                          'bg-green-600'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 min-w-[3rem] text-right">
                      {progress.toFixed(1)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Целевая сумма
                      </label>
                      <input
                        type="number"
                        value={goal.targetAmount || ''}
                        onChange={(e) => updateGoal(goal.id, { targetAmount: Number(e.target.value) })}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Текущая сумма
                      </label>
                      <input
                        type="number"
                        value={goal.currentAmount || ''}
                        onChange={(e) => updateGoal(goal.id, { currentAmount: Number(e.target.value) })}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Срок достижения
                      </label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm">
                        {yearsToReach === Infinity ? (
                          <span className="text-red-600">Невозможно рассчитать</span>
                        ) : (
                          `${yearsToReach.toFixed(1)} ${yearsToReach === 1 ? 'год' : yearsToReach < 5 ? 'года' : 'лет'}`
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {goals.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                У вас пока нет финансовых целей. Нажмите "Добавить цель", чтобы начать.
              </div>
            )}
          </div>

          {/* Add Goal Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={addGoal}
              className="flex items-center gap-2 text-burgundy-600 hover:text-burgundy-700 px-4 py-2 border border-burgundy-600 rounded-md hover:bg-burgundy-50"
            >
              <Plus className="h-4 w-4" />
              <span>Добавить цель</span>
            </button>
          </div>
        </div>
      </div>

      {/* Income Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Источники дохода</h2>
        </div>

        <div className="p-4">
          {/* Income Summary */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">В месяц</p>
              <p className="text-lg font-semibold text-green-600">
                {monthlyIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">В год</p>
              <p className="text-lg font-semibold text-green-600">
                {yearlyIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
          </div>

          {/* Income List */}
          <div className="space-y-4">
            {incomes.map(income => (
              <div key={income.id} className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Источник дохода
                    </label>
                    <input
                      type="text"
                      value={income.source}
                      onChange={(e) => updateIncome(income.id, { source: e.target.value })}
                      placeholder="Название источника"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Сумма
                    </label>
                    <input
                      type="number"
                      value={income.amount || ''}
                      onChange={(e) => updateIncome(income.id, { amount: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={income.frequency}
                      onChange={(e) => updateIncome(income.id, { frequency: e.target.value as 'monthly' | 'yearly' })}
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md"
                    >
                      <option value="monthly">В месяц</option>
                      <option value="yearly">В год</option>
                    </select>
                    <button
                      onClick={() => deleteIncome(income.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {incomes.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                У вас пока нет источников дохода. Нажмите "Добавить источник", чтобы начать.
              </div>
            )}
          </div>

          {/* Add Income Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={addIncome}
              className="flex items-center gap-2 text-burgundy-600 hover:text-burgundy-700 px-4 py-2 border border-burgundy-600 rounded-md hover:bg-burgundy-50"
            >
              <Plus className="h-4 w-4" />
              <span>Добавить источник</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expenses Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Расходы</h2>
        </div>

        <div className="p-4">
          {/* Expenses Summary */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">В месяц</p>
              <p className="text-lg font-semibold text-red-600">
                {monthlyExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">В год</p>
              <p className="text-lg font-semibold text-red-600">
                {yearlyExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
          </div>

          {/* Expenses List */}
          <div className="space-y-4">
            {expenses.map(expense => (
              <div key={expense.id} className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Категория расходов
                    </label>
                    <input
                      type="text"
                      value={expense.category}
                      onChange={(e) => updateExpense(expense.id, { category: e.target.value })}
                      placeholder="Название категории"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Сумма
                    </label>
                    <input
                      type="number"
                      value={expense.amount || ''}
                      onChange={(e) => updateExpense(expense.id, { amount: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={expense.frequency}
                      onChange={(e) => updateExpense(expense.id, { frequency: e.target.value as 'monthly' | 'yearly' })}
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md"
                    >
                      <option value="monthly">В месяц</option>
                      <option value="yearly">В год</option>
                    </select>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {expenses.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                У вас пока нет расходов. Нажмите "Добавить расход", чтобы начать.
              </div>
            )}
          </div>

          {/* Add Expense Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={addExpense}
              className="flex items-center gap-2 text-burgundy-600 hover:text-burgundy-700 px-4 py-2 border border-burgundy-600 rounded-md hover:bg-burgundy-50"
            >
              <Plus className="h-4 w-4" />
              <span>Добавить расход</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveFinancialData}
          className="bg-burgundy-600 text-white px-6 py-2 rounded-md hover:bg-burgundy-700"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}