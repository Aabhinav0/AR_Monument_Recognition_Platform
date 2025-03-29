// Enhanced Error Handler module
const ErrorHandler = {
    init: function() {
        console.log('Error Handler initialized');
        
        // Global error handling
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.handleError(event.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            this.handleError(event.reason);
        });
    },
    
    handleError: function(error, context = {}) {
        const errorDetails = {
            message: error.message || 'Unknown error',
            stack: error.stack,
            timestamp: new Date().toISOString(),
            context: context,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Log error details
        console.error('Error Details:', errorDetails);

        // Handle specific types of errors
        if (error.name === 'QRScannerError') {
            this.handleQRScannerError(error);
        }

        // You could send this to a logging service
        this.sendToLoggingService(errorDetails);
    },

    handleQRScannerError: function(error) {
        const qrErrors = {
            'NotFoundError': 'No camera found. Please ensure your device has a camera.',
            'NotAllowedError': 'Camera permission denied. Please allow camera access.',
            'NotReadableError': 'Cannot access camera. It might be in use by another application.',
            'OverconstrainedError': 'No suitable camera found.',
            'SecurityError': 'Camera access blocked due to security restrictions.',
            'AbortError': 'Camera initialization was aborted.'
        };

        const errorMessage = qrErrors[error.name] || error.message;
        console.error('QR Scanner Error:', errorMessage);
        
        // You can trigger UI feedback here
        if (typeof window.showErrorToUser === 'function') {
            window.showErrorToUser(errorMessage);
        }
    },

    sendToLoggingService: function(errorDetails) {
        // Implementation for sending to your logging service
        // For example:
        try {
            // You would replace this URL with your actual logging service endpoint
            fetch('/api/log-error', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(errorDetails)
            }).catch(err => console.error('Failed to send error to logging service:', err));
        } catch (e) {
            console.error('Failed to send error to logging service:', e);
        }
    }
};

// Make it globally available
window.ErrorHandler = ErrorHandler;

// Initialize error handler when the script loads
document.addEventListener('DOMContentLoaded', () => {
    ErrorHandler.init();
});

// Add this function right after the ErrorHandler object declaration
window.showErrorToUser = function(message) {
    const scanStatus = document.getElementById('scan-status');
    if (scanStatus) {
        scanStatus.textContent = message;
        scanStatus.style.color = '#ff3860';
        setTimeout(() => {
            scanStatus.style.color = 'var(--text-color)';
            scanStatus.textContent = 'Ready to scan';
        }, 3000);
    }
}; 