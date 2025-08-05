# 🎓 CGPA Calculator - Student Grade Management System

A comprehensive, interactive web application for college students to calculate their CGPA (Cumulative Grade Point Average) with support for multiple semesters, subjects, and credit systems.

## ✨ Features

### 📊 **Comprehensive Calculation**
- **Multiple Semesters**: Calculate CGPA across 1-12 semesters
- **Flexible Subject Management**: Add/remove subjects dynamically
- **Credit System**: Support for variable credit hours per subject
- **Grade Point System**: Standard 10-point grading scale (O=10, A+=9, A=8, B+=7, B=6, C=5, F=0)
- **Subject Aliases**: Optional subject names/aliases for better organization

### 🎯 **Interactive Interface**
- **Modern UI**: Clean, student-friendly design
- **Real-time Calculations**: Instant GPA updates as you input data
- **Visual Results**: Circular CGPA display with color-coded performance
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Semester-wise Summary**: Individual GPA tracking per semester

### 💾 **Data Management**
- **Save Results**: Store calculations in browser local storage
- **Calculation History**: View and manage past calculations
- **Export Functionality**: Download history as CSV file
- **Print Reports**: Generate printable CGPA reports
- **Offline Support**: Works without internet connection

### 📱 **User Experience**
- **Navigation Sections**: Calculator, Grade Guide, History, About
- **Toast Notifications**: Real-time feedback for user actions
- **Form Validation**: Input validation and error handling
- **Accessibility**: Keyboard navigation and screen reader support

## 🎨 **Grade Point System**

| Grade | Points | Percentage | Performance Level |
|-------|--------|------------|-------------------|
| O     | 10     | 90-100%    | Outstanding       |
| A+    | 9      | 80-89%     | Excellent         |
| A     | 8      | 70-79%     | Very Good         |
| B+    | 7      | 60-69%     | Good              |
| B     | 6      | 50-59%     | Average           |
| C     | 5      | 40-49%     | Below Average     |
| F     | 0      | Below 40%  | Failed            |

## 🔧 **How to Use**

### 1. **Setup Calculation**
- Enter the number of semesters (1-12)
- Choose calculation type (Semester GPA or Cumulative CGPA)
- Click "Start Calculation"

### 2. **Add Subjects**
- For each semester, click "Add Subject"
- Enter subject name/alias (optional but recommended)
- Input credit hours for the subject
- Select the grade obtained
- Grade points are automatically calculated

### 3. **Calculate Results**
- Add all subjects across semesters
- Click "Calculate CGPA" to get results
- View detailed breakdown and overall CGPA

### 4. **Manage Results**
- Save calculations for future reference
- Print official-looking reports
- Export history to CSV for record-keeping

## 📁 **File Structure**

```
CGPA-Calculator/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
├── README.md           # Documentation (this file)
└── assets/             # Images and icons (if needed)
```

## 🚀 **Getting Started**

1. **Download/Clone** the project files
2. **Open `index.html`** in any modern web browser
3. **Start calculating** your CGPA immediately!

No installation required - it's a pure web application that runs in your browser.

## 💡 **CGPA Calculation Formula**

```
CGPA = Σ (Grade Points × Credits) / Σ Total Credits
```

### Example:
- Subject 1: Grade A (8 points) × 3 credits = 24 grade points
- Subject 2: Grade B+ (7 points) × 4 credits = 28 grade points
- **Total Grade Points**: 52
- **Total Credits**: 7
- **CGPA**: 52 ÷ 7 = **7.43**

## 🎯 **Use Cases**

### **For Students:**
- Track academic performance across semesters
- Plan future semester grades to achieve target CGPA
- Generate reports for scholarship applications
- Monitor progress towards graduation requirements

### **For Academic Planning:**
- Calculate required grades for desired CGPA
- Compare performance across different semesters
- Maintain academic records in digital format
- Share results with academic advisors

## 🔧 **Browser Support**

- ✅ **Chrome** 60+
- ✅ **Firefox** 55+
- ✅ **Safari** 12+
- ✅ **Edge** 79+
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📱 **Mobile Features**

- **Touch-friendly interface** with large buttons
- **Responsive layout** that adapts to screen size
- **Swipe navigation** between sections
- **Optimized forms** for mobile input
- **Offline functionality** for use anywhere

## 🛡️ **Privacy & Security**

- **Local Storage Only**: All data stays in your browser
- **No Server Communication**: Works completely offline
- **No Personal Information**: Only academic data is stored
- **Export Control**: You control your data export
- **Clear History**: Option to clear all stored data

## 🎨 **Customization Options**

### **Grading System**
The grading system can be easily modified in the JavaScript file:
```javascript
this.gradePoints = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5,
    'F': 0
};
```

### **Color Scheme**
Colors can be customized in the CSS file using CSS variables:
```css
:root {
    --primary-blue: #2563eb;
    --accent-green: #10b981;
    --accent-orange: #f59e0b;
    /* ... more variables */
}
```

## 📊 **Features Breakdown**

### **Calculator Section**
- Dynamic semester creation
- Subject management with add/remove functionality
- Real-time GPA calculation per semester
- Overall CGPA computation
- Visual progress indicators

### **Grade Guide Section**
- Comprehensive grading table
- Calculation formula explanation
- Performance level descriptions
- Example calculations

### **History Section**
- Saved calculation list
- Detailed view of past results
- Export functionality
- Clear history option

### **About Section**
- Application information
- Feature highlights
- Academic guidance
- Usage instructions

## 🔄 **Future Enhancements**

- **Grade Prediction**: Predict required grades for target CGPA
- **Charts & Graphs**: Visual representation of academic progress
- **Multiple Grading Systems**: Support for different university systems
- **Cloud Sync**: Optional cloud storage for cross-device access
- **Academic Calendar**: Integration with semester dates
- **Goal Setting**: Set and track academic goals

## 🤝 **Contributing**

This is an open-source educational tool. Contributions are welcome:

1. **Bug Reports**: Submit issues for any bugs found
2. **Feature Requests**: Suggest new features for students
3. **Code Improvements**: Optimize performance and add features
4. **Documentation**: Improve guides and instructions

## 📧 **Support**

For questions, suggestions, or support:
- Check the built-in help sections
- Review the grade guide for calculation clarification
- Refer to this documentation for usage instructions

---