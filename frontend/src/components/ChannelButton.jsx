import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';
import { MODAL_TYPES } from './GlobalModal';

const ChannelButton = ({ channel, currentChannel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const variant = channel.id === currentChannel ? 'primary' : 'link';
  const onClick = () => dispatch(actions.setCurrentChannel(channel.id));

  return (
    <Dropdown as={ButtonGroup}>
      <Button
        variant={variant}
        onClick={onClick}
        className="text-start">{`# ${channel.name}`}</Button>

      {channel.removable && (
        <Dropdown.Toggle
          split
          variant={variant}
          id={`channel-options-${channel.id}`}
          className="flex-grow-0">
          <span className="visually-hidden">{t('chat.channels.optionsLabel')}</span>
        </Dropdown.Toggle>
      )}

      <Dropdown.Menu>
        <Dropdown.Item
          variant="outline-primary"
          onClick={() =>
            dispatch(
              modalActions.setModal({
                isShown: true,
                modalType: MODAL_TYPES.RENAME_CHANNEL_MODAL,
                extras: { channelId: channel.id },
              })
            )
          }>
          {t('chat.channels.rename')}
        </Dropdown.Item>
        <Dropdown.Item
          variant="outline-primary"
          onClick={() =>
            dispatch(
              modalActions.setModal({
                isShown: true,
                modalType: MODAL_TYPES.REMOVE_CHANNEL_MODAL,
                extras: { channelId: channel.id },
              })
            )
          }>
          {t('chat.channels.remove')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelButton;
