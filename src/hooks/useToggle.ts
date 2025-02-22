import { useState, useCallback } from "react";

function useToggle(initialState: boolean = false): [boolean, () => void] {
  const [toggleState, setToggleState] = useState<boolean>(initialState);

  const onToggle = useCallback(() => {
    setToggleState((prev) => !prev);
  }, []);

  return [toggleState, onToggle];
}

export default useToggle;
