/* Lightweight performance enhancements: lazy-load images, defer non-critical CSS, safe AOS init */
(function () {
    try {
        // Ensure all images without explicit loading get lazy by default
        document.querySelectorAll('img:not([loading])').forEach((img) => {
            img.setAttribute('loading', 'lazy');
        });

        // Add rel=noopener to external links for security
        document.querySelectorAll('a[target="_blank"]').forEach((a) => {
            if (!a.rel) a.rel = 'noopener';
            else if (!/noopener/.test(a.rel)) a.rel += ' noopener';
        });

        // Initialize AOS if available
        if (window.AOS && typeof AOS.init === 'function') {
            AOS.init({ once: true, duration: 700, easing: 'ease-out' });
        }

        // Highlight.js safe init
        if (window.hljs && typeof window.hljs.highlightAll === 'function') {
            window.hljs.highlightAll();
        }

        // Particle init guard
        if (window.particlesJS && document.querySelector('.hero-particles')) {
            // Assume existing config elsewhere; this guard avoids errors if script loads before container
        }
    } catch (e) {
        // Silently fail; main site logic should not be blocked
        console && console.debug && console.debug('perf.js error:', e);
    }
})();
