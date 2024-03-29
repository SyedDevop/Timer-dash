import { useCallback, useState } from "react";

// Hook
// Parameter is the boolean, with default "false" value
// Return is an array with two elements:
// - The boolean value
// - The function to change the boolean value
const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);

  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((): void => setState((state) => !state), []);

  return [state, toggle];
};

export default useToggle;
export { useToggle };
