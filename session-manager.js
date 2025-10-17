// Session Manager - Track Online Users
class SessionManager {
    constructor() {
        this.sessionKey = 'activeSessions';
        this.currentUserKey = 'currentUser';
    }

    // Generate unique session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Login user dan create session
    login(user) {
        const sessionId = this.generateSessionId();
        const sessionData = {
            sessionId: sessionId,
            userId: user.id,
            username: user.username,
            nama: user.nama,
            role: user.role,
            email: user.email,
            loginTime: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            ipAddress: 'localhost', // In real app, get from server
            browser: this.getBrowserInfo()
        };

        // Save current user session
        localStorage.setItem(this.currentUserKey, JSON.stringify(sessionData));

        // Add to active sessions list
        this.addToActiveSessions(sessionData);

        return sessionData;
    }

    // Add session to active sessions
    addToActiveSessions(sessionData) {
        let activeSessions = this.getActiveSessions();
        
        // Remove old session of same user (prevent duplicate)
        activeSessions = activeSessions.filter(s => s.userId !== sessionData.userId);
        
        // Add new session
        activeSessions.push(sessionData);
        
        localStorage.setItem(this.sessionKey, JSON.stringify(activeSessions));
    }

    // Get all active sessions
    getActiveSessions() {
        const sessions = localStorage.getItem(this.sessionKey);
        return sessions ? JSON.parse(sessions) : [];
    }

    // Update last activity time
    updateActivity() {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
            currentUser.lastActivity = new Date().toISOString();
            localStorage.setItem(this.currentUserKey, JSON.stringify(currentUser));
            
            // Update in active sessions
            let activeSessions = this.getActiveSessions();
            const index = activeSessions.findIndex(s => s.sessionId === currentUser.sessionId);
            if (index !== -1) {
                activeSessions[index] = currentUser;
                localStorage.setItem(this.sessionKey, JSON.stringify(activeSessions));
            }
        }
    }

    // Logout user
    logout() {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
            // Remove from active sessions
            let activeSessions = this.getActiveSessions();
            activeSessions = activeSessions.filter(s => s.sessionId !== currentUser.sessionId);
            localStorage.setItem(this.sessionKey, JSON.stringify(activeSessions));
        }
        
        // Clear current user
        localStorage.removeItem(this.currentUserKey);
    }

    // Get current logged in user
    getCurrentUser() {
        const user = localStorage.getItem(this.currentUserKey);
        return user ? JSON.parse(user) : null;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // Get browser info
    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        
        if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Safari')) browser = 'Safari';
        else if (ua.includes('Edge')) browser = 'Edge';
        else if (ua.includes('Opera')) browser = 'Opera';
        
        return browser;
    }

    // Calculate online duration
    getOnlineDuration(loginTime) {
        const login = new Date(loginTime);
        const now = new Date();
        const diff = now - login;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
            return `${hours}j ${minutes}m`;
        }
        return `${minutes}m`;
    }

    // Format time ago
    timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days} hari yang lalu`;
        if (hours > 0) return `${hours} jam yang lalu`;
        if (minutes > 0) return `${minutes} menit yang lalu`;
        return 'Baru saja';
    }

    // Clean inactive sessions (older than 24 hours)
    cleanInactiveSessions() {
        let activeSessions = this.getActiveSessions();
        const now = new Date();
        
        activeSessions = activeSessions.filter(session => {
            const lastActivity = new Date(session.lastActivity);
            const diff = now - lastActivity;
            const hours = diff / (1000 * 60 * 60);
            
            return hours < 24; // Keep sessions active for 24 hours
        });
        
        localStorage.setItem(this.sessionKey, JSON.stringify(activeSessions));
    }

    // Get online users count
    getOnlineUsersCount() {
        return this.getActiveSessions().length;
    }

    // Get online users by role
    getOnlineUsersByRole(role) {
        return this.getActiveSessions().filter(s => s.role === role);
    }
}

// Initialize global session manager
const sessionManager = new SessionManager();

// Update activity on user interaction
document.addEventListener('click', () => sessionManager.updateActivity());
document.addEventListener('keypress', () => sessionManager.updateActivity());

// Clean inactive sessions every 30 minutes
setInterval(() => {
    sessionManager.cleanInactiveSessions();
}, 30 * 60 * 1000);
