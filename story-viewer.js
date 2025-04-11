// story-viewer.js - Handles loading and displaying interactive stories

class StoryViewer {
    constructor(storyId) {
        this.storyId = storyId;
        this.currentChapterId = null;
        this.storyData = null;
        this.userChoices = [];
        this.storyContainer = document.querySelector('.story-content');
        this.progressBar = document.querySelector('.progress');
        this.chapterCounter = document.querySelector('.stat-item:first-child span');
        this.pathCounter = document.querySelector('.stat-item:last-child span');
        this.readTimeElement = document.querySelector('.stat-item:nth-child(2) span');
    }

    async loadStory() {
        try {
            // Fetch story data from the JSON file
            const response = await fetch(`/stories/${this.storyId}.json`);
            if (!response.ok) {
                throw new Error('Story not found');
            }
            
            this.storyData = await response.json();
            
            // Set the story title
            document.querySelector('.story-title').textContent = this.storyData.title;
            
            // Start from the first chapter
            this.navigateToChapter(this.storyData.startingChapterId);
            
            // Set up event listener for the bookmark button
            this.setupBookmarkButton();
            
            return true;
        } catch (error) {
            console.error('Error loading story:', error);
            this.showErrorMessage('Could not load the story. Please try again later.');
            return false;
        }
    }
    
    navigateToChapter(chapterId) {
        if (!this.storyData.chapters[chapterId]) {
            console.error(`Chapter ${chapterId} not found`);
            return;
        }
        
        // Save current chapter id
        this.currentChapterId = chapterId;
        
        // Track this choice in history
        this.userChoices.push(chapterId);
        
        // Get the chapter data
        const chapter = this.storyData.chapters[chapterId];
        
        // Clear current content
        this.storyContainer.innerHTML = '';
        
        // Create chapter element
        const chapterElement = document.createElement('div');
        chapterElement.className = 'story-chapter';
        chapterElement.id = `chapter-${chapterId}`;
        
        // Add chapter image
        const imageUrl = this.getChapterImageUrl(chapter);
        chapterElement.innerHTML = `
            <div class="chapter-image">
                <img src="${imageUrl}" alt="${chapter.title}" class="chapter-img">
            </div>
            <h2 class="chapter-title">${chapter.title}</h2>
            <div class="chapter-text">
                ${this.formatChapterText(chapter.text)}
            </div>
        `;
        
        // Add choices if there are any
        if (chapter.choices && chapter.choices.length > 0) {
            const choicesElement = document.createElement('div');
            choicesElement.className = 'story-choices';
            choicesElement.innerHTML = `
                <h3>${chapter.choicePrompt || 'What will you do?'}</h3>
                <div class="choice-options"></div>
            `;
            
            const choiceOptions = choicesElement.querySelector('.choice-options');
            
            chapter.choices.forEach(choice => {
                const choiceButton = document.createElement('button');
                choiceButton.className = 'choice-btn';
                choiceButton.textContent = choice.text;
                choiceButton.setAttribute('data-next', choice.nextChapter);
                
                // Add event listener to navigate to the next chapter
                choiceButton.addEventListener('click', () => {
                    this.navigateToChapter(choice.nextChapter);
                    
                    // Smooth scroll to top
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
                
                choiceOptions.appendChild(choiceButton);
            });
            
            chapterElement.appendChild(choicesElement);
        } else if (chapter.ending) {
            // This is an ending
            const endingElement = document.createElement('div');
            endingElement.className = 'story-ending';
            endingElement.innerHTML = `
                <div class="ending-badge">${chapter.ending.type} Ending</div>
                <p>${chapter.ending.text}</p>
                <div class="ending-actions">
                    <button class="btn btn-primary restart-btn">Start Over</button>
                    <button class="btn btn-secondary home-btn">Back to Stories</button>
                </div>
            `;
            
            // Add event listeners for ending buttons
            endingElement.querySelector('.restart-btn').addEventListener('click', () => {
                this.restart();
            });
            
            endingElement.querySelector('.home-btn').addEventListener('click', () => {
                window.location.href = 'index.html';
            });
            
            chapterElement.appendChild(endingElement);
        }
        
        // Add to the DOM
        this.storyContainer.appendChild(chapterElement);
        
        // Update progress bar
        this.updateProgress();
        
        // Add nightsky effect to images with star overlay
        this.applyStarEffect();
        
        // Apply animations
        setTimeout(() => {
            chapterElement.classList.add('active');
        }, 10);
    }
    
    // Format text with paragraphs
    formatChapterText(text) {
        if (Array.isArray(text)) {
            return text.map(paragraph => `<p>${paragraph}</p>`).join('');
        } else {
            return `<p>${text}</p>`;
        }
    }
    
    // Get the appropriate image for this chapter
    getChapterImageUrl(chapter) {
        if (chapter.image) {
            return `/images/stories/${this.storyId}/${chapter.image}`;
        } else {
            // If no specific image is provided, use a placeholder
            return `/api/placeholder/800/400?text=${encodeURIComponent(chapter.title)}`;
        }
    }
    
    // Update the progress bar and counters
    updateProgress() {
        const totalChapters = Object.keys(this.storyData.chapters).length;
        const currentChapterNumber = this.userChoices.length;
        const progressPercentage = (currentChapterNumber / this.storyData.totalChapters) * 100;
        
        this.progressBar.style.width = `${progressPercentage}%`;
        this.chapterCounter.textContent = `Chapter ${currentChapterNumber}/${this.storyData.totalChapters}`;
        
        const currentChapter = this.storyData.chapters[this.currentChapterId];
        if (currentChapter.choices) {
            this.pathCounter.textContent = `${currentChapter.choices.length} paths available`;
        } else {
            this.pathCounter.textContent = `Story ending`;
        }
        
        // Update read time
        const wordsPerMinute = 200; // Average reading speed
        const chapterWords = this.countWords(currentChapter);
        const readTimeMinutes = Math.ceil(chapterWords / wordsPerMinute);
        this.readTimeElement.textContent = `${readTimeMinutes} min read`;
    }
    
    // Count words in a chapter
    countWords(chapter) {
        let text = '';
        if (Array.isArray(chapter.text)) {
            text = chapter.text.join(' ');
        } else {
            text = chapter.text;
        }
        
        // Add choice text if present
        if (chapter.choices) {
            chapter.choices.forEach(choice => {
                text += ' ' + choice.text;
            });
        }
        
        return text.split(/\s+/).length;
    }
    
    // Restart the story
    restart() {
        this.userChoices = [];
        this.navigateToChapter(this.storyData.startingChapterId);
    }
    
    // Setup bookmark button
    setupBookmarkButton() {
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        if (bookmarkBtn) {
            // Check if story is already bookmarked
            const bookmarks = this.getBookmarks();
            const isBookmarked = bookmarks.includes(this.storyId);
            
            if (isBookmarked) {
                const icon = bookmarkBtn.querySelector('i');
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
            
            bookmarkBtn.addEventListener('click', () => {
                this.toggleBookmark();
            });
        }
    }
    
    // Toggle bookmark status
    toggleBookmark() {
        const bookmarks = this.getBookmarks();
        const icon = document.querySelector('#bookmarkBtn i');
        
        if (bookmarks.includes(this.storyId)) {
            // Remove bookmark
            const index = bookmarks.indexOf(this.storyId);
            bookmarks.splice(index, 1);
            localStorage.setItem('storyverse_bookmarks', JSON.stringify(bookmarks));
            
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.showNotification('Story removed from your bookmarks');
        } else {
            // Add bookmark
            bookmarks.push(this.storyId);
            localStorage.setItem('storyverse_bookmarks', JSON.stringify(bookmarks));
            
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.showNotification('Story saved to your bookmarks');
        }
    }
    
    // Get bookmarks from localStorage
    getBookmarks() {
        const bookmarksJSON = localStorage.getItem('storyverse_bookmarks');
        if (bookmarksJSON) {
            return JSON.parse(bookmarksJSON);
        }
        return [];
    }
    
    // Show notification
    showNotification(message) {
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
    
    // Apply star effect to images
    applyStarEffect() {
        const chapterImage = document.querySelector('.chapter-img');
        if (!chapterImage) return;
        
        // Create a canvas overlay for stars
        const overlay = document.createElement('div');
        overlay.className = 'star-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.pointerEvents = 'none';
        
        // Add stars
        const starCount = 20;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'floating-star';
            const size = Math.random() * 2 + 1;
            
            star.style.position = 'absolute';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.backgroundColor = 'white';
            star.style.borderRadius = '50%';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            
            overlay.appendChild(star);
        }
        
        // Add overlay to image container
        chapterImage.parentElement.style.position = 'relative';
        chapterImage.parentElement.appendChild(overlay);
    }
    
    // Show error message
    showErrorMessage(message) {
        this.storyContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="window.location.href='index.html'">
                    Back to Home
                </button>
            </div>
        `;
    }
}

// Initialize story viewer when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Get story ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('id');
    
    if (storyId) {
        const viewer = new StoryViewer(storyId);
        await viewer.loadStory();
    } else {
        // If no story ID provided, redirect to home page
        window.location.href = 'index.html';
    }
    
    // Setup back button
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});
