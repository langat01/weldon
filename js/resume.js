// Resume Download Functionality
function downloadResume() {
    const resumeFilePath = 'Documents/Weldon_Langat_kipkurui.pdf';

    try {
        const a = document.createElement('a');
        a.href = resumeFilePath;
        a.download = 'Weldon_Langat_Resume.pdf';
        a.target = '_blank';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        showNotification('Download started!', 'success');
    } catch (error) {
        console.error(error);
        showNotification('Resume not available.', 'error');
    }
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: #fff;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Attach handlers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(
        '#directDownload, #heroResumeBtn, .resume-download'
    ).forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            downloadResume();
        });
    });
});
