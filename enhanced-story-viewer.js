/**
 * Enhanced Story Viewer
 * Handles interactive story navigation and choices
 */
class EnhancedStoryViewer {
  constructor(storyId) {
    this.storyId = storyId;
    this.currentChapter = 'chapter-1';
    this.chapterHistory = [];
    this.readTimes = {
      'chapter-1': 3, 
      'chapter-2a': 4,
      'chapter-2b': 4,
      'chapter-2c': 4,
      // Additional chapters would be defined here
    };
    
    // Path counts for each chapter
    this.pathCounts = {
      'chapter-1': 3,
      'chapter-2a': 3,
      'chapter-2b': 3,
      'chapter-2c': 3,
      // Additional chapters would be defined here
    };
  }

  /**
   * Initialize the story viewer and set up event listeners
   */
  loadStory() {
    this.setupChoiceListeners();
    this.setupBackButton();
    this.setupRestartButtons();
    this.setupShareButtons();
    this.updateProgress(10); // Start at 10% progress
    this.updateStats();
  }

  /**
   * Set up event listeners for story choice buttons
   */
  setupChoiceListeners() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    
    choiceButtons.forEach(button => {
      button.addEventListener('click', () => {
        const nextChapter = button.getAttribute('data-next');
        
        if (nextChapter) {
          this.navigateToChapter(nextChapter);
        }
      });
    });
  }

  /**
   * Set up back button functionality
   */
  setupBackButton() {
    const backBtn = document.getElementById('backBtn');
    
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (this.chapterHistory.length > 0) {
          const previousChapter = this.chapterHistory.pop();
          this.navigateToChapter(previousChapter, true);
        } else {
          // If no history, go back to main page
          window.location.href = 'index.html';
        }
      });
    }
  }

  /**
   * Set up restart buttons at the end of story paths
   */
  setupRestartButtons() {
    const restartButtons = document.querySelectorAll('.restart-btn');
    
    restartButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.restartStory();
      });
    });
  }

  /**
   * Set up share buttons at the end of story paths
   */
  setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.shareStory();
      });
    });
  }

  /**
   * Navigate to a specific chapter
   * @param {string} chapterId - The ID of the chapter to navigate to
   * @param {boolean} isBack - Whether this is a back navigation
   */
  navigateToChapter(chapterId, isBack = false) {
    // Hide current chapter
    const currentChapterElement = document.getElementById(this.currentChapter);
    if (currentChapterElement) {
      currentChapterElement.classList.add('hidden');
    }
    
    // Show new chapter
    const nextChapterElement = document.getElementById(chapterId);
    if (nextChapterElement) {
      nextChapterElement.classList.remove('hidden');
      
      // Scroll to top of new chapter
      window.scrollTo(0, 0);
      
      // Add to history unless going back
      if (!isBack) {
        this.chapterHistory.push(this.currentChapter);
      }
      
      this.currentChapter = chapterId;
      
      // Update progress based on chapter level
      this.updateProgressFromChapter(chapterId);
      
      // Update chapter statistics
      this.updateStats();
      
      // Set up new choice listeners if needed
      this.setupChoiceListeners();
      this.setupRestartButtons();
      this.setupShareButtons();
    } else {
      console.error(`Chapter ${chapterId} not found`);
    }
  }

  /**
   * Update the progress bar based on current chapter
   * @param {string} chapterId - Current chapter ID
   */
  updateProgressFromChapter(chapterId) {
    // Extract chapter level from ID (e.g., chapter-2a -> 2)
    const levelMatch = chapterId.match(/chapter-(\d+)/);
    
    if (levelMatch && levelMatch[1]) {
      const level = parseInt(levelMatch[1]);
      // Calculate progress percentage based on level
      // Assuming 5 levels total (adjust as needed)
      const progressPercentage = Math.min((level / 5) * 100, 100);
      this.updateProgress(progressPercentage);
    }
  }

  /**
   * Update progress bar
   * @param {number} percentage - Progress percentage (0-100)
   */
  updateProgress(percentage) {
    const progressBar = document.querySelector('.progress');
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }
  }

  /**
   * Update the story statistics
   */
  updateStats() {
    // Extract chapter level from ID (e.g., chapter-2a -> 2)
    const levelMatch = this.currentChapter.match(/chapter-(\d+)/);
    const level = levelMatch && levelMatch[1] ? parseInt(levelMatch[1]) : 1;
    
    // Update chapter counter
    const chapterCounter = document.getElementById('chapter-counter');
    if (chapterCounter) {
      const totalChapters = this.storyId === 'space-explorer' ? 12 : 10;
      chapterCounter.textContent = `Chapter ${level}/${totalChapters}`;
    }
    
    // Update read time
    const readTime = document.getElementById('read-time');
    if (readTime) {
      const minutes = this.readTimes[this.currentChapter] || 3;
      readTime.textContent = `${minutes} min read`;
    }
    
    // Update paths available
    const pathsAvailable = document.getElementById('paths-available');
    if (pathsAvailable) {
      const paths = this.pathCounts[this.currentChapter] || 0;
      if (paths > 0) {
        pathsAvailable.textContent = `${paths} paths available`;
      } else {
        pathsAvailable.textContent = 'Story path complete';
      }
    }
  }

  /**
   * Restart the story from the beginning
   */
  restartStory() {
    this.chapterHistory = [];
    this.navigateToChapter('chapter-1');
    this.updateProgress(10); // Reset progress
  }

  /**
   * Share the current story path
   */
  shareStory() {
    // This would be implemented with actual sharing functionality
    alert(`Share your ${this.storyId} adventure with friends!`);
    
    // In a real implementation, this might create a unique URL 
    // that encodes the path taken through the story
  }
}
