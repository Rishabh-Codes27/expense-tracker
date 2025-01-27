"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "./ui/card";

const ExpenseTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", amount: "", date: "" });
  const [expenses, setExpenses] = useState<{name: string; amount: string; date: string;}[]>([])

  // functions
  const toggleForm = () => {
    setShowForm((prev) => !prev); // ((prev) => !prev) short hand to change false to true
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddExpense = () => {
    if (!form.name || !form.amount || !form.date) {
      alert("All fields are required!");
    }
    if (isNaN(Number(form.amount))) {
      alert("Amount must be a number!");
    }

    console.log("Expense added: ", form);
    setExpenses((prev) => [...prev, form])  // takes the values from the form and passes it to expenses array
    setForm({ name: "", amount: "", date: "" });
    setShowForm(false);
  };

  return (
    <div className="h-screen container mx-auto flex justify-center items-center">
      <div className=" w-4/6 flex flex-col items-center justify-center">
        <div className="flex justify-between items-center border-b border-gray-500 px-4 py-2 w-full" >
          <h1>Expense Tracker</h1>
          <Button variant='default' onClick={toggleForm}>
            {showForm ? "Close" : "Add Task"}
          </Button>
        </div>

        {/* expense input form */}
        {showForm && (
            <div className="border-gray-500 border-x w-4/6 my-2 px-5 py-2.5 flex flex-col items-center justify-evenly h-52">
                <input name="name" type="text" value={form.name} placeholder="Expense name" onChange={handleInputChange} className="border-gray-800 border outline-none px-2 py-1 rounded-lg bg-transparent text-white w-5/6" />

                <input name="amount" type='number' value={form.amount} placeholder="Expense amount" onChange={handleInputChange} className="border-gray-800 border outline-none px-2 py-1 rounded-lg bg-transparent text-white w-5/6" />

                <input name="date" type='date' value={form.date} placeholder="Expense name" onChange={handleInputChange} className="border-gray-800 border outline-none px-2 py-1 rounded-lg bg-transparent text-white w-5/6" />

                <Button variant='ghost' onClick={handleAddExpense}>Add Expense</Button>
            </div>
        )}

        {/* expenses list */}

        <div className="flex justify-center items-center border-t mt-2 border-gray-500 px-4 py-2 w-full">
            {expenses.length === 0 ? (
                <p className="text-red-500">No expenses added yet.</p>
            ) : (
                <ul className=" w-4/6   ">
                    {expenses.map((expenses, index) => (
                        <li key={index} className="px-3 py-2 text-white m-3 border-gray-500 flex justify-between items-center shadow-2xl shadow-white/10 rounded-md border-y">
                            <div>
                                <p> {expenses.name} </p>
                                <p> {expenses.date} </p>
                            </div>

                            <p className="font-semibold text-teal-600"> Rs. {expenses.amount} </p>

                        </li>
                    ))}
                </ul>
            )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
