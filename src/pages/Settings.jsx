import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import Heading from '../ui/Heading';

function Settings() {
  return (
    <>
      <Heading as='h1' type='centered'>
        Update hotel settings
      </Heading>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
