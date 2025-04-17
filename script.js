// // Main initialization
// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize application elements
//     initializeApp();
// });

// // Initialize application
// function initializeApp() {
//     // Initialize theme toggle
//     initThemeToggle();
    
//     // Initialize modals
//     initModals();
    
//     // Initialize auth tabs if they exist
//     initAuthTabs();
    
//     // Initialize story interactions
//     initStoryInteractions();
    
//     // Animation on scroll
//     initializeScrollAnimations();
// }

// // Theme handling
// function initThemeToggle() {
//     // Set initial theme based on user preference or saved setting
//     const savedDarkMode = localStorage.getItem('darkMode');
//     const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     if (savedDarkMode !== null) {
//         // Use saved setting if available
//         const isDarkMode = savedDarkMode === 'true';
//         document.body.classList.toggle('dark-mode', isDarkMode);
//         document.body.classList.toggle('light-mode', !isDarkMode);
//     } else if (!prefersDarkMode) {
//         // Use system preference as fallback
//         document.body.classList.remove('dark-mode');
//         document.body.classList.add('light-mode');
//     }
    
//     // Add event listener to theme switch button
//     const themeSwitch = document.getElementById('theme-switch');
//     if (themeSwitch) {
//         themeSwitch.addEventListener('click', toggleTheme);
//         updateThemeIcon(); // Set initial icon state
//     }
// }

// function toggleTheme() {
//     const body = document.body;
    
//     if (body.classList.contains('dark-mode')) {
//         body.classList.remove('dark-mode');
//         body.classList.add('light-mode');
//     } else {
//         body.classList.remove('light-mode');
//         body.classList.add('dark-mode');
//     }
    
//     // Save preference to localStorage
//     const isDarkMode = body.classList.contains('dark-mode');
//     localStorage.setItem('darkMode', isDarkMode);
    
//     updateThemeIcon();
// }

// function updateThemeIcon() {
//     const themeIcon = document.querySelector('#theme-switch i');
//     if (!themeIcon) return;
    
//     if (document.body.classList.contains('dark-mode')) {
//         themeIcon.className = 'fas fa-moon';
//     } else {
//         themeIcon.className = 'fas fa-sun';
//     }
// }

// // Modal handling
// function initModals() {
//     // Login modal
//     const loginBtn = document.getElementById('loginBtn');
//     const loginModal = document.getElementById('loginModal');
    
//     if (loginBtn && loginModal) {
//         const closeBtn = loginModal.querySelector('.close');
        
//         loginBtn.addEventListener('click', function() {
//             loginModal.style.display = 'block';
//             document.body.style.overflow = 'hidden';
//         });
        
//         closeBtn.addEventListener('click', function() {
//             loginModal.style.display = 'none';
//             document.body.style.overflow = 'auto';
//         });
        
//         // Close when clicking outside the modal
//         window.addEventListener('click', function(event) {
//             if (event.target === loginModal) {
//                 loginModal.style.display = 'none';
//                 document.body.style.overflow = 'auto';
//             }
//         });
//     }
// }

// // Auth tab handling
// function initAuthTabs() {
//     const authTabs = document.querySelectorAll('.auth-tab');
//     const authForms = document.querySelectorAll('.auth-form');
    
//     if (authTabs.length > 0 && authForms.length > 0) {
//         authTabs.forEach(tab => {
//             tab.addEventListener('click', function() {
//                 // Remove active class from all tabs and forms
//                 authTabs.forEach(t => t.classList.remove('active'));
//                 authForms.forEach(f => f.classList.remove('active'));
                
//                 // Add active class to the clicked tab
//                 this.classList.add('active');
                
//                 // Show corresponding form
//                 const formId = this.getAttribute('data-tab') + '-form';
//                 document.getElementById(formId).classList.add('active');
//             });
//         });
//     }
// }

// // Story interactions
// function initStoryInteractions() {
//     // Set up "Start Reading" button
//     const startReadingBtn = document.querySelector('.cta-button');
//     if (startReadingBtn) {
//         startReadingBtn.addEventListener('click', function () {
//             // const featuredSection = document.querySelector('.featured-stories');
//             // if (featuredSection) {
//             //     featuredSection.scrollIntoView({ behavior: 'smooth' });
//             // }
//             const featuredSection = document.querySelector('.till');
//             if (featuredSection) {
//                 featuredSection.scrollIntoView({ behavior: 'smooth' });
//             }
//         });
//     }


//     // Make story cards clickable
//     const storyCards = document.querySelectorAll('.story-card');
//     storyCards.forEach(card => {
//         card.addEventListener('click', function() {
//             const storyTitle = this.querySelector('h3').textContent.trim();
//             // Convert the title to a kebab-case filename
//             const storyId = storyTitle.toLowerCase().replace(/\s+/g, '-');
            
//             // Navigate to the story page
//             window.location.href = `stories/${storyId}.html`;
//         });
//     });
    
//     // Story Choice Buttons - if we're on a story page
//     initStoryChoiceButtons();
// }

// function initStoryChoiceButtons() {
//     const choiceButtons = document.querySelectorAll('.choice-btn');
//     if (choiceButtons.length > 0) {
//         choiceButtons.forEach(button => {
//             button.addEventListener('click', function() {
//                 const nextChapter = this.getAttribute('data-next');
                
//                 // Hide current chapter
//                 const currentChapter = document.querySelector('.story-chapter:not(.hidden)');
//                 if (currentChapter) {
//                     currentChapter.classList.add('hidden');
                
//                     // Show next chapter
//                     const nextChapterElement = document.getElementById(nextChapter);
//                     if (nextChapterElement) {
//                         nextChapterElement.classList.remove('hidden');
//                         window.scrollTo({
//                             top: 0,
//                             behavior: 'smooth'
//                         });
                        
//                         // Update stats
//                         updateStoryStats();
//                     }
//                 }
//             });
//         });
//     }
// }

// // Update story statistics
// function updateStoryStats() {
//     const chapters = document.querySelectorAll('.story-chapter');
//     const visibleChapterIndex = Array.from(chapters).findIndex(chapter => !chapter.classList.contains('hidden'));
    
//     if (visibleChapterIndex !== -1) {
//         // Update chapter counter
//         const chapterCounter = document.getElementById('chapter-counter');
//         if (chapterCounter) {
//             chapterCounter.textContent = `Chapter ${visibleChapterIndex + 1}/${chapters.length}`;
//         }
        
//         // Update paths available
//         const pathsAvailable = document.getElementById('paths-available');
//         const currentChapter = chapters[visibleChapterIndex];
//         const choiceOptions = currentChapter.querySelectorAll('.choice-btn');
        
//         if (pathsAvailable && choiceOptions.length) {
//             pathsAvailable.textContent = `${choiceOptions.length} paths available`;
//         } else if (pathsAvailable) {
//             pathsAvailable.textContent = 'Final chapter';
//         }
//     }
// }

// // Animations
// function initializeScrollAnimations() {
//     // Only for devices that can handle it
//     if (window.innerWidth >= 768) {
//         const storyCards = document.querySelectorAll('.story-card');
        
//         // Simple appearance animation on scroll
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.style.opacity = '1';
//                     entry.target.style.transform = 'translateY(0)';
//                 }
//             });
//         }, { threshold: 0.1 });
        
//         // Set initial styles and observe
//         storyCards.forEach((card, index) => {
//             card.style.opacity = '0';
//             card.style.transform = 'translateY(20px)';
//             card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//             card.style.transitionDelay = `${index * 0.1}s`;
            
//             observer.observe(card);
//         });
//     }
// }

// // Helper functions
// function showNotification(message) {
//     // Create notification element
//     const notification = document.createElement('div');
//     notification.className = 'notification';
//     notification.textContent = message;
    
//     // Style the notification
//     notification.style.position = 'fixed';
//     notification.style.bottom = '20px';
//     notification.style.left = '50%';
//     notification.style.transform = 'translateX(-50%)';
//     notification.style.padding = '10px 20px';
//     notification.style.borderRadius = '8px';
//     notification.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff';
//     notification.style.color = document.body.classList.contains('dark-mode') ? '#e2e8f0' : '#1e293b';
//     notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
//     notification.style.zIndex = '1000';
//     notification.style.transition = 'all 0.3s ease';
//     notification.style.opacity = '0';
    
//     // Add to the DOM
//     document.body.appendChild(notification);
    
//     // Show and hide with animation
//     setTimeout(() => {
//         notification.style.opacity = '1';
//     }, 10);
    
//     setTimeout(() => {
//         notification.style.opacity = '0';
//         setTimeout(() => {
//             document.body.removeChild(notification);
//         }, 300);
//     }, 3000);
// }
// // Story navigation: Next / Prev / Start Over / Map
// document.addEventListener('DOMContentLoaded', function () {
//     const chapters = Array.from(document.querySelectorAll('.story-chapter'));
//     const nextBtn = document.getElementById('nextBtn');
//     const prevBtn = document.getElementById('prevBtn');
//     const mapBtn = document.getElementById('mapBtn');
//     const restartBtns = document.querySelectorAll('.restart-btn');

//     function getCurrentChapterIndex() {
//         return chapters.findIndex(ch => !ch.classList.contains('hidden'));
//     }

//     function showChapter(index) {
//         chapters.forEach(ch => ch.classList.add('hidden'));
//         chapters[index].classList.remove('hidden');
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     }

//     if (nextBtn) {
//         nextBtn.addEventListener('click', () => {
//             let index = getCurrentChapterIndex();
//             if (index < chapters.length - 1) {
//                 showChapter(index + 1);
//             }
//         });
//     }

//     if (prevBtn) {
//         prevBtn.addEventListener('click', () => {
//             let index = getCurrentChapterIndex();
//             if (index > 0) {
//                 showChapter(index - 1);
//             }
//         });
//     }

//     if (mapBtn) {
//         mapBtn.addEventListener('click', () => {
//             const mapChapter = document.getElementById('chapter-4h');
//             if (mapChapter) {
//                 chapters.forEach(ch => ch.classList.add('hidden'));
//                 mapChapter.classList.remove('hidden');
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//             }
//         });
//     }

//     restartBtns.forEach(btn => {
//         btn.addEventListener('click', () => {
//             showChapter(0); // Go to chapter-1
//         });
//     });
// });

// function handleSignup() {
//     const username = document.getElementById('signup-username').value;
//     const password = document.getElementById('signup-password').value;

//     if (!username || !password) {
//         alert("Please enter both username and password.");
//         return;
//     }

//     // Save to localStorage
//     localStorage.setItem(`user_${username}`, password);
//     alert("Account created! You can now sign in.");
// }

// function handleSignin() {
//     const username = document.getElementById('signin-username').value;
//     const password = document.getElementById('signin-password').value;

//     const savedPassword = localStorage.getItem(`user_${username}`);

//     if (savedPassword === password) {
//         alert("Login successful!");
//         // Redirect to homepage or dashboard
//         window.location.href = "index.html";
//     } else {
//         alert("Invalid username or password.");
//     }
// }

// // Check if user is already logged in
// function checkLoginStatus() {
//     const loggedInUser = localStorage.getItem("loggedInUser");
//     const welcomeUser = document.getElementById("welcomeUser");
//     const userNameSpan = document.getElementById("userName");
//     const loginBtn = document.getElementById("loginBtn");
//     const logoutBtn = document.getElementById("logoutBtn");

//     if (loggedInUser) {
//         const user = JSON.parse(loggedInUser);
//         welcomeUser.classList.remove("hidden");
//         userNameSpan.textContent = user.name;
//         loginBtn.classList.add("hidden");
//         logoutBtn.classList.remove("hidden");
//     } else {
//         welcomeUser.classList.add("hidden");
//         userNameSpan.textContent = "";
//         loginBtn.classList.remove("hidden");
//         logoutBtn.classList.add("hidden");
//     }
// }

// document.addEventListener("DOMContentLoaded", function() {
//     // Initialize application elements
//     initializeApp();
    
//     // Check login status
//     checkLoginStatus();

//     // Sign Up
//     const createAccountBtn = document.getElementById("createAccountBtn");
//     if (createAccountBtn) {
//         createAccountBtn.addEventListener("click", function() {
//             const name = document.getElementById("new-name").value.trim();
//             const email = document.getElementById("new-email").value.trim();
//             const password = document.getElementById("new-password").value.trim();

//             if (!name || !email || !password) {
//                 showNotification("Please fill out all fields.");
//                 return;
//             }

//             // Save to localStorage
//             localStorage.setItem(`user_${email}`, JSON.stringify({ name, password }));
//             showNotification("Account created! You can now sign in.");
            
//             // Switch to login tab
//             const loginTab = document.querySelector('.auth-tab[data-tab="login"]');
//             if (loginTab) {
//                 loginTab.click();
//             }
//         });
//     }

//     // Sign In
//     const loginForm = document.getElementById('login-form');
//     if (loginForm) {
//         const signinButton = loginForm.querySelector('.btn');
//         if (signinButton) {
//             signinButton.addEventListener('click', function() {
//                 const email = document.getElementById('email').value.trim();
//                 const password = document.getElementById('password').value.trim();

//                 if (!email || !password) {
//                     showNotification("Please enter both email and password.");
//                     return;
//                 }

//                 const userData = localStorage.getItem(`user_${email}`);
//                 if (!userData) {
//                     showNotification("No account found with this email.");
//                     return;
//                 }

//                 const parsed = JSON.parse(userData);
//                 if (parsed.password === password) {
//                     localStorage.setItem("loggedInUser", JSON.stringify({ name: parsed.name, email }));
//                     showNotification(`Welcome back, ${parsed.name}!`);
//                     document.getElementById('loginModal').style.display = 'none';
//                     document.body.style.overflow = 'auto';
//                     checkLoginStatus();
//                 } else {
//                     showNotification("Incorrect password.");
//                 }
//             });
//         }
//     }

//     // Logout
//     const logoutBtn = document.getElementById("logoutBtn");
//     if (logoutBtn) {
//         logoutBtn.addEventListener("click", function() {
//             localStorage.removeItem("loggedInUser");
//             showNotification("You have been signed out.");
//             checkLoginStatus();
//         });
//     }
// });

// let storyHistory = [];
// let currentChapter = document.querySelector('.story-chapter:not(.hidden)');

// // CHOICE NAVIGATION
// document.querySelectorAll('.choice-btn').forEach(button => {
//   button.addEventListener('click', () => {
//     if (currentChapter) {
//       storyHistory.push(currentChapter.id);
//     }
//     const nextId = button.getAttribute('data-next');
//     const next = document.getElementById(nextId);
//     if (next) {
//       document.querySelectorAll('.story-chapter').forEach(c => c.classList.add('hidden'));
//       next.classList.remove('hidden');
//       currentChapter = next;
//       updateNavButtons();
//     }
//   });
// });

// // PREV LOGIC
// document.getElementById('prev-btn')?.addEventListener('click', () => {
//   const prevId = storyHistory.pop();
//   const prev = document.getElementById(prevId);
//   if (prev) {
//     document.querySelectorAll('.story-chapter').forEach(c => c.classList.add('hidden'));
//     prev.classList.remove('hidden');
//     currentChapter = prev;
//     updateNavButtons();
//   }
// });

// // NEXT LOGIC (follows first available choice)
// document.getElementById('next-btn')?.addEventListener('click', () => {
//   const firstChoice = currentChapter?.querySelector('.choice-btn');
//   if (firstChoice) {
//     firstChoice.click();
//   }
// });

// // BUTTON VISIBILITY CONTROL
// function updateNavButtons() {
//   const isFirst = currentChapter?.id === 'chapter-1';
//   const isEnding = currentChapter?.classList.contains('story-ending');

//   document.getElementById('prev-btn')?.classList.toggle('hidden', isFirst);
//   document.getElementById('next-btn')?.classList.toggle('hidden', isEnding);
// }

document.addEventListener('DOMContentLoaded', function() {
  // Hide loader when page is fully loaded
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }
  
  // Theme toggle functionality
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme + '-mode');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.classList.add(prefersDark ? 'dark-mode' : 'light-mode');
  }
  
  if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light');
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark');
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
    
    // Set initial icon based on current theme
    if (body.classList.contains('dark-mode')) {
      themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }
  
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }
  
  // Story card hover effects with 3D tilt
  const storyCards = document.querySelectorAll('.story-card');
  
  storyCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      card.style.transform = `perspective(1000px) rotateX(${deltaY * -5}deg) rotateY(${deltaX * 5}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      card.style.transition = 'transform 0.5s ease';
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Page transition effects
  const pageTransition = document.createElement('div');
  pageTransition.classList.add('page-transition');
  document.body.appendChild(pageTransition);
  
  document.querySelectorAll('a:not([href^="#"])').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip external links or javascript links
      if (href.startsWith('http') || href.startsWith('javascript:') || href === '#') return;
      
      e.preventDefault();
      
      pageTransition.classList.add('active');
      
      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  });
  
  // Animation for section headers and cards on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.section-header, .story-card, .category-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initial animation check
  animateOnScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
  
  // Animated counting for statistics
  const stats = document.querySelectorAll('.stat-count');
  
  const animateCounter = function(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = function() {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString();
      } else {
        el.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      }
    };
    
    updateCounter();
  };
  
  // Activate counters when they come into view
  const observeStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observeStats.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => {
    observeStats.observe(stat);
  });
  
  // Dynamic background parallax effect
  const parallaxBg = document.querySelector('.hero');
  if (parallaxBg) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      parallaxBg.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
    });
  }
  
  // Typing animation for story passages
  const typingElements = document.querySelectorAll('.typing-text');
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('typing-animation');
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        element.classList.remove('typing-animation');
      }
    };
    
    typeWriter();
  });
  
  // Progress bar animation for story progress
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    const updateProgress = (percent) => {
      progressBar.style.width = `${percent}%`;
    };
    
    // Example: update progress based on story passage
    const progressValue = progressBar.getAttribute('data-progress') || 0;
    updateProgress(progressValue);
  }
  
  // Modal functionality
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalClose = document.querySelectorAll('.modal-close');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  modalClose.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.modal-backdrop');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close modal when clicking outside
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Add error message if it doesn't exist
          let errorMessage = field.parentElement.querySelector('.error-message');
          if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'This field is required';
            field.parentElement.appendChild(errorMessage);
          }
        } else {
          field.classList.remove('error');
          const errorMessage = field.parentElement.querySelector('.error-message');
          if (errorMessage) {
            errorMessage.remove();
          }
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  });
  
  // Floating label animation for form inputs
  const formInputs = document.querySelectorAll('.form-input');
  formInputs.forEach(input => {
    // Set initial state based on whether input has value
    if (input.value) {
      input.nextElementSibling?.classList.add('active');
    }
    
    input.addEventListener('focus', () => {
      input.nextElementSibling?.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.nextElementSibling?.classList.remove('active');
      }
    });
  });
  
  // Dynamic text color adjustment based on background
  const dynamicTextElements = document.querySelectorAll('.dynamic-text');
  dynamicTextElements.forEach(element => {
    const bgColor = window.getComputedStyle(element).backgroundColor;
    const rgb = bgColor.match(/\d+/g);
    
    if (rgb && rgb.length >= 3) {
      // Calculate relative luminance
      const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
      if (brightness < 128) {
        element.style.color = 'white';
      } else {
        element.style.color = 'var(--dark-text)';
      }
    }
  });
  
  // Interactive background particles
  const createParticles = () => {
    const particles = document.querySelector('.particles');
    if (!particles) return;
    
    const count = 50;
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random positioning
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration and delay
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particles.appendChild(particle);
    }
  };
  
  createParticles();
  
  // Bookmark functionality
  const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
  bookmarkButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const storyId = this.getAttribute('data-story-id');
      
      // Toggle active state
      this.classList.toggle('active');
      
      // Update bookmark text and icon
      const icon = this.querySelector('i');
      if (this.classList.contains('active')) {
        this.setAttribute('title', 'Bookmarked');
        icon.classList.replace('fa-bookmark-o', 'fa-bookmark');
        
        // Store in localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        if (!bookmarks.includes(storyId)) {
          bookmarks.push(storyId);
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
        
        // Show temporary notification
        showNotification('Story added to your bookmarks');
      } else {
        this.setAttribute('title', 'Add to bookmarks');
        icon.classList.replace('fa-bookmark', 'fa-bookmark-o');
        
        // Remove from localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        const updatedBookmarks = bookmarks.filter(id => id !== storyId);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        
        showNotification('Story removed from your bookmarks');
      }
    });
    
    // Set initial state based on localStorage
    const storyId = btn.getAttribute('data-story-id');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (bookmarks.includes(storyId)) {
      btn.classList.add('active');
      btn.setAttribute('title', 'Bookmarked');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.replace('fa-bookmark-o', 'fa-bookmark');
      }
    }
  });
  
  // Notification system
  function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <p>${message}</p>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Auto-dismiss after 4 seconds
    const dismissTimeout = setTimeout(() => {
      dismissNotification(notification);
    }, 4000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      clearTimeout(dismissTimeout);
      dismissNotification(notification);
    });
  }
  
  function dismissNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    setTimeout(() => {
      notification.remove();
    }, 300);
  }
  
  // Scroll-to-top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.classList.add('scroll-top-btn');
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  // Text highlight animation
  const highlightedText = document.querySelectorAll('.highlight-text');
  highlightedText.forEach(text => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('highlighted');
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(text);
  });
  
  // Image lazy loading
  const lazyImages = document.querySelectorAll('.lazy-image');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          img.setAttribute('src', src);
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      const src = img.getAttribute('data-src');
      img.setAttribute('src', src);
    });
  }
  
  // Initialize tooltip functionality
  const tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(tooltip => {
    const text = tooltip.getAttribute('data-tooltip');
    if (text) {
      const tooltipText = document.createElement('span');
      tooltipText.classList.add('tooltip-text');
      tooltipText.textContent = text;
      tooltip.appendChild(tooltipText);
    }
  });
});


