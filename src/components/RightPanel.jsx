import React, { useState } from 'react';
import { Search, Bell, MessageCircle, User } from 'lucide-react';
import './RightPanel.css';

const MOCK_PINS = [
    { id: 1, url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=500&q=80', title: 'Mountain Escape', user: 'Traveler' },
    { id: 2, url: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&q=80', title: 'Tech Setup', user: 'DevSpace' },
    { id: 3, url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80', title: 'Cyber Vibes', user: 'NeonCity' },
    { id: 4, url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80', title: 'Abstract Art', user: 'ArtDaily' },
    { id: 5, url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80', title: 'Fluid Motion', user: 'MotionDesign' },
    { id: 6, url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=500&q=80', title: 'Neon Lights', user: 'CityLife' },
    { id: 7, url: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=500&q=80', title: 'Space Exploration', user: 'NASA Fan' },
    { id: 8, url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&q=80', title: 'Textures', user: 'Material' },
    { id: 9, url: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=500&q=80', title: 'Dark Aesthetic', user: 'Moody' },
    { id: 10, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80', title: 'Retro Vibes', user: 'OldSchool' },
];

const RightPanel = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [query, setQuery] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
    };

    const filteredPins = MOCK_PINS.filter(pin =>
        pin.title.toLowerCase().includes(query.toLowerCase())
    );

    const handleDragStart = (e, image) => {
        e.dataTransfer.setData('application/json', JSON.stringify(image));
        e.dataTransfer.effectAllowed = 'copy';
    };

    if (!isLoggedIn) {
        return (
            <div className="right-panel login-mode">
                <div className="pinterest-login-container glass-panel">
                    <div className="pinterest-logo-large">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Pinterest" />
                    </div>
                    <h2>Welcome to Pinterest</h2>
                    <p className="subtitle">Find new ideas to try</p>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Email" className="pinterest-input" required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="Password" className="pinterest-input" required />
                        </div>
                        <button type="submit" className="pinterest-btn red-btn">Log in</button>
                    </form>

                    <div className="divider">OR</div>

                    <button className="pinterest-btn facebook-btn" onClick={() => setIsLoggedIn(true)}>
                        Continue with Facebook
                    </button>
                    <button className="pinterest-btn google-btn" onClick={() => setIsLoggedIn(true)}>
                        Continue with Google
                    </button>

                    <p className="terms">By continuing, you agree to Pinterest's Terms of Service and acknowledge you've read our Privacy Policy.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="right-panel feed-mode">
            <div className="pinterest-header glass">
                <div className="pinterest-logo-small">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Pinterest" />
                </div>
                <div className="header-links">
                    <span className="active">Home</span>
                    <span>Explore</span>
                    <span>Create</span>
                </div>
                <div className="search-bar-container-pinterest">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input-pinterest"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="header-icons">
                    <Bell size={24} />
                    <MessageCircle size={24} />
                    <div className="user-avatar">
                        <User size={20} />
                    </div>
                </div>
            </div>

            <div className="masonry-grid pinterest-grid">
                {filteredPins.map((pin) => (
                    <div
                        key={pin.id}
                        className="masonry-item pinterest-card"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, pin)}
                    >
                        <div className="pin-image-wrapper">
                            <img src={pin.url} alt={pin.title} loading="lazy" />
                            <div className="pin-overlay">
                                <button className="save-btn">Save</button>
                                <div className="pin-actions">
                                    <div className="icon-btn">↗</div>
                                    <div className="icon-btn">•••</div>
                                </div>
                            </div>
                        </div>
                        <div className="pin-info">
                            <h4>{pin.title}</h4>
                            <div className="pin-user">
                                <div className="user-mini-avatar"></div>
                                <span>{pin.user}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightPanel;
