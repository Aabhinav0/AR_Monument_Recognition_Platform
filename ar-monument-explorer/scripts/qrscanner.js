// QR Scanner Module
const QRScanner = {
    video: null,
    canvas: null,
    context: null,
    scanning: false,
    scanInterval: null,
    
    monuments: {
        'taj_mahal': {
            id: 'taj_mahal',
            name: 'Taj Mahal',
            description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India.',
            date: '1632-1653',
            creator: 'Shah Jahan',
            arModel: './models/taj_mahal.glb'
        },
        'eiffel_tower': {
            id: 'eiffel_tower',
            name: 'Eiffel Tower',
            description: 'A wrought-iron lattice tower on the Champ de Mars in Paris, France.',
            date: '1887-1889',
            creator: 'Gustave Eiffel',
            arModel: './models/eiffel_tower.glb'
        },
        'statue_of_liberty': {
            id: 'statue_of_liberty',
            name: 'Statue of Liberty',
            description: 'A colossal neoclassical sculpture on Liberty Island in New York Harbor.',
            date: '1875-1886',
            creator: 'Frédéric Auguste Bartholdi',
            arModel: './models/statue_of_liberty.glb'
        },
        'great_wall': {
            id: 'great_wall',
            name: 'Great Wall of China',
            description: 'An ancient series of walls and fortifications in northern China.',
            date: '7th century BCE - 16th century CE',
            creator: 'Various Chinese Dynasties',
            arModel: './models/great_wall.glb'
        },
        'petra': {
            id: 'petra',
            name: 'Petra',
            description: 'Ancient city carved into rose-colored rock face in southern Jordan.',
            date: '312 BCE',
            creator: 'Nabataean Kingdom',
            arModel: './models/petra.glb'
        },
        'colosseum': {
            id: 'colosseum',
            name: 'Colosseum',
            description: 'An oval amphitheatre in the centre of Rome, Italy.',
            date: '70-80 CE',
            creator: 'Ancient Romans',
            arModel: './models/colosseum.glb'
        }
    },
    
    init: function() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d', { willReadFrequently: true });

        document.getElementById('scan-button').addEventListener('click', () => {
            if (!this.scanning) {
                this.startScanning();
            } else {
                this.stopScanning();
            }
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.scanning) {
                this.stopScanning();
            }
        });
    },
    
    startScanning: function() {
        if (this.scanning) return;
        
        const constraints = {
            video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                this.video.srcObject = stream;
                this.video.setAttribute('playsinline', true);
                this.scanning = true;
                document.getElementById('scan-button').textContent = 'Stop Scanning';
                document.getElementById('scan-status').textContent = 'Scanning...';
                
                // Start scanning loop when video is ready
                this.video.onloadedmetadata = () => {
                    this.canvas.width = this.video.videoWidth;
                    this.canvas.height = this.video.videoHeight;
                    this.scanInterval = setInterval(() => this.scan(), 100); // Scan every 100ms
                };
            })
            .catch(error => {
                console.error('Camera error:', error);
                document.getElementById('scan-status').textContent = 'Camera error: ' + error.message;
            });
    },
    
    stopScanning: function() {
        if (!this.scanning) return;
        
        clearInterval(this.scanInterval);
        
        if (this.video.srcObject) {
            this.video.srcObject.getTracks().forEach(track => track.stop());
        }
        
        this.video.srcObject = null;
        this.scanning = false;
        document.getElementById('scan-button').textContent = 'Start Scanning';
        document.getElementById('scan-status').textContent = 'Ready to scan';
    },
    
    scan: function() {
        if (!this.scanning) return;
        
        try {
            this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
            const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert"
            });

            if (code) {
                console.log("Found QR code:", code.data);
                this.processQRCode(code.data);
            }
        } catch (error) {
            console.error('Scanning error:', error);
        }
    },
    
    processQRCode: function(qrData) {
        console.log('Processing QR code:', qrData);
        
        try {
            // Clean the data
            const cleanData = qrData.replace(/^["'](.+)["']$/, '$1').toLowerCase().trim();
            
            // Try to parse as JSON first
            let monumentData;
            try {
                monumentData = JSON.parse(qrData);
            } catch (e) {
                // If not JSON, try to match with monument ID
                monumentData = this.monuments[cleanData];
            }
            
            if (monumentData) {
                this.stopScanning();
                app.displayMonumentInfo(monumentData);
            } else {
                throw new Error('Monument not recognized');
            }
        } catch (error) {
            console.error('Error processing QR code:', error);
            document.getElementById('scan-status').textContent = error.message;
        }
    }
};

// Initialize QR Scanner when the page loads
document.addEventListener('DOMContentLoaded', () => {
    QRScanner.init();
});

// Make it globally available
window.QRScanner = QRScanner; 