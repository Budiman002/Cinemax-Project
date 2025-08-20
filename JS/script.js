const moviesData = [
    {
        id: 1,
        title: "Spider-Man: No Way Home",
        year: 2021,
        genre: "action",
        rating: 8.2,
        poster: "assets/Spiderman.jpg",
        description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear."
    },
    {
        id: 2,
        title: "The Batman",
        year: 2022,
        genre: "action",
        rating: 7.8,
        poster: "assets/TheBatman.jpg",
        description: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a killer known as the Riddler."
    },
    {
        id: 3,
        title: "Dune",
        year: 2021,
        genre: "sci-fi",
        rating: 8.0,
        poster: "assets/Dune.jpg",
        description: "Paul Atreides leads nomadic tribes in a rebellion against the evil House Harkonnen in their struggle for the desert planet Arrakis."
    },
    {
        id: 4,
        title: "Top Gun: Maverick",
        year: 2022,
        genre: "action",
        rating: 8.3,
        poster: "assets/TopGun.jpg",
        description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates."
    },
    {
        id: 5,
        title: "Interstellar",
        year: 2014,
        genre: "sci-fi",
        rating: 8.6,
        poster: "assets/Interstellar.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
        id: 6,
        title: "Parasite",
        year: 2019,
        genre: "drama",
        rating: 8.5,
        poster: "assets/Parasite.jpg",
        description: "A poor family schemes to become employed by a wealthy family and infiltrates their household by posing as unrelated, highly qualified individuals."
    },
    {
        id: 7,
        title: "Knives Out",
        year: 2019,
        genre: "comedy",
        rating: 7.9,
        poster: "assets/KnivesOut.jpg",
        description: "A detective investigates the death of a patriarch of an eccentric, combative family."
    },
    {
        id: 8,
        title: "The Conjuring",
        year: 2013,
        genre: "horror",
        rating: 7.5,
        poster: "assets/TheConjuring.jpg",
        description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse."
    },
    {
        id: 9,
        title: "La La Land",
        year: 2016,
        genre: "romance",
        rating: 8.0,
        poster: "assets/LaLaLand.jpg",
        description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future."
    },
    {
        id: 10,
        title: "Joker",
        year: 2019,
        genre: "drama",
        rating: 8.4,
        poster: "assets/Joker.jpg",
        description: "A mentally troubled comedian is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime."
    },
    {
        id: 11,
        title: "Avengers: Endgame",
        year: 2019,
        genre: "action",
        rating: 8.4,
        poster: "assets/AvengerEnd.jpg",
        description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe."
    },
    {
        id: 12,
        title: "The Conjuring 2",
        year: 2016,
        genre: "horror",
        rating: 7.3,
        poster: "assets/TheConjuringTwo.jpg",
        description: "Ed and Lorraine Warren travel to London to help a single mother raising four children alone in a house plagued by malicious spirits."
    }
];

// ===== GLOBAL VARIABLES =====
let currentSlideIndex = 0;
let filteredMovies = moviesData;
let isAnimating = false;

// ===== DOM ELEMENTS =====
const elements = {
    hamburger: document.querySelector('.hamburger'),
    navMenu: document.querySelector('.nav-menu'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.querySelector('.search-btn'),
    genreFilter: document.getElementById('genreFilter'),
    moviesGrid: document.getElementById('moviesGrid'),
    sliderTrack: document.getElementById('sliderTrack'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    modal: document.getElementById('movieModal'),
    modalPoster: document.getElementById('modalPoster'),
    modalTitle: document.getElementById('modalTitle'),
    modalRating: document.getElementById('modalRating'),
    modalYear: document.getElementById('modalYear'),
    modalGenre: document.getElementById('modalGenre'),
    modalDescription: document.getElementById('modalDescription'),
    closeBtn: document.querySelector('.close-btn'),
    heroBtn: document.querySelector('.hero-btn'),
    navLinks: document.querySelectorAll('.nav-link'),
    sidebarBtn: document.querySelector('.sidebar-btn')
};

// ===== UTILITY FUNCTIONS =====
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

const fadeInElements = () => {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// ===== NAVIGATION FUNCTIONALITY =====
const initNavigation = () => {
    elements.hamburger.addEventListener('click', () => {
        elements.hamburger.classList.toggle('active');
        elements.navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!elements.hamburger.contains(e.target) && !elements.navMenu.contains(e.target)) {
            elements.hamburger.classList.remove('active');
            elements.navMenu.classList.remove('active');
        }
    });

    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            
            elements.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            elements.hamburger.classList.remove('active');
            elements.navMenu.classList.remove('active');
            
            smoothScroll(target);
        });
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 46, 0.98)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
        }
    });
};

// ===== SEARCH FUNCTIONALITY =====
const initSearch = () => {
    const performSearch = () => {
        const query = elements.searchInput.value.toLowerCase().trim();
        const selectedGenre = elements.genreFilter.value;
        
        filteredMovies = moviesData.filter(movie => {
            const matchesSearch = movie.title.toLowerCase().includes(query) ||
                                movie.description.toLowerCase().includes(query);
            const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
            
            return matchesSearch && matchesGenre;
        });
        
        renderMovies(filteredMovies);
    };

    const debouncedSearch = debounce(performSearch, 300);
    
    elements.searchInput.addEventListener('input', debouncedSearch);
    elements.searchBtn.addEventListener('click', performSearch);
    elements.genreFilter.addEventListener('change', performSearch);
    
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
};

// ===== MOVIE RENDERING =====
const createMovieCard = (movie) => {
    return `
        <article class="movie-card fade-in" data-movie-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
            <div class="movie-details">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-metadata">
                    <span class="rating">⭐ ${movie.rating}</span>
                    <span class="year">${movie.year}</span>
                    <span class="genre">${movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1)}</span>
                </div>
                <p class="movie-description">${movie.description}</p>
            </div>
        </article>
    `;
};

const renderMovies = (movies) => {
    if (movies.length === 0) {
        elements.moviesGrid.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1;">
                <h3>No movies found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    elements.moviesGrid.innerHTML = movies.map(createMovieCard).join('');
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const movieId = parseInt(card.dataset.movieId);
            const movie = moviesData.find(m => m.id === movieId);
            openModal(movie);
        });
    });

    setTimeout(() => {
        fadeInElements();
    }, 100);
};

// ===== SLIDER FUNCTIONALITY =====
const initSlider = () => {
    const trendingMovies = moviesData.filter(movie => movie.rating >= 8.0);
    
    elements.sliderTrack.innerHTML = trendingMovies.map(movie => `
        <div class="slider-item" data-movie-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" style="width: 100%; height: 300px; object-fit: cover; cursor: pointer;">
            <div style="padding: 1rem;">
                <h4 style="margin-bottom: 0.5rem; font-size: 1rem;">${movie.title}</h4>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem; color: #b8b8b8;">
                    <span>⭐ ${movie.rating}</span>
                    <span>${movie.year}</span>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.slider-item').forEach(item => {
        item.addEventListener('click', () => {
            const movieId = parseInt(item.dataset.movieId);
            const movie = moviesData.find(m => m.id === movieId);
            openModal(movie);
        });
    });

    const getSliderDimensions = () => {
        const containerWidth = document.querySelector('.slider-container').offsetWidth;
        const slideWidth = 250;
        const slideGap = 16;
        const totalSlideWidth = slideWidth + slideGap;
        const visibleSlides = Math.floor(containerWidth / totalSlideWidth);
        const maxSlides = Math.max(0, trendingMovies.length - visibleSlides);
        
        return { slideWidth, slideGap, totalSlideWidth, visibleSlides, maxSlides };
    };

    let sliderDimensions = getSliderDimensions();

    const updateSlider = () => {
        const { totalSlideWidth, maxSlides } = sliderDimensions;
        
        currentSlideIndex = Math.max(0, Math.min(currentSlideIndex, maxSlides));
        
        const translateX = -currentSlideIndex * totalSlideWidth;
        elements.sliderTrack.style.transform = `translateX(${translateX}px)`;
        
        elements.prevBtn.style.opacity = currentSlideIndex === 0 ? '0.5' : '1';
        elements.prevBtn.style.cursor = currentSlideIndex === 0 ? 'not-allowed' : 'pointer';
        elements.nextBtn.style.opacity = currentSlideIndex >= maxSlides ? '0.5' : '1';
        elements.nextBtn.style.cursor = currentSlideIndex >= maxSlides ? 'not-allowed' : 'pointer';
        
        console.log('Slider updated:', { currentSlideIndex, maxSlides, translateX });
    };

    const nextSlide = () => {
        console.log('Next slide clicked', { currentSlideIndex, maxSlides: sliderDimensions.maxSlides });
        
        if (isAnimating || currentSlideIndex >= sliderDimensions.maxSlides) {
            console.log('Next slide blocked');
            return;
        }
        
        isAnimating = true;
        currentSlideIndex++;
        updateSlider();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    };

    const prevSlide = () => {
        console.log('Prev slide clicked', { currentSlideIndex });
        
        if (isAnimating || currentSlideIndex <= 0) {
            console.log('Prev slide blocked');
            return;
        }
        
        isAnimating = true;
        currentSlideIndex--;
        updateSlider();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    };

    elements.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Next button clicked');
        nextSlide();
    });

    elements.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Prev button clicked');
        prevSlide();
    });

    let autoSlideInterval = setInterval(() => {
        if (currentSlideIndex >= sliderDimensions.maxSlides) {
            currentSlideIndex = -1; // Will be incremented to 0
        }
        nextSlide();
    }, 5000);

    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            if (currentSlideIndex >= sliderDimensions.maxSlides) {
                currentSlideIndex = -1;
            }
            nextSlide();
        }, 5000);
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    const handleResize = debounce(() => {
        sliderDimensions = getSliderDimensions();
        currentSlideIndex = Math.min(currentSlideIndex, sliderDimensions.maxSlides);
        updateSlider();
    }, 250);

    window.addEventListener('resize', handleResize);

    console.log('Initializing slider:', { trendingMovies: trendingMovies.length, sliderDimensions });
    updateSlider();
};

// ===== MODAL FUNCTIONALITY =====
const openModal = (movie) => {
    elements.modalPoster.src = movie.poster;
    elements.modalTitle.textContent = movie.title;
    elements.modalRating.textContent = `⭐ ${movie.rating}`;
    elements.modalYear.textContent = movie.year;
    elements.modalGenre.textContent = movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1);
    elements.modalDescription.textContent = movie.description;
    
    elements.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
        elements.modal.style.opacity = '1';
    });
};

const closeModal = () => {
    elements.modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

const initModal = () => {
    elements.closeBtn.addEventListener('click', closeModal);
    
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.modal.style.display === 'block') {
            closeModal();
        }
    });
};

// ===== HERO SECTION FUNCTIONALITY =====
const initHero = () => {
    elements.heroBtn.addEventListener('click', () => {
        smoothScroll('#movies');
    });

    if (elements.sidebarBtn) {
        elements.sidebarBtn.addEventListener('click', () => {
            const featuredMovie = moviesData.find(movie => movie.id === 1); // Spider-Man
            if (featuredMovie) {
                openModal(featuredMovie);
            }
        });
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
};

// ===== ANIMATIONS AND EFFECTS =====
const initAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
    });

    window.addEventListener('scroll', debounce(fadeInElements, 100));
};

// ===== PERFORMANCE OPTIMIZATIONS =====
const initPerformance = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    const criticalImages = [
        'assets/Spiderman.jpg',
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// ===== ACCESSIBILITY ENHANCEMENTS =====
const initAccessibility = () => {
    let lastFocusedElement;

    const trapFocus = (element) => {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    };

    const originalOpenModal = openModal;
    window.openModal = (movie) => {
        lastFocusedElement = document.activeElement;
        originalOpenModal(movie);
        elements.closeBtn.focus();
        trapFocus(elements.modal);
    };

    const originalCloseModal = closeModal;
    window.closeModal = () => {
        originalCloseModal();
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('movie-card')) {
                e.preventDefault();
                activeElement.click();
            }
        }
    });

    elements.searchInput.setAttribute('aria-label', 'Search movies');
    elements.genreFilter.setAttribute('aria-label', 'Filter by genre');
    elements.prevBtn.setAttribute('aria-label', 'Previous slide');
    elements.nextBtn.setAttribute('aria-label', 'Next slide');
};

// ===== INITIALIZATION =====
const init = () => {
    // Check if all required elements exist
    const requiredElements = Object.entries(elements);
    const missingElements = requiredElements.filter(([key, element]) => !element);
    
    if (missingElements.length > 0) {
        console.error('Missing elements:', missingElements.map(([key]) => key));
        return;
    }

    try {
        // Initialize all features
        initNavigation();
        initSearch();
        initSlider();
        initModal();
        initHero();
        initAnimations();
        initPerformance();
        initAccessibility();
        renderMovies(moviesData);
        document.body.classList.add('loaded');

        console.log('CinemaHub initialized successfully! 🎬');
        
    } catch (error) {
        console.error('Error initializing CinemaHub:', error);
    }
};

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', () => {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.remove());
    
    setTimeout(() => {
        fadeInElements();
    }, 300);
});
window.addEventListener('resize', debounce(() => {
    if (typeof updateSlider === 'function') {
        updateSlider();
    }
}, 250));

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        moviesData,
        createMovieCard,
        renderMovies,
        openModal,
        closeModal
    };
}