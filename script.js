// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize application elements
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
    
    // Initialize story interactions
    initStoryInteractions();
    
    // Animation on scroll
    initializeScrollAnimations();
}

// Theme handling
function initThemeToggle() {
    // Set initial theme based on user preference or saved setting
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedDarkMode !== null) {
        // Use saved setting if available
        const isDarkMode = savedDarkMode === 'true';
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
    } else if (!prefersDarkMode) {
        // Use system preference as fallback
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
    
    // Add event listener to theme switch button
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('click', toggleTheme);
        updateThemeIcon(); // Set initial icon state
    }
}

function toggleTheme() {
    const body = document.body;
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    // Save preference to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
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

// Modal handling
function initModals() {
    // Login modal
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    
    if (loginBtn && loginModal) {
        const closeBtn = loginModal.querySelector('.close');
        
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close when clicking outside the modal
        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Auth tab handling
function initAuthTabs() {
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
}

// Story interactions
function initStoryInteractions() {
    // Set up "Start Reading" button
    const startReadingBtn = document.querySelector('.cta-button');
    if (startReadingBtn) {
        startReadingBtn.addEventListener('click', function () {
            // const featuredSection = document.querySelector('.featured-stories');
            // if (featuredSection) {
            //     featuredSection.scrollIntoView({ behavior: 'smooth' });
            // }
            const featuredSection = document.querySelector('.till');
            if (featuredSection) {
                featuredSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    // Make story cards clickable
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('click', function() {
            const storyTitle = this.querySelector('h3').textContent.trim();
            // Convert the title to a kebab-case filename
            const storyId = storyTitle.toLowerCase().replace(/\s+/g, '-');
            
            // Navigate to the story page
            window.location.href = `stories/${storyId}.html`;
        });
    });
    
    // Story Choice Buttons - if we're on a story page
    initStoryChoiceButtons();
}

function initStoryChoiceButtons() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    if (choiceButtons.length > 0) {
        choiceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const nextChapter = this.getAttribute('data-next');
                
                // Hide current chapter
                const currentChapter = document.querySelector('.story-chapter:not(.hidden)');
                if (currentChapter) {
                    currentChapter.classList.add('hidden');
                
                    // Show next chapter
                    const nextChapterElement = document.getElementById(nextChapter);
                    if (nextChapterElement) {
                        nextChapterElement.classList.remove('hidden');
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                        
                        // Update stats
                        updateStoryStats();
                    }
                }
            });
        });
    }
}

// Update story statistics
function updateStoryStats() {
    const chapters = document.querySelectorAll('.story-chapter');
    const visibleChapterIndex = Array.from(chapters).findIndex(chapter => !chapter.classList.contains('hidden'));
    
    if (visibleChapterIndex !== -1) {
        // Update chapter counter
        const chapterCounter = document.getElementById('chapter-counter');
        if (chapterCounter) {
            chapterCounter.textContent = `Chapter ${visibleChapterIndex + 1}/${chapters.length}`;
        }
        
        // Update paths available
        const pathsAvailable = document.getElementById('paths-available');
        const currentChapter = chapters[visibleChapterIndex];
        const choiceOptions = currentChapter.querySelectorAll('.choice-btn');
        
        if (pathsAvailable && choiceOptions.length) {
            pathsAvailable.textContent = `${choiceOptions.length} paths available`;
        } else if (pathsAvailable) {
            pathsAvailable.textContent = 'Final chapter';
        }
    }
}

// Animations
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

// Helper functions
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
// Story navigation: Next / Prev / Start Over / Map
document.addEventListener('DOMContentLoaded', function () {
    const chapters = Array.from(document.querySelectorAll('.story-chapter'));
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const mapBtn = document.getElementById('mapBtn');
    const restartBtns = document.querySelectorAll('.restart-btn');

    function getCurrentChapterIndex() {
        return chapters.findIndex(ch => !ch.classList.contains('hidden'));
    }

    function showChapter(index) {
        chapters.forEach(ch => ch.classList.add('hidden'));
        chapters[index].classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let index = getCurrentChapterIndex();
            if (index < chapters.length - 1) {
                showChapter(index + 1);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let index = getCurrentChapterIndex();
            if (index > 0) {
                showChapter(index - 1);
            }
        });
    }

    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            const mapChapter = document.getElementById('chapter-4h');
            if (mapChapter) {
                chapters.forEach(ch => ch.classList.add('hidden'));
                mapChapter.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    restartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showChapter(0); // Go to chapter-1
        });
    });
});

function handleSignup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Save to localStorage
    localStorage.setItem(`user_${username}`, password);
    alert("Account created! You can now sign in.");
}

function handleSignin() {
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    const savedPassword = localStorage.getItem(`user_${username}`);

    if (savedPassword === password) {
        alert("Login successful!");
        // Redirect to homepage or dashboard
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
}

// Check if user is already logged in
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const welcomeUser = document.getElementById("welcomeUser");
    const userNameSpan = document.getElementById("userName");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        welcomeUser.classList.remove("hidden");
        userNameSpan.textContent = user.name;
        loginBtn.classList.add("hidden");
        logoutBtn.classList.remove("hidden");
    } else {
        welcomeUser.classList.add("hidden");
        userNameSpan.textContent = "";
        loginBtn.classList.remove("hidden");
        logoutBtn.classList.add("hidden");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Initialize application elements
    initializeApp();
    
    // Check login status
    checkLoginStatus();

    // Sign Up
    const createAccountBtn = document.getElementById("createAccountBtn");
    if (createAccountBtn) {
        createAccountBtn.addEventListener("click", function() {
            const name = document.getElementById("new-name").value.trim();
            const email = document.getElementById("new-email").value.trim();
            const password = document.getElementById("new-password").value.trim();

            if (!name || !email || !password) {
                showNotification("Please fill out all fields.");
                return;
            }

            // Save to localStorage
            localStorage.setItem(`user_${email}`, JSON.stringify({ name, password }));
            showNotification("Account created! You can now sign in.");
            
            // Switch to login tab
            const loginTab = document.querySelector('.auth-tab[data-tab="login"]');
            if (loginTab) {
                loginTab.click();
            }
        });
    }

    // Sign In
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const signinButton = loginForm.querySelector('.btn');
        if (signinButton) {
            signinButton.addEventListener('click', function() {
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value.trim();

                if (!email || !password) {
                    showNotification("Please enter both email and password.");
                    return;
                }

                const userData = localStorage.getItem(`user_${email}`);
                if (!userData) {
                    showNotification("No account found with this email.");
                    return;
                }

                const parsed = JSON.parse(userData);
                if (parsed.password === password) {
                    localStorage.setItem("loggedInUser", JSON.stringify({ name: parsed.name, email }));
                    showNotification(`Welcome back, ${parsed.name}!`);
                    document.getElementById('loginModal').style.display = 'none';
                    document.body.style.overflow = 'auto';
                    checkLoginStatus();
                } else {
                    showNotification("Incorrect password.");
                }
            });
        }
    }

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            localStorage.removeItem("loggedInUser");
            showNotification("You have been signed out.");
            checkLoginStatus();
        });
    }
});

let storyHistory = [];
let currentChapter = document.querySelector('.story-chapter:not(.hidden)');

// CHOICE NAVIGATION
document.querySelectorAll('.choice-btn').forEach(button => {
  button.addEventListener('click', () => {
    if (currentChapter) {
      storyHistory.push(currentChapter.id);
    }
    const nextId = button.getAttribute('data-next');
    const next = document.getElementById(nextId);
    if (next) {
      document.querySelectorAll('.story-chapter').forEach(c => c.classList.add('hidden'));
      next.classList.remove('hidden');
      currentChapter = next;
      updateNavButtons();
    }
  });
});

// PREV LOGIC
document.getElementById('prev-btn')?.addEventListener('click', () => {
  const prevId = storyHistory.pop();
  const prev = document.getElementById(prevId);
  if (prev) {
    document.querySelectorAll('.story-chapter').forEach(c => c.classList.add('hidden'));
    prev.classList.remove('hidden');
    currentChapter = prev;
    updateNavButtons();
  }
});

// NEXT LOGIC (follows first available choice)
document.getElementById('next-btn')?.addEventListener('click', () => {
  const firstChoice = currentChapter?.querySelector('.choice-btn');
  if (firstChoice) {
    firstChoice.click();
  }
});

// BUTTON VISIBILITY CONTROL
function updateNavButtons() {
  const isFirst = currentChapter?.id === 'chapter-1';
  const isEnding = currentChapter?.classList.contains('story-ending');

  document.getElementById('prev-btn')?.classList.toggle('hidden', isFirst);
  document.getElementById('next-btn')?.classList.toggle('hidden', isEnding);
}






