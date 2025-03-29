# AR Monument Explorer

An augmented reality web platform that scans QR codes at monuments and displays information with interactive 3D models.

## Setup and Deployment

### Prerequisites
- Web server with HTTPS support (required for AR features)
- Modern browser with WebXR support
- Mobile device with camera access

### Local Development
1. Clone this repository
2. Set up a local HTTPS server:
   - Using Node.js and http-server:
     ```
     npm install -g http-server
     http-server -S -C cert.pem -K key.pem
     ```
   - Or use tools like ngrok to tunnel a local server with HTTPS

3. Access the application via HTTPS URL on your mobile device

### Testing with QR Codes
1. Open the QR generator page (`qr-generator.html`)
2. Download and print the generated QR codes
3. Place the QR codes near monuments or use them for testing

### Deployment to Production
1. Upload all files to a web server with HTTPS support
2. Ensure all paths in the HTML, CSS, and JavaScript files are correct
3. Test the application on various devices

## Project Structure
- `index.html` - Main application page
- `styles.css` - Styling for the application
- `scripts/` - JavaScript files
  - `main.js` - Core application logic
  - `qrscanner.js` - QR code scanning functionality
  - `ar-controller.js` - AR experience controller
  - `model-loader.js` - 3D model loading utilities
  - `placeholder-models.js` - Placeholder 3D models
- `data/` - Data files
  - `monuments.json` - Information about monuments
- `assets/` - Asset files (images, 3D models, etc.)

## Adding New Monuments
1. Add monument data to `data/monuments.json`
2. Create a 3D model (GLTF/GLB format) and place it in `assets/models/`
3. Generate a QR code for the new monument using the QR generator

## Browser Compatibility
- Chrome for Android (76+)
- Safari for iOS (13+)
- Firefox for Android (79+)

## Troubleshooting
- Camera access issues: Ensure the site is accessed via HTTPS
- AR not working: Check if your device supports WebXR
- QR codes not scanning: Ensure adequate lighting and camera focus 