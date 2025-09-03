// components/ui/Tooltip.tsx
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hovered && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.top + rect.height / 2,
        left: rect.right + 8, // espacio de 8px a la derecha
      });
    }
  }, [hovered]);

  return (
    <div
      ref={ref}
      className="relative flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered &&
        ReactDOM.createPortal(
          <div
            className=" glass-container fixed z-[9999] bg-fuchsia-500/60  text-white text-md font-semibold px-6 py-2 rounded-3xl shadow-xl  "
            style={{
              top: coords.top,
              left: coords.left,
              transform: 'translateY(-50%)',
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
