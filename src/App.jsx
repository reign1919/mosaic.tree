import { useEffect, useState } from 'react';
import { FileText, Instagram, Mail, Briefcase } from 'lucide-react';
import CursorTrail from './components/CursorTrail';

import MosaicDivider from './components/MosaicDivider';
import './App.css';

const TILE_COLORS = [
  'var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)', 'var(--c5)',
  'var(--c6)', 'var(--c8)', 'var(--c9)', 'var(--c10)'
];

export default function App() {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    // Generate static floating tiles on mount
    const newTiles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      color: TILE_COLORS[Math.floor(Math.random() * TILE_COLORS.length)],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${10 + Math.random() * 20}px`,
      rot: `${-30 + Math.random() * 60}deg`,
      animDelay: `${Math.random() * 4}s`,
      animDuration: `${3 + Math.random() * 4}s`,
    }));
    setTiles(newTiles);
  }, []);

  return (
    <>
      <CursorTrail />
      
      {/* Background Floating Tiles */}
      <div className="bg-tiles-container" aria-hidden="true">
        {tiles.map(tile => (
          <div
            key={tile.id}
            className="bg-tile"
            style={{
              backgroundColor: tile.color,
              top: tile.top,
              left: tile.left,
              width: tile.size,
              height: tile.size,
              '--rot': tile.rot,
              animationDelay: tile.animDelay,
              animationDuration: tile.animDuration
            }}
          />
        ))}
      </div>

      <div className="page-wrapper page-enter">
        <div className="top-credit-wrapper">
          <a 
            href="https://www.instagram.com/forgd.reign/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="devreign-credit"
          >
            <span className="devreign-logo">∫</span>
            <span className="devreign-text">DEVREIGN</span>
          </a>
        </div>

        <main className="linktree-container">
          <div className="brand-section">
            <div className="logo-wrapper">
              <img src="/logo.png" alt="The Mosaic Foundation Logo" className="brand-logo" />
            </div>
            <h1 className="brand-name">The Mosaic Foundation</h1>
          </div>

          <MosaicDivider className="main-divider" />

          <div className="links-section">
            <span className="scrapbook-arrow arrow-links" style={{ '--arrow-rot': '4deg' }}>
              ↘ check these out!
            </span>

            <a 
              href="https://drive.google.com/file/d/17Y067-bZW5KrWRVID73nPNOik8WNRr3w/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary link-card card-pink"
            >
              <FileText size={20} />
              Brochure
              <div className="tape tape-tl"></div>
            </a>

            <a 
              href="https://apply-for-mosaic.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn link-card card-outline card-yellow"
            >
              <Briefcase size={20} />
              Work with us
              <div className="tape tape-br"></div>
            </a>

            <a 
              href="https://www.instagram.com/themosaicfoundation_/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn link-card card-outline card-lime"
            >
              <Instagram size={20} />
              Instagram
              <div className="tape tape-tr"></div>
            </a>

            <a 
              href="mailto:the.mosaicfoundation.gen@gmail.com" 
              className="btn link-card card-outline card-cyan"
            >
              <Mail size={20} />
              Email
              <div className="tape tape-bl"></div>
            </a>
          </div>
        </main>



        <footer className="footer-simple">
          <div className="copyright-text">
            &copy; {new Date().getFullYear()} The Mosaic Foundation
          </div>
        </footer>
      </div>
    </>
  );
}
