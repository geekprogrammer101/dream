// Dreams Academy Landing Page JavaScript - Complete Rewrite for Bug Fixes
console.log('🎬 Dreams Academy JavaScript Loading...');

let isPageReady = false;

// Wait for both DOM and all resources to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    initializePage();
});

window.addEventListener('load', function() {
    console.log('Window Load Complete');
    isPageReady = true;
});

function initializePage() {
    console.log('🚀 Initializing Dreams Academy Landing Page...');
    
    // Critical fixes first
    fixEnrollButtons();
    fixVideoPlayButton();
    fixFAQAccordion();
    fixResourceButtons();
    
    // Then enhance other features
    initScrollAnimations();
    initWhatsAppButton();
    initScrollToTop();
    initCounterAnimations();
    initAccessibilityFeatures();
    
    console.log('✅ Dreams Academy page initialization complete!');
}

// CRITICAL FIX #1: Fix all Enroll buttons
function fixEnrollButtons() {
    console.log('🔧 Fixing Enroll Buttons...');
    
    const enrollUrl = 'https://form.typeform.com/to/p1dfW2Ab';
    
    // Find all enroll buttons with multiple selectors
    const enrollSelectors = [
        '.enroll-btn',
        '.guarantee-btn',
        '.final-cta-btn',
        'a[href*="typeform.com"]',
        'a[href*="p1dfW2Ab"]'
    ];
    
    let buttonCount = 0;
    
    enrollSelectors.forEach(selector => {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(button => {
            buttonCount++;
            console.log(`Setting up enroll button ${buttonCount}: ${button.textContent.trim()}`);
            
            // Ensure it's a proper link
            if (button.tagName.toLowerCase() !== 'a') {
                console.log('Converting button to link');
                const link = document.createElement('a');
                link.href = enrollUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = button.className;
                link.innerHTML = button.innerHTML;
                link.style.cssText = button.style.cssText;
                
                button.parentNode.replaceChild(link, button);
                button = link;
            } else {
                // It's already a link, just fix the attributes
                button.href = enrollUrl;
                button.target = '_blank';
                button.rel = 'noopener noreferrer';
            }
            
            // Remove any conflicting event listeners
            button.onclick = null;
            button.removeAttribute('data-bs-toggle');
            button.removeAttribute('data-bs-target');
            
            // Add our click handler for tracking
            button.addEventListener('click', function(e) {
                console.log('✅ Enroll button clicked!', this.href);
                
                // Visual feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Show notification
                showNotification('Opening enrollment form...', 'success', 2000);
                
                // Track event
                trackEvent('enroll_click', {
                    button_location: getButtonLocation(this),
                    button_text: this.textContent.trim(),
                    url: this.href
                });
            });
            
            console.log(`✅ Enroll button ${buttonCount} configured:`, button.href);
        });
    });
    
    console.log(`📊 Total enroll buttons configured: ${buttonCount}`);
}

// CRITICAL FIX #2: Fix Video Play Button and Modal
function fixVideoPlayButton() {
    console.log('🔧 Fixing Video Play Button...');
    
    const playButton = document.querySelector('.play-button');
    const videoThumbnail = document.querySelector('.video-thumbnail');
    
    if (!playButton) {
        console.error('❌ Play button not found!');
        return;
    }
    
    console.log('✅ Play button found');
    
    // Remove any existing event listeners
    playButton.onclick = null;
    playButton.removeAttribute('data-bs-toggle');
    playButton.removeAttribute('data-bs-target');
    
    // Add tabindex for keyboard access
    playButton.setAttribute('tabindex', '0');
    playButton.setAttribute('role', 'button');
    playButton.setAttribute('aria-label', 'Play course preview video');
    
    // Add click event listener
    playButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎥 Play button clicked!');
        handleVideoPlay();
    });
    
    // Add keyboard support
    playButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎥 Play button activated via keyboard');
            handleVideoPlay();
        }
    });
    
    // Make video thumbnail clickable
    if (videoThumbnail) {
        videoThumbnail.style.cursor = 'pointer';
        videoThumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎥 Video thumbnail clicked!');
            handleVideoPlay();
        });
    }
    
    console.log('✅ Video play button configured');
}

function handleVideoPlay() {
    console.log('🎥 Handling video play...');
    
    // Add click animation
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            playButton.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Create and show modal
    createVideoModal();
    trackEvent('video_play_attempted');
}

function createVideoModal() {
    console.log('🎥 Creating video modal...');
    
    // Remove existing modal if present
    const existingModal = document.querySelector('.video-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="video-modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(5px);
        ">
            <div class="video-modal-content" style="
                background: white;
                padding: 2.5rem;
                border-radius: 16px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                text-align: center;
                position: relative;
                margin: 1rem;
                transform: scale(0.9);
                transition: transform 0.3s ease;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
                <button class="close-modal" style="
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                    line-height: 1;
                    padding: 5px;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                " aria-label="Close modal">&times;</button>
                
                <div style="margin-bottom: 1.5rem;">
                    <div style="
                        width: 80px;
                        height: 80px;
                        background: linear-gradient(135deg, #ff6b35, #ff8c42);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1rem;
                        box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
                    ">
                        <i class="fas fa-play-circle" style="font-size: 2rem; color: white;"></i>
                    </div>
                </div>
                
                <h3 style="margin-bottom: 1rem; color: #333; font-size: 1.75rem; font-weight: 700;">
                    Course Preview Coming Soon!
                </h3>
                
                <p style="margin-bottom: 2rem; color: #666; line-height: 1.6; font-size: 1.1rem;">
                    Our comprehensive course preview video is currently being produced with professional quality. 
                    Meanwhile, secure your spot in the next batch starting September 15, 2025!
                </p>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem;">
                    <a href="https://form.typeform.com/to/p1dfW2Ab" target="_blank" rel="noopener noreferrer"
                       class="modal-enroll-btn" style="
                           background: linear-gradient(135deg, #ff6b35, #ff8c42);
                           color: white;
                           padding: 14px 28px;
                           border: none;
                           border-radius: 8px;
                           text-decoration: none;
                           display: inline-flex;
                           align-items: center;
                           font-weight: 700;
                           font-size: 1.05rem;
                           transition: all 0.3s ease;
                           box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                       ">
                        <i class="fas fa-rocket" style="margin-right: 8px;"></i>
                        Enroll Now
                    </a>
                    <button class="close-modal-btn" style="
                        background: #f8f9fa;
                        color: #333;
                        padding: 14px 28px;
                        border: 2px solid #e5e5e5;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        font-size: 1.05rem;
                        transition: all 0.3s ease;
                    ">
                        Maybe Later
                    </button>
                </div>
                
                <p style="margin-top: 1rem; font-size: 0.9rem; color: #999;">
                    <i class="fas fa-shield-alt" style="margin-right: 5px; color: #22c55e;"></i>
                    7-day money-back guarantee
                </p>
            </div>
        </div>
    `;
    
    // Insert modal into DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.querySelector('.video-modal-overlay');
    const content = modal.querySelector('.video-modal-content');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Setup event listeners
    setupModalEvents(modal);
    
    trackEvent('video_modal_opened');
    console.log('✅ Video modal created and displayed');
}

function setupModalEvents(modal) {
    const closeButtons = modal.querySelectorAll('.close-modal, .close-modal-btn');
    const enrollBtn = modal.querySelector('.modal-enroll-btn');
    
    const closeModal = () => {
        console.log('🔐 Closing modal...');
        modal.style.opacity = '0';
        modal.querySelector('.video-modal-content').style.transform = 'scale(0.9)';
        document.body.style.overflow = '';
        
        setTimeout(() => {
            if (modal && modal.parentNode) {
                modal.remove();
            }
        }, 300);
        
        trackEvent('video_modal_closed');
    };
    
    // Close button handlers
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    });
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Escape key to close
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Track enroll button in modal
    if (enrollBtn) {
        enrollBtn.addEventListener('click', (e) => {
            console.log('✅ Modal enroll button clicked');
            showNotification('Opening enrollment form...', 'success', 2000);
            trackEvent('enroll_click', {
                source: 'video_modal',
                button_text: 'Enroll Now'
            });
        });
    }
}

// CRITICAL FIX #3: Fix FAQ Accordion
function fixFAQAccordion() {
    console.log('🔧 Fixing FAQ Accordion...');
    
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach((button, index) => {
        console.log(`Setting up FAQ button ${index + 1}: ${button.textContent.trim()}`);
        
        // Ensure proper Bootstrap attributes are set
        const target = button.getAttribute('data-bs-target');
        if (!target) {
            console.error(`FAQ button ${index + 1} missing data-bs-target`);
            return;
        }
        
        // Remove any conflicting onclick handlers
        button.onclick = null;
        
        // The Bootstrap JavaScript will handle the accordion functionality
        // We just need to make sure we don't interfere with it
        button.addEventListener('click', function(e) {
            // Let Bootstrap handle the accordion
            console.log(`FAQ button clicked: ${this.textContent.trim()}`);
            trackEvent('faq_clicked', {
                question: this.textContent.trim(),
                target: this.getAttribute('data-bs-target')
            });
        });
    });
    
    console.log(`✅ FAQ accordion configured with ${accordionButtons.length} questions`);
}

// CRITICAL FIX #4: Fix Resource Download Buttons
function fixResourceButtons() {
    console.log('🔧 Fixing Resource Buttons...');
    
    const resourceButtons = document.querySelectorAll('.resource-btn');
    
    resourceButtons.forEach((button, index) => {
        const resourceTitle = button.closest('.card').querySelector('.resource-title').textContent;
        console.log(`Setting up resource button ${index + 1}: ${resourceTitle}`);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleResourceDownload(this, resourceTitle);
        });
    });
    
    console.log(`✅ Resource buttons configured: ${resourceButtons.length}`);
}

function handleResourceDownload(button, resourceTitle) {
    const originalHTML = button.innerHTML;
    
    console.log(`📥 Downloading resource: ${resourceTitle}`);
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Preparing...';
    button.disabled = true;
    button.classList.remove('btn-outline-primary');
    button.classList.add('btn-secondary');
    
    // Simulate download process
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check me-2"></i>Success!';
        button.classList.remove('btn-secondary');
        button.classList.add('btn-success');
        
        showNotification(`${resourceTitle} is ready!`, 'success');
        
        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.disabled = false;
            button.classList.remove('btn-success');
            button.classList.add('btn-outline-primary');
        }, 3000);
        
    }, 1500 + Math.random() * 1000);
    
    trackEvent('resource_download', {
        resource_name: resourceTitle
    });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .resource-card, .testimonial-card, .frustrations-card, .solutions-card, .partner-logo'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
    
    // Add animation CSS
    if (!document.querySelector('#scroll-animations')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations';
        style.textContent = `
            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// WhatsApp Button
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            showNotification('Opening WhatsApp chat...', 'success', 2000);
            trackEvent('whatsapp_click');
        });
    }
}

// Scroll to Top
function initScrollToTop() {
    let scrollButton = null;
    
    const createScrollButton = () => {
        if (scrollButton) return;
        
        scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #ff6b35;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 999;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        `;
        
        scrollButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            trackEvent('scroll_to_top_clicked');
        });
        
        document.body.appendChild(scrollButton);
    };
    
    window.addEventListener('scroll', debounce(() => {
        createScrollButton();
        
        if (window.pageYOffset > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(20px)';
        }
    }, 100));
}

// Counter Animations
function initCounterAnimations() {
    const trustSection = document.querySelector('.trust-section');
    if (!trustSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(trustSection);
}

function animateCounters() {
    const trustTitle = document.querySelector('.trust-title');
    if (!trustTitle) return;
    
    let current = 0;
    const target = 5000;
    const increment = target / 100;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        trustTitle.textContent = `Trusted by ${Math.floor(current).toLocaleString()}+ aspiring filmmakers`;
    }, 20);
}

// Accessibility Features
function initAccessibilityFeatures() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    if (!document.querySelector('#accessibility-styles')) {
        const style = document.createElement('style');
        style.id = 'accessibility-styles';
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 3px solid #ff6b35 !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getButtonLocation(button) {
    if (button.closest('.hero-section')) return 'hero';
    if (button.closest('.guarantee-section')) return 'guarantee';
    if (button.closest('.final-cta-section')) return 'final-cta';
    if (button.closest('.video-modal-overlay')) return 'video-modal';
    return 'other';
}

function showNotification(message, type = 'info', duration = 4000) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function trackEvent(eventName, properties = {}) {
    console.log(`📊 Event: ${eventName}`, properties);
    
    if (!window.analyticsEvents) window.analyticsEvents = [];
    window.analyticsEvents.push({
        name: eventName,
        properties,
        timestamp: new Date().toISOString()
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno
    });
});

// Page Load Tracking
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`✅ Page loaded in ${Math.round(loadTime)}ms`);
    trackEvent('page_load_complete', { load_time: Math.round(loadTime) });
});

console.log('🎬✨ Dreams Academy JavaScript Loaded and Ready!');