// Resume Download Functionality
function downloadResume() {
    // Use the exact path to your uploaded file
    const resumeFilePath = '/Documents/Weldon_Langat_kipkurui.pdf';
    
    // Create a download link
    const a = document.createElement('a');
    a.href = resumeFilePath;
    a.download = 'Weldon_Langat_Resume.pdf'; // This will be the downloaded filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show success message
    showNotification('Resume downloaded successfully!', 'success');
}

// Optional: Enhanced version with error handling
function downloadResume() {
    try {
        const resumeFilePath = '/Documents/Weldon_Langat_kipkurui.pdf';
        const a = document.createElement('a');
        
        // Set the file path
        a.href = resumeFilePath;
        
        // Set the download filename (users will see this name)
        a.download = 'Weldon_Langat_Resume.pdf';
        
        // For mobile devices
        a.target = '_blank';
        
        // Add to page and trigger download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Show success message
        showNotification('Download started! Check your downloads folder.', 'success');
        
    } catch (error) {
        console.error('Download error:', error);
        showNotification('Unable to download resume. Please try again.', 'error');
    }
}

// Notification function (optional but recommended)
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'resume-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add CSS animations
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadResume');
    const heroBtn = document.getElementById('heroResumeBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadResume();
        });
    }
    
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadResume();
        });
    }
    
    // Optional: Add download button to any element with class "resume-download"
    document.querySelectorAll('.resume-download').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadResume();
        });
    });
});
