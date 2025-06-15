// Global variable to hold the FullCalendar instance for the modal
let fullCalendarInstance = null;

// Function to open modal (moved to global scope)
function openModal(title, content, isCalendarModal = false, learnMoreLink = null) {
    document.getElementById('modal-title').innerText = title;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ''; // Clear previous content
    
    const modalContentElement = document.querySelector('.modal-content');

    // Always reset modal content scroll position to top with a slight delay
    if (modalContentElement) {
        setTimeout(() => {
            modalContentElement.scrollTop = 0;
        }, 0); 
    }
    
    if (isCalendarModal) {
        // Destroy existing calendar instance if it exists
        if (fullCalendarInstance) {
            fullCalendarInstance.destroy();
            fullCalendarInstance = null;
        }

        const fullCalendarDiv = document.createElement('div');
        fullCalendarDiv.id = 'full-calendar';
        modalBody.appendChild(fullCalendarDiv);
        
        // Show modal first, then render calendar
        document.getElementById('modal').classList.add('active');
        document.getElementById('modal').setAttribute('aria-modal', 'true'); // Set aria-modal

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
                { title: 'SWIM Workshop', date: '2025-06-15', url: 'https://ksom.res.in/events/swim-workshop', color: '#0077cc' },

                // 🟪 Conferences
                // (Add conferences here if available)

                // 🟫 Colloquium & Seminar Talks
                { title: 'Mathematics Colloquium', date: '2025-06-20', url: 'https://ksom.res.in/events/math-colloquium', color: '#2c3e50' },
                { title: 'Algebra Seminar', date: '2025-06-05', url: 'https://ksom.res.in/events/algebra-seminar', color: '#2c3e50' },
                { title: 'Geometry Talk', date: '2025-06-10', url: 'https://ksom.res.in/events/geometry-talk', color: '#2c3e50' },
                { title: 'Analysis Lecture', date: '2025-06-22', url: 'https://ksom.res.in/events/analysis-lecture', color: '#2c3e50' },

                // 🟥 Holidays
                { title: 'Republic Day', date: '2025-01-26', color: '#c0392b' },
                { title: 'May Day', date: '2025-05-01', color: '#c0392b' },
                { title: 'Vishu / Ambedkar Jayanti', date: '2025-04-14', color: '#c0392b' },
                { title: 'Easter Sunday', date: '2025-04-20', color: '#c0392b' },
                { title: 'Good Friday', date: '2025-04-18', color: '#c0392b' },
                { title: 'Maundy Thursday', date: '2025-04-17', color: '#c0392b' },
                { title: 'Bakrid / Eid al-Adha', date: '2025-06-06', color: '#c0392b' },
                { title: 'Muharram', date: '2025-06-29', color: '#c0392b' },
                { title: 'Independence Day', date: '2025-08-15', color: '#c0392b' },
                { title: 'Sri Krishna Jayanthi', date: '2025-08-14', color: '#c0392b' },
                { title: 'Gandhi Jayanthi', date: '2025-10-02', color: '#c0392b' },
                { title: 'Mahanavami', date: '2025-10-01', color: '#c0392b' },
                { title: 'Vijaya Dashami', date: '2025-10-02', color: '#c0392b' },
                { title: 'Milad-i-Sharif', date: '2025-09-05', color: '#c0392b' },
                { title: 'Deepavali', date: '2025-10-20', color: '#c0392b' },
                { title: 'Christmas', date: '2025-12-25', color: '#c0392b' },

                // 🟩 Academic Calendar Events
                { title: 'Spring Semester Begins', date: '2025-01-13', color: '#4CAF50' },
                { title: 'MSc Thesis Submission Deadline', date: '2025-07-26', color: '#4CAF50' },
                { title: 'Fall Semester Begins', date: '2025-09-11', color: '#4CAF50' },
                { title: 'Declaration of Results', date: '2025-05-17', color: '#4CAF50' },
                { title: 'Last Instructional Day', date: '2025-05-22', color: '#4CAF50' },
                { title: 'Vacation Begins', date: '2025-06-06', color: '#4CAF50' },
                { title: 'Integrated MSc-PhD Admission Test/Interviews', date: '2025-08-13', color: '#4CAF50' },
                { title: 'KSoM Integrated MSc-PhD Examination', date: '2025-12-25', color: '#4CAF50' },

                // Multi-day 🟩 Academic Events
                {
                    title: 'Mid Semester Exam Week',
                    start: '2025-03-03',
                    end: '2025-03-08',
                    color: '#4CAF50'
                },
                {
                    title: 'Final Examination Week',
                    start: '2025-05-05',
                    end: '2025-05-10',
                    color: '#4CAF50'
                },
                {
                    title: 'MSc Thesis Colloquia Week',
                    start: '2025-07-07',
                    end: '2025-07-12',
                    color: '#4CAF50'
                },
                {
                    title: 'Bridge Courses (MSc-PhD 1st Year)',
                    start: '2025-08-28',
                    end: '2025-09-02',
                    color: '#4CAF50'
                },

                // Admin
                { title: 'Faculty Meeting', date: '2025-06-01', url: 'https://ksom.res.in/events/faculty-meeting', color: '#2c3e50' },
                { title: 'Student Orientation', date: '2025-07-01', url: 'https://ksom.res.in/events/student-orientation', color: '#4CAF50' },
                { title: 'Research Presentation', date: '2025-07-15', url: 'https://ksom.res.in/events/research-presentation', color: '#2c3e50' },
                { title: 'PhD Viva Voce', date: '2025-07-28', url: 'https://ksom.res.in/events/phd-viva', color: '#4CAF50' },
            ],
            eventClick: function(info) {
                if (info.event.url) {
                    window.open(info.event.url);
                    info.jsEvent.preventDefault();
                }
            },
            eventTextColor: '#ffffff',
            eventBorderColor: 'transparent',
            // Removed global eventBackgroundColor to allow individual event colors to take precedence
            dayHeaderContent: function(arg) {
                return arg.text;
            },
            dayCellDidMount: function(info) {
                if (info.isToday) {
                    info.el.style.backgroundColor = 'rgba(0, 92, 151, 0.08)';
                    info.el.style.borderRadius = '6px';
                }
            }
        };

        fullCalendarInstance = new FullCalendar.Calendar(fullCalendarDiv, {
            ...commonCalendarOptions,
            height: 'auto',
            aspectRatio: 1.8
        });
        fullCalendarInstance.render();
        
        setTimeout(() => {
            if (fullCalendarInstance) {
                fullCalendarInstance.updateSize();
            }
        }, 10);
        
    } else {
        // Destroy existing calendar instance if it exists when opening a non-calendar modal
        if (fullCalendarInstance) {
            fullCalendarInstance.destroy();
            fullCalendarInstance = null;
        }
        modalBody.innerHTML = content; // This will now include the single "Learn more" button
        
        // Dynamically add "Learn More" button if learnMoreLink is provided
        if (learnMoreLink) {
            const learnMoreBtn = document.createElement('a');
            learnMoreBtn.href = learnMoreLink;
            learnMoreBtn.textContent = 'Learn more \u2192'; // Unicode for right arrow
            learnMoreBtn.classList.add('modal-learn-more-btn');
            learnMoreBtn.target = '_blank'; // Open in new tab
            modalBody.appendChild(learnMoreBtn);
        }

        document.getElementById('modal').classList.add('active');
        document.getElementById('modal').setAttribute('aria-modal', 'true'); // Set aria-modal
    }
}

// Function to close modal (moved to global scope)
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('modal').setAttribute('aria-modal', 'false'); // Reset aria-modal
    // Destroy the calendar instance when modal is closed
    if (fullCalendarInstance) {
        fullCalendarInstance.destroy();
        fullCalendarInstance = null;
    }
}

function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', isDarkMode); // Store boolean as string
}

// Map to store slideshow intervals for management
const slideshowIntervals = {};
// Function to manage individual slideshows
function initSlideshow(slideshowId, intervalTime = 3000) {
    let currentSlideIndex = 0;
    let slides = document.querySelectorAll(`[data-slideshow-id="${slideshowId}"] .mySlides`);

    if (slides.length === 0) {
        console.warn(`No slides found for slideshow-id: ${slideshowId}`);
        return;
    }

    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        currentSlideIndex++;
        if (currentSlideIndex > slides.length) { currentSlideIndex = 1 }
        slides[currentSlideIndex - 1].style.display = "block";
    }

    function startSlideshow() {
        if (slideshowIntervals[slideshowId]) {
            clearInterval(slideshowIntervals[slideshowId]);
        }
        slideshowIntervals[slideshowId] = setInterval(showSlides, intervalTime);
    }

    // Initial display and start
    showSlides();
    startSlideshow(); // Start auto-play by default
}

document.addEventListener('DOMContentLoaded', function () {
  // Apply dark mode preference from localStorage on load
  const prefersDarkMode = localStorage.getItem('dark-mode');
  if (prefersDarkMode === 'true') {
      document.body.classList.add('dark-mode');
  } else if (prefersDarkMode === 'false') {
      document.body.classList.remove('dark-mode');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Fallback to system preference if no localStorage value
      document.body.classList.add('dark-mode');
  }


  // Initialize slideshow for Academic & Research Activities with 7-second interval
  initSlideshow('academicActivities', 7000);
  // Initialize slideshow for Main Campus with 7-second interval (changed from 5000ms)
  initSlideshow('mainCampus', 7000);

  // Attach accordion item click and keydown handlers
  const accordionItems = document.querySelectorAll('.accordion-item'); // Select all accordion items

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.collapsible-content'); // Target collapsible content specifically
    const learnMoreLink = item.dataset.learnMoreUrl || null;
    const isDirectLink = item.dataset.directLink === 'true'; // Check for data-direct-link

    // Only add click listener if it's meant to be interactive
    if (isDirectLink || (item.dataset.accordionId && content)) { // Either direct link OR collapsible
        item.addEventListener('click', function (e) {
            // Prevent default behavior if an internal link was clicked within the item
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            e.preventDefault(); // Prevent default link behavior if any

            if (isDirectLink && learnMoreLink) {
                // Direct navigation for items with data-direct-link="true"
                window.location.href = learnMoreLink;
            } else if (item.dataset.accordionId && content) {
                // Collapsible accordion behavior for items with data-accordion-id and actual collapsible content
                const isExpanded = content.classList.toggle('expanded');
                header.classList.toggle('expanded', isExpanded); // Toggle expanded class on header for arrow rotation
                header.setAttribute('aria-expanded', isExpanded);
            }
        });

        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                e.preventDefault();
                this.click(); // Trigger click event for consistency
            }
        });
    }
  });


  // Attach click handler to the fancy calendar button's container
  const calendarSectionButton = document.getElementById('calendar-section');
  if (calendarSectionButton) {
      const calendarButton = calendarSectionButton.querySelector('#events-calendar-button');
      calendarButton.addEventListener('click', function (e) {
          openModal('Upcoming Events Calendar', '', true);
      });
      calendarButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
  }

  // Existing modal handlers for other "Learn more" buttons (excluding expand-link for regular accordions)
  // This loop is now effectively for any other standalone learn-more-btns if they exist.
  // Since we removed them from inside accordion-content, this will only trigger for non-accordion elements.
  document.querySelectorAll('.learn-more-btn:not(.expand-link)').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const section = this.closest('.accordion-item'); // Assuming it's still part of an accordion item or similar structure
      const title = section.querySelector('.accordion-header').textContent;
      const content = section.querySelector('.collapsible-content').innerHTML; // Changed to .collapsible-content
      openModal(title, content, false, this.href); // Pass the button's href as learnMoreLink
    });
  });

  // Add event listener to modal overlay to close when clicking outside content
  const modalOverlay = document.getElementById('modal');
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }

  // --- Hamburger Menu Logic ---
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
  const mobileMenuContent = document.getElementById('mobile-menu-content');
  const desktopNav = document.getElementById('desktop-nav'); // Get the desktop nav element

  function populateMobileMenu() {
      mobileMenuContent.innerHTML = '';

      // Get the direct links and dropdowns from desktop nav
      Array.from(desktopNav.children).forEach(item => {
          if (item.tagName === 'A') { // This is a direct link like "Careers"
              if (!item.classList.contains('dark-toggle')) { // Exclude dark mode toggle from main menu links
                const clonedLink = item.cloneNode(true);
                mobileMenuContent.appendChild(clonedLink);
              }
          } else if (item.classList.contains('dropdown')) {
              const originalLink = item.querySelector('a'); // The main link like "Home" or "Research"
              const dropdownContent = item.querySelector('.dropdown-content');

              const dropdownContainer = document.createElement('div');
              dropdownContainer.classList.add('mobile-dropdown-container');

              const dropdownHeader = document.createElement('div');
              dropdownHeader.classList.add('mobile-dropdown-header');

              // Create the link element for the main menu item (e.g., Home, Research)
              const linkElement = document.createElement('a');
              linkElement.href = originalLink.href; // Set the href
              linkElement.textContent = originalLink.textContent; // Set the text content
              linkElement.classList.add('mobile-main-nav-link'); // Add a specific class for styling

              const toggleButton = document.createElement('button');
              toggleButton.classList.add('mobile-dropdown-toggle');
              toggleButton.innerHTML = '&#9660;'; // Down arrow
              toggleButton.setAttribute('aria-label', `Toggle submenu for ${originalLink.textContent}`);
              toggleButton.setAttribute('aria-expanded', 'false'); // Initial state

              const submenu = document.createElement('div');
              submenu.classList.add('mobile-submenu');
              submenu.setAttribute('aria-hidden', 'true'); // Initial state

              Array.from(dropdownContent.children).forEach(subItem => {
                  const clonedSubLink = subItem.cloneNode(true);
                  submenu.appendChild(clonedSubLink);
              });

              dropdownHeader.appendChild(linkElement);
              dropdownHeader.appendChild(toggleButton);
              dropdownContainer.appendChild(dropdownHeader);
              dropdownContainer.appendChild(submenu);
              mobileMenuContent.appendChild(dropdownContainer);

              // Event listener for the toggle button (arrow)
              toggleButton.addEventListener('click', (e) => {
                  e.stopPropagation(); // Prevent click from bubbling up to any parent handlers
                  const isExpanded = toggleButton.classList.toggle('expanded');
                  submenu.classList.toggle('expanded');
                  toggleButton.setAttribute('aria-expanded', isExpanded);
                  submenu.setAttribute('aria-hidden', !isExpanded); // Toggle aria-hidden
              });

              // Add keyboard support for dropdown toggle
              toggleButton.addEventListener('keydown', function(e) {
                  if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      this.click(); // Simulate click to trigger the toggle
                  }
              });
          }
      });

      // Append dark mode toggle at the very end if it's a direct child of desktopNav
      const darkToggle = desktopNav.querySelector('.dark-toggle');
      if (darkToggle) {
          const clonedDarkToggle = darkToggle.cloneNode(true);
          // Ensure cloned button also has the toggleDarkMode functionality
          clonedDarkToggle.onclick = toggleDarkMode;
          mobileMenuContent.appendChild(clonedDarkToggle);
      }
  }

  hamburgerIcon.addEventListener('click', () => {
      populateMobileMenu();
      mobileMenuOverlay.classList.add('active');
      mobileMenuOverlay.querySelector('.mobile-menu-panel').classList.add('active');
      hamburgerIcon.classList.add('active');
  });

  mobileMenuCloseBtn.addEventListener('click', () => {
      closeMobileMenu();
  });

  mobileMenuOverlay.addEventListener('click', (e) => {
      const mobileMenuPanel = mobileMenuOverlay.querySelector('.mobile-menu-panel');
      // If clicked directly on the overlay OR on a link inside the panel
      if (e.target === mobileMenuOverlay || (e.target.tagName === 'A' && mobileMenuPanel.contains(e.target))) {
          closeMobileMenu();
      }
  });

  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    mobileMenuOverlay.querySelector('.mobile-menu-panel').classList.remove('active');
    hamburgerIcon.classList.remove('active');
    // Reset dropdown states
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(btn => {
        btn.classList.remove('expanded');
        btn.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.mobile-submenu').forEach(submenu => {
        submenu.classList.remove('expanded');
        submenu.setAttribute('aria-hidden', 'true'); // Reset aria-hidden
    });
  }

  // News data for modal display
  const newsData = {
      "recruitment": {
          title: "KSoM Recruitment Drive",
          date: "June 3, 2025",
          description: "Applications are now open for key administrative positions including Accounts Officer and Registrar. We invite dynamic and experienced professionals to join our esteemed institution and contribute to its continued growth and success. This is a unique opportunity to be part of a leading research institute dedicated to mathematical excellence. Detailed job descriptions and application procedures are available on our careers page.",
          link: "https://ksom.res.in/news/recruitment-drive"
      },
      "phd-admissions": {
          title: "PhD Admissions 2025",
          date: "May 7, 2025",
          description: "Applications are invited for our prestigious doctoral programmes in Pure and Applied Mathematics for the academic year 2025. KSoM offers comprehensive financial support, including monthly scholarships and hostel accommodation, to all selected candidates. Our PhD program provides an immersive research environment with access to state-of-the-art facilities and mentorship from world-renowned faculty. Prospective candidates with a strong academic record in mathematics or a related field are encouraged to apply. The admission process involves a rigorous entrance examination and an interview.",
          link: "https://ksom.res.in/admissions/phd"
      },
      "visiting-faculty": {
          title: "Visiting Faculty Position",
          date: "March 4, 2025",
          description: "KSoM is seeking highly qualified candidates for Visiting Assistant Professor positions across all mathematical disciplines. We offer a vibrant and collaborative research environment with opportunities to engage in cutting-edge research and interact with leading mathematicians. The ideal candidate will have a strong research profile and a commitment to teaching and mentoring. We welcome applications from both experienced faculty and promising early-career researchers. Positions are available for periods ranging from three months to a full academic year.",
          link: "https://ksom.res.in/careers/visiting-faculty"
      },
      "research-symposium": {
          title: "Annual Research Symposium",
          date: "February 15, 2025",
          description: "The Annual Research Symposium held last week was a resounding success, featuring keynote speakers and groundbreaking research presentations from our faculty, postdocs, and research scholars. The symposium facilitated vibrant discussions and fostered new collaborations across various mathematical fields. Highlights included sessions on quantum algorithms, geometric group theory, and advancements in analytic number theory. We extend our gratitude to all participants and look forward to building on this momentum in the coming year.",
          link: "https://ksom.res.in/activities/research-symposium"
      },
      "new-faculty": {
          title: "New Faculty Announcement",
          date: "January 20, 2025",
          description: "We are thrilled to announce the appointment of Dr. Alok Kumar as our newest faculty member, specializing in Algebraic Geometry. Dr. Kumar brings a wealth of expertise and a promising research agenda that will significantly enhance our department's capabilities. His work focuses on the intersection of algebraic geometry and number theory, and we are confident that his contributions will greatly enrich our academic community and foster innovative research collaborations. Please join us in extending a warm welcome to Dr. Kumar.",
          link: "https://ksom.res.in/people/faculty/alok-kumar"
      },
      "winter-school": {
          title: "Winter School on Number Theory",
          date: "December 1, 2024",
          description: "Registration is now open for our intensive Winter School on Number Theory, scheduled for January 10-20, 2025. This school is designed for advanced undergraduate students, graduate students, and young researchers interested in modern developments in analytic number theory. The curriculum will cover topics such as sieve methods, automorphic forms, and L-functions, delivered through a series of lectures and problem-solving sessions by leading experts in the field. Early registration is encouraged due to limited seats.",
          link: "https://ksom.res.in/activities/winter-school"
      }
  };

  // Events data for modal display
  const eventData = {
      "guest-lecture-sharma": {
          title: "Guest Lecture Series: Dr. Anya Sharma",
          date: "July 10, 2025",
          description: "Exploring advancements in Quantum Topology. Open to all researchers and students. Dr. Sharma is a distinguished mathematician known for her groundbreaking work in algebraic topology and its applications. This lecture promises to be a deep dive into the latest theories and unsolved problems in the field, offering valuable insights for both seasoned researchers and aspiring mathematicians.",
          link: "https://ksom.res.in/events/guest-lecture-sharma"
      },
      "discrete-math-conference": {
          title: "International Conference on Discrete Mathematics",
          date: "August 5, 2025",
          description: "Leading experts convene to discuss new theories and applications in discrete mathematics. This annual conference brings together top researchers from around the globe to present their latest findings, collaborate on new projects, and discuss the future directions of discrete mathematics. Topics include graph theory, combinatorics, cryptography, and theoretical computer science.",
          link: "https://ksom.res.in/events/discrete-math-conference"
      },
      "freshers-orientation": {
          title: "Freshers' Orientation Program",
          date: "September 1, 2025",
          description: "Welcome session for new M.Sc. and Ph.D. students joining KSoM. This comprehensive orientation will introduce new students to KSoM's academic environment, research facilities, faculty members, and campus life. It's an excellent opportunity to meet fellow students, get acquainted with the institute's resources, and prepare for a successful academic journey.",
          link: "https://ksom.res.in/events/freshers-orientation"
      },
      "ml-math-workshop": {
          title: "Workshop on Machine Learning in Mathematics",
          date: "October 20, 2025",
          description: "A practical workshop on the intersection of machine learning and mathematical research. This workshop will cover fundamental concepts of machine learning and demonstrate how mathematical principles underpin various ML algorithms. Participants will engage in hands-on sessions exploring topics like neural networks, optimization, and data analysis, with a focus on their mathematical foundations.",
          link: "https://ksom.res.in/events/ml-math-workshop"
      },
      "alumni-meet": {
          title: "Annual Alumni Meet",
          date: "November 12, 2025",
          description: "Connect with fellow KSoM alumni and faculty. Networking and dinner included. Our annual alumni meet is a cherished tradition, providing a platform for former students to reconnect, share their professional journeys, and foster a strong KSoM community. This event includes a keynote address from a prominent alumnus, a networking reception, and opportunities to reminisce about your time at KSoM.",
          link: "https://ksom.res.in/events/alumni-meet"
      },
      "christmas-lecture": {
          title: "Christmas Lecture: The Beauty of Fractals",
          date: "December 8, 2025",
          description: "A public lecture showcasing the visual and mathematical elegance of fractals. This captivating lecture is designed for a general audience, exploring the fascinating world of fractals found in nature, art, and mathematics. Through stunning visuals and accessible explanations, Professor Emily Davis will reveal the intricate patterns and profound mathematical concepts behind these infinitely complex shapes.",
          link: "https://ksom.res.in/events/christmas-lecture"
      }
  };

  // Add event listeners for news items to open modal
  const newsItems = document.querySelectorAll('#latest-news-section .timeline-item');
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

  // Add event listeners for upcoming events to open modal (now targets the <a> tag)
  const eventItems = document.querySelectorAll('#upcoming-events-section .timeline-item');
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
});
