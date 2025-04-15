// Space Adventure Interactive Effects

document.addEventListener('DOMContentLoaded', function() {
  // Star particle background
  createStarfield();
  
  // Add event listeners to choice buttons
  setupChoiceButtons();
  
  // Add restart button functionality
  setupRestartButton();
  
  // Initialize story at first chapter (assuming it starts with the first chapter visible)
  showInitialChapter();
  
  // Add shooting stars effect
  createShootingStars();
  
  // Add hover effects to buttons
  addButtonHoverEffects();
  setupPrevNextButtons();

});

function setupPrevNextButtons() {
  document.querySelectorAll('.next-btn').forEach(button => {
    button.addEventListener('click', function () {
      const nextId = this.getAttribute('data-next');
      navigateToChapter(nextId);
    });
  });

  document.querySelectorAll('.prev-btn').forEach(button => {
    button.addEventListener('click', function () {
      const prevId = this.getAttribute('data-prev');
      navigateToChapter(prevId);
    });
  });
}

function navigateToChapter(chapterId) {
  const allChapters = document.querySelectorAll('.story-chapter');
  allChapters.forEach(chapter => {
    chapter.classList.add('hidden');
    chapter.classList.remove('active');
  });

  const target = document.getElementById(chapterId);
  if (target) {
    target.classList.remove('hidden');
    setTimeout(() => {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }
}


// Create starfield background
function createStarfield() {
  const starfield = document.createElement('div');
  starfield.className = 'space-particles';
  document.body.appendChild(starfield);
  
  // Create stars with different sizes and brightness
  for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.className = 'particle';
    
    // Random size (smaller stars are more common)
    const size = Math.random() < 0.8 ? 
                 Math.random() * 2 + 1 : 
                 Math.random() * 3 + 2;
    
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random position
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    
    // Random twinkle animation
    star.style.animationDuration = `${Math.random() * 5 + 3}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    
    // Brighter stars for larger ones
    if (size > 2) {
      star.style.boxShadow = '0 0 10px #fff, 0 0 20px #8eccff';
    }
    
    starfield.appendChild(star);
  }
}

// Setup choice buttons
function setupChoiceButtons() {
  const choiceButtons = document.querySelectorAll('.choice-btn');
  
  choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
      const nextChapterId = this.getAttribute('data-next');
      
      // Hide all chapters
      const allChapters = document.querySelectorAll('.story-chapter');
      allChapters.forEach(chapter => {
        chapter.classList.add('hidden');
        chapter.classList.remove('active');
      });
      
      // Show the next chapter
      const nextChapter = document.getElementById(nextChapterId);
      if (nextChapter) {
        nextChapter.classList.remove('hidden');
        
        // Add small delay before showing for smooth transition
        setTimeout(() => {
          nextChapter.classList.add('active');
          // Scroll to top of new chapter smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
        
        // Add transition effect
        addChapterTransition(nextChapter);
      }
    });
  });
}

// Setup restart button
function setupRestartButton() {
  const restartButtons = document.querySelectorAll('.restart-btn');
  
  restartButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Hide all chapters
      const allChapters = document.querySelectorAll('.story-chapter');
      allChapters.forEach(chapter => {
        chapter.classList.add('hidden');
        chapter.classList.remove('active');
      });
      
      // Show the first chapter (assuming it has id "chapter-1" or similar)
      showInitialChapter();
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// Show the initial chapter
function showInitialChapter() {
  // Find first chapter (you may need to adjust this selector)
  const firstChapter = document.querySelector('.story-chapter');
  if (firstChapter) {
    firstChapter.classList.remove('hidden');
    setTimeout(() => {
      firstChapter.classList.add('active');
      addChapterTransition(firstChapter);
    }, 100);
  }
}

// Add transition effect when changing chapters
function addChapterTransition(chapter) {
  // Add a subtle zoom effect to the chapter image
  const chapterImage = chapter.querySelector('.chapter-image img');
  if (chapterImage) {
    chapterImage.style.transform = 'scale(1.05)';
    setTimeout(() => {
      chapterImage.style.transform = 'scale(1)';
    }, 500);
  }
  
  // Add sequential fade-in for paragraphs
  const paragraphs = chapter.querySelectorAll('.chapter-text p');
  paragraphs.forEach((paragraph, index) => {
    paragraph.style.opacity = '0';
    setTimeout(() => {
      paragraph.style.opacity = '1';
      paragraph.style.transition = 'opacity 0.5s ease-in-out';
    }, 200 + (index * 100));
  });
}

// Create occasional shooting stars
function createShootingStars() {
  setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance of shooting star appearing
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // Random position at top of screen
      shootingStar.style.top = `${Math.random() * 30}vh`;
      shootingStar.style.left = `${Math.random() * 100}vw`;
      
      document.body.appendChild(shootingStar);
      
      // Remove after animation completes
      setTimeout(() => {
        shootingStar.remove();
      }, 1000);
    }
  }, 3000);

  // Add CSS for shooting stars if it doesn't exist
  if (!document.querySelector('#shooting-star-style')) {
    const style = document.createElement('style');
    style.id = 'shooting-star-style';
    style.textContent = `
      .shooting-star {
        position: fixed;
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
        animation: shoot 1s linear forwards;
        z-index: -1;
        pointer-events: none;
      }
      
      @keyframes shoot {
        0% {
          transform: translateX(0) translateY(0) rotate(215deg) scale(0);
          opacity: 0;
        }
        10% {
          transform: translateX(-20vw) translateY(20vh) rotate(215deg) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateX(-50vw) translateY(50vh) rotate(215deg) scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Add subtle hover effects to buttons
function addButtonHoverEffects() {
  const buttons = document.querySelectorAll('.choice-btn, .restart-btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      // Create small star burst effect on hover
      const burst = document.createElement('div');
      burst.className = 'star-burst';
      button.appendChild(burst);
      
      setTimeout(() => {
        burst.remove();
      }, 700);
    });
  });
  
  // Add CSS for star burst if it doesn't exist
  if (!document.querySelector('#star-burst-style')) {
    const style = document.createElement('style');
    style.id = 'star-burst-style';
    style.textContent = `
      .star-burst {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        background: radial-gradient(circle, rgba(142, 204, 255, 0.8) 0%, rgba(142, 204, 255, 0) 70%);
        border-radius: 50%;
        animation: burst 0.7s ease-out forwards;
        pointer-events: none;
      }
      
      @keyframes burst {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
