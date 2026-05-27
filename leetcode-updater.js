// Real-time LeetCode Stats Updater - Live Integration
class LeetCodeUpdater {
    constructor() {
        this.username = 'mynk_1002';
        this.apiUrl = `https://leetcode-api-faisalshohag.vercel.app/${this.username}`;
        this.init();
    }
    
    init() {
        this.createUpdateButton();
        this.setupEventListeners();
        
        // Initial draw from cache (to prevent layout flashes)
        this.loadCachedData();
        
        // Fetch fresh data in background
        this.updateLeetCodeStats(true);
    }
    
    createUpdateButton() {
        const updateBtn = document.createElement('button');
        updateBtn.className = 'leetcode-update-btn';
        updateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Update Stats';
        updateBtn.title = 'Fetch live LeetCode stats';
        
        const leetcodeSection = document.getElementById('leetcode');
        if (leetcodeSection) {
            const dashboard = leetcodeSection.querySelector('.leetcode-dashboard');
            if (dashboard) {
                dashboard.style.position = 'relative';
                dashboard.appendChild(updateBtn);
            }
        }
    }
    
    setupEventListeners() {
        const updateBtn = document.querySelector('.leetcode-update-btn');
        if (updateBtn) {
            updateBtn.addEventListener('click', () => this.updateLeetCodeStats(false));
        }
    }
    
    loadCachedData() {
        const cached = localStorage.getItem('leetcode-cached-stats');
        if (cached) {
            try {
                const data = JSON.parse(cached);
                this.updateLeetCodeDOM(data, false); // Update DOM instantly without counting animation
            } catch (e) {
                console.error("Error reading cached LeetCode stats", e);
            }
        }
    }
    
    async updateLeetCodeStats(isBackground = false) {
        const updateBtn = document.querySelector('.leetcode-update-btn');
        const listContainer = document.getElementById('leetcodeSubmissionsList');
        
        if (!isBackground && updateBtn) {
            updateBtn.disabled = true;
            updateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
        }
        
        if (!isBackground && listContainer) {
            listContainer.innerHTML = `
                <div class="submission-loading">
                  <i class="fas fa-circle-notch fa-spin"></i> Syncing logs...
                </div>
            `;
        }
        
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error("API returned non-200 status");
            
            const data = await response.json();
            
            // Format and prepare clean stats structure
            const stats = this.processAPIData(data);
            
            // Cache data
            localStorage.setItem('leetcode-cached-stats', JSON.stringify(stats));
            localStorage.setItem('leetcode-last-update-time', new Date().toISOString());
            
            // Update the UI
            this.updateLeetCodeDOM(stats, !isBackground);
            
            if (!isBackground) {
                this.displaySuccessMessage();
            }
        } catch (error) {
            console.error("LeetCode fetch error:", error);
            if (!isBackground) {
                this.displayErrorMessage();
                this.loadCachedData(); // ensure we reload cache if fetch failed during click
            }
        } finally {
            if (updateBtn) {
                updateBtn.disabled = false;
                updateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Update Stats';
            }
        }
    }
    
    processAPIData(data) {
        // Calculate acceptance rate from submissions count
        let acceptanceRate = "73.0%";
        let totalSubmissions = 578;
        
        if (data.matchedUserStats && data.matchedUserStats.totalSubmissionNum && data.matchedUserStats.acSubmissionNum) {
            const totalObj = data.matchedUserStats.totalSubmissionNum.find(x => x.difficulty === 'All');
            const acObj = data.matchedUserStats.acSubmissionNum.find(x => x.difficulty === 'All');
            
            if (totalObj && acObj && totalObj.submissions > 0) {
                totalSubmissions = totalObj.submissions;
                acceptanceRate = ((acObj.submissions / totalObj.submissions) * 100).toFixed(1) + "%";
            }
        }
        
        return {
            totalSolved: data.totalSolved || 325,
            easySolved: data.easySolved || 131,
            totalEasy: data.totalEasy || 946,
            mediumSolved: data.mediumSolved || 165,
            totalMedium: data.totalMedium || 2061,
            hardSolved: data.hardSolved || 29,
            totalHard: data.totalHard || 937,
            ranking: data.ranking ? `#${data.ranking.toLocaleString()}` : '#408,379',
            acceptanceRate: acceptanceRate,
            totalSubmissions: totalSubmissions,
            recentSubmissions: data.recentSubmissions || []
        };
    }
    
    updateLeetCodeDOM(stats, animateNumbers = true) {
        // Update Ranking
        const rankEl = document.getElementById('leetcode-rank');
        if (rankEl) rankEl.textContent = stats.ranking;
        
        // Update total submissions & acceptance rate
        const totalSolvedEl = document.getElementById('leetcode-total');
        const acceptanceEl = document.getElementById('leetcode-acceptance');
        const submissionsEl = document.getElementById('leetcode-submissions');
        
        if (totalSolvedEl) this.setValue(totalSolvedEl, stats.totalSolved, animateNumbers);
        if (acceptanceEl) acceptanceEl.textContent = stats.acceptanceRate;
        if (submissionsEl) this.setValue(submissionsEl, stats.totalSubmissions, animateNumbers);
        
        // Update progress bar
        const totalQuestions = stats.totalEasy + stats.totalMedium + stats.totalHard;
        const progressTextEl = document.getElementById('leetcode-progress-text');
        const progressFillEl = document.getElementById('leetcode-progress-fill');
        
        if (progressTextEl) progressTextEl.textContent = `${stats.totalSolved} / ${totalQuestions}`;
        if (progressFillEl) {
            const percentage = ((stats.totalSolved / totalQuestions) * 100).toFixed(2);
            progressFillEl.style.width = `${percentage}%`;
        }
        
        // Update metrics
        const easyEl = document.getElementById('leetcode-easy');
        const easyTotalEl = document.getElementById('leetcode-easy-total');
        if (easyEl) this.setValue(easyEl, stats.easySolved, animateNumbers);
        if (easyTotalEl) easyTotalEl.textContent = `/ ${stats.totalEasy}`;
        
        const mediumEl = document.getElementById('leetcode-medium');
        const mediumTotalEl = document.getElementById('leetcode-medium-total');
        if (mediumEl) this.setValue(mediumEl, stats.mediumSolved, animateNumbers);
        if (mediumTotalEl) mediumTotalEl.textContent = `/ ${stats.totalMedium}`;
        
        const hardEl = document.getElementById('leetcode-hard');
        const hardTotalEl = document.getElementById('leetcode-hard-total');
        if (hardEl) this.setValue(hardEl, stats.hardSolved, animateNumbers);
        if (hardTotalEl) hardTotalEl.textContent = `/ ${stats.totalHard}`;
        
        // Draw submissions list
        this.renderSubmissionsList(stats.recentSubmissions);
    }
    
    setValue(element, newValue, animate) {
        if (!animate) {
            element.textContent = newValue;
            return;
        }
        
        const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
        const difference = newValue - currentValue;
        if (difference === 0) {
            element.textContent = newValue;
            return;
        }
        
        let start = null;
        const duration = 1200;
        
        function runAnimation(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
            
            const currentVal = Math.round(currentValue + difference * easeProgress);
            element.textContent = currentVal.toLocaleString();
            
            element.style.color = '#00D8A0';
            element.style.textShadow = '0 0 10px rgba(0, 216, 160, 0.8)';
            
            if (progress < 1) {
                requestAnimationFrame(runAnimation);
            } else {
                setTimeout(() => {
                    element.style.color = '';
                    element.style.textShadow = '';
                }, 400);
            }
        }
        
        requestAnimationFrame(runAnimation);
    }
    
    renderSubmissionsList(submissions) {
        const listContainer = document.getElementById('leetcodeSubmissionsList');
        if (!listContainer) return;
        
        if (!submissions || submissions.length === 0) {
            listContainer.innerHTML = `
                <div class="submission-error">
                  <i class="fas fa-exclamation-triangle"></i> No transmissions logged.
                </div>
            `;
            return;
        }
        
        listContainer.innerHTML = '';
        
        // Display top 4 recent submissions
        const displayCount = Math.min(submissions.length, 4);
        for (let i = 0; i < displayCount; i++) {
            const sub = submissions[i];
            
            const item = document.createElement('div');
            item.className = 'submission-item';
            item.style.setProperty('--i', i);
            
            const isAccepted = sub.statusDisplay === 'Accepted';
            const dotClass = isAccepted ? 'accepted' : 'failed';
            const timeText = this.getRelativeTime(sub.timestamp);
            
            item.innerHTML = `
                <div class="sub-left">
                  <span class="sub-status-dot ${dotClass}" title="${sub.statusDisplay}"></span>
                  <span class="sub-name" title="${sub.title}">${sub.title}</span>
                </div>
                <div class="sub-right">
                  <span class="sub-lang">${sub.lang}</span>
                  <span class="sub-time">${timeText}</span>
                </div>
            `;
            
            listContainer.appendChild(item);
        }
    }
    
    getRelativeTime(timestamp) {
        if (!timestamp) return 'recently';
        const diff = Date.now() - (parseInt(timestamp) * 1000);
        const seconds = Math.floor(diff / 1000);
        if (seconds < 60) return 'just now';
        
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    }
    
    displaySuccessMessage() {
        this.showMessage('Quantum link synchronized. Stats updated.', 'success');
    }
    
    displayErrorMessage() {
        this.showMessage('Connection timeout. Loaded local logs.', 'error');
    }
    
    showMessage(text, type) {
        const existingMessage = document.querySelector('.leetcode-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = `leetcode-message leetcode-message-${type} glass-card`;
        message.innerHTML = `<i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i> ${text}`;
        
        const leetcodeSection = document.getElementById('leetcode');
        if (leetcodeSection) {
            leetcodeSection.appendChild(message);
            
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateX(-50%) translateY(-20px)';
                setTimeout(() => message.remove(), 300);
            }, 3000);
        }
    }
}

// Initialize LeetCode updater
let leetcodeUpdater;

document.addEventListener('DOMContentLoaded', function() {
    leetcodeUpdater = new LeetCodeUpdater();
    
    // Add visual CSS styling dynamically for update notification toast
    const style = document.createElement('style');
    style.textContent = `
        .leetcode-update-btn {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            border: none;
            border-radius: 15px;
            color: var(--white);
            padding: 0.8rem 1.2rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
            z-index: 10;
        }
        
        .leetcode-update-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 
              0 6px 20px rgba(124, 58, 237, 0.4),
              0 0 10px rgba(34, 211, 238, 0.3);
        }
        
        .leetcode-update-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }
        
        .leetcode-message {
            position: absolute;
            top: 1rem;
            left: 50%;
            transform: translateX(-50%);
            padding: 1rem 1.5rem;
            border-radius: 15px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 1000;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: var(--glass-glow);
        }
        
        .leetcode-message-success {
            background: rgba(0, 216, 160, 0.15);
            color: #00D8A0;
            border: 1px solid rgba(0, 216, 160, 0.3);
            text-shadow: 0 0 8px rgba(0, 216, 160, 0.2);
        }
        
        .leetcode-message-error {
            background: rgba(255, 55, 95, 0.15);
            color: #FF375F;
            border: 1px solid rgba(255, 55, 95, 0.3);
            text-shadow: 0 0 8px rgba(255, 55, 95, 0.2);
        }
        
        @media (max-width: 768px) {
            .leetcode-update-btn {
                position: static;
                margin: 0 auto 1.5rem;
                justify-content: center;
                width: 100%;
                max-width: 280px;
            }
            
            .leetcode-message {
                width: calc(100% - 40px);
                font-size: 0.8rem;
                padding: 0.8rem 1.2rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    window.leetcodeUpdater = leetcodeUpdater;
});
