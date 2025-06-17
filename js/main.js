// Global variable to hold the FullCalendar instance for the modal
let fullCalendarInstance = null;
// Global variable to track if FullCalendar script is loaded
let isFullCalendarScriptLoaded = false;

// Function to load a script dynamically
function loadScript(src, id) {
    return new Promise((resolve, reject) => {
        if (document.getElementById(id)) { // Script already exists
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.async = true; // Mark as async to not block rendering
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.appendChild(script); // Append to head or body
    });
}

// Function to initialize FullCalendar
function initializeFullCalendar(calendarElement) {
    // Define common calendar options for aesthetics (needs to be available here)
    const commonCalendarOptions = {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day'
        },
        editable: false,
        selectable: false,
        nowIndicator: true,
        dayMaxEvents: true,
        events: [
            // 🟦 Workshops
            // Example event structure (replace with your actual data)
            // {
            //     title: 'Algebraic Geometry Workshop',
            //     start: '2025-07-20',
            //     end: '2025-07-22',
            //     description: 'An intensive workshop on modern algebraic geometry.',
            //     link: 'https://example.com/workshop-details'
            // },
            // {
            //     title: 'Number Theory Seminar',
            //     start: '2025-08-15T14:00:00',
            //     description: 'Weekly seminar on recent advances in number theory.',
            //     link: 'https://example.com/seminar-details'
            // },
            // Add more events here as needed
        ]
    };

    // If fullCalendarInstance exists, destroy it before re-initializing
    if (fullCalendarInstance) {
        fullCalendarInstance.destroy();
    }

    fullCalendarInstance = new FullCalendar.Calendar(calendarElement, commonCalendarOptions);
    fullCalendarInstance.render();
}

// Global variables for modal state
let currentModalOptions = {
    allowMultipleResearchCards: false,
    directLink: null
};

// --- Modal Functions ---
function openModal(title, content, allowMultipleCards = false, directLink = null) {
    const modal = document.getElementById('researchModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalDirectLink = document.getElementById('modalDirectLink');

    modalTitle.innerHTML = title;
    modalBody.innerHTML = content;

    currentModalOptions.allowMultipleResearchCards = allowMultipleCards;
    currentModalOptions.directLink = directLink;

    if (directLink) {
        modalDirectLink.href = directLink;
        modalDirectLink.style.display = 'block'; // Show the button
        modalDirectLink.textContent = allowMultipleCards ? 'Learn More' : 'View Details';
    } else {
        modalDirectLink.style.display = 'none'; // Hide the button
    }

    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}

function closeModal() {
    const modal = document.getElementById('researchModal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    // Reset modal options
    currentModalOptions = {
        allowMultipleResearchCards: false,
        directLink: null
    };
}


// --- Accordion Logic (existing) ---
document.addEventListener('DOMContentLoaded', () => {
    // Light/Dark mode toggle logic (existing)
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            let theme = 'light-mode';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark-mode';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // Modal close button event listener
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Close modal if overlay is clicked
    const modalOverlay = document.getElementById('researchModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Event listeners for accordions to open modals or navigate directly
    document.querySelectorAll('.accordion-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        const modalOpener = item.dataset.modalOpener === 'true';
        const directLink = item.dataset.directLink === 'true';
        const learnMoreUrl = item.dataset.learnMoreUrl;

        if (header) {
            header.addEventListener('click', function() {
                if (directLink && learnMoreUrl) {
                    window.location.href = learnMoreUrl; // Navigate directly if direct-link is true
                } else if (modalOpener && learnMoreUrl) {
                    // Open modal, fetch content from learnMoreUrl (if it's a separate HTML, otherwise use static)
                    const contentElement = item.querySelector('.accordion-content');
                    if (contentElement) {
                        const title = header.textContent.trim();
                        openModal(title, contentElement.innerHTML, true, learnMoreUrl);
                    }
                } else {
                    // Default accordion behavior (toggle local content) if neither direct link nor modal opener
                    const content = item.querySelector('.accordion-content');
                    if (content) {
                        const isExpanded = header.getAttribute('aria-expanded') === 'true';
                        content.style.display = isExpanded ? 'none' : 'block';
                        header.setAttribute('aria-expanded', !isExpanded);
                    }
                }
            });

            // Accessibility: allow opening with Enter/Space key
            header.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    header.click(); // Simulate a click
                }
            });
        }
    });

    // Add event listeners for news items to open modal
    const newsItems = document.querySelectorAll('#latest-news-section .news-item');
    if (typeof newsData !== 'undefined') { // Check if newsData is defined
        newsItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const newsId = this.dataset.newsId;
                if (newsData[newsId]) {
                    const newsItem = newsData[newsId];
                    const fullContent = `
                        <p><strong>Date:</strong> ${newsItem.date}</p>
                        <p>${newsItem.description}</p>
                    `;
                    openModal(newsItem.title, fullContent, false, newsItem.link);
                }
            });
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }


    // Add event listeners for upcoming events to open modal (now targets the <a> tag)
    const eventItems = document.querySelectorAll('#upcoming-events-section .timeline-item');
    if (typeof eventData !== 'undefined') { // Check if eventData is defined
        eventItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const eventId = this.dataset.eventId;
                if (eventData[eventId]) {
                    const eventItem = eventData[eventId];
                    const fullContent = `
                        <p><strong>Date:</strong> ${eventItem.date}</p>
                        <p>${eventItem.description}</p>
                    `;
                    openModal(eventItem.title, fullContent, false, eventItem.link);
                }
            });
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // --- Slideshow Logic (NEWLY ADDED / CORRECTED) ---
    const slideshows = {}; // To store state for multiple slideshows

    function showSlides(slideshowId, n) {
        let slideshow = slideshows[slideshowId];
        if (!slideshow) {
            // console.error(`Slideshow with ID ${slideshowId} not found.`);
            return;
        }

        let slides = slideshow.container.querySelectorAll('.mySlides');
        if (slides.length === 0) {
            // console.warn(`No slides found for slideshow ID ${slideshowId}.`);
            return;
        }

        // Ensure n is within bounds
        if (n > slides.length) {
            slideshow.slideIndex = 1; // Loop back to the first slide
        } else if (n < 1) {
            slideshow.slideIndex = slides.length; // Loop to the last slide
        } else {
            slideshow.slideIndex = n;
        }

        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Display the current slide
        if (slideshow.slideIndex > 0 && slideshow.slideIndex <= slides.length) {
            slides[slideshow.slideIndex - 1].style.display = 'block';
        }
    }

    function plusSlides(slideshowId, n) {
        let slideshow = slideshows[slideshowId];
        if (slideshow) {
            showSlides(slideshowId, slideshow.slideIndex + n);
        }
    }

    function startSlideshow(slideshowId, interval = 5000) { // Default 5 seconds
        let slideshow = slideshows[slideshowId];
        if (!slideshow) return;

        // Clear any existing interval to prevent multiple timers
        if (slideshow.timer) {
            clearInterval(slideshow.timer);
        }

        slideshow.timer = setInterval(() => {
            plusSlides(slideshowId, 1); // Advance to the next slide
        }, interval);
    }

    function initializeSlideshows() {
        document.querySelectorAll('.slideshow-container').forEach(container => {
            const slideshowId = container.dataset.slideshowId;
            if (!slideshowId) {
                console.warn('Slideshow container missing data-slideshow-id:', container);
                return;
            }

            slideshows[slideshowId] = {
                container: container,
                slideIndex: 1, // Start at the first slide
                timer: null // To hold the interval ID for auto-play
            };

            showSlides(slideshowId, 1); // Show the first slide initially
            startSlideshow(slideshowId); // Start auto-play for this slideshow
        });
    }

    // Call initializeSlideshows when the DOM is ready
    initializeSlideshows();

}); // End of DOMContentLoaded
