
document.addEventListener('DOMContentLoaded', () => {
    // Find all elements with the 'copy-target' class
    const copyTargets = document.querySelectorAll('.copy-target');

    copyTargets.forEach(target => {
        target.addEventListener('click', () => {
            const textToCopy = target.getAttribute('data-copy');

            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Show feedback
                    showToast(`Copied: ${textToCopy}`);

                    // Optional: Visual feedback on the element itself
                    target.classList.add('copied-animation');
                    setTimeout(() => target.classList.remove('copied-animation'), 500);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    showToast('Failed to copy', true);
                });
            }
        });
    });
});

function showToast(message, isError = false) {
    // Check if toast container exists, creates it if not
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'error' : ''}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toast);
            if (container.children.length === 0) {
                // optionally remove container, but keeping it is fine
            }
        }, 300);
    }, 3000);
}
