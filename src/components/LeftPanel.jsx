import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, X, Plus, ChevronRight, Smartphone, Diamond, Minus, PenTool, Sparkles } from 'lucide-react';
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
                <div className="prompt-writer-container">
                    {/* Top Row: Input */}
                    <div className="prompt-top-row">
                        <button className="add-ref-btn">
                            <Plus size={20} />
                        </button>
                        <textarea
                            className="prompt-input-expanded"
                            placeholder="Describe the scene you imagine"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    {/* Bottom Row: Controls */}
                    <div className="prompt-bottom-row">
                        <div className="prompt-controls">
                            <button className="control-btn model-selector">
                                <div className="icon-badge">G</div>
                                <span>Nano Banana Pro</span>
                                <ChevronRight size={14} className="chevron" />
                            </button>

                            <button className="control-btn icon-only">
                                <Smartphone size={16} />
                                <span>9:16</span>
                            </button>

                            <button className="control-btn icon-only">
                                <Diamond size={16} />
                                <span>2K</span>
                            </button>

                            <div className="control-btn counter">
                                <button className="counter-btn" onClick={() => { }}><Minus size={14} /></button>
                                <span>1/4</span>
                                <button className="counter-btn" onClick={() => { }}><Plus size={14} /></button>
                            </div>

                            <button className="control-btn draw-btn">
                                <PenTool size={16} />
                                <span>Draw</span>
                            </button>
                        </div>

                        <button
                            className="generate-btn-large"
                            onClick={handleGenerate}
                            disabled={isGenerating || (!prompt && !attachedImage)}
                        >
                            <span>Generate</span>
                            <Sparkles size={16} fill="black" />
                            <span className="cost-badge">2</span>
                        </button>
                    </div>

                    {isDraggingOver && (
                        <div className="drop-overlay">
                            Drop to Use as Reference
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;
