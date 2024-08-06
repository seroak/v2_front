import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useArrowStore } from "@/store/arrow";

interface Props {
  code: string;
}

const Arrow = ({ code }: Props): ReactNode => {
  const { top, right, displayNone } = useArrowStore((state) => state);

  if (displayNone) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="code-target"
        style={{
          top: `${top}px`,
          left: `${right}px`,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <img src="/image/img_target.svg" alt="방향이미지" />
        <p>{code}</p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Arrow;
