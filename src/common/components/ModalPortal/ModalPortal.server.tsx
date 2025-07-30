import { createPortal } from 'react-dom';

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === 'undefined') return null;
  const el = document.getElementById('modal');
  return el ? createPortal(children, el) : null;
};

export default ModalPortal;
