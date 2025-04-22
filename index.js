let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalAmount = 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addExpense = document.getElementById("add-expenses");
const expensesTableBody = document.getElementById("expenses-table-body");
const totalAmountCell = document.getElementById("total-amount");

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateTotal() {
    totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalAmountCell.textContent = totalAmount;
}

function addExpenseToTable(expense, index) {
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        expenses.splice(index, 1); 
        saveToLocalStorage();      
        renderExpenses();          
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

function renderExpenses() {
    expensesTableBody.innerHTML = ""; 
    expenses.forEach((expense, index) => addExpenseToTable(expense, index)); 
    updateTotal();
}

addExpense.addEventListener("click", function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert("Please select a category.");
        return;
    }

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (date === '') {
        alert("Please enter a date.");
        return;
    }

    const newExpense = { category, amount, date };
    expenses.push(newExpense);

    saveToLocalStorage();
    renderExpenses();

    amountInput.value = '';
    dateInput.value = '';
});

renderExpenses();
