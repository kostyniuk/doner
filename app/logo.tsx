const Logo = ({ className = '' }: { className?: string }) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="#fff" strokeWidth="6">
      {/* The Checkmark: Simple, bold, and clear */}
      <path d="M25 50 l15 15 l35 -35" />
      {/* The Pencil: Positioned below as a baseline, representing the completed task */}
      <path d="M15 75 l70 0" />
    </g>
  </svg>
);

export default Logo;
