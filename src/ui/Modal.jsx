import styled, { css } from 'styled-components';
import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

import { useOutsideClick } from '../hooks/useOutsideClick';
import { useKey } from '../hooks/useKey';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 80vh;
  max-width: 80rem;
  width: 80vw;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  overflow-y: auto;

  ${props =>
    props.smallerWidth &&
    css`
      max-width: 48rem;
    `}

  ${props =>
    props.fixedHeight &&
    css`
      height: 80vh;
    `}


  @media (max-width: 1000px) {
    padding: 2.4rem 3rem;
  }

  @media (max-width: 550px) {
    padding: 1.6rem 2rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.8);
  z-index: 1000;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: background-color 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: var(--color-grey-500);
    stroke: var(--color-grey-500);
    color: var(--color-grey-500);
  }

  @media (max-width: 1000px) {
    top: 0.8rem;
    right: 1.5rem;
  }

  @media (max-width: 550px) {
    top: 0.4rem;
    right: 1.2rem;
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  useKey('Escape', close);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({
  children,
  name,
  smallerWidth = false,
  fixedHeight = false,
  outsideClickCloseModal = true,
}) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal
        ref={outsideClickCloseModal ? ref : null}
        smallerWidth={smallerWidth}
        fixedHeight={fixedHeight}
        role='dialog'
      >
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
