import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './RightPanel.css';

const MOCK_IMAGES = [
    { id: 1, url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=500&q=80', tag: 'Mountain' },
    { id: 2, url: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&q=80', tag: 'Technology' },
    { id: 3, url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80', tag: 'Cyberpunk' },
    { id: 4, url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80', tag: 'Abstract' },
    { id: 5, url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80', tag: 'Fluid' },
    { id: 6, url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=500&q=80', tag: 'Neon' },
    { id: 7, url: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=500&q=80', tag: 'Space' },
    { id: 8, url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&q=80', tag: 'Texture' },
    { id: 9, url: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=500&q=80', tag: 'Dark' },
    { id: 10, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80', tag: 'Retro' },
    { id: 11, url: 'https://images.unsplash.com/photo-1614730341194-75c60740a1d3?w=500&q=80', tag: 'Glow' },
    { id: 12, url: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=500&q=80', tag: 'Electric' },
];

const RightPanel = () => {
    const [query, setQuery] = useState('');

    const filteredImages = MOCK_IMAGES.filter(img =>
        img.tag.toLowerCase().includes(query.toLowerCase())
    );

    const handleDragStart = (e, image) => {
        e.dataTransfer.setData('application/json', JSON.stringify(image));
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div className="right-panel">
            <div className="search-bar-container glass">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search inspiration..."
                    className="search-input input-reset"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="masonry-grid">
                {filteredImages.map((img) => (
                    <div
                        key={img.id}
                        className="masonry-item animate-fade-in"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, img)}
                    >
                        <img src={img.url} alt={img.tag} loading="lazy" />
                        <div className="overlay">
                            <span>{img.tag}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightPanel;
