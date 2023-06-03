import { Button, ButtonGroup, Dropdown, SplitButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions } from '../slices/channelsSlice';
import RemoveChannelButton from './RemoveChannelButton';
import RenameChannelButton from './RenameChannelButton';

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
        <RenameChannelButton channel={channel} />
        <RemoveChannelButton channel={channel} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelButton;
