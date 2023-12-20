import { Modal } from 'antd';
import { ReactNode } from 'react';

interface ConfirmModalProps {
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: ReactNode;
  cancelText?: ReactNode;
  icon?: ReactNode;
  notShowBtnCancel?: boolean;
  notShowBtnOk?: boolean;
  className?: string;
}

interface UseConfirmModal {
  showConfirmModal: (props: ConfirmModalProps) => void;
}

const useConfirmModal = (): UseConfirmModal => {
  const showConfirmModal = ({
    title,
    content,
    footer,
    onOk,
    onCancel,
    okText,
    cancelText,
    icon,
    notShowBtnCancel = false,
    notShowBtnOk = false,
    className,
  }: ConfirmModalProps) => {
    Modal.confirm({
      title,
      content,
      footer,
      onOk: onOk,
      onCancel: onCancel,
      okText,
      cancelText,
      icon,
      okButtonProps: {
        style: { display: notShowBtnOk ? 'none' : '' },
      },
      cancelButtonProps: {
        style: { display: notShowBtnCancel ? 'none' : '' },
      },
      className,
      maskClosable: true,
    });
  };

  return {
    showConfirmModal,
  };
};

export default useConfirmModal;
