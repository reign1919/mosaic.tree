import './MosaicDivider.css';

const MOSAIC_COLORS = [
  'var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)', 'var(--c5)',
  'var(--c6)', 'var(--c8)', 'var(--c9)', 'var(--c10)', 'var(--c1)'
];

export default function MosaicDivider({ className = "" }) {
  return (
    <div className={`mosaic-divider ${className}`}>
      {MOSAIC_COLORS.map((color, i) => (
        <span
          key={i}
          className="mosaic-bar"
          style={{
            backgroundColor: color,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}
