// Basic Analytics module
const Analytics = {
    sessionId: null,
    startTime: null,
    events: [],
    
    init: function() {
        console.log('Analytics module initialized');
        // Generate a random session ID
        this.sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
        this.startTime = new Date();
        
        // Track session start
        this.trackEvent('session_start', {
            userAgent: navigator.userAgent,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight
        });
        
        // Track when user leaves the page
        window.addEventListener('beforeunload', () => {
            this.trackEvent('session_end', {
                duration: (new Date() - this.startTime) / 1000
            });
            this.sendEvents(); // Try to send events before page unloads
        });
        
        // Set up periodic sending of events
        setInterval(() => {
            this.sendEvents();
        }, 30000); // Send events every 30 seconds
    },
    
    trackEvent: function(eventName, eventData = {}) {
        const event = {
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            eventName: eventName,
            eventData: eventData
        };
        
        this.events.push(event);
        console.log('Tracked event:', event); // For debugging
        
        // If we have many events, send them immediately
        if (this.events.length >= 10) {
            this.sendEvents();
        }
    },
    
    trackMonumentView: function(monumentId, monumentName) {
        console.log(`Monument viewed: ${monumentName} (${monumentId})`);
    },
    
    trackError: function(errorType, errorDetails) {
        this.trackEvent('error', {
            errorType: errorType,
            errorDetails: errorDetails
        });
    },
    
    sendEvents: function() {
        if (this.events.length === 0) return;
        
        // In a real application, you would send these events to your server
        // For this example, we'll just log them and store in localStorage
        
        // Clone the events array
        const eventsToSend = [...this.events];
        
        // Clear the events array
        this.events = [];
        
        // Store in localStorage (for demonstration)
        try {
            const existingData = JSON.parse(localStorage.getItem('arExplorerAnalytics') || '[]');
            const updatedData = [...existingData, ...eventsToSend];
            localStorage.setItem('arExplorerAnalytics', JSON.stringify(updatedData));
            console.log('Analytics events saved to localStorage');
        } catch (error) {
            console.error('Failed to save analytics data:', error);
        }
        
        // In a real app, you would send to your server:
        /*
        fetch('https://your-analytics-endpoint.com/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                events: eventsToSend
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Analytics events sent successfully');
        })
        .catch(error => {
            console.error('Error sending analytics events:', error);
            // Put events back in the queue
            this.events = [...eventsToSend, ...this.events];
        });
        */
    },
    
    // Utility to view analytics data (for development)
    viewStoredAnalytics: function() {
        try {
            const data = JSON.parse(localStorage.getItem('arExplorerAnalytics') || '[]');
            console.table(data);
            return data;
        } catch (error) {
            console.error('Failed to retrieve analytics data:', error);
            return [];
        }
    }
};

// Make it globally available
window.Analytics = Analytics; 