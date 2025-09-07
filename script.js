// Expense Tracker JavaScript
class ExpenseTracker {
    constructor() {
        this.expenses = this.loadExpenses();
        this.initializeEventListeners();
        this.updateDisplay();
        this.setDefaultDate();
    }

    // Initialize event listeners
    initializeEventListeners() {
        const form = document.getElementById('expenseForm');
        const categoryFilter = document.getElementById('categoryFilter');

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        categoryFilter.addEventListener('change', () => this.filterExpenses());
    }

    // Set default date to today
    setDefaultDate() {
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    // Handle form submission
    handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const expense = {
            id: Date.now().toString(),
            amount: parseFloat(formData.get('amount')),
            category: formData.get('category'),
            description: formData.get('description').trim(),
            date: formData.get('date'),
            createdAt: new Date().toISOString()
        };

        // Validate expense
        if (this.validateExpense(expense)) {
            this.addExpense(expense);
            e.target.reset();
            this.setDefaultDate();
        }
    }

    // Validate expense data
    validateExpense(expense) {
        if (!expense.amount || expense.amount <= 0) {
            alert('Please enter a valid amount greater than 0.');
            return false;
        }

        if (!expense.category) {
            alert('Please select a category.');
            return false;
        }

        if (!expense.description) {
            alert('Please enter a description.');
            return false;
        }

        if (!expense.date) {
            alert('Please select a date.');
            return false;
        }

        return true;
    }

    // Add new expense
    addExpense(expense) {
        this.expenses.unshift(expense); // Add to beginning of array
        this.saveExpenses();
        this.updateDisplay();
        this.showSuccessMessage('Expense added successfully!');
    }

    // Delete expense
    deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(expense => expense.id !== id);
            this.saveExpenses();
            this.updateDisplay();
            this.showSuccessMessage('Expense deleted successfully!');
        }
    }

    // Filter expenses by category
    filterExpenses() {
        const categoryFilter = document.getElementById('categoryFilter');
        const selectedCategory = categoryFilter.value;

        const expenseItems = document.querySelectorAll('.expense-item');

        expenseItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (!selectedCategory || itemCategory === selectedCategory) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Update display
    updateDisplay() {
        this.updateTotalAmount();
        this.renderExpenses();
    }

    // Update total amount display
    updateTotalAmount() {
        const total = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const totalElement = document.getElementById('totalAmount');
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Render expenses list
    renderExpenses() {
        const expensesList = document.getElementById('expensesList');
        const noExpenses = document.getElementById('noExpenses');

        if (this.expenses.length === 0) {
            noExpenses.style.display = 'block';
            return;
        }

        noExpenses.style.display = 'none';

        // Sort expenses by date (newest first)
        const sortedExpenses = [...this.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

        expensesList.innerHTML = sortedExpenses.map(expense => this.createExpenseHTML(expense)).join('');

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const expenseId = e.target.getAttribute('data-id');
                this.deleteExpense(expenseId);
            });
        });
    }

    // Create HTML for individual expense
    createExpenseHTML(expense) {
        const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        return `
            <div class="expense-item" data-category="${expense.category}">
                <div class="expense-info">
                    <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                    <div class="expense-details">
                        <div class="expense-description">${this.escapeHtml(expense.description)}</div>
                        <div class="expense-category">${expense.category}</div>
                        <div class="expense-date">${formattedDate}</div>
                    </div>
                </div>
                <div class="expense-actions">
                    <button class="delete-button" data-id="${expense.id}">Delete</button>
                </div>
            </div>
        `;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Save expenses to localStorage
    saveExpenses() {
        try {
            localStorage.setItem('expenseTracker', JSON.stringify(this.expenses));
        } catch (error) {
            console.error('Error saving expenses:', error);
            this.showErrorMessage('Failed to save expenses. Please try again.');
        }
    }

    // Load expenses from localStorage
    loadExpenses() {
        try {
            const saved = localStorage.getItem('expenseTracker');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading expenses:', error);
            this.showErrorMessage('Failed to load expenses. Starting fresh.');
            return [];
        }
    }

    // Show success message
    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    // Show error message
    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    // Show message to user
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        `;

        document.body.appendChild(messageDiv);

        // Remove message after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }

    // Get expenses by category (for potential future use)
    getExpensesByCategory(category) {
        return this.expenses.filter(expense => expense.category === category);
    }

    // Get total by category (for potential future use)
    getTotalByCategory(category) {
        return this.getExpensesByCategory(category)
            .reduce((sum, expense) => sum + expense.amount, 0);
    }

    // Export expenses as JSON (for potential future use)
    exportExpenses() {
        const dataStr = JSON.stringify(this.expenses, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `expenses-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
    }
}

// Initialize the expense tracker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ExpenseTracker();
});

// Add some CSS for the message animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
