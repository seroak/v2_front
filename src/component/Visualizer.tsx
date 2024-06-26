import React, { useState } from "react";
import styles from "./Visualizer.module.css";

interface Box {
  id: number;
}

const Visualizer: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);

  const addBox = (): void => {
    setBoxes([...boxes, { id: boxes.length }]);
  };

  return (
    <div className={styles.container}>
      <button onClick={addBox}>Add Box</button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
        }}
      >
        {boxes.map((box) => (
          <div
            key={box.id}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#4caf50",
              textAlign: "center",
              lineHeight: "50px", // 수직 가운데 정렬
            }}
          >
            {box.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visualizer;
