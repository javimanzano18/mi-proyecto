import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, X } from 'lucide-react';
import './LeftPanel.css';

const LeftPanel = () => {
    const [prompt, setPrompt] = useState('');
    const [attachedImage, setAttachedImage] = useState(null);
    const [history, setHistory] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const bottomRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);

        const data = e.dataTransfer.getData('application/json');
        if (data) {
            try {
                const image = JSON.parse(data);
                setAttachedImage(image);
            } catch (err) {
                console.error('Failed to parse dropped data', err);
            }
        }
    };

    const handleGenerate = () => {
        if (!prompt && !attachedImage) return;

        setIsGenerating(true);

        // Mock generation delay
        setTimeout(() => {
            const newEntry = {
                id: Date.now(),
                prompt: prompt,
                reference: attachedImage,
                // Mock result image (random logic)
                resultUrl: `https://images.unsplash.com/photo-${1600000000000 + Math.floor(Math.random() * 100000)}?w=600&q=80`,
                timestamp: new Date().toLocaleTimeString(),
            };

            setHistory((prev) => [...prev, newEntry]);
            setPrompt('');
            setAttachedImage(null);
            setIsGenerating(false);

            // Scroll to bottom
            setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }, 2000);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleGenerate();
        }
    };

    return (
        <div className="left-panel">
            {/* Generated Feed */}
            <div className="feed-container">
                {history.length === 0 ? (
                    <div className="empty-state">
                        <h1>Create Imaginative Worlds</h1>
                        <p>Drag images from the right for inspiration, or just type your vision.</p>
                    </div>
                ) : (
                    history.map((item) => (
                        <div key={item.id} className="generated-card animate-fade-in">
                            <div className="card-header">
                                <span className="prompt-text">"{item.prompt}"</span>
                                <span className="timestamp">{item.timestamp}</span>
                            </div>

                            <div className="comparison-view">
                                {item.reference && (
                                    <div className="reference-preview-small">
                                        <img src={item.reference.url} alt="Ref" />
                                        <div className="badge">Ref</div>
                                    </div>
                                )}
                                <div className="result-image">
                                    <img src={item.resultUrl} alt={item.prompt}
                                        onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80'} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={bottomRef} style={{ height: 20 }} />
            </div>

            {/* Input Area */}
            <div className="input-area-wrapper">
                <div
                    className={`input-area glass ${isDraggingOver ? 'drag-active' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {attachedImage && (
                        <div className="attached-image-preview">
                            <img src={attachedImage.url} alt="Attached" />
                            <button className="remove-btn btn-reset" onClick={() => setAttachedImage(null)}>
                                <X size={14} />
                            </button>
                        </div>
                    )}

                    <textarea
                        className="prompt-input input-reset"
                        placeholder={isDraggingOver ? "Drop image here..." : "Describe your imagination..."}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        style={{ resize: 'none' }}
                    />

                    <button
                        className={`send-btn btn-reset ${isGenerating ? 'loading' : ''}`}
                        onClick={handleGenerate}
                        disabled={isGenerating || (!prompt && !attachedImage)}
                    >
                        {isGenerating ? <div className="spinner" /> : <Send size={20} />}
                    </button>
                </div>
                {isDraggingOver && (
                    <div className="drop-overlay">
                        Drop to Use as Reference
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeftPanel;
