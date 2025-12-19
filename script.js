document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }

    // Close mobile nav if a link is clicked
    if (mobileNav) {
        mobileNav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileNav.classList.remove('active');
            }
        });
    }

    // Profile dropdown toggle
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileDropdown) {
        const profileIcon = profileDropdown.querySelector('.profile-icon-wrapper');
        const dropdownContent = profileDropdown.querySelector('.dropdown-content');

        profileIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownContent.classList.toggle('active');
        });

        window.addEventListener('click', (event) => {
            if (!profileDropdown.contains(event.target)) {
                dropdownContent.classList.remove('active');
            }
        });
    }

    // Scroll reveal animation
    const animatedElements = document.querySelectorAll('.course-card, .feature-item, .testimonial-card');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    // Course filtering logic (on courses.html)
    const courseGrid = document.getElementById('course-grid');
    if (courseGrid) {
        const searchInput = document.getElementById('course-search');
        const categoryFilter = document.getElementById('category-filter');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const courseCards = Array.from(courseGrid.querySelectorAll('.card-link-wrapper'));
        const noResultsMessage = document.getElementById('no-results-message');

        const filterCourses = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const category = categoryFilter.value;
            const difficulty = difficultyFilter.value;
            let visibleCourses = 0;

            courseCards.forEach(wrapper => {
                const card = wrapper.querySelector('.course-card');
                const title = card.querySelector('h3').textContent.toLowerCase();
                const cardCategory = card.dataset.category;
                const cardDifficulty = card.dataset.difficulty;

                const searchMatch = title.includes(searchTerm);
                const categoryMatch = category === 'all' || cardCategory === category;
                const difficultyMatch = difficulty === 'all' || cardDifficulty === difficulty;

                if (searchMatch && categoryMatch && difficultyMatch) {
                    wrapper.classList.remove('hidden');
                    visibleCourses++;
                } else {
                    wrapper.classList.add('hidden');
                }
            });

            if (noResultsMessage) {
                noResultsMessage.style.display = visibleCourses === 0 ? 'block' : 'none';
            }
        };

        searchInput.addEventListener('input', filterCourses);
        categoryFilter.addEventListener('change', filterCourses);
        difficultyFilter.addEventListener('change', filterCourses);
    }
    
    // Video loading logic (on video.html)
    const videoPlayer = document.getElementById('unit-video');
    if (videoPlayer) {
        const videoTitle = document.getElementById('video-unit-title');
        const urlParams = new URLSearchParams(window.location.search);
        const unit = urlParams.get('unit');

        if (unit) {
            videoTitle.textContent = `Playing: ${unit.replace('unit', 'Unit ')}`;
            // As actual video files don't exist, we use a placeholder.
            // In a real scenario, the src would be `${unit}.mp4`
            const videoSource = videoPlayer.querySelector('source');
            videoSource.setAttribute('src', 'https://www.w3schools.com/html/mov_bbb.mp4');
            videoPlayer.load();
        } else {
            videoTitle.textContent = "No video selected";
        }
    }
});
