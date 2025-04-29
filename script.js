document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeSearch();
    initializeCategoryFilters();
});

function initializeApp() {
    initThemeToggle();
    
    initModals();
    
    initAuthTabs();
    
    initStoryInteractions();
    
    initializeScrollAnimations();
}

function initThemeToggle() {
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
        
        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

function initAuthTabs() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    if (authTabs.length > 0 && authForms.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                authTabs.forEach(t => t.classList.remove('active'));
                authForms.forEach(f => f.classList.remove('active'));
                
                this.classList.add('active');
                
                const formId = this.getAttribute('data-tab') + '-form';
                document.getElementById(formId).classList.add('active');
            });
        });
    }
}

function initStoryInteractions() {
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


    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('click', function() {
            const storyTitle = this.querySelector('h3').textContent.trim();
            const storyId = storyTitle.toLowerCase().replace(/\s+/g, '-');
            
            window.location.href = `stories/${storyId}.html`;
        });
    });
    
    initStoryChoiceButtons();
}

function initStoryChoiceButtons() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    if (choiceButtons.length > 0) {
        choiceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const nextChapter = this.getAttribute('data-next');
                
                const currentChapter = document.querySelector('.story-chapter:not(.hidden)');
                if (currentChapter) {
                    currentChapter.classList.add('hidden');
                
                    const nextChapterElement = document.getElementById(nextChapter);
                    if (nextChapterElement) {
                        nextChapterElement.classList.remove('hidden');
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                        
                        updateStoryStats();
                    }
                }
            });
        });
    }
}

function updateStoryStats() {
    const chapters = document.querySelectorAll('.story-chapter');
    const visibleChapterIndex = Array.from(chapters).findIndex(chapter => !chapter.classList.contains('hidden'));
    
    if (visibleChapterIndex !== -1) {
        const chapterCounter = document.getElementById('chapter-counter');
        if (chapterCounter) {
            chapterCounter.textContent = `Chapter ${visibleChapterIndex + 1}/${chapters.length}`;
        }
        
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

function initializeScrollAnimations() {
    if (window.innerWidth >= 768) {
        const storyCards = document.querySelectorAll('.story-card');
        
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
    }
}

function showNotification(message) {
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
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
            showChapter(0); 
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

    localStorage.setItem(`user_${username}`, password);
    alert("Account created! You can now sign in.");
}

function handleSignin() {
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    const savedPassword = localStorage.getItem(`user_${username}`);

    if (savedPassword === password) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
}

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
    initializeApp();
    
    checkLoginStatus();

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

            localStorage.setItem(`user_${email}`, JSON.stringify({ name, password }));
            showNotification("Account created! You can now sign in.");
            
            const loginTab = document.querySelector('.auth-tab[data-tab="login"]');
            if (loginTab) {
                loginTab.click();
            }
        });
    }

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
                // if (parsed.password === password) {
                //     localStorage.setItem("loggedInUser", JSON.stringify({ name: parsed.name, email }));
                //     showNotification(`Welcome back, ${parsed.name}!`);
                //     document.getElementById('loginModal').style.display = 'none';
                //     document.body.style.overflow = 'auto';
                //     checkLoginStatus();
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

document.getElementById('next-btn')?.addEventListener('click', () => {
  const firstChoice = currentChapter?.querySelector('.choice-btn');
  if (firstChoice) {
    firstChoice.click();
  }
});

function updateNavButtons() {
  const isFirst = currentChapter?.id === 'chapter-1';
  const isEnding = currentChapter?.classList.contains('story-ending');

  document.getElementById('prev-btn')?.classList.toggle('hidden', isFirst);
  document.getElementById('next-btn')?.classList.toggle('hidden', isEnding);
}


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


// New functions to add to your script.js file

function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchForm = document.getElementById('search-form');
  
  if (!searchInput || !searchResults || !searchForm) return;

  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
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
      matchingStories.forEach(story => {
        const title = story.querySelector('h3').textContent;
        const image = story.querySelector('img').src;
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
          story.click(); // Trigger the same behavior as clicking the story card
        });
        
        searchResults.appendChild(resultItem);
      });
      searchResults.classList.remove('hidden');
    } else {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.textContent = 'No stories found matching your search.';
      searchResults.appendChild(noResults);
      searchResults.classList.remove('hidden');
    }
  }
}

function initializeCategoryFilters() {
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      
      const category = this.querySelector('h3').textContent.trim();
      const storyCards = document.querySelectorAll('.story-card');
      const categorySection = document.getElementById('category-results') || createCategoryResultsSection();
      
      // Update category section title
      categorySection.querySelector('h2').textContent = category + ' Stories';
      
      // Filter stories by category
      const filteredStories = Array.from(storyCards).filter(story => {
        const storyCategory = story.querySelector('.story-meta span:last-child').textContent.trim();
        return storyCategory.includes(category);
      });
      
      // Update story grid
      const storyGrid = categorySection.querySelector('.story-grid');
      storyGrid.innerHTML = '';
      
      if (filteredStories.length > 0) {
        filteredStories.forEach(story => {
          storyGrid.appendChild(story.cloneNode(true));
        });
      } else {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No stories found in this category.';
        storyGrid.appendChild(noResults);
      }
      
      // Scroll to category section
      categorySection.scrollIntoView({ behavior: 'smooth' });
      
      // Initialize click events for the cloned story cards
      categorySection.querySelectorAll('.story-card').forEach(card => {
        card.addEventListener('click', function() {
          const storyTitle = this.querySelector('h3').textContent.trim();
          const storyId = storyTitle.toLowerCase().replace(/\\s+/g, '-');
          window.location.href = `stories/${storyId}.html`;
        });
      });
    });
  });
  
  function createCategoryResultsSection() {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.id = 'category-results';
    section.className = 'category-results';
    
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
    
    document.getElementById('back-to-all').addEventListener('click', function() {
      section.classList.add('hidden');
      document.querySelector('.featured-stories').scrollIntoView({ behavior: 'smooth' });
    });
    
    return section;
  }
}

// Fix for category filters, scrolling, and search results

// function initializeCategoryFilters() {
//   const categoryCards = document.querySelectorAll('.category-card');
  
//   // Check if category results section exists or create it once
//   let categorySection = document.getElementById('category-results');
//   if (!categorySection) {
//     categorySection = createCategoryResultsSection();
//   }
  
//   categoryCards.forEach(card => {
//     card.addEventListener('click', function(e) {
//       e.preventDefault();
      
//       const category = this.querySelector('h3').textContent.trim();
//       const storyCards = document.querySelectorAll('.story-card');
      
//       // Update category section title
//       categorySection.querySelector('h2').textContent = category + ' Stories';
      
//       // Filter stories by category
//       const filteredStories = Array.from(storyCards).filter(story => {
//         const storyCategory = story.querySelector('.story-meta span:last-child').textContent.trim();
//         return storyCategory.includes(category);
//       });
      
//       // Clear previous stories before adding new ones
//       const storyGrid = categorySection.querySelector('.story-grid');
//       storyGrid.innerHTML = '';
      
//       if (filteredStories.length > 0) {
//         filteredStories.forEach(story => {
//           const clonedStory = story.cloneNode(true);
//           storyGrid.appendChild(clonedStory);
          
//           // Add click event to the cloned story
//           clonedStory.addEventListener('click', function() {
//             const storyTitle = this.querySelector('h3').textContent.trim();
//             const storyId = storyTitle.toLowerCase().replace(/\s+/g, '-');
//             window.location.href = `stories/${storyId}.html`;
//           });
//         });
//       } else {
//         const noResults = document.createElement('div');
//         noResults.className = 'no-results';
//         noResults.textContent = 'No stories found in this category.';
//         storyGrid.appendChild(noResults);
//       }
      
//       // Make sure the section is visible
//       categorySection.classList.remove('hidden');
      
//       // Scroll to category section with an offset for the header
//       const headerHeight = document.querySelector('header').offsetHeight;
//       const sectionTop = categorySection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
//       window.scrollTo({ top: sectionTop, behavior: 'smooth' });
//     });
//   });

function initializeCategoryFilters() {
  const categoryCards = document.querySelectorAll('.category-card');
  
  // Create the modal overlay for category results
  const categoryModal = document.createElement('div');
  categoryModal.id = 'category-modal';
  categoryModal.className = 'category-modal';
  categoryModal.innerHTML = `
    <div class="category-modal-content">
      <div class="modal-header">
        <h2>Category Stories</h2>
        <button class="close-modal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="story-grid"></div>
    </div>
  `;
  document.body.appendChild(categoryModal);
  
  // Close modal when clicking the close button
  const closeModalBtn = categoryModal.querySelector('.close-modal');
  closeModalBtn.addEventListener('click', function() {
    categoryModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  });
  
  // Close modal when clicking outside the content
  categoryModal.addEventListener('click', function(e) {
    if (e.target === categoryModal) {
      categoryModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  });
  
  // Add event listeners to category cards
  categoryCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      
      const category = this.querySelector('h3').textContent.trim();
      const storyCards = document.querySelectorAll('.story-card');
      
      // Update modal title
      categoryModal.querySelector('h2').textContent = category + ' Stories';
      
      // Filter stories by category
      const filteredStories = Array.from(storyCards).filter(story => {
        const storyCategory = story.querySelector('.story-meta span:last-child').textContent.trim();
        return storyCategory.includes(category);
      });
      
      // Update story grid
      const storyGrid = categoryModal.querySelector('.story-grid');
      storyGrid.innerHTML = '';
      
      if (filteredStories.length > 0) {
        filteredStories.forEach(story => {
          const clonedStory = story.cloneNode(true);
          storyGrid.appendChild(clonedStory);
          
          // Add click event to the cloned story
          clonedStory.addEventListener('click', function() {
            const storyTitle = this.querySelector('h3').textContent.trim();
            const storyId = storyTitle.toLowerCase().replace(/\s+/g, '-');
            window.location.href = `stories/${storyId}.html`;
          });
        });
      } else {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No stories found in this category.';
        storyGrid.appendChild(noResults);
      }
      
      // Show the modal
      categoryModal.classList.add('active');
      document.body.classList.add('modal-open');
    });
  });
}
  function createCategoryResultsSection() {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.id = 'category-results';
    section.className = 'category-results';
    
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
    
    document.getElementById('back-to-all').addEventListener('click', function() {
      section.classList.add('hidden');
      scrollToSection('.categories');
    });
    
    return section;
  }
}

// Improved scrolling function
function scrollToSection(selector) {
  const section = document.querySelector(selector);
  if (section) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
  }
}

// Fix for 'Start Reading' button scrolling
function initStoryInteractions() {
  const startReadingBtn = document.querySelector('.cta-button');
  if (startReadingBtn) {
    startReadingBtn.addEventListener('click', function () {
      scrollToSection('.featured-stories');
    });
  }

  const storyCards = document.querySelectorAll('.story-card');
  storyCards.forEach(card => {
    card.addEventListener('click', function() {
      const storyTitle = this.querySelector('h3').textContent.trim();
      const storyId = storyTitle.toLowerCase().replace(/\s+/g, '-');
      
      window.location.href = `stories/${storyId}.html`;
    });
  });
  
  initStoryChoiceButtons();
}

// Improved search results display
function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchForm = document.getElementById('search-form');
  
  if (!searchInput || !searchResults || !searchForm) return;

  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
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
      matchingStories.forEach(story => {
        const title = story.querySelector('h3').textContent;
        const image = story.querySelector('img').src;
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
          story.click(); // Trigger the same behavior as clicking the story card
        });
        
        searchResults.appendChild(resultItem);
      });
      searchResults.classList.remove('hidden');
    } else {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.textContent = 'No stories found matching your search.';
      searchResults.appendChild(noResults);
      searchResults.classList.remove('hidden');
    }
  }
}

// Handle navigation links
function initializeNavigation() {
  // Handle 'Categories' link
  const categoryLink = document.querySelector('nav ul li:nth-child(2) a');
  if (categoryLink) {
    categoryLink.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToSection('.categories');
    });
  }
  
  // Handle 'New Releases' link
  const newReleasesLink = document.querySelector('nav ul li:nth-child(3) a');
  if (newReleasesLink) {
    newReleasesLink.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToSection('.trending-now');
    });
  }
  
  // Handle 'See All' links
  const seeAllLinks = document.querySelectorAll('.see-all');
  seeAllLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const parentSection = this.closest('section');
      if (parentSection.classList.contains('featured-stories')) {
        scrollToSection('.featured-stories');
      } else if (parentSection.classList.contains('trending-now')) {
        scrollToSection('.trending-now');
      }
    });
  });
}

// Add CSS fix for search results
function addSearchResultsStyles() {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .search-results {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: var(--card-bg);
      border-radius: 0 0 12px 12px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      z-index: 100;
      max-height: 400px;
      overflow-y: auto;
    }
    
    .search-container {
      position: relative;
    }
    
    .search-input-wrapper {
      position: relative;
      z-index: 101;
    }
  `;
  document.head.appendChild(styleEl);
}

document.addEventListener('DOMContentLoaded', function() {
  // Add the style first
  addSearchResultsStyles();
  
  // Initialize all components
  initializeApp();
  initializeSearch();
  initializeCategoryFilters();
  initializeNavigation();
});

// Overwrites the initializeApp to use our new function
function initializeApp() {
  initThemeToggle();
  initModals();
  initAuthTabs();
  initStoryInteractions();
  initializeScrollAnimations();
}
