import { useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context)
    throw Error(
      "useWorkoutContext must be used inside an WorkoutContextProvider"
    );

  return context;
};
