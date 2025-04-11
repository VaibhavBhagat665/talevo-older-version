// Theme Switching
//hello
document.addEventListener('DOMContentLoaded', function() {
    // Set initial theme based on user preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDarkMode) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        updateThemeIcon();
    }
    
    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('click', toggleTheme);
    }
    
    // Login Modal
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeBtn && loginModal) {
        closeBtn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Auth Tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    if (authTabs.length > 0 && authForms.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and forms
                authTabs.forEach(t => t.classList.remove('active'));
                authForms.forEach(f => f.classList.remove('active'));
                
                // Add active class to the clicked tab
                this.classList.add('active');
                
                // Show corresponding form
                const formId = this.getAttribute('data-tab') + '-form';
                document.getElementById(formId).classList.add('active');
            });
        });
    }
    
    // Story Choice Buttons
    const choiceButtons = document.querySelectorAll('.choice-btn');
    if (choiceButtons.length > 0) {
        choiceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const nextChapter = this.getAttribute('data-next');
                
                // Hide current chapter
                const currentChapter = document.querySelector('.story-chapter:not(.hidden)');
                currentChapter.classList.add('hidden');
                
                // Show next chapter
                const nextChapterElement = document.getElementById(nextChapter);
                if (nextChapterElement) {
                    nextChapterElement.classList.remove('hidden');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // Update progress bar
                    updateProgress();
                }
            });
        });
    }
    
    // Story Controls
    initializeStoryControls();
    
    // Animation on scroll
    initializeScrollAnimations();
});

function toggleTheme() {
    const body = document.body;
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('#theme-switch i');
    if (!themeIcon) return;
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

function updateProgress() {
    const chapters = document.querySelectorAll('.story-chapter');
    const visibleChapterIndex = Array.from(chapters).findIndex(chapter => !chapter.classList.contains('hidden'));
    
    if (visibleChapterIndex !== -1) {
        const progressPercentage = ((visibleChapterIndex + 1) / chapters.length) * 100;
        document.querySelector('.progress').style.width = `${progressPercentage}%`;
        
        // Update chapter counter
        const statCounter = document.querySelector('.stat-item:first-child span');
        if (statCounter) {
            statCounter.textContent = `Chapter ${visibleChapterIndex + 1}/${chapters.length}`;
        }
    }
}

function initializeStoryControls() {
    // Back button functionality
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Bookmark functionality
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Story saved to your bookmarks');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Story removed from your bookmarks');
            }
        });
    }
    
    // Share functionality
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'Space Explorer - StoryVerse',
                    text: 'Check out this amazing interactive story!',
                    url: window.location.href,
                })
                .catch(console.error);
            } else {
                // Fallback
                showNotification('Link copied to clipboard!');
            }
        });
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '8px';
    notification.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff';
    notification.style.color = document.body.classList.contains('dark-mode') ? '#e2e8f0' : '#1e293b';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    notification.style.zIndex = '1000';
    notification.style.transition = 'all 0.3s ease';
    notification.style.opacity = '0';
    
    // Add to the DOM
    document.body.appendChild(notification);
    
    // Show and hide with animation
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initializeScrollAnimations() {
    // Only for devices that can handle it
    if (window.innerWidth >= 768) {
        const storyCards = document.querySelectorAll('.story-card');
        
        // Simple appearance animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial styles and observe
        storyCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.transitionDelay = `${index * 0.1}s`;
            
            observer.observe(card);
        });
    }
}
// script.js - Main JavaScript file for StoryVerse

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize modals
    initModals();
    
    // Initialize auth tabs if they exist
    initAuthTabs();
    
    // Check if we're on the story page
    if (document.querySelector('.story-page')) {
        initStoryView();
    }
    // Add this to initializeApp() function
    const startReadingBtn = document.querySelector('.cta-button');
    if (startReadingBtn) {
        startReadingBtn.addEventListener('click', function() {
            window.location.href = 'story.html?id=space-explorer';
        });
    }

    // Also update the story cards to link to the story page
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('click', function() {
            const storyTitle = this.querySelector('h3').textContent;
            const storyId = storyTitle.toLowerCase().replace(/\s+/g, '-');
            window.location.href = `story.html?id=${storyId}`;
        });
    });
}

// Initialize theme toggle
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const icon = themeSwitch.querySelector('i');
    
    themeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        
        // Toggle icon
        if (icon.classList.contains('fa-moon')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Apply saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        const isDarkMode = savedDarkMode === 'true';
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
        
        // Set correct icon
        icon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Initialize modals
function initModals() {
    // Login modal
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    
    if (loginBtn && loginModal) {
        const closeBtn = loginModal.querySelector('.close');
        
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
            setTimeout(() => {
                loginModal.classList.add('show');
            }, 10);
        });
        
        closeBtn.addEventListener('click', function() {
            loginModal.classList.remove('show');
            setTimeout(() => {
                loginModal.style.display = 'none';
            }, 300);
        });
        
        // Close when clicking outside the modal
        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.classList.remove('show');
                setTimeout(() => {
                    loginModal.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Initialize auth tabs
function initAuthTabs() {
    const authTabs = document.querySelectorAll('.auth-tab');
    if (authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                authTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all forms
                document.querySelectorAll('.auth-form').forEach(form => {
                    form.classList.remove('active');
                });
                
                // Show the form corresponding to the clicked tab
                const formId = this.dataset.tab + '-form';
                document.getElementById(formId).classList.add('active');
            });
        });
    }
}

// Initialize story view
function initStoryView() {
    // Extract story ID from URL or data attribute
    const storyId = getStoryIdFromUrl() || 'space-explorer'; // Default to Space Explorer
    
    // Create and initialize the story viewer
    const storyViewer = new EnhancedStoryViewer(storyId);
    storyViewer.initialize();
    
    // Store in window for debugging
    window.storyViewer = storyViewer;
}

// Get story ID from URL
function getStoryIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load story data
async function loadStoryData(storyId) {
    try {
        const response = await fetch(`/data/stories/${storyId}.json`);
        return await response.json();
    } catch (error) {
        console.error('Error loading story data:', error);
        return null;
    }
}
