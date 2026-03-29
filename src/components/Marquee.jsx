import './Marquee.css';

export default function Marquee({ text = "", speed = 40, reverse = false, className = "" }) {
  // We duplicate the items to create a seamless infinite scroll loop
  const content = (
    <div className="marquee-content">
      {text.split(' ★ ').map((phrase, i) => (
        <span key={i} className="marquee-item">
          {phrase}
          <span className="marquee-separator">◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee-container ${reverse ? 'reverse' : ''} ${className}`}>
      <div 
        className="marquee-track"
        style={{ '--duration': `${speed}s` }}
      >
        {content}
        {content}
      </div>
    </div>
  );
}
