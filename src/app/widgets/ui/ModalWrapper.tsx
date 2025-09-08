import { createPortal } from 'react-dom';

const modalRoot: HTMLElement | null = document.getElementById('modal-root');

interface Modal_Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpened: boolean;
  className?: string;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<Modal_Props> = ({
  isOpened,
  className,
  children,
  ...props
}) => {
  if (!modalRoot || !isOpened) return null;

  return createPortal(
    <div
      className={`${
        className && className
      } h-screen w-full fixed items-center justify-center z-60 bg-[#000000a8]`}
      {...props}
    >
      {children}
    </div>,
    modalRoot
  );
};

export default ModalWrapper;
