import { motion, AnimatePresence } from "framer-motion";

const BlackOverlay = ({ state, stateChange }) => {
  return (
    <AnimatePresence>
      {state ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          onClick={() => stateChange(false)}
          className={`absolute inset-0 bg-black/60 flex justify-center items-center z-[2000] ${
            state ? "" : "hidden"
          }`}
        />
      ) : null}
    </AnimatePresence>
  );
};

export default BlackOverlay;
