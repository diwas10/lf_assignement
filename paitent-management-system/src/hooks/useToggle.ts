import { useState } from 'react';

const useToggle = (initial = false): [isOpen: boolean, toggle: () => void] => {
  const [isOpen, setIsOpen] = useState(initial);
  const toggle = () => setIsOpen((prev) => !prev);

  return [isOpen, toggle];
};

export default useToggle;
