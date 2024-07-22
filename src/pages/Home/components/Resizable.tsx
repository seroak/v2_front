import React, { useState, useRef, MouseEvent as ReactMouseEvent, ReactElement } from "react";
import styles from "./Resizable.module.css";

interface ResizableProps {
  left: ReactElement;
  right: ReactElement;
}

const Resizable: React.FC<ResizableProps> = ({ left, right }) => {
  const [leftWidth, setLeftWidth] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    startXRef.current = e.clientX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = e.clientX - startXRef.current;
      const newLeftWidth = ((startXRef.current - containerRect.left + deltaX) / containerRect.width) * 100;
      if (newLeftWidth > 10 && newLeftWidth < 90) {
        setLeftWidth(newLeftWidth);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.leftSection} style={{ width: `${leftWidth}%` }}>
        {left}
      </div>
      <div className={styles.resizer} onMouseDown={handleMouseDown} style={{ height: "80vh", width: "10px" }}></div>
      <div className={styles.rightSection} style={{ width: `${100 - leftWidth}%` }}>
        {right}
      </div>
    </div>
  );
};

export default Resizable;
