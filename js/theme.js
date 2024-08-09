'use strict';

document.addEventListener('DOMContentLoaded', function () {
    /* ===============================================================
		GLIGHTBOX
	=============================================================== */
    const lightbox = GLightbox({
        touchNavigation: true,
    });

    /* =====================================================
		BOOTSTRAP SCROLLSPY
	===================================================== */
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar',
    });
});
