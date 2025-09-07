# Simple Expense Tracker

A clean, user-friendly expense tracking application built with vanilla HTML, CSS, and JavaScript. Perfect for personal budgeting and financial awareness.

## Features

### Core Functionality
- ✅ **Add Expenses**: Track amount, category, description, and date
- ✅ **Category Management**: Pre-defined categories (Food, Transportation, Housing, Entertainment, Other)
- ✅ **Expense List**: View all expenses with delete functionality
- ✅ **Running Total**: Real-time calculation of total expenses
- ✅ **Data Persistence**: Automatic saving to localStorage
- ✅ **Category Filtering**: Filter expenses by category
- ✅ **Input Validation**: Ensures data integrity

### User Experience
- 📱 **Mobile-First Design**: Responsive layout that works on all devices
- 🎨 **Clean Interface**: Intuitive design with clear visual hierarchy
- ⚡ **Real-Time Updates**: Immediate feedback when adding/deleting expenses
- 🔒 **Data Safety**: Confirmation dialogs for destructive actions
- 💾 **Auto-Save**: No data loss between sessions

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start tracking your expenses!

### Usage
1. **Adding an Expense**:
   - Fill in the amount (must be positive)
   - Select a category from the dropdown
   - Add a description
   - Choose the date (defaults to today)
   - Click "Add Expense"

2. **Managing Expenses**:
   - View all expenses in the list below
   - Use the category filter to see specific types of expenses
   - Click "Delete" to remove an expense (with confirmation)
   - Total expenses are displayed at the top

3. **Data Persistence**:
   - All data is automatically saved to your browser's localStorage
   - Data persists between browser sessions
   - No internet connection required

## Technical Details

### File Structure
```
expense-tracker/
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

### Data Structure
Expenses are stored as JavaScript objects with the following structure:
```javascript
{
  id: "unique_timestamp_id",
  amount: 25.50,
  category: "Food",
  description: "Lunch at restaurant",
  date: "2024-01-15",
  createdAt: "2024-01-15T10:30:00.000Z"
}
```

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements

This foundation could be extended with:
- 📊 **Charts & Analytics**: Visual spending patterns
- 🎯 **Budget Goals**: Set and track spending limits
- 📁 **Export/Import**: CSV/JSON data portability
- 🏷️ **Custom Categories**: User-defined expense categories
- 📱 **PWA Support**: Install as a mobile app
- 🔄 **Data Sync**: Cloud backup and multi-device sync

## Contributing

This is a simple project perfect for learning and experimentation. Feel free to:
- Fork the repository
- Add new features
- Improve the design
- Fix bugs
- Submit pull requests

## License

This project is open source and available under the [MIT License](LICENSE).

## Social Impact

This expense tracker is designed with accessibility in mind:
- Simple interface for users with varying tech literacy
- Clear categorization to build financial awareness
- Essential budgeting features without overwhelming complexity
- Foundation for financial education and better money management

---

**Built for better financial awareness**
