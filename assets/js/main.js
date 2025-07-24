// assets/js/main.js

// Ensure window.currentLanguage is initialized globally
window.currentLanguage = document.documentElement.lang || 'zh';

/**
 * Switches the language of the page.
 * @param {string} lang - The language code (e.g., 'zh', 'en').
 */
function switchLanguage(lang) {
    window.currentLanguage = lang;
    document.documentElement.lang = lang; // Set lang attribute on <html>
    updateTextContentForAllElements();
    updateActiveLangButtonInAllSwitchers();
    updateAllPlaceholders();
    // Dispatch a custom event that page-specific scripts can listen to
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: window.currentLanguage } }));
}

/**
 * Updates text content of elements with data-lang attributes.
 * Uses innerHTML to allow for simple HTML tags within translations.
 */
function updateTextContentForAllElements() {
    const elements = document.querySelectorAll('[data-lang-zh], [data-lang-en]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-lang-${window.currentLanguage}`);
        if (text !== null) { // Check if attribute exists and has a value
            // Preserve ARIA labels if they exist and are different from the text content
            const ariaLabelZh = el.getAttribute('aria-label-zh');
            const ariaLabelEn = el.getAttribute('aria-label-en');
            if (window.currentLanguage === 'zh' && ariaLabelZh) {
                el.setAttribute('aria-label', ariaLabelZh);
            } else if (window.currentLanguage === 'en' && ariaLabelEn) {
                el.setAttribute('aria-label', ariaLabelEn);
            }

            // Special handling for certain elements to avoid breaking their structure
            if (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'button')) {
                 el.value = text; // For input submit/button
            } else if (el.tagName === 'BUTTON' && !el.innerHTML.includes('<svg') && !el.innerHTML.includes('<img')) {
                 // For buttons, only update if no complex inner HTML (like SVGs/IMGs)
                 el.innerHTML = text;
            } else if (el.tagName === 'IMG') {
                // For images, update alt text if specific lang alt is provided
                const altText = el.getAttribute(`alt-lang-${window.currentLanguage}`);
                if (altText) {
                    el.alt = altText;
                }
            } else if (el.tagName === 'A' && el.classList.contains('sr-only')) { 
                 // Skip screen reader only links for innerHTML update
            }
            // General case for other elements or complex buttons/links
            else if (!el.querySelector('svg') && !el.querySelector('img')) { 
                el.innerHTML = text;
            } else {
                // Try to update only text nodes if complex children exist
                // This helps preserve SVGs or other complex structures inside a translated element
                let textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
                if (textNode) {
                    textNode.textContent = text;
                } else {
                    // Fallback for elements where text isn't a direct child text node but might be in a specific span
                    let span = el.querySelector('span[data-lang-target="true"]'); // Target specific spans if marked
                    if (span) {
                        span.innerHTML = text;
                    }
                    // If no specific target, and it's a simple button text, update it
                    else if (el.tagName === 'BUTTON' && el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
                         el.innerHTML = text;
                    }
                }
            }
        }
    });
}


/**
 * Updates the active state of language switcher buttons.
 */
function updateActiveLangButtonInAllSwitchers() {
    const allLangSwitchers = document.querySelectorAll('.language-switcher, .language-switcher-main');
    allLangSwitchers.forEach(switcher => {
        const langButtons = switcher.querySelectorAll('span[onclick*="switchLanguage"], span[onclick*="switchPageLanguage"]');
        langButtons.forEach(btn => {
            btn.classList.remove('active-lang');
            const langArg = btn.getAttribute('onclick').includes("'zh'") ? 'zh' : 'en';
            if (window.currentLanguage === langArg) {
                btn.classList.add('active-lang');
            }
        });
    });
}

/**
 * Updates placeholders for input and textarea fields.
 */
function updateAllPlaceholders() {
    const inputs = document.querySelectorAll('input[placeholder_zh], input[placeholder_en], textarea[placeholder_zh], textarea[placeholder_en]');
    inputs.forEach(input => {
        const placeholderText = input.getAttribute(`placeholder_${window.currentLanguage}`);
        if (placeholderText) {
            input.placeholder = placeholderText;
        }
    });
}


/**
 * Initializes the mobile menu functionality.
 */
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.setAttribute('aria-controls', 'mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenu.classList.toggle('open');
            mobileMenuButton.setAttribute('aria-expanded', isExpanded.toString());
            if (isExpanded) {
                mobileMenu.style.display = 'block';
            } else {
                mobileMenu.style.display = 'none';
            }
        });
    }
}

// General smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Ensure it's a valid internal anchor link and not just "#"
            if (hrefAttribute && hrefAttribute.startsWith("#") && hrefAttribute.length > 1) {
                 const targetElement = document.getElementById(hrefAttribute.substring(1));
                 if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                 }
            }
        });
    });
}


// Initialize all common functionalities on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize global language from HTML tag or default to 'zh'
    window.currentLanguage = document.documentElement.lang || 'zh'; 
    
    updateTextContentForAllElements();
    updateActiveLangButtonInAllSwitchers();
    updateAllPlaceholders();
    
    initializeMobileMenu();
    initializeSmoothScroll();

    // Ensure mobile menu is hidden if JS is enabled and menu is not 'open'
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('open')) {
        mobileMenu.style.display = 'none';
    }
});
