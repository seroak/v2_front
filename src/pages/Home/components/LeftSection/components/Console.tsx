import styles from "./Console.module.css";

const Console = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        {[...Array(21)].map((_, index) => (
          <div key={index} className={styles.consoleText}>
            콘솔창입니다
          </div>
        ))}
      </div>
    </div>
  );
};

export default Console;
