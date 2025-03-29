// This script should be run separately to generate QR codes
// You can include it in your project or run it once to generate the QR codes

document.addEventListener('DOMContentLoaded', () => {
    const qrContainer = document.getElementById('qr-container');
    
    // Monument IDs to generate QR codes for
    const monumentIds = [
        'taj_mahal',
        'eiffel_tower',
        'statue_of_liberty',
        'great_wall'
    ];
    
    // Generate QR code for each monument
    monumentIds.forEach(id => {
        // Create a container for this monument's QR code
        const monumentContainer = document.createElement('div');
        monumentContainer.className = 'qr-item';
        
        // Create heading with monument name
        const heading = document.createElement('h3');
        heading.textContent = id.replace('_', ' ').toUpperCase();
        monumentContainer.appendChild(heading);
        
        // Create QR code using qrcode.js library
        const qrElement = document.createElement('div');
        qrElement.id = `qr-${id}`;
        monumentContainer.appendChild(qrElement);
        
        // Generate QR code
        new QRCode(qrElement, {
            text: id,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.textContent = 'Download QR Code';
        downloadLink.className = 'download-link';
        downloadLink.addEventListener('click', () => {
            // Convert the QR code to an image and download
            const canvas = qrElement.querySelector('canvas');
            const dataUrl = canvas.toDataURL('image/png');
            
            downloadLink.href = dataUrl;
            downloadLink.download = `qr-${id}.png`;
        });
        
        monumentContainer.appendChild(downloadLink);
        qrContainer.appendChild(monumentContainer);
    });
}); 