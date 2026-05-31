// ======================================
// APP.JS - WhatsApp Clone UI Controller
// ======================================

class WhatsAppApp {
    constructor() {
        this.currentScreen = 'splash';
        this.isDarkMode = true;
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.populateMockData();
        this.startSplashTimer();
    }

    setupEventListeners() {
        // Navigation buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.onboarding-next-btn')) {
                this.nextOnboarding();
            }
            if (e.target.closest('.onboarding-skip-btn')) {
                this.goToScreen('login-screen');
            }
            if (e.target.closest('.back-btn')) {
                this.goBack();
            }
            if (e.target.closest('.search-btn')) {
                this.goToScreen('search-screen');
            }
            if (e.target.closest('.menu-btn')) {
                this.showMenu();
            }
            if (e.target.closest('.tab-filter')) {
                this.handleTabSwitch(e.target.closest('.tab-filter'));
            }
            if (e.target.closest('.chat-item')) {
                this.goToScreen('chat-screen');
            }
            if (e.target.closest('.chat-name')) {
                this.goToScreen('contact-info-screen');
            }
            if (e.target.closest('.settings-item')) {
                this.handleSettingsClick(e.target.closest('.settings-item'));
            }
            if (e.target.closest('.theme-btn')) {
                this.handleThemeChange(e.target.closest('.theme-btn'));
            }
            if (e.target.closest('.status-add-btn')) {
                alert('Add status functionality');
            }
            if (e.target.closest('.status-item')) {
                alert('View status functionality');
            }
            if (e.target.closest('.ai-character-card')) {
                this.openAIChat(e.target.closest('.ai-character-card'));
            }
        });

        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.closest('.login-form')) {
                e.preventDefault();
                this.goToScreen('otp-screen');
            }
            if (e.target.closest('.profile-form')) {
                e.preventDefault();
                alert('Profile saved successfully!');
            }
            if (e.target.closest('.group-form')) {
                e.preventDefault();
                alert('Group created successfully!');
            }
        });

        // Message input
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Country selector
        const countrySelect = document.getElementById('country-select');
        if (countrySelect) {
            countrySelect.addEventListener('change', (e) => {
                const code = e.target.value;
                document.getElementById('display-code').textContent = code;
            });
        }

        // OTP input handling
        const otpInputs = document.querySelectorAll('.otp-input');
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 1) {
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                }
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && index > 0 && !e.target.value) {
                    otpInputs[index - 1].focus();
                }
            });
        });

        // Theme customization
        const appearanceBtn = document.querySelector('[data-settings="appearance"]');
        if (appearanceBtn) {
            appearanceBtn.addEventListener('click', () => {
                this.goToScreen('theme-screen');
            });
        }

        // FAB button
        const fab = document.querySelector('.fab');
        if (fab) {
            fab.addEventListener('click', () => {
                alert('New chat functionality');
            });
        }
    }

    startSplashTimer() {
        setTimeout(() => {
            this.goToScreen('onboarding-screen');
        }, 3000);
    }

    goToScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active', 'active-mobile');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            if (screenId === 'home-screen') {
                targetScreen.classList.add('active-mobile');
            } else {
                targetScreen.classList.add('active');
            }
            this.currentScreen = screenId;
        }
    }

    goBack() {
        // Simple back navigation
        if (this.currentScreen === 'chat-screen') {
            this.goToScreen('home-screen');
        } else if (this.currentScreen === 'contact-info-screen') {
            this.goToScreen('chat-screen');
        } else if (this.currentScreen === 'settings-screen') {
            this.goToScreen('home-screen');
        } else if (this.currentScreen === 'profile-screen') {
            this.goToScreen('settings-screen');
        } else if (this.currentScreen === 'theme-screen') {
            this.goToScreen('settings-screen');
        } else if (this.currentScreen === 'search-screen') {
            this.goToScreen('home-screen');
        } else {
            this.goToScreen('home-screen');
        }
    }

    nextOnboarding() {
        const slides = document.querySelectorAll('.onboarding-slide');
        const indicators = document.querySelectorAll('.indicator');
        let activeIndex = Array.from(slides).findIndex(s => s.classList.contains('active'));

        if (activeIndex < slides.length - 1) {
            slides[activeIndex].classList.remove('active');
            indicators[activeIndex].classList.remove('active');
            activeIndex++;
            slides[activeIndex].classList.add('active');
            indicators[activeIndex].classList.add('active');
        } else {
            this.goToScreen('login-screen');
        }
    }

    handleTabSwitch(btn) {
        // Remove active from all
        document.querySelectorAll('.tab-filter').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        const tab = btn.getAttribute('data-tab');
        this.loadTabContent(tab);
    }

    loadTabContent(tab) {
        // Load content based on tab
        switch(tab) {
            case 'chats':
                this.loadChats();
                break;
            case 'status':
                this.goToScreen('status-screen');
                break;
            case 'calls':
                this.goToScreen('calls-screen');
                break;
            case 'ai':
                this.goToScreen('ai-screen');
                break;
        }
    }

    showMenu() {
        const actions = [
            'New group',
            'Settings',
            'Archived chats',
            'Starred messages',
            'Blocked contacts'
        ];
        alert('Menu: ' + actions.join('\n'));
    }

    handleSettingsClick(btn) {
        const settingName = btn.textContent.trim();
        if (settingName === 'Appearance') {
            this.goToScreen('theme-screen');
        }
    }

    handleThemeChange(btn) {
        // Remove active from all
        document.querySelectorAll('.theme-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        const theme = btn.getAttribute('data-theme');
        this.setTheme(theme);
    }

    setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else if (theme === 'light') {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        }
        localStorage.setItem('whatsapp-theme', theme);
    }

    loadChats() {
        const chatsList = document.getElementById('chats-list');
        if (!chatsList) return;

        const chats = [
            {
                name: 'Anaya',
                avatar: '👩',
                message: 'Hi there! 😊',
                time: '10:30 AM',
                unread: 2,
                online: true
            },
            {
                name: 'Rahul',
                avatar: '👨',
                message: 'See you soon',
                time: '9:20 AM',
                unread: 0,
                online: false
            },
            {
                name: 'Priya',
                avatar: '👩',
                message: 'Typing...',
                time: 'Yesterday',
                unread: 1,
                online: true
            },
            {
                name: 'Family Group',
                avatar: '👨‍👩‍👧',
                message: 'Mom: Dinner tonight at 8?',
                time: '8:15 PM',
                unread: 0,
                online: false
            },
            {
                name: 'College Friends',
                avatar: '👥',
                message: 'You: See you soon',
                time: '5:30 PM',
                unread: 0,
                online: false
            },
            {
                name: 'Arman',
                avatar: '👨',
                message: 'Cool, thanks!',
                time: 'Yesterday',
                unread: 0,
                online: false
            }
        ];

        chatsList.innerHTML = chats.map((chat, index) => `
            <div class="chat-item" data-chat-id="${index}">
                <div class="chat-avatar-wrapper">
                    <div class="chat-avatar-img" style="background: linear-gradient(135deg, #25d366 0%, #1fad50 100%); display: flex; align-items: center; justify-content: center; font-size: 24px;">
                        ${chat.avatar}
                    </div>
                    ${chat.online ? '<div class="online-indicator"></div>' : ''}
                    ${chat.unread > 0 ? `<div class="unread-badge">${chat.unread}</div>` : ''}
                </div>
                <div class="chat-content">
                    <div class="chat-header-row">
                        <span class="chat-name">${chat.name}</span>
                        <span class="chat-time">${chat.time}</span>
                    </div>
                    <div class="chat-message">
                        ${chat.message.includes('Typing') ? '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>' : chat.message}
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadCallHistory() {
        const callsList = document.getElementById('calls-list');
        if (!callsList) return;

        const calls = [
            { name: 'Anaya', time: '10:30 AM', duration: '2:45', type: 'outgoing', missed: false },
            { name: 'Rahul', time: '9:20 AM', duration: 'missed', type: 'incoming', missed: true },
            { name: 'Priya', time: 'Yesterday', duration: '5:12', type: 'incoming', missed: false },
            { name: 'Family Group', time: '8:15 PM', duration: '12:34', type: 'outgoing', missed: false },
            { name: 'Arman', time: '5:30 PM', duration: '3:21', type: 'incoming', missed: false }
        ];

        callsList.innerHTML = calls.map((call, index) => `
            <div class="call-item ${call.missed ? 'missed' : ''} ${call.type === 'incoming' ? 'incoming' : ''}">
                <div class="chat-avatar-wrapper">
                    <div class="chat-avatar-img" style="background: linear-gradient(135deg, #25d366 0%, #1fad50 100%); display: flex; align-items: center; justify-content: center; font-size: 24px;">
                        👤
                    </div>
                </div>
                <div class="chat-content">
                    <div class="chat-header-row">
                        <span class="chat-name">${call.name}</span>
                        <span class="chat-time">${call.time}</span>
                    </div>
                    <div class="chat-message">
                        <i class="fas fa-phone call-icon"></i>
                        <span>${call.duration}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadStatus() {
        const statusList = document.getElementById('status-list');
        if (!statusList) return;

        const statuses = [
            { name: 'Anaya', time: '2 hours ago' },
            { name: 'Priya', time: '5 hours ago' },
            { name: 'Rahul', time: '1 day ago' }
        ];

        statusList.innerHTML = statuses.map(status => `
            <div class="status-item">
                <div class="status-ring">
                    <div class="status-avatar" style="background: linear-gradient(135deg, #25d366 0%, #1fad50 100%); display: flex; align-items: center; justify-content: center; font-size: 20px;">
                        👤
                    </div>
                </div>
                <div class="status-info">
                    <h3>${status.name}</h3>
                    <p>${status.time}</p>
                </div>
            </div>
        `).join('');
    }

    loadMessages() {
        const messagesContainer = document.getElementById('messages-container');
        if (!messagesContainer) return;

        const messages = [
            { text: 'Hi there! 😊', sent: false, status: 'read', time: '10:30 AM' },
            { text: 'How are you doing?', sent: true, status: 'read', time: '10:31 AM' },
            { text: 'I\'m good, talking to my favorite person 💚', sent: false, status: 'read', time: '10:32 AM' },
            { text: 'Aww that\'s sweet ❤️', sent: true, status: 'read', time: '10:33 AM' },
            { text: 'Hey Anaya, Let me know if you\'re free tonight', sent: true, status: 'sent', time: '10:00 AM' },
            { text: 'I\'m good. Talking to my favorite person 💚', sent: false, status: 'read', time: '10:24 AM' },
            { text: 'Always here for you 💚', sent: false, status: 'read', time: '10:25 AM' }
        ];

        messagesContainer.innerHTML = messages.map((msg, idx) => `
            ${idx === 0 ? '<div class="date-separator"><div class="date-text">Today</div></div>' : ''}
            <div class="message-group">
                <div class="message ${msg.sent ? 'sent' : 'received'}">
                    ${msg.text}
                    ${msg.sent ? `<span class="message-status"><span class="tick ${msg.status === 'read' ? 'double' : 'single'}">✓${msg.status === 'read' ? '✓' : ''}</span></span>` : ''}
                </div>
            </div>
        `).join('');
    }

    loadContacts() {
        const contactsList = document.getElementById('contacts-list');
        if (!contactsList) return;

        const contacts = [
            { name: 'Anaya', initial: 'A' },
            { name: 'Rahul', initial: 'R' },
            { name: 'Priya', initial: 'P' },
            { name: 'Arman', initial: 'A' },
            { name: 'Nisha', initial: 'N' },
            { name: 'Karan', initial: 'K' }
        ];

        contactsList.innerHTML = contacts.map(contact => `
            <div class="contact-item">
                <div class="contact-avatar" style="background: linear-gradient(135deg, #25d366 0%, #1fad50 100%); display: flex; align-items: center; justify-content: center; font-size: 24px;">
                    👤
                </div>
                <div class="chat-content">
                    <div class="chat-name">${contact.name}</div>
                </div>
            </div>
        `).join('');
    }

    loadAICharacters() {
        const aiGrid = document.getElementById('ai-grid');
        if (!aiGrid) return;

        const characters = [
            { name: 'Girlfriend AI', role: 'Talk with AI girlfriend', icon: '💕' },
            { name: 'Boyfriend AI', role: 'Talk with AI boyfriend', icon: '💙' },
            { name: 'Study Buddy', role: 'Your personal study assistant', icon: '📚' },
            { name: 'Mentor AI', role: 'Guidance for your goals', icon: '🎯' },
            { name: 'Friend AI', role: 'Chat with your AI friend', icon: '😊' },
            { name: 'Creative AI', role: 'Create stories & art', icon: '🎨' }
        ];

        aiGrid.innerHTML = characters.map(char => `
            <div class="ai-character-card">
                <div class="ai-avatar">${char.icon}</div>
                <h3>${char.name}</h3>
                <p>${char.role}</p>
            </div>
        `).join('');
    }

    loadWallpapers() {
        const wallpaperGrid = document.getElementById('wallpaper-grid');
        if (!wallpaperGrid) return;

        const wallpapers = [
            { color: '#1a1a2e' },
            { color: '#16213e' },
            { color: '#0f3460' },
            { color: '#1f1f1f' },
            { color: '#2a2a3e' },
            { color: '#1a0033' }
        ];

        wallpaperGrid.innerHTML = wallpapers.map(wp => `
            <div class="wallpaper-item" style="background-color: ${wp.color};"></div>
        `).join('');
    }

    loadColors() {
        const colorGrid = document.getElementById('color-grid');
        if (!colorGrid) return;

        const colors = [
            '#25d366',
            '#16a34a',
            '#059669',
            '#0891b2',
            '#0284c7',
            '#2563eb'
        ];

        colorGrid.innerHTML = colors.map(color => `
            <div class="color-item" style="background-color: ${color};"></div>
        `).join('');
    }

    populateMockData() {
        this.loadChats();
        this.loadCallHistory();
        this.loadStatus();
        this.loadMessages();
        this.loadContacts();
        this.loadAICharacters();
        this.loadWallpapers();
        this.loadColors();
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        if (input && input.value.trim()) {
            const messagesContainer = document.getElementById('messages-container');
            const message = input.value;

            const messageEl = document.createElement('div');
            messageEl.className = 'message-group';
            messageEl.innerHTML = `
                <div class="message sent">
                    ${message}
                    <span class="message-status"><span class="tick sent">✓</span></span>
                </div>
            `;

            messagesContainer.appendChild(messageEl);
            input.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Simulate received message
            setTimeout(() => {
                const replyEl = document.createElement('div');
                replyEl.className = 'message-group';
                replyEl.innerHTML = `
                    <div class="message received">
                        That sounds great! 😊
                    </div>
                `;
                messagesContainer.appendChild(replyEl);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
    }

    openAIChat(card) {
        const name = card.querySelector('h3').textContent;
        alert(`Opening ${name} chat...`);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WhatsAppApp();
});

// Handle responsive behavior
window.addEventListener('resize', () => {
    const app = document.getElementById('app');
    const width = window.innerWidth;

    if (width <= 768) {
        app.style.width = '100%';
        app.style.maxWidth = '100%';
    }
});

// Prevent default context menu for better UX
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.mobile-container')) {
        e.preventDefault();
    }
});
