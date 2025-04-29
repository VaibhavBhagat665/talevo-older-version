document.addEventListener('DOMContentLoaded', function() {
    // Main initialization function that calls all setup functions
    initializeApp();
});

function initializeApp() {
    // Initialize the theme toggle functionality
    initThemeToggle();
    
    // Initialize modals (login/signup)
    initModals();
    
    // Initialize authentication tabs
    initAuthTabs();
    
    // Setup user account functionality
    initializeUserAccount();
    
    // Initialize story card interactions
    initStoryInteractions();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize category filtering
    initializeCategoryFilters();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize navigation links
    initializeNavigation();
    
    // Check if user is logged in
    checkLoginStatus();
    
    // Add console log to verify script is running
    console.log("App initialization complete!");
}

function initThemeToggle() {
    console.log("Initializing theme toggle...");
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedDarkMode !== null) {
        const isDarkMode = savedDarkMode === 'true';
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
    } else if (!prefersDarkMode) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
    
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('click', toggleTheme);
        updateThemeIcon(); 
        console.log("Theme switch button initialized");
    } else {
        console.log("Theme switch button not found!");
    }
}

function toggleTheme() {
    console.log("Theme toggle clicked");
    const body = document.body;
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
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

function initModals() {
    console.log("Initializing modals...");
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    
    if (loginBtn && loginModal) {
        const closeBtn = loginModal.querySelector('.close');
        
        loginBtn.addEventListener('click', function() {
            console.log("Login button clicked");
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', function() {
            console.log("Modal close button clicked");
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        console.log("Modal buttons initialized");
    } else {
        console.log("Login button or modal not found!", 
                   "loginBtn exists:", !!loginBtn, 
                   "loginModal exists:", !!loginModal);
    }
}

function initAuthTabs() {
    console.log("Initializing auth tabs...");
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    if (authTabs.length > 0 && authForms.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                console.log("Auth tab clicked:", this.getAttribute('data-tab'));
                authTabs.forEach(t => t.classList.remove('active'));
                authForms.forEach(f => f.classList.remove('active'));
                
                this.classList.add('active');
                
                const formId = this.getAttribute('data-tab') + '-form';
                const formElement = document.getElementById(formId);
                if (formElement) {
                    formElement.classList.add('active');
                } else {
                    console.log("Form element not found:", formId);
                }
            });
        });
        console.log("Auth tabs initialized");
    } else {
        console.log("Auth tabs or forms not found!");
    }
}

function initializeUserAccount() {
    console.log("Initializing user account functionality...");
    
    const createAccountBtn = document.getElementById("createAccountBtn");
    if (createAccountBtn) {
        createAccountBtn.addEventListener("click", function() {
            console.log("Create account button clicked");
            const name = document.getElementById("new-name").value.trim();
            const email = document.getElementById("new-email").value.trim();
            const password = document.getElementById("new-password").value.trim();

            if (!name || !email || !password) {
                showNotification("Please fill out all fields.");
                return;
            }

            localStorage.setItem(`user_${email}`, JSON.stringify({ name, password }));
            showNotification("Account created! You can now sign in.");
            
            const loginTab = document.querySelector('.auth-tab[data-tab="login"]');
            if (loginTab) {
                loginTab.click();
            }
        });
        console.log("Create account button initialized");
    } else {
        console.log("Create account button not found!");
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const signinButton = loginForm.querySelector('.btn');
        if (signinButton) {
            signinButton.addEventListener('click', function() {
                console.log("Sign in button clicked");
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
            console.log("Sign in button initialized");
        } else {
            console.log("Sign in button not found!");
        }
    } else {
        console.log("Login form not found!");
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            console.log("Logout button clicked");
            localStorage.removeItem("loggedInUser");
            showNotification("You have been signed out.");
            checkLoginStatus();
        });
        console.log("Logout button initialized");
    } else {
        console.log("Logout button not found!");
    }
}

function initStoryInteractions() {
    console.log("Initializing story interactions...");
    
    const startReadingBtn = document.querySelector('.cta-button');
    if (startReadingBtn) {
        startReadingBtn.addEventListener('click', function() {
            console.log("Start Reading button clicked");
            scrollToSection('.featured-stories');
        });
        console.log("Start Reading button initialized");
    } else {
        console.log("Start Reading button not found!");
    }

    const storyCards = document.querySelectorAll('.story-card');
    if (storyCards.length > 0) {
        storyCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                console.log("Story card clicked:", index);
                const storyTitle = this.querySelector('h3').textContent.trim();
                const storyId = storyTitle.toLowerCase().replace(/\s+/g, '-');
                
                console.log(`Navigating to: stories/${storyId}.html`);
                // Commented out to prevent actual navigation during testing
                // window.location.href = `stories/${storyId}.html`;
                
                // Instead, show a notification
                showNotification(`Would navigate to: ${storyId}`);
            });
        });
        console.log("Story cards initialized:", storyCards.length);
    } else {
        console.log("No story cards found!");
    }
}

function initializeSearch() {
    console.log("Initializing search functionality...");
    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchForm = document.getElementById('search-form');
    
    if (!searchInput || !searchResults || !searchForm) {
        console.log("Search elements not found!");
        return;
    }

    // Add CSS styles for search results
    addSearchResultsStyles();

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Search form submitted");
        performSearch();
    });
    
    searchInput.addEventListener('input', function() {
        if (searchInput.value.length > 2) {
            performSearch();
        } else {
            searchResults.innerHTML = '';
            searchResults.classList.add('hidden');
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            searchResults.innerHTML = '';
            searchResults.classList.add('hidden');
            return;
        }
        
        console.log("Performing search for:", query);
        
        // Get all stories from the page
        const allStories = Array.from(document.querySelectorAll('.story-card'));
        const matchingStories = allStories.filter(story => {
            const title = story.querySelector('h3').textContent.toLowerCase();
            const description = story.querySelector('p').textContent.toLowerCase();
            const category = story.querySelector('.story-meta span:last-child').textContent.toLowerCase();
            
            return title.includes(query) || description.includes(query) || category.includes(query);
        });
        
        // Display results
        searchResults.innerHTML = '';
        if (matchingStories.length > 0) {
            console.log("Found matching stories:", matchingStories.length);
            matchingStories.forEach(story => {
                const title = story.querySelector('h3').textContent;
                const imageEl = story.querySelector('img');
                const image = imageEl ? imageEl.src : '/api/placeholder/400/320';
                const category = story.querySelector('.story-meta span:last-child').textContent.trim();
                
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <img src="${image}" alt="${title}">
                    <div class="search-result-info">
                        <h4>${title}</h4>
                        <span>${category}</span>
                    </div>
                `;
                
                resultItem.addEventListener('click', function() {
                    console.log("Search result clicked:", title);
                    story.click(); // Trigger the same behavior as clicking the story card
                });
                
                searchResults.appendChild(resultItem);
            });
            searchResults.classList.remove('hidden');
        } else {
            console.log("No matching stories found");
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No stories found matching your search.';
            searchResults.appendChild(noResults);
            searchResults.classList.remove('hidden');
        }
    }
    
    console.log("Search functionality initialized");
}

function initializeCategoryFilters() {
    console.log("Initializing category filters...");
    
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards.length === 0) {
        console.log("No category cards found!");
        return;
    }
    
    // Create category results section if it doesn't exist
    let categorySection = document.getElementById('category-results');
    if (!categorySection) {
        categorySection = createCategoryResultsSection();
    }
    
    categoryCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Category card clicked:", index);
            
            const category = this.querySelector('h3').textContent.trim();
            console.log("Selected category:", category);
            
            const storyCards = document.querySelectorAll('.story-card');
            
            // Update category section title
            categorySection.querySelector('h2').textContent = category + ' Stories';
            
            // Filter stories by category
            const filteredStories = Array.from(storyCards).filter(story => {
                const storyCategory = story.querySelector('.story-meta span:last-child').textContent.trim();
                return storyCategory.includes(category);
            });
            
            console.log("Filtered stories:", filteredStories.length);
            
            // Update story grid
            const storyGrid = categorySection.querySelector('.story-grid');
            storyGrid.innerHTML = '';
            
            if (filteredStories.length > 0) {
                filteredStories.forEach(story => {
                    const clonedStory = story.cloneNode(true);
                    storyGrid.appendChild(clonedStory);
                    
                    // Add click event to the cloned story
                    clonedStory.addEventListener('click', function() {
                        const storyTitle = this.querySelector('h3').textContent.trim();
                        const storyId = storyTitle.toLowerCase().replace(/\s+/g, '-');
                        console.log(`Would navigate to: stories/${storyId}.html`);
                        showNotification(`Would navigate to: ${storyId}`);
                    });
                });
            } else {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = 'No stories found in this category.';
                storyGrid.appendChild(noResults);
            }
            
            // Show the section and scroll to it
            categorySection.classList.remove('hidden');
            scrollToSection('#category-results');
        });
    });
    
    console.log("Category filters initialized:", categoryCards.length);
    
    function createCategoryResultsSection() {
        console.log("Creating category results section");
        const main = document.querySelector('main');
        const section = document.createElement('section');
        section.id = 'category-results';
        section.className = 'category-results';
        section.classList.add('hidden'); // Start hidden
        
        section.innerHTML = `
            <div class="section-header">
                <h2>Category Stories</h2>
                <button class="back-to-all" id="back-to-all">
                    <i class="fas fa-arrow-left"></i> Back to All
                </button>
            </div>
            <div class="story-grid"></div>
        `;
        
        main.appendChild(section);
        
        const backBtn = document.getElementById('back-to-all');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                console.log("Back to all button clicked");
                section.classList.add('hidden');
                scrollToSection('.categories');
            });
        }
        
        return section;
    }
}

function initializeScrollAnimations() {
    console.log("Initializing scroll animations...");
    
    if (window.innerWidth >= 768) {
        const storyCards = document.querySelectorAll('.story-card');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            storyCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.transitionDelay = `${index * 0.1}s`;
                
                observer.observe(card);
            });
            
            console.log("Scroll animations initialized for", storyCards.length, "cards");
        } else {
            console.log("IntersectionObserver not supported");
            // Fallback for browsers that don't support IntersectionObserver
            storyCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }
    } else {
        console.log("Screen too small for scroll animations");
    }
}

function initializeNavigation() {
    console.log("Initializing navigation...");
    
    // Handle 'Categories' link
    const categoryLink = document.querySelector('nav ul li:nth-child(2) a');
    if (categoryLink) {
        categoryLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Categories link clicked");
            scrollToSection('.categories');
        });
    }
    
    // Handle 'New Releases' link
    const newReleasesLink = document.querySelector('nav ul li:nth-child(3) a');
    if (newReleasesLink) {
        newReleasesLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("New Releases link clicked");
            scrollToSection('.trending-now');
        });
    }
    
    // Handle 'See All' links
    const seeAllLinks = document.querySelectorAll('.see-all');
    seeAllLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("See All link clicked:", index);
            const parentSection = this.closest('section');
            if (parentSection.classList.contains('featured-stories')) {
                scrollToSection('.featured-stories');
            } else if (parentSection.classList.contains('trending-now')) {
                scrollToSection('.trending-now');
            }
        });
    });
    
    console.log("Navigation initialized");
}

function scrollToSection(selector) {
    console.log("Scrolling to section:", selector);
    const section = document.querySelector(selector);
    if (section) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    } else {
        console.log("Section not found:", selector);
    }
}

function checkLoginStatus() {
    console.log("Checking login status...");
    const loggedInUser = localStorage.getItem("loggedInUser");
    const welcomeUser = document.getElementById("welcomeUser");
    const userNameSpan = document.getElementById("userName");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!welcomeUser || !userNameSpan || !loginBtn || !logoutBtn) {
        console.log("Login UI elements not found!");
        return;
    }

    if (loggedInUser) {
        try {
            const user = JSON.parse(loggedInUser);
            welcomeUser.classList.remove("hidden");
            userNameSpan.textContent = user.name;
            loginBtn.classList.add("hidden");
            logoutBtn.classList.remove("hidden");
            console.log("User is logged in:", user.name);
        } catch (e) {
            console.log("Error parsing logged in user:", e);
            localStorage.removeItem("loggedInUser");
        }
    } else {
        welcomeUser.classList.add("hidden");
        userNameSpan.textContent = "";
        loginBtn.classList.remove("hidden");
        logoutBtn.classList.add("hidden");
        console.log("No user is logged in");
    }
}

function showNotification(message) {
    console.log("Showing notification:", message);
    
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        document.body.removeChild(existingNotification);
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
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
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function addSearchResultsStyles() {
    console.log("Adding search results styles");
    const styleId = 'search-results-styles';
    
    // Check if styles already exist
    if (document.getElementById(styleId)) {
        return;
    }
    
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--card-bg, #1a2234);
            border-radius: 0 0 12px 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            z-index: 100;
            max-height: 400px;
            overflow-y: auto;
            padding: 10px;
        }
        
        .search-container {
            position: relative;
        }
        
        .search-input-wrapper {
            position: relative;
            z-index: 101;
        }
        
        .search-result-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .search-result-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .search-result-item img {
            width: 50px;
            height: 50px;
            border-radius: 6px;
            object-fit: cover;
            margin-right: 10px;
        }
        
        .search-result-info h4 {
            margin: 0 0 5px 0;
            font-size: 14px;
        }
        
        .search-result-info span {
            font-size: 12px;
            opacity: 0.8;
        }
        
        .no-results {
            padding: 15px;
            text-align: center;
            opacity: 0.7;
        }
        
        .hidden {
            display: none !important;
        }
        
        .category-results {
            margin: 40px 0;
        }
        
        #back-to-all {
            background: none;
            border: none;
            color: var(--primary-color, #8B5Cf6);
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .notification {
            z-index: 1000;
            font-size: 14px;
        }
    `;
    
    document.head.appendChild(styleEl);
}

// Search functionality for Talevo

// Define stories database for search
const storiesDatabase = [
  {
    id: 'space-explorer',
    title: 'Space Explorer',
    description: 'Navigate the unknown cosmos and discover alien civilizations.',
    category: 'Sci-Fi',
    rating: 4.8
  },
  {
    id: 'midnight-chronicles',
    title: 'Midnight Chronicles',
    description: 'Supernatural mysteries await in this thrilling adventure.',
    category: 'Mystery',
    rating: 4.6
  },
  {
    id: 'digital-dreamscape',
    title: 'Digital Dreamscape',
    description: 'Enter a virtual world where reality and fantasy blur.',
    category: 'Cyberpunk',
    rating: 4.9
  },
  {
    id: 'last-kingdom',
    title: 'Last Kingdom',
    description: 'A medieval fantasy where your choices determine the fate of kingdoms.',
    category: 'Fantasy',
    rating: 4.7
  },
  {
    id: 'ocean-depths',
    title: 'Ocean Depths',
    description: 'Explore underwater civilizations and ancient secrets.',
    category: 'Adventure',
    rating: 4.5
  },
  {
    id: 'ghost-town',
    title: 'Ghost Town',
    description: 'Unravel the mysteries of an abandoned city with a dark past.',
    category: 'Horror',
    rating: 4.8
  },
  {
    id: 'time-travelers',
    title: 'Time Travelers',
    description: 'Journey through different eras and change the course of history.',
    category: 'Sci-Fi',
    rating: 4.7
  }
];

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
  initSearchFunctionality();
});

function initSearchFunctionality() {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  // Show results when user types in search
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    if (query.length >= 2) {
      // Filter stories that match the query
      const results = storiesDatabase.filter(story => {
        return story.title.toLowerCase().includes(query) || 
               story.description.toLowerCase().includes(query) ||
               story.category.toLowerCase().includes(query);
      });
      
      displaySearchResults(results, searchResults);
      searchResults.classList.remove('hidden');
    } else {
      searchResults.innerHTML = '';
      searchResults.classList.add('hidden');
    }
  });
  
  // Handle form submission (prevent default)
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length >= 2) {
      // Filter stories that match the query
      const results = storiesDatabase.filter(story => {
        return story.title.toLowerCase().includes(query) || 
               story.description.toLowerCase().includes(query) ||
               story.category.toLowerCase().includes(query);
      });
      
      displaySearchResults(results, searchResults);
      searchResults.classList.remove('hidden');
    }
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchForm.contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });
  
  // Focus back on search input when clicking on the search container
  searchForm.addEventListener('click', function(e) {
    if (e.target.closest('.search-input-wrapper')) {
      searchInput.focus();
      if (searchInput.value.length >= 2) {
        searchResults.classList.remove('hidden');
      }
    }
  });
}

// Display search results
function displaySearchResults(results, container) {
  container.innerHTML = '';
  
  if (results.length === 0) {
    container.innerHTML = '<div class="no-results">No stories found</div>';
    return;
  }
  
  results.forEach(story => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    
    resultItem.innerHTML = `
      <h4>${story.title}</h4>
      <p>${story.description.substring(0, 60)}${story.description.length > 60 ? '...' : ''}</p>
      <div class="result-meta">
        <span><i class="fas fa-book-open"></i> ${story.category}</span>
        <span><i class="fas fa-star"></i> ${story.rating}</span>
      </div>
    `;
    
    // Add click event to navigate to story page
    resultItem.addEventListener('click', function() {
      window.location.href = `${story.id}.html`;
    });
    
    container.appendChild(resultItem);
  });
}

// Add this function to existing initialization
document.addEventListener('DOMContentLoaded', function() {
  // Existing init code...
  
  // Initialize search functionality
  initSearchFunctionality();
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.key === "F12") {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'j')) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
    }
});

