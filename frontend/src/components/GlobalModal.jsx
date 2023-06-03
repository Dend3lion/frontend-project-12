import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

export const MODAL_TYPES = {
  ADD_CHANNEL_MODAL: 'addChannel',
  RENAME_CHANNEL_MODAL: 'renameChannel',
  REMOVE_CHANNEL_MODAL: 'removeChannel',
};

const MODAL_COMPONENTS = {
  [MODAL_TYPES.ADD_CHANNEL_MODAL]: AddChannelModal,
  [MODAL_TYPES.RENAME_CHANNEL_MODAL]: RenameChannelModal,
  [MODAL_TYPES.REMOVE_CHANNEL_MODAL]: RemoveChannelModal,
};

const GlobalModal = () => {
  const { isShown, modalType } = useSelector((state) => state.modal);

  const ModalComponent = MODAL_COMPONENTS[modalType];

  return isShown && modalType && ModalComponent && <ModalComponent />;
};

export default GlobalModal;
