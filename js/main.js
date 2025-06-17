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
            { title: 'Workshop on Algebraic Geometry', start: '2025-09-15', end: '2025-09-17', url: '/events/workshops#algebraic-geometry', color: '#005c97', textColor: '#ffffff' },
            { title: 'Workshop on Number Theory', start: '2025-11-10', end: '2025-11-12', url: '/events/workshops#number-theory', color: '#005c97', textColor: '#ffffff' },
            { title: 'Advanced Topics in Topology', start: '2025-07-20', end: '2025-07-22', url: '/events/workshops#topology', color: '#005c97', textColor: '#ffffff' },
            { title: 'Modern Trends in Analysis', start: '2025-10-05', end: '2025-10-07', url: '/events/workshops#analysis', color: '#005c97', textColor: '#ffffff' },

            // 🟨 Conferences
            { title: 'Annual Mathematics Conference', start: '2025-08-25', end: '2025-08-29', url: '/events/conferences#annual-conference', color: '#f39c12', textColor: '#1a1a1a' },
            { title: 'International Conference on Discrete Mathematics', start: '2025-12-01', end: '2025-12-05', url: '/events/conferences#discrete-math', color: '#f39c12', textColor: '#1a1a1a' },
            { title: 'Symposium on Applied Mathematics', start: '2025-06-18', end: '2025-06-20', url: '/events/conferences#applied-math', color: '#f39c12', textColor: '#1a1a1a' },

            // 🟩 Seminars
            { title: 'Weekly Colloquium', start: '2025-07-02T15:00:00', end: '2025-07-02T17:00:00', url: '/events/seminars#weekly-colloquium', color: '#27ae60', textColor: '#ffffff' },
            { title: 'Research Seminar Series', start: '2025-09-10T10:00:00', end: '2025-09-10T12:00:00', url: '/events/seminars#research-series', color: '#27ae60', textColor: '#ffffff' },
            { title: 'Guest Lecture: Dr. A. Sharma', start: '2025-10-25T14:00:00', end: '2025-10-25T16:00:00', url: '/events/seminars#guest-lecture', color: '#27ae60', textColor: '#ffffff' },
        ],
        // Event click handler for modals
        eventClick: function(info) {
            info.jsEvent.preventDefault(); // Prevent default browser action

            // Check if the event has a specific link, otherwise use a generic modal content
            const eventUrl = info.event.url;
            if (eventUrl) {
                // If it's an internal link, navigate
                if (eventUrl.startsWith('/') || eventUrl.startsWith(window.location.origin)) {
                    window.location.href = eventUrl;
                } else {
                    // If it's an external link, open in new tab
                    window.open(eventUrl, '_blank');
                }
            } else {
                // Fallback for events without a specific URL
                const eventTitle = info.event.title;
                const eventStart = info.event.start.toLocaleDateString();
                const eventEnd = info.event.end ? info.event.end.toLocaleDateString() : '';
                const eventDescription = info.event.extendedProps.description || 'No detailed description available.';

                const modalContentHtml = `
                    <p><strong>Date:</strong> ${eventStart} <span class="math-inline">\{eventEnd ? ' \- ' \+ eventEnd \: ''\}</p\>
<p\></span>{eventDescription}</p>
                `;
                openModal(eventTitle, modalContentHtml);
            }
        },
    };

    // Apply common options and then render
    const calendar = new FullCalendar.Calendar(calendarElement, commonCalendarOptions);
    calendar.render();
    return calendar; // Return instance for potential later use
}


// Function to open the modal (using 'mainModal' as per previous HTML/CSS discussions)
function openModal(title, content, isCalendar = false, link = null) {
    const modal = document.getElementById('mainModal'); // Corrected ID
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter'); // Corrected ID

    modalTitle.innerHTML = title; // Use innerHTML to allow for MathJax rendering in title
    modalBody.innerHTML = content; // Use innerHTML for content as well

    modalFooter.innerHTML = ''; // Clear previous footer content

    if (link) {
        const linkBtn = document.createElement('a');
        linkBtn.href = link;
        linkBtn.textContent = 'Learn More';
        linkBtn.target = '_blank';
        linkBtn.rel = 'noopener noreferrer';
        linkBtn.classList.add('button', 'primary-button');
        modalFooter.appendChild(linkBtn);
    }

    modal.classList.add('active'); // Use classList.add/remove for modal visibility
    document.body.classList.add('modal-open'); // Prevent background scrolling

    if (isCalendar) {
        // Load FullCalendar script if not already loaded
        if (!isFullCalendarScriptLoaded) {
            loadScript('https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js', 'fullcalendar-script')
                .then(() => {
                    isFullCalendarScriptLoaded = true;
                    // Initialize FullCalendar after script loads
                    fullCalendarInstance = initializeFullCalendar(modalBody.querySelector('#modal-calendar'));
                })
                .catch(error => {
                    console.error('Failed to load FullCalendar script:', error);
                });
        } else {
            // If script is already loaded, just initialize/re-render
            fullCalendarInstance = initializeFullCalendar(modalBody.querySelector('#modal-calendar'));
        }
    } else {
        // If it's not a calendar, ensure fullCalendarInstance is null and render actions are reset
        if (fullCalendarInstance) {
            fullCalendarInstance.destroy();
            fullCalendarInstance = null;
        }
    }

    // Re-render MathJax in the modal content if it's loaded
    if (typeof MathJax !== 'undefined' && MathJax.startup && MathJax.startup.document) {
        MathJax.startup.document.clear();
        MathJax.startup.document.handleMath(document.getElementById('modalBody'));
        MathJax.startup.document.updateDocument();
    }
}

// Function to close the modal (using 'mainModal')
function closeModal() {
    const modal = document.getElementById('mainModal'); // Corrected ID
    modal.classList.remove('active');
    document.body.classList.remove('modal-open'); // Re-enable background scrolling

    // Destroy FullCalendar instance if it exists when modal closes
    if (fullCalendarInstance) {
        fullCalendarInstance.destroy();
        fullCalendarInstance = null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Light/Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (document.body.classList.contains('dark-mode')) {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Update URL hash without jumping
                history.pushState(null, '', `#${targetId}`);
            }
        });
    });

    // Mobile Navigation Toggle
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileNavToggle.classList.toggle('active'); // Toggle class for hamburger animation
            document.body.classList.toggle('no-scroll'); // Prevent scroll when nav is open
        });

        // Close nav when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Sub-menu Toggle for Desktop Navigation
    document.querySelectorAll('.has-submenu > a').forEach(link => {
        link.addEventListener('click', function(e) {
            const parentLi = this.closest('.has-submenu');
            const subMenu = parentLi.querySelector('.submenu');

            // Toggle active class on parent LI
            parentLi.classList.toggle('active');

            // If a submenu is opened, close other active submenus at the same level
            document.querySelectorAll('.has-submenu').forEach(otherParentLi => {
                if (otherParentLi !== parentLi && otherParentLi.classList.contains('active')) {
                    otherParentLi.classList.remove('active');
                    otherParentLi.querySelector('.submenu').style.maxHeight = null;
                }
            });

            // Handle submenu height for smooth transition
            if (subMenu) {
                if (parentLi.classList.contains('active')) {
                    subMenu.style.maxHeight = subMenu.scrollHeight + "px";
                } else {
                    subMenu.style.maxHeight = null;
                }
            }
            e.preventDefault(); // Prevent default link behavior if it's just a toggle
        });
    });

    // Close submenus when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.has-submenu') && !event.target.closest('#mobile-nav-toggle')) {
            document.querySelectorAll('.has-submenu.active').forEach(parentLi => {
                parentLi.classList.remove('active');
                const subMenu = parentLi.querySelector('.submenu');
                if (subMenu) {
                    subMenu.style.maxHeight = null;
                }
            });
        }
    });

    // Modal Close functionality (using 'mainModal')
    const modal = document.getElementById('mainModal'); // Corrected ID
    const closeButton = document.querySelector('.modal-close-button'); // Corrected class

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) { // Only close if clicking on the overlay, not the content
                closeModal();
            }
        });
    }

    // Add event listeners to accordion headers for expand/collapse or direct linking
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        // Get the header for the current item (moved this line up for universal access)
        const header = item.querySelector('.accordion-header');

        // Check if data-direct-link="true" exists
        if (item.dataset.directLink === 'true') {
            const directLinkUrl = item.dataset.learnMoreUrl;
            if (directLinkUrl) {
                // Listener on the *entire item* (section) for direct links
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = directLinkUrl;
                });
                item.addEventListener('keydown', function(e) {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click(); // 'this' refers to 'item' (the section)
                  }
                });
            }
        } else { // If it's a regular collapsible accordion (modalOpener or just toggle)
            if (header) { // Ensure header exists
                header.addEventListener('click', function() {
                    item.classList.toggle('active');
                    const content = item.querySelector('.accordion-content');
                    if (content) {
                        if (item.classList.contains('active')) {
                            content.style.maxHeight = content.scrollHeight + "px";
                        } else {
                            content.style.maxHeight = null;
                        }
                    }
                });
                header.addEventListener('keydown', function(e) {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.classList.toggle('active');
                    const content = item.querySelector('.accordion-content');
                    if (content) {
                        if (item.classList.contains('active')) {
                            content.style.maxHeight = content.scrollHeight + "px";
                        } else {
                            content.style.maxHeight = null;
                        }
                    }
                  }
                });
            }
        }
    });


    // Data for news items (RESTORED)
    const newsData = {
        'news1': {
            title: 'KSoM Announces New Research Grant Opportunities',
            date: 'June 15, 2025',
            description: 'The Kerala School of Mathematics is pleased to announce new research grant opportunities for both faculty and visiting scholars, aimed at fostering innovative research in pure and applied mathematics. Applications are now open for the 2026 funding cycle. Details regarding eligibility criteria, application procedures, and research priorities are available on the grants section of our website.',
            link: '/news-events/news-announcements#news1' // Link to the full news page
        },
        'news2': {
            title: 'International Workshop on Harmonic Analysis Concludes Successfully',
            date: 'May 28, 2025',
            description: 'The International Workshop on Harmonic Analysis, held at KSoM from May 25-28, 2025, concluded with resounding success. The event brought together leading experts and young researchers from around the globe to discuss recent advancements and open problems in the field. Keynote speeches and parallel sessions facilitated vibrant discussions and fostered new collaborations.',
            link: '/news-events/news-announcements#news2'
        },
        'news3': {
            title: 'Prof. Ananda Rao Honored with National Science Award',
            date: 'April 10, 2025',
            description: 'Prof. Ananda Rao of the Kerala School of Mathematics has been awarded the prestigious National Science Award for his groundbreaking contributions to Non-commutative Functional Analysis. The award recognizes his pioneering work and its significant impact on the field. The KSoM community extends its hearty congratulations to Prof. Rao.',
            link: '/news-events/news-announcements#news3'
        },
        'news4': {
            title: 'Admissions Open for Integrated MSc-PhD Program 2026',
            date: 'March 1, 2025',
            description: 'KSoM is now accepting applications for its Integrated MSc-PhD Program for the academic year 2026. The program offers a unique blend of rigorous coursework and cutting-edge research opportunities for aspiring mathematicians. Prospective students are encouraged to review the eligibility criteria and application process on our admissions page.',
            link: '/programmes/integrated-msc-phd/admissions'
        }
        // Add more news items as needed
    };

    // Data for upcoming events (RESTORED)
    const eventData = {
        'event1': {
            title: 'International Conference on Algebraic Geometry',
            date: 'September 15-17, 2025',
            description: 'A major international conference focusing on recent developments in Algebraic Geometry. Featuring plenary talks by world-renowned mathematicians and parallel sessions for contributed papers. Registration open.',
            link: '/events/conferences#algebraic-geometry-conf'
        },
        'event2': {
            title: 'Special Lecture Series: Introduction to Quantum Computing',
            date: 'October 1-5, 2025',
            description: 'A series of introductory lectures on the fundamentals of Quantum Computing, aimed at postgraduate students and researchers with a basic understanding of linear algebra. Led by Dr. Vikram Singh from IIT Delhi.',
            link: '/events/seminars#quantum-computing-series'
        },
        'event3': {
            title: 'KSoM Annual Research Symposium',
            date: 'November 20, 2025',
            description: 'The annual symposium showcasing research by KSoM faculty and research scholars. Open to all students and faculty from academic institutions.',
            link: '/events/symposium#annual-research-symposium'
        }
        // Add more event items as needed
    };

    // Populate and add event listeners for news items
    const newsItemsContainer = document.getElementById('latest-news-items');
    if (newsItemsContainer) {
        Object.keys(newsData).slice(0, 3).forEach(key => { // Show top 3 news items
            const item = newsData[key];
            const div = document.createElement('div');
            div.classList.add('news-item');
            div.dataset.newsId = key;
            div.innerHTML = `
                <span class="news-date"><span class="math-inline">\{item\.date\}</span\>
<span class\="news\-title"\></span>{item.title}</span>
            `;
            newsItemsContainer.appendChild(div);
        });
    }

    const newsElements = document.querySelectorAll('#latest-news-items .news-item');
    newsElements.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const newsId = this.dataset.newsId;
            if (newsData[newsId]) {
                const newsItem = newsData[newsId];
                const fullContent = `
                    <p><strong>Date:</strong> <span class="math-inline">\{newsItem\.date\}</p\>
<p\></span>{newsItem.description}</p>
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

    // Populate and add event listeners for upcoming events
    const upcomingEventsContainer = document.getElementById('upcoming-events-items');
    if (upcomingEventsContainer) {
        Object.keys(eventData).slice(0, 3).forEach(key => { // Show top 3 events
            const item = eventData[key];
            const div = document.createElement('div');
            div.classList.add('timeline-item');
            div.dataset.eventId = key;
            div.innerHTML = `
                <div class="timeline-date"><span class="math-inline">\{item\.date\}</div\>
<div class\="timeline\-content"\></span>{item.title}</div>
            `;
            upcomingEventsContainer.appendChild(div);
        });
    }

    const eventItems = document.querySelectorAll('#upcoming-events-items .timeline-item');
    eventItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.dataset.eventId;
            if (eventData[eventId]) {
                const eventItem = eventData[eventId];
                const fullContent = `
                    <p><strong>Date:</strong> <span class="math-inline">\{eventItem\.date\}</p\>
<p\></span>{eventItem.description}</p>
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

    // Functionality for slideshows (if present)
    const slideshows = {}; // Store slideshow states by ID

    function showSlides(slideshowId, n) {
        let slideshow = slideshows[slideshowId];
