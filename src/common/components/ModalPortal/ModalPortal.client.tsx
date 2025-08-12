'use client';

import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setEl(document.getElementById('modal'));
  }, []);

  if (!mounted || !el) return null;
  return createPortal(children, el);
};

export default ModalPortal;
