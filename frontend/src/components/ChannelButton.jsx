import { Button, SplitButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions } from '../slices/channelsSlice';
import RemoveChannelButton from './RemoveChannelButton';
import RenameChannelButton from './RenameChannelButton';

const ChannelButton = ({ channel, currentChannel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const variant = channel.id === currentChannel ? 'primary' : 'light';
  const onClick = () => dispatch(actions.setCurrentChannel(channel.id));

  return channel.removable ? (
    <SplitButton
      id={`channel-options-${channel.id}`}
      title={`# ${channel.name}`}
      toggleLabel={t('chat.channels.optionsLabel')}
      variant={variant}
      onClick={onClick}
    >
      <RenameChannelButton channel={channel} />
      <RemoveChannelButton channel={channel} />
    </SplitButton>
  ) : (
    <Button variant={variant} onClick={onClick}>
      #
      {' '}
      {channel.name}
    </Button>
  );
};

export default ChannelButton;
