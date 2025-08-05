// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.chars = '10';
        this.drops = [];
        this.fontSize = 14;
        this.columns = 0;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.setupDrops();
        this.animate();
        
        window.addEventListener('resize', () => this.handleResize());
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-3';
        this.canvas.style.opacity = '0.1';
        this.canvas.style.pointerEvents = 'none';
        
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        this.handleResize();
    }
    
    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.setupDrops();
    }
    
    setupDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * this.canvas.height;
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px JetBrains Mono, monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(char, i * this.fontSize, this.drops[i]);
            
            if (this.drops[i] > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i] += this.fontSize;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// CGPA Calculator JavaScript
class CGPACalculator {
    constructor() {
        this.semesters = [];
        this.currentSection = 'calculator';
        this.gradePoints = {
            'O': 10,
            'A+': 9,
            'A': 8,
            'B+': 7,
            'B': 6,
            'C': 5,
            'F': 0
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadFromLocalStorage();
        this.updateHistoryDisplay();
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });
        
        // Mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Setup form
        document.getElementById('setupBtn').addEventListener('click', () => this.setupCalculation());
        
        // Results actions
        document.getElementById('saveResultBtn').addEventListener('click', () => this.saveResult());
        document.getElementById('printResultBtn').addEventListener('click', () => this.printResult());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetCalculation());
        
        // History actions
        document.getElementById('clearHistoryBtn').addEventListener('click', () => this.clearHistory());
        document.getElementById('exportHistoryBtn').addEventListener('click', () => this.exportHistory());
    }
    
    handleNavigation(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Show target section
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
        
        this.currentSection = targetId;
        
        // Close mobile menu
        document.querySelector('.nav-menu').classList.remove('active');
    }
    
    setupCalculation() {
        const numSemesters = parseInt(document.getElementById('numSemesters').value);
        const calculationType = document.getElementById('calculationType').value;
        
        if (numSemesters < 1 || numSemesters > 12) {
            this.showToast('Please enter a valid number of semesters (1-12)', 'error');
            return;
        }
        
        this.semesters = [];
        this.createSemesterInputs(numSemesters, calculationType);
        
        // Hide setup card and show semester inputs
        document.querySelector('.setup-card').style.display = 'none';
        document.getElementById('semesterInputs').style.display = 'block';
        
        this.showToast('Calculation setup complete! Add your subjects.', 'success');
    }
    
    createSemesterInputs(numSemesters, calculationType) {
        const container = document.getElementById('semesterInputs');
        container.innerHTML = '';
        
        for (let i = 1; i <= numSemesters; i++) {
            const semesterCard = this.createSemesterCard(i);
            container.appendChild(semesterCard);
            
            this.semesters.push({
                id: i,
                subjects: [],
                totalCredits: 0,
                totalGradePoints: 0,
                gpa: 0
            });
        }
        
        // Add calculate button
        const calculateBtn = document.createElement('button');
        calculateBtn.className = 'btn btn-primary';
        calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate CGPA';
        calculateBtn.style.width = '100%';
        calculateBtn.style.marginTop = '2rem';
        calculateBtn.addEventListener('click', () => this.calculateCGPA());
        container.appendChild(calculateBtn);
    }
    
    createSemesterCard(semesterNum) {
        const card = document.createElement('div');
        card.className = 'semester-card';
        card.innerHTML = `
            <div class="semester-header">
                <h3 class="semester-title">
                    <i class="fas fa-calendar-alt"></i>
                    Semester ${semesterNum}
                </h3>
                <div class="semester-controls">
                    <button class="btn btn-primary btn-sm" onclick="cgpaCalc.addSubject(${semesterNum})">
                        <i class="fas fa-plus"></i> Add Subject
                    </button>
                </div>
            </div>
            
            <div class="subjects-container" id="subjects-${semesterNum}">
                <!-- Subjects will be added here -->
            </div>
            
            <div class="semester-summary">
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="summary-value" id="sem-subjects-${semesterNum}">0</span>
                        <span class="summary-label">Subjects</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-value" id="sem-credits-${semesterNum}">0</span>
                        <span class="summary-label">Credits</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-value" id="sem-gpa-${semesterNum}">0.00</span>
                        <span class="summary-label">GPA</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add initial subject
        setTimeout(() => this.addSubject(semesterNum), 100);
        
        return card;
    }
    
    addSubject(semesterNum) {
        const container = document.getElementById(`subjects-${semesterNum}`);
        const subjectId = Date.now();
        
        const subjectRow = document.createElement('div');
        subjectRow.className = 'subject-row';
        subjectRow.id = `subject-${subjectId}`;
        subjectRow.innerHTML = `
            <div class="input-group">
                <label>Subject Name / Alias</label>
                <input type="text" placeholder="e.g., Mathematics, Math-101" 
                       onchange="cgpaCalc.updateSemesterSummary(${semesterNum})">
            </div>
            
            <div class="input-group">
                <label>Credits</label>
                <input type="number" min="1" max="10" value="3" 
                       onchange="cgpaCalc.updateSemesterSummary(${semesterNum})">
            </div>
            
            <div class="input-group">
                <label>Grade</label>
                <select onchange="cgpaCalc.updateSemesterSummary(${semesterNum})">
                    <option value="">Select Grade</option>
                    <option value="O">O (10 points)</option>
                    <option value="A+">A+ (9 points)</option>
                    <option value="A">A (8 points)</option>
                    <option value="B+">B+ (7 points)</option>
                    <option value="B">B (6 points)</option>
                    <option value="C">C (5 points)</option>
                    <option value="F">F (0 points - Failed)</option>
                </select>
            </div>
            
            <div class="input-group">
                <label>Grade Points</label>
                <input type="number" readonly placeholder="Auto calculated" 
                       style="background-color: var(--gray-100);">
            </div>
            
            <button class="remove-subject" onclick="cgpaCalc.removeSubject('${subjectId}', ${semesterNum})" 
                    title="Remove Subject">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        container.appendChild(subjectRow);
        this.updateSemesterSummary(semesterNum);
    }
    
    removeSubject(subjectId, semesterNum) {
        const subjectRow = document.getElementById(`subject-${subjectId}`);
        if (subjectRow) {
            subjectRow.remove();
            this.updateSemesterSummary(semesterNum);
            this.showToast('Subject removed successfully', 'info');
        }
    }
    
    updateSemesterSummary(semesterNum) {
        const container = document.getElementById(`subjects-${semesterNum}`);
        const subjectRows = container.querySelectorAll('.subject-row');
        
        let totalCredits = 0;
        let totalGradePoints = 0;
        let validSubjects = 0;
        
        subjectRows.forEach(row => {
            const credits = parseFloat(row.querySelector('input[type="number"]').value) || 0;
            const grade = row.querySelector('select').value;
            const gradePointsInput = row.querySelectorAll('input[type="number"]')[1];
            
            if (grade && credits > 0) {
                const gradePoints = this.gradePoints[grade] * credits;
                gradePointsInput.value = gradePoints.toFixed(2);
                
                totalCredits += credits;
                totalGradePoints += gradePoints;
                validSubjects++;
            } else {
                gradePointsInput.value = '';
            }
        });
        
        const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits) : 0;
        
        // Update summary display
        document.getElementById(`sem-subjects-${semesterNum}`).textContent = validSubjects;
        document.getElementById(`sem-credits-${semesterNum}`).textContent = totalCredits;
        document.getElementById(`sem-gpa-${semesterNum}`).textContent = gpa.toFixed(2);
        
        // Update semester data
        const semester = this.semesters.find(s => s.id === semesterNum);
        if (semester) {
            semester.totalCredits = totalCredits;
            semester.totalGradePoints = totalGradePoints;
            semester.gpa = gpa;
        }
    }
    
    calculateCGPA() {
        // Validate all semesters have subjects
        let hasValidData = false;
        let totalCredits = 0;
        let totalGradePoints = 0;
        
        this.semesters.forEach(semester => {
            if (semester.totalCredits > 0) {
                hasValidData = true;
                totalCredits += semester.totalCredits;
                totalGradePoints += semester.totalGradePoints;
            }
        });
        
        if (!hasValidData) {
            this.showToast('Please add at least one subject with grade and credits', 'error');
            return;
        }
        
        const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits) : 0;
        const letterGrade = this.getLetterGrade(cgpa);
        
        // Display results
        this.displayResults(cgpa, totalCredits, totalGradePoints, letterGrade);
        
        this.showToast('CGPA calculated successfully!', 'success');
    }
    
    getLetterGrade(cgpa) {
        if (cgpa >= 9.5) return 'O';
        if (cgpa >= 8.5) return 'A+';
        if (cgpa >= 7.5) return 'A';
        if (cgpa >= 6.5) return 'B+';
        if (cgpa >= 5.5) return 'B';
        if (cgpa >= 4.0) return 'C';
        return 'F';
    }
    
    displayResults(cgpa, totalCredits, totalGradePoints, letterGrade) {
        document.getElementById('finalGPA').textContent = cgpa.toFixed(2);
        document.getElementById('totalCredits').textContent = totalCredits;
        document.getElementById('totalGradePoints').textContent = totalGradePoints.toFixed(2);
        document.getElementById('letterGrade').textContent = letterGrade;
        
        // Update grade badge color
        const gradeBadge = document.getElementById('letterGrade');
        gradeBadge.className = 'value grade-badge';
        
        // Show results section
        document.getElementById('resultsSection').style.display = 'block';
        
        // Scroll to results
        document.getElementById('resultsSection').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    
    saveResult() {
        const cgpa = document.getElementById('finalGPA').textContent;
        const totalCredits = document.getElementById('totalCredits').textContent;
        const totalGradePoints = document.getElementById('totalGradePoints').textContent;
        const letterGrade = document.getElementById('letterGrade').textContent;
        
        const result = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            cgpa: parseFloat(cgpa),
            totalCredits: parseInt(totalCredits),
            totalGradePoints: parseFloat(totalGradePoints),
            letterGrade: letterGrade,
            semesters: this.semesters.length,
            semesterData: this.semesters.map(s => ({
                semester: s.id,
                gpa: s.gpa,
                credits: s.totalCredits
            }))
        };
        
        this.saveToLocalStorage(result);
        this.updateHistoryDisplay();
        this.showToast('Result saved successfully!', 'success');
    }
    
    printResult() {
        const printContent = this.generatePrintableReport();
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    }
    
    generatePrintableReport() {
        const cgpa = document.getElementById('finalGPA').textContent;
        const totalCredits = document.getElementById('totalCredits').textContent;
        const letterGrade = document.getElementById('letterGrade').textContent;
        const date = new Date().toLocaleDateString();
        
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>CGPA Report</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .result-box { border: 2px solid #2563eb; padding: 20px; border-radius: 10px; }
                    .cgpa-display { text-align: center; font-size: 48px; color: #2563eb; font-weight: bold; }
                    .details { margin-top: 20px; }
                    .detail-row { margin: 10px 0; }
                    .semester-summary { margin-top: 30px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: center; }
                    th { background-color: #f8f9fa; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>CGPA Calculation Report</h1>
                    <p>Generated on: ${date}</p>
                </div>
                
                <div class="result-box">
                    <div class="cgpa-display">${cgpa}</div>
                    <h2 style="text-align: center; margin: 10px 0;">Cumulative Grade Point Average</h2>
                    
                    <div class="details">
                        <div class="detail-row"><strong>Letter Grade:</strong> ${letterGrade}</div>
                        <div class="detail-row"><strong>Total Credits:</strong> ${totalCredits}</div>
                        <div class="detail-row"><strong>Number of Semesters:</strong> ${this.semesters.length}</div>
                    </div>
                </div>
                
                <div class="semester-summary">
                    <h3>Semester-wise Summary</h3>
                    <table>
                        <tr>
                            <th>Semester</th>
                            <th>GPA</th>
                            <th>Credits</th>
                            <th>Performance</th>
                        </tr>
                        ${this.semesters.map(s => `
                            <tr>
                                <td>Semester ${s.id}</td>
                                <td>${s.gpa.toFixed(2)}</td>
                                <td>${s.totalCredits}</td>
                                <td>${this.getLetterGrade(s.gpa)}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <div style="margin-top: 40px; text-align: center; color: #666; font-size: 14px;">
                    <p>This report was generated by CGPA Calculator</p>
                    <p>For academic reference only</p>
                </div>
            </body>
            </html>
        `;
    }
    
    resetCalculation() {
        if (confirm('Are you sure you want to start a new calculation? All current data will be lost.')) {
            this.semesters = [];
            document.querySelector('.setup-card').style.display = 'block';
            document.getElementById('semesterInputs').style.display = 'none';
            document.getElementById('resultsSection').style.display = 'none';
            document.getElementById('numSemesters').value = '1';
            document.getElementById('calculationType').value = 'semester';
            
            this.showToast('Calculation reset. Start fresh!', 'info');
        }
    }
    
    saveToLocalStorage(result) {
        let history = JSON.parse(localStorage.getItem('cgpaHistory')) || [];
        history.unshift(result); // Add to beginning
        
        // Keep only last 50 calculations
        if (history.length > 50) {
            history = history.slice(0, 50);
        }
        
        localStorage.setItem('cgpaHistory', JSON.stringify(history));
    }
    
    loadFromLocalStorage() {
        return JSON.parse(localStorage.getItem('cgpaHistory')) || [];
    }
    
    updateHistoryDisplay() {
        const historyList = document.getElementById('historyList');
        const history = this.loadFromLocalStorage();
        
        if (history.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-clipboard-list"></i>
                    <p>No calculations saved yet</p>
                    <small>Your saved CGPA calculations will appear here</small>
                </div>
            `;
            return;
        }
        
        historyList.innerHTML = history.map(item => `
            <div class="history-item">
                <div class="history-info">
                    <h4>CGPA: ${item.cgpa.toFixed(2)} (${item.letterGrade})</h4>
                    <p>${item.date} at ${item.time} • ${item.semesters} semester(s) • ${item.totalCredits} credits</p>
                </div>
                <div class="history-actions">
                    <button class="btn btn-sm btn-info" onclick="cgpaCalc.viewHistoryDetails(${item.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="cgpaCalc.deleteHistoryItem(${item.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    viewHistoryDetails(id) {
        const history = this.loadFromLocalStorage();
        const item = history.find(h => h.id === id);
        
        if (!item) return;
        
        const details = `
            <div style="text-align: left;">
                <h3>CGPA Calculation Details</h3>
                <p><strong>Date:</strong> ${item.date} at ${item.time}</p>
                <p><strong>Overall CGPA:</strong> ${item.cgpa.toFixed(2)} (${item.letterGrade})</p>
                <p><strong>Total Credits:</strong> ${item.totalCredits}</p>
                <p><strong>Total Grade Points:</strong> ${item.totalGradePoints.toFixed(2)}</p>
                <h4>Semester-wise Breakdown:</h4>
                <ul>
                    ${item.semesterData.map(s => 
                        `<li>Semester ${s.semester}: GPA ${s.gpa.toFixed(2)} (${s.credits} credits)</li>`
                    ).join('')}
                </ul>
            </div>
        `;
        
        this.showModal('Calculation Details', details);
    }
    
    deleteHistoryItem(id) {
        if (confirm('Are you sure you want to delete this calculation?')) {
            let history = this.loadFromLocalStorage();
            history = history.filter(h => h.id !== id);
            localStorage.setItem('cgpaHistory', JSON.stringify(history));
            this.updateHistoryDisplay();
            this.showToast('Calculation deleted', 'info');
        }
    }
    
    clearHistory() {
        if (confirm('Are you sure you want to clear all calculation history? This action cannot be undone.')) {
            localStorage.removeItem('cgpaHistory');
            this.updateHistoryDisplay();
            this.showToast('History cleared successfully', 'info');
        }
    }
    
    exportHistory() {
        const history = this.loadFromLocalStorage();
        
        if (history.length === 0) {
            this.showToast('No history to export', 'warning');
            return;
        }
        
        const csvContent = this.generateCSV(history);
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `cgpa_history_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        
        window.URL.revokeObjectURL(url);
        this.showToast('History exported successfully', 'success');
    }
    
    generateCSV(history) {
        const headers = ['Date', 'Time', 'CGPA', 'Letter Grade', 'Total Credits', 'Total Grade Points', 'Semesters'];
        const rows = history.map(item => [
            item.date,
            item.time,
            item.cgpa.toFixed(2),
            item.letterGrade,
            item.totalCredits,
            item.totalGradePoints.toFixed(2),
            item.semesters
        ]);
        
        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
    
    showModal(title, content) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 10000;
            display: flex; align-items: center; justify-content: center;
        `;
        
        // Create modal content
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white; padding: 2rem; border-radius: 1rem;
            max-width: 500px; max-height: 80vh; overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
        `;
        
        modal.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3 style="margin: 0; color: var(--gray-900);">${title}</h3>
                <button style="background: none; border: none; font-size: 1.5rem; cursor: pointer;" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div>${content}</div>
        `;
        
        overlay.className = 'modal-overlay';
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        toast.innerHTML = `
            <i class="${icons[type]}"></i>
            <span>${message}</span>
        `;
        
        document.getElementById('toastContainer').appendChild(toast);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
}

// Initialize the calculator and matrix effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain Effect
    new MatrixRain();
    
    // Initialize CGPA Calculator
    window.cgpaCalc = new CGPACalculator();
    
    // Add some welcome animations
    setTimeout(() => {
        document.querySelector('.section-header h2').style.animation = 'fadeIn 1s ease-in-out';
    }, 500);
});

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
