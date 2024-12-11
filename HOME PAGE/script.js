let balance = 0;
let transactions = [];
let chart;

function setMonthlySalary() {
    const salaryInput = document.getElementById('monthly-salary');
    const salary = parseFloat(salaryInput.value);

    if (!isNaN(salary) && salary > 0) {
        balance = salary;
        transactions.push({ type: 'income', category: 'Salary', amount: salary, date: new Date().toLocaleDateString() });
        updateOverview();
        updateTransactionTable();

        // Fade out the salary block and move other blocks
        const salaryBlock = document.querySelector('.add-salary');
        salaryBlock.classList.add('fade-out');
        setTimeout(() => {
            salaryBlock.style.display = 'none';

            // Show the savings allocation section
            const savingsSection = document.querySelector('.savings-allocation');
            savingsSection.classList.remove('hidden');
            savingsSection.classList.add('pop-up');
        }, 500);
    } else {
        alert("Please enter a valid salary.");
    }
}

document.getElementById('savingsForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const emergencyPercentage = parseFloat(document.getElementById('savings-emergency').value);
    const loanPercentage = parseFloat(document.getElementById('savings-loan').value);
    const healthPercentage = parseFloat(document.getElementById('savings-health').value);
    const retirementPercentage = parseFloat(document.getElementById('savings-retirement').value);

    const totalPercentage = emergencyPercentage + loanPercentage + healthPercentage + retirementPercentage;

    if (totalPercentage <= 100 && emergencyPercentage >= 0 && loanPercentage >= 0 && healthPercentage >= 0 && retirementPercentage >= 0) {
        allocateSavings(balance, emergencyPercentage, loanPercentage, healthPercentage, retirementPercentage);

        // Show the add expense section
        const expenseSection = document.querySelector('.add-expense');
        expenseSection.classList.remove('hidden');
        expenseSection.classList.add('pop-up');
    } else {
        alert("Please ensure the total percentage allocation does not exceed 100% and that all percentages are non-negative.");
    }
});

function allocateSavings(balance, emergency, loan, health, retirement) {
    const emergencyAmount = (emergency / 100) * balance;
    const loanAmount = (loan / 100) * balance;
    const healthAmount = (health / 100) * balance;
    const retirementAmount = (retirement / 100) * balance;

    transactions.push({ type: 'savings', category: 'Emergency Fund', amount: emergencyAmount, date: new Date().toLocaleDateString() });
    transactions.push({ type: 'savings', category: 'Loan Repayment', amount: loanAmount, date: new Date().toLocaleDateString() });
    transactions.push({ type: 'savings', category: 'Health Savings', amount: healthAmount, date: new Date().toLocaleDateString() });
    transactions.push({ type: 'savings', category: 'Retirement Savings', amount: retirementAmount, date: new Date().toLocaleDateString() });

    balance -= (emergencyAmount + loanAmount + healthAmount + retirementAmount);

    updateOverview();
    updateTransactionTable();
}

document.getElementById('expenseForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = new Date().toLocaleString(); // Automatically record the current date and time

    if (!isNaN(amount) && amount > 0 && category.trim() !== "") {
        transactions.push({ type: 'expense', category, amount, date });
        balance -= amount;
        updateOverview();
        updateTransactionTable();
        document.getElementById('expenseForm').reset();
    } else {
        alert("Please enter a valid amount and category.");
    }
});

function updateOverview() {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const totalSavings = transactions.filter(t => t.type === 'savings').reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpenses - totalSavings;

    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('balance').textContent = netBalance.toFixed(2);

    updateChart();
}

function updateTransactionTable() {
    const tableBody = document.getElementById('transactionTable');
    tableBody.innerHTML = '';

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.category}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>${transaction.date}</td>
        `;
        tableBody.appendChild(row);
    });
}

function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const categories = [...new Set(transactions.map(t => t.category))];
    const data = categories.map(category => {
        return transactions.filter(t => t.category === category).reduce((sum, t) => sum + t.amount, 0);
    });

    if (chart) {
        chart.data.labels = categories;
        chart.data.datasets[0].data = data;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: categories,
                datasets: [{
                    data: data,
                    backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ffd700', '#d2691e', '#cd5c5c', '#2e8b57']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
}

// Initial load
updateOverview();
updateTransactionTable();