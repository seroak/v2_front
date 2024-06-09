"use client";
import React, { useState, useRef, MouseEvent } from "react";
import styles from "./Resizable.module.css";

interface ResizableProps {
  left: JSX.Element;
  right: JSX.Element;
}

const Resizable: React.FC<ResizableProps> = ({ left, right }) => {
  const [leftWidth, setLeftWidth] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newLeftWidth = (e.clientX / containerWidth) * 86;
      if (newLeftWidth > 10 && newLeftWidth < 90) {
        setLeftWidth(newLeftWidth);
      }
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.leftSection} style={{ width: `${leftWidth}%` }}>
        {left}
      </div>
      <div
        className={styles.resizer}
        onMouseDown={handleMouseDown}
        style={{ height: "80vh", width: "10px" }} // 높이와 너비를 명확하게 지정
      ></div>

      <div
        className={styles.rightSection}
        style={{ width: `${100 - leftWidth}%` }}
      >
        {right}
      </div>
    </div>
  );
};

export default Resizable;
