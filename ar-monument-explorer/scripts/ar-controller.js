const ARController = {
    arScene: null,
    modelContainer: null,
    currentModel: null,
    
    init: function() {
        console.log('AR Controller initializing...');
        
        // Wait for A-Frame to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAR());
        } else {
            this.setupAR();
        }
    },
    
    setupAR: function() {
        // Get the A-Frame scene
        this.arScene = document.querySelector('a-scene');
        this.modelContainer = document.querySelector('#monument-model-container');
        
        if (!this.arScene || !this.modelContainer) {
            console.error('AR elements not found in DOM');
            return;
        }
        
        // Listen for scene loaded
        this.arScene.addEventListener('loaded', () => {
            console.log('AR Scene loaded successfully');
        });
        
        console.log('AR Controller initialized');
    },
    
    displayARForMonument: function(monumentData) {
        console.log('Displaying AR for monument:', monumentData.name);
        
        if (!this.modelContainer) {
            console.error('Model container not found');
            return;
        }
        
        // Clear existing model
        this.resetAR();
        
        // Create new AR content
        if (monumentData.arModel) {
            this.loadModel(monumentData.arModel, monumentData.id);
        } else {
            console.warn('No AR model specified for this monument');
            this.displayFallbackAR(monumentData);
        }
    },
    
    loadModel: function(modelPath, monumentId) {
        console.log('Loading model:', modelPath);
        
        // Create new entity for the model
        const modelEntity = document.createElement('a-entity');
        modelEntity.setAttribute('id', 'monument-model-' + monumentId);
        modelEntity.setAttribute('gltf-model', modelPath);
        modelEntity.setAttribute('position', '0 0 0');
        modelEntity.setAttribute('rotation', '0 0 0');
        modelEntity.setAttribute('scale', '0.5 0.5 0.5');
        
        // Add animation
        modelEntity.setAttribute('animation', {
            property: 'rotation',
            to: '0 360 0',
            dur: 10000,
            easing: 'linear',
            loop: true
        });
        
        // Add to container
        this.modelContainer.appendChild(modelEntity);
        this.currentModel = modelEntity;
        
        // Listen for model loaded
        modelEntity.addEventListener('model-loaded', () => {
            console.log('3D model loaded successfully:', modelPath);
        });
        
        // Listen for model error
        modelEntity.addEventListener('model-error', (error) => {
            console.error('Error loading 3D model:', error);
            this.displayFallbackAR({ name: monumentId });
        });
    },
    
    displayFallbackAR: function(monumentData) {
        console.log('Displaying fallback AR for:', monumentData.name);
        
        // Create text display as fallback
        const textEntity = document.createElement('a-text');
        textEntity.setAttribute('value', monumentData.name);
        textEntity.setAttribute('position', '0 0.5 0');
        textEntity.setAttribute('rotation', '-90 0 0');
        textEntity.setAttribute('align', 'center');
        textEntity.setAttribute('width', '2');
        textEntity.setAttribute('color', '#FFFFFF');
        
        this.modelContainer.appendChild(textEntity);
        this.currentModel = textEntity;
    },
    
    resetAR: function() {
        console.log('Resetting AR view');
        
        if (this.modelContainer) {
            // Remove all child elements
            while (this.modelContainer.firstChild) {
                this.modelContainer.removeChild(this.modelContainer.firstChild);
            }
            this.currentModel = null;
        }
    }
};

// Make it globally available
window.ARController = ARController;

// Initialize AR Controller
document.addEventListener('DOMContentLoaded', () => {
    ARController.init();
});