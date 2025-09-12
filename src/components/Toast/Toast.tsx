import { toast } from 'react-toastify';
import type { ToastOptions, Id } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import type { ReactNode } from 'react';
interface MsgProps {
  type?: 'success' | 'error' | 'loading' | 'info';
  title?: ReactNode;
  description?: string;
}

export const MessageToast: React.FC<MsgProps> = ({
  type,
  title,
  description,
}) => {
  return (
    <div className="max-w-[400px]">
      <div className="flex items-center justify-start gap-[10px]">
        <div>
          {type == 'success' && <FaCheckCircle color="green" />}
          {type == 'error' && <TiDelete color="red" size="20px" />}
          {type == 'loading' && <div className="Toastify__spinner"></div>}
        </div>
        {title && <div className="flex-1">{title}</div>}
      </div>
      {description && (
        <>
          <div className="mt-2 border-t opacity-70"></div>
          <div className="mt-1 text-xs text-text-secondary">{description}</div>
        </>
      )}
    </div>
  );
};

const toaster = (myProps: MsgProps, toastProps?: ToastOptions): Id =>
  toast(<MessageToast {...myProps} />, { ...toastProps });
export default toaster;
