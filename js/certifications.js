// Enhanced Certificate Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateImg');
    const closeBtn = document.querySelector('.close');
    
    // Open modal function
    function openCertificate(imagePath) {
        if (imagePath && modal && modalImg) {
            modalImg.src = imagePath;
            modal.style.display = 'block';
            document.body.classList.add('modal-open'); // Add class to body
            document.documentElement.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Close modal function
    function closeCertificate() {
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open'); // Remove class from body
            document.documentElement.style.overflow = 'auto'; // Re-enable scrolling
            modalImg.src = ''; // Clear image to prevent memory leak
        }
    }
    
    // Open certificate when clicking view buttons
    document.querySelectorAll('.view-certificate-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            
            const imagePath = this.getAttribute('data-certificate');
            console.log('Opening certificate:', imagePath);
            openCertificate(imagePath);
        });
    });
    
    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeCertificate();
        });
    }
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal')) {
            e.stopPropagation();
            closeCertificate();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeCertificate();
        }
    });
    
    // Close modal when clicking navigation links
    document.querySelectorAll('.nav-links a, .footer-links a, .btn[href^="#"]').forEach(link => {
        link.addEventListener('click', function() {
            if (modal.style.display === 'block') {
                closeCertificate();
            }
        });
    });
    
    // Also close modal when smooth scrolling happens (for any anchor links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function() {
            setTimeout(() => {
                if (modal.style.display === 'block') {
                    closeCertificate();
                }
            }, 100);
        });
    });
});
