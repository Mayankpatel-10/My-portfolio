import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LeetCodeStats = () => {
  const username = 'mynk_1002';
  const apiUrl = `https://leetcode-api-faisalshohag.vercel.app/${username}`;

  const [stats, setStats] = useState({
    totalSolved: 325,
    easySolved: 131,
    totalEasy: 946,
    mediumSolved: 165,
    totalMedium: 2061,
    hardSolved: 29,
    totalHard: 937,
    ranking: '#408,379',
    acceptanceRate: '73.0%',
    totalSubmissions: 578,
    recentSubmissions: []
  });

  const [syncing, setSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load from cache first
  useEffect(() => {
    const cached = localStorage.getItem('leetcode-cached-stats');
    if (cached) {
      try {
        setStats(JSON.parse(cached));
      } catch (e) {
        console.error('Error parsing cached LeetCode stats', e);
      }
    }
    // Fetch fresh stats in background
    fetchStats(true);
  }, []);

  const fetchStats = async (isBackground = false) => {
    if (!isBackground) setSyncing(true);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();

      let acceptanceRate = '73.0%';
      let totalSubmissions = 578;

      if (data.matchedUserStats?.totalSubmissionNum && data.matchedUserStats?.acSubmissionNum) {
        const totalObj = data.matchedUserStats.totalSubmissionNum.find(x => x.difficulty === 'All');
        const acObj = data.matchedUserStats.acSubmissionNum.find(x => x.difficulty === 'All');

        if (totalObj && acObj && totalObj.submissions > 0) {
          totalSubmissions = totalObj.submissions;
          acceptanceRate = ((acObj.submissions / totalObj.submissions) * 100).toFixed(1) + '%';
        }
      }

      const freshStats = {
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

      setStats(freshStats);
      localStorage.setItem('leetcode-cached-stats', JSON.stringify(freshStats));

      if (!isBackground) {
        triggerToast('Quantum link synchronized. Stats updated.', 'success');
      }
    } catch (err) {
      console.error(err);
      if (!isBackground) {
        triggerToast('Connection timeout. Loaded local logs.', 'error');
      }
    } finally {
      if (!isBackground) setSyncing(false);
    }
  };

  const triggerToast = (text, type) => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const getRelativeTime = (timestamp) => {
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
  };

  const totalQuestions = stats.totalEasy + stats.totalMedium + stats.totalHard;
  const progressPercent = ((stats.totalSolved / totalQuestions) * 100).toFixed(2);

  return (
    <section id="leetcode">
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Coding Profile
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          LEETCODE STATS
        </motion.h2>

        <div className="leetcode-dashboard" style={{ position: 'relative' }}>
          {/* Live Sync button */}
          <button
            className="leetcode-update-btn"
            onClick={() => fetchStats(false)}
            disabled={syncing}
          >
            <i className={`fas ${syncing ? 'fa-spinner fa-spin' : 'fa-sync-alt'}`}></i>{' '}
            {syncing ? 'Syncing...' : 'Update Stats'}
          </button>

          {/* Sync status Toast */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                className={`leetcode-message leetcode-message-${toastMessage.type} glass-card`}
                initial={{ opacity: 0, y: -20, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: -20, x: '-50%' }}
                transition={{ duration: 0.3 }}
              >
                <i className={`fas ${toastMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>{' '}
                {toastMessage.text}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="leetcode-profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <i className="fas fa-code"></i>
              </div>
              <div className="profile-info">
                <h3>mynk_1002</h3>
                <div className="profile-stats">
                  <span className="rating-badge">⭐ 1,592</span>
                  <span className="rank-badge">
                    <i className="fas fa-globe"></i> Rank: <span id="leetcode-rank">{stats.ranking}</span>
                  </span>
                </div>
              </div>
              <a href="https://leetcode.com/u/mynk_1002/" target="_blank" rel="noopener noreferrer" className="profile-link">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>

          <div className="leetcode-metrics">
            <div className="metric-card easy">
              <div className="metric-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="metric-data">
                <span className="metric-number">{stats.easySolved}</span>
                <span className="metric-label">Easy</span>
                <span className="metric-total">/ {stats.totalEasy}</span>
              </div>
            </div>

            <div className="metric-card medium">
              <div className="metric-icon">
                <i className="fas fa-fire"></i>
              </div>
              <div className="metric-data">
                <span className="metric-number">{stats.mediumSolved}</span>
                <span className="metric-label">Medium</span>
                <span className="metric-total">/ {stats.totalMedium}</span>
              </div>
            </div>

            <div className="metric-card hard">
              <div className="metric-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <div className="metric-data">
                <span className="metric-number">{stats.hardSolved}</span>
                <span className="metric-label">Hard</span>
                <span className="metric-total">/ {stats.totalHard}</span>
              </div>
            </div>
          </div>

          <div className="leetcode-dashboard-grid">
            {/* Left detail metrics */}
            <div className="leetcode-dashboard-left">
              <div className="leetcode-details">
                <div className="detail-item">
                  <i className="fas fa-check-circle"></i>
                  <div className="detail-content">
                    <span className="detail-label">Total Solved</span>
                    <span className="detail-value">{stats.totalSolved}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fas fa-percentage"></i>
                  <div className="detail-content">
                    <span className="detail-label">Acceptance Rate</span>
                    <span className="detail-value">{stats.acceptanceRate}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fas fa-trophy"></i>
                  <div className="detail-content">
                    <span className="detail-label">Contests</span>
                    <span className="detail-value">5</span>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fas fa-upload"></i>
                  <div className="detail-content">
                    <span className="detail-label">Submissions</span>
                    <span className="detail-value">{stats.totalSubmissions}</span>
                  </div>
                </div>
              </div>

              <div className="leetcode-progress">
                <div className="progress-header">
                  <span>Overall Progress</span>
                  <span>{stats.totalSolved} / {totalQuestions}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* Right recent submissions list */}
            <div className="leetcode-dashboard-right">
              <div className="leetcode-submissions-card glass-card">
                <h4 className="submissions-title">
                  <i className="fas fa-history"></i> RECENT TRANSMISSIONS
                </h4>
                <div className="submissions-list">
                  {stats.recentSubmissions.length === 0 ? (
                    <div className="submission-loading">
                      <i className="fas fa-circle-notch fa-spin"></i> Fetching active logs...
                    </div>
                  ) : (
                    stats.recentSubmissions.slice(0, 4).map((sub, i) => (
                      <div key={i} className="submission-item" style={{ '--i': i }}>
                        <div className="sub-left">
                          <span
                            className={`sub-status-dot ${sub.statusDisplay === 'Accepted' ? 'accepted' : 'failed'}`}
                            title={sub.statusDisplay}
                          ></span>
                          <span className="sub-name" title={sub.title}>
                            {sub.title}
                          </span>
                        </div>
                        <div className="sub-right">
                          <span className="sub-lang">{sub.lang}</span>
                          <span className="sub-time">{getRelativeTime(sub.timestamp)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetCodeStats;
