const ModelLoader = {
    modelCache: {},
    
    loadModel: function(modelPath) {
        return new Promise((resolve, reject) => {
            // Check if the model is already cached
            if (this.modelCache[modelPath]) {
                resolve(this.modelCache[modelPath]);
                return;
            }
            
            // Create a model entity
            const modelEntity = document.createElement('a-entity');
            modelEntity.setAttribute('gltf-model', `url(assets/models/${modelPath})`);
            
            // Listen for model loaded event
            modelEntity.addEventListener('model-loaded', () => {
                console.log(`Model ${modelPath} loaded successfully`);
                this.modelCache[modelPath] = modelEntity;
                resolve(modelEntity);
            });
            
            // Listen for model error
            modelEntity.addEventListener('model-error', (error) => {
                console.error(`Error loading model ${modelPath}:`, error);
                reject(error);
            });
            
            // Add to scene temporarily to trigger loading
            document.querySelector('a-scene').appendChild(modelEntity);
            modelEntity.setAttribute('visible', 'false');
        });
    },
    
    createFallbackModel: function(monumentData) {
        // Create a simple geometric model as fallback
        const fallbackEntity = document.createElement('a-entity');
        
        // Create a base platform
        const baseCylinder = document.createElement('a-cylinder');
        baseCylinder.setAttribute('radius', '0.5');
        baseCylinder.setAttribute('height', '0.05');
        baseCylinder.setAttribute('color', '#333');
        fallbackEntity.appendChild(baseCylinder);
        
        // Create a representative shape based on monument type
        let mainShape;
        
        if (monumentData.id.includes('tower') || monumentData.id.includes('statue')) {
            // Create a tall structure
            mainShape = document.createElement('a-cone');
            mainShape.setAttribute('radius-bottom', '0.3');
            mainShape.setAttribute('radius-top', '0.05');
            mainShape.setAttribute('height', '1');
            mainShape.setAttribute('position', '0 0.5 0');
        } else if (monumentData.id.includes('wall')) {
            // Create a wall-like structure
            mainShape = document.createElement('a-box');
            mainShape.setAttribute('width', '1');
            mainShape.setAttribute('height', '0.3');
            mainShape.setAttribute('depth', '0.1');
            mainShape.setAttribute('position', '0 0.2 0');
        } else {
            // Default dome/building shape
            mainShape = document.createElement('a-sphere');
            mainShape.setAttribute('radius', '0.4');
            mainShape.setAttribute('theta-length', '90');
            mainShape.setAttribute('position', '0 0.4 0');
        }
        
        // Apply a gradient material
        mainShape.setAttribute('material', 'shader: standard; metalness: 0.3; roughness: 0.2;');
        mainShape.setAttribute('color', '#7d2ae8');
        
        fallbackEntity.appendChild(mainShape);
        
        // Add name text on the base
        const nameText = document.createElement('a-text');
        nameText.setAttribute('value', monumentData.name);
        nameText.setAttribute('align', 'center');
        nameText.setAttribute('width', '2');
        nameText.setAttribute('color', '#00f7ff');
        nameText.setAttribute('position', '0 0.1 0.6');
        fallbackEntity.appendChild(nameText);
        
        return fallbackEntity;
    }
}; 