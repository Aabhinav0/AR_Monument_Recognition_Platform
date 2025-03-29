// Register service worker for offline support
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
*/

document.addEventListener('DOMContentLoaded', () => {
    // Initialize our application
    const app = {
        init: function() {
            // Initialize components
            QRScanner.init();
            ARController.init();
            
            // Comment out or conditionally initialize Feedback if it exists
            if (typeof Feedback !== 'undefined') {
                Feedback.init();
            }
            
            // Comment out or conditionally initialize Sharing if it exists
            if (typeof Sharing !== 'undefined') {
                Sharing.init();
            }
            
            // Initialize analytics if it exists
            if (typeof Analytics !== 'undefined') {
                Analytics.init(); // Initialize analytics
            }
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Simulate loading time (remove in production)
            setTimeout(() => {
                document.getElementById('loading-screen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading-screen').classList.add('hidden');
                    document.getElementById('scan-overlay').classList.remove('hidden');
                }, 500);
            }, 2000);
        },
        
        setupEventListeners: function() {
            document.getElementById('close-info').addEventListener('click', () => {
                document.getElementById('monument-info').classList.add('hidden');
                document.getElementById('scan-overlay').classList.remove('hidden');
                ARController.resetAR();
            });
        },
        
        displayMonumentInfo: function(monumentData) {
            console.log("Displaying monument info for:", monumentData.name);
            
            // Update the info panel
            const nameElement = document.getElementById('monument-name');
            const descElement = document.getElementById('monument-description');
            const dateElement = document.getElementById('monument-date');
            const creatorElement = document.getElementById('monument-creator');
            
            if (nameElement) nameElement.textContent = monumentData.name || 'Unknown Monument';
            if (descElement) descElement.textContent = monumentData.description || 'No description available';
            if (dateElement) dateElement.textContent = `Built: ${monumentData.date || 'Unknown date'}`;
            if (creatorElement) creatorElement.textContent = `Created by: ${monumentData.creator || 'Unknown creator'}`;
            
            // Show the info panel and hide the scan overlay
            const scanOverlay = document.getElementById('scan-overlay');
            const monumentInfo = document.getElementById('monument-info');
            
            if (scanOverlay) scanOverlay.classList.add('hidden');
            if (monumentInfo) monumentInfo.classList.remove('hidden');
            
            // If there's an AR model and AR Controller is available, display it
            if (monumentData.arModel && window.ARController) {
                try {
                    ARController.displayARForMonument(monumentData);
                } catch (error) {
                    console.error('Error displaying AR model:', error);
                }
            }
            
            // Track the view if Analytics is available
            if (window.Analytics) {
                Analytics.trackMonumentView(monumentData.id, monumentData.name);
            }
        }
    };
    
    // Start the application
    app.init();
    
    // Expose app to global scope for debugging
    window.app = app;
});

// Basic Feedback module
const Feedback = {
    init: function() {
        console.log('Feedback module initialized');
        // Add your feedback functionality here
    }
};

// Make it globally available
window.Feedback = Feedback;

// Basic Sharing module
const Sharing = {
    init: function() {
        console.log('Sharing module initialized');
        // Add your sharing functionality here
    }
};

// Make it globally available
window.Sharing = Sharing; 