'use client'
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';


const memeTemplates = [
    // Blank Templates
    '/5cwx89t4-1389586191.avif',  // Blank template 1
    '/p09j7x4c.jpg.webp',  // Blank template 2
    '/xirbx1rd1p171.webp',  // Blank template 3

    // Pre-Written Text Templates
    '/967m9b.jpg',  // Pre-written template 1
    '/96gfv0.jpg',  // Pre-written template 2
    '/967p6c.jpg',  // Pre-written template 3
];

const MemeGenerator = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const memeRef = useRef<HTMLDivElement>(null);

    // Handle template change
    const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTemplate(event.target.value);
    };

    // Download meme functionality
    const handleDownload = () => {
        if (memeRef.current) {
            html2canvas(memeRef.current).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'meme.png';
                link.click();
            });
        }
    };

    return (
        <div className="meme-generator">
            <h1 className="title">Meme Generator</h1>
            <div className="template-selector">
                <h2 className="selector-title">Select a Meme Template</h2>
                <select onChange={handleTemplateChange} className="template-select">
                    <option value="" disabled selected>Select your option</option>
                    {memeTemplates.map((template, index) => (
                        <option key={index} value={template}>
                            {template.includes('.avif') ? `Blank Template ${index + 1}` : `Pre-Written Meme ${index - 2}`}
                        </option>
                    ))}
                </select>
            </div>

            <div className="meme-preview">
                {selectedTemplate && (
                    <div ref={memeRef} className="meme-container" style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={selectedTemplate} alt="Meme Preview" className="preview-image" />
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            width: '100%',
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.5em',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
                        }}>
                            {topText}
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            width: '100%',
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.5em',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
                        }}>
                            {bottomText}
                        </div>
                    </div>
                )}

                <div className="text-inputs">
                    <input
                        type="text"
                        placeholder="Top Text"
                        value={topText}
                        onChange={(e) => setTopText(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Bottom Text"
                        value={bottomText}
                        onChange={(e) => setBottomText(e.target.value)}
                    />
                </div>

                <button onClick={handleDownload} className="download-btn">Download Meme</button>
            </div>

            <footer>
                <p>&copy; All rights reserved. Meme Generator by Yemna Mehmood</p>
            </footer>
        </div>
    );
};

export default MemeGenerator;
