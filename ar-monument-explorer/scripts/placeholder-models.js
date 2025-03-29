// This script creates placeholder 3D models for testing
// In a real application, you would use actual 3D models

const PlaceholderModels = {
    createPlaceholderModel: function(monumentId) {
        const entity = document.createElement('a-entity');
        
        switch(monumentId) {
            case 'taj_mahal':
                this.createTajMahalPlaceholder(entity);
                break;
            case 'eiffel_tower':
                this.createEiffelTowerPlaceholder(entity);
                break;
            case 'statue_of_liberty':
                this.createLibertyPlaceholder(entity);
                break;
            case 'great_wall':
                this.createGreatWallPlaceholder(entity);
                break;
            default:
                this.createGenericPlaceholder(entity);
        }
        
        return entity;
    },
    
    createTajMahalPlaceholder: function(entity) {
        // Base
        const base = document.createElement('a-box');
        base.setAttribute('width', '0.8');
        base.setAttribute('height', '0.1');
        base.setAttribute('depth', '0.8');
        base.setAttribute('color', '#f5f5f5');
        base.setAttribute('position', '0 0 0');
        entity.appendChild(base);
        
        // Main dome
        const dome = document.createElement('a-sphere');
        dome.setAttribute('radius', '0.2');
        dome.setAttribute('theta-length', '180');
        dome.setAttribute('position', '0 0.4 0');
        dome.setAttribute('color', '#ffffff');
        entity.appendChild(dome);
        
        // Four minarets
        const positions = [
            {x: 0.3, z: 0.3},
            {x: -0.3, z: 0.3},
            {x: 0.3, z: -0.3},
            {x: -0.3, z: -0.3}
        ];
        
        positions.forEach(pos => {
            const minaret = document.createElement('a-cylinder');
            minaret.setAttribute('radius', '0.03');
            minaret.setAttribute('height', '0.4');
            minaret.setAttribute('color', '#ffffff');
            minaret.setAttribute('position', `${pos.x} 0.25 ${pos.z}`);
            entity.appendChild(minaret);
            
            const top = document.createElement('a-sphere');
            top.setAttribute('radius', '0.04');
            top.setAttribute('theta-length', '180');
            top.setAttribute('position', `${pos.x} 0.45 ${pos.z}`);
            top.setAttribute('color', '#ffffff');
            entity.appendChild(top);
        });
    },
    
    createEiffelTowerPlaceholder: function(entity) {
        // Base
        const base = document.createElement('a-box');
        base.setAttribute('width', '0.6');
        base.setAttribute('height', '0.05');
        base.setAttribute('depth', '0.6');
        base.setAttribute('color', '#555555');
        base.setAttribute('position', '0 0 0');
        entity.appendChild(base);
        
        // Tower sections (from bottom to top)
        const sections = [
            {width: 0.5, height: 0.2, y: 0.15},
            {width: 0.4, height: 0.2, y: 0.35},
            {width: 0.3, height: 0.2, y: 0.55},
            {width: 0.1, height: 0.3, y: 0.8}
        ];
        
        sections.forEach(section => {
            const part = document.createElement('a-box');
            part.setAttribute('width', section.width);
            part.setAttribute('height', section.height);
            part.setAttribute('depth', section.width);
            part.setAttribute('color', '#888888');
            part.setAttribute('position', `0 ${section.y} 0`);
            entity.appendChild(part);
        });
        
        // Top spire
        const spire = document.createElement('a-cone');
        spire.setAttribute('radius-bottom', '0.05');
        spire.setAttribute('radius-top', '0.01');
        spire.setAttribute('height', '0.2');
        spire.setAttribute('color', '#888888');
        spire.setAttribute('position', '0 1.05 0');
        entity.appendChild(spire);
    },
    
    createLibertyPlaceholder: function(entity) {
        // Base
        const base = document.createElement('a-cylinder');
        base.setAttribute('radius', '0.25');
        base.setAttribute('height', '0.1');
        base.setAttribute('color', '#555555');
        base.setAttribute('position', '0 0 0');
        entity.appendChild(base);
        
        // Pedestal
        const pedestal = document.createElement('a-cylinder');
        pedestal.setAttribute('radius', '0.15');
        pedestal.setAttribute('height', '0.2');
        pedestal.setAttribute('color', '#aaaaaa');
        pedestal.setAttribute('position', '0 0.15 0');
        entity.appendChild(pedestal);
        
        // Body
        const body = document.createElement('a-cone');
        body.setAttribute('radius-bottom', '0.15');
        body.setAttribute('radius-top', '0.1');
        body.setAttribute('height', '0.4');
        body.setAttribute('color', '#8a9e6b');
        body.setAttribute('position', '0 0.45 0');
        entity.appendChild(body);
        
        // Head
        const head = document.createElement('a-sphere');
        head.setAttribute('radius', '0.06');
        head.setAttribute('color', '#8a9e6b');
        head.setAttribute('position', '0 0.7 0');
        entity.appendChild(head);
        
        // Torch arm
        const arm = document.createElement('a-box');
        arm.setAttribute('width', '0.05');
        arm.setAttribute('height', '0.15');
        arm.setAttribute('depth', '0.05');
        arm.setAttribute('color', '#8a9e6b');
        arm.setAttribute('position', '0.1 0.65 0');
        arm.setAttribute('rotation', '0 0 45');
        entity.appendChild(arm);
        
        // Torch
        const torch = document.createElement('a-cone');
        torch.setAttribute('radius-bottom', '0.04');
        torch.setAttribute('radius-top', '0.02');
        torch.setAttribute('height', '0.08');
        torch.setAttribute('color', '#ffcc00');
        torch.setAttribute('position', '0.18 0.75 0');
        entity.appendChild(torch);
    },
    
    createGreatWallPlaceholder: function(entity) {
        // Base terrain
        const terrain = document.createElement('a-box');
        terrain.setAttribute('width', '1');
        terrain.setAttribute('height', '0.1');
        terrain.setAttribute('depth', '0.4');
        terrain.setAttribute('color', '#7a6643');
        terrain.setAttribute('position', '0 0 0');
        entity.appendChild(terrain);
        
        // Wall segments
        for (let i = -0.45; i <= 0.45; i += 0.15) {
            // Main wall
            const wall = document.createElement('a-box');
            wall.setAttribute('width', '0.1');
            wall.setAttribute('height', '0.15');
            wall.setAttribute('depth', '0.3');
            wall.setAttribute('color', '#a89b7a');
            wall.setAttribute('position', `${i} 0.125 0`);
            entity.appendChild(wall);
            
            // Battlements
            const battlement1 = document.createElement('a-box');
            battlement1.setAttribute('width', '0.03');
            battlement1.setAttribute('height', '0.05');
            battlement1.setAttribute('depth', '0.3');
            battlement1.setAttribute('color', '#a89b7a');
            battlement1.setAttribute('position', `${i-0.035} 0.225 0`);
            entity.appendChild(battlement1);
            
            const battlement2 = document.createElement('a-box');
            battlement2.setAttribute('width', '0.03');
            battlement2.setAttribute('height', '0.05');
            battlement2.setAttribute('depth', '0.3');
            battlement2.setAttribute('color', '#a89b7a');
            battlement2.setAttribute('position', `${i+0.035} 0.225 0`);
            entity.appendChild(battlement2);
        }
        
        // Watchtowers
        const positions = [{x: -0.4}, {x: 0}, {x: 0.4}];
        positions.forEach(pos => {
            const tower = document.createElement('a-box');
            tower.setAttribute('width', '0.15');
            tower.setAttribute('height', '0.25');
            tower.setAttribute('depth', '0.15');
            tower.setAttribute('color', '#a89b7a');
            tower.setAttribute('position', `${pos.x} 0.175 0`);
            entity.appendChild(tower);
            
            const roof = document.createElement('a-cone');
            roof.setAttribute('radius-bottom', '0.1');
            roof.setAttribute('radius-top', '0.01');
            roof.setAttribute('height', '0.1');
            roof.setAttribute('segments-radial', '4');
            roof.setAttribute('color', '#8b4513');
            roof.setAttribute('position', `${pos.x} 0.35 0`);
            entity.appendChild(roof);
        });
    },
    
    createGenericPlaceholder: function(entity) {
        // Simple placeholder for any monument
        const base = document.createElement('a-cylinder');
        base.setAttribute('radius', '0.3');
        base.setAttribute('height', '0.05');
        base.setAttribute('color', '#555555');
        base.setAttribute('position', '0 0 0');
        entity.appendChild(base);
        
        const monument = document.createElement('a-cone');
        monument.setAttribute('radius-bottom', '0.2');
        monument.setAttribute('radius-top', '0');
        monument.setAttribute('height', '0.6');
        monument.setAttribute('color', '#888888');
        monument.setAttribute('position', '0 0.35 0');
        entity.appendChild(monument);
    }
}; 