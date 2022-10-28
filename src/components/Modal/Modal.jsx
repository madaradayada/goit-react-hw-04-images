import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './ModalStyled';

const modalRoot = document.getElementById('modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  const closeModal = ({ currentTarget, target, code }) => {
    if (currentTarget === target || code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalStyled>{children}</ModalStyled>
    </Overlay>,
    modalRoot
  );
}
