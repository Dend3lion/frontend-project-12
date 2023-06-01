const en = {
  translation: {
    header: {
      brand: 'Hexlet Chat',
      register: 'Register',
      login: 'Login',
      logout: '`Logout',
    },
    login: {
      title: 'Login',
      registerText: "Don't have an account?",
      registerLink: 'Register',
      form: {
        username: 'Username',
        password: 'Password',
        submit: 'Login',
      },
      errors: {
        required: 'Required field',
        wrongCredentials: 'Wrong username or password',
      },
    },
    register: {
      title: 'Register',
      form: {
        username: 'Username',
        password: 'Password',
        passwordConfirmation: 'Confirm Password',
        submit: 'Register',
      },
      errors: {
        required: 'Required field',
        usernameLength: 'From 3 to 20 characters',
        passwordLength: 'At least 6 characters',
        passwordMatch: 'Passwords must match',
        userExists: 'User exists',
      },
    },
    chat: {
      channels: {
        title: 'Channels',
        addChannel: 'Add Channel',
        optionsLabel: 'Channel Management',
        rename: 'Rename',
        remove: 'Remove',
      },
      modals: {
        addChannel: {
          title: 'Add Channel',
          placeholder: 'Channel name',
          close: 'Close',
          submit: 'Add',
          success: 'Channel added',
          errors: {
            required: 'Required field',
            channelExists: 'Channel exists',
          },
        },
        renameChannel: {
          title: 'Rename Channel',
          placeholder: 'Channel name',
          close: 'Close',
          submit: 'Rename',
          success: 'Channel renamed',
          errors: {
            required: 'Required field',
            channelExists: 'Channel exists',
          },
        },
        removeChannel: {
          title: 'Remove Channel',
          body: 'Are you sure?',
          close: 'Close',
          submit: 'Remove',
          success: 'Channel removed',
        },
      },
      messages: {
        form: {
          label: 'New message',
          placeholder: 'Message',
          submit: 'Submit',
        },
      },
    },
    errors: {
      page: {
        title: 'Oops!',
        body: 'Sorry, an unexpected error has occurred.',
      },
      networkError: 'Something went wrong. Try again later',
      connectionLost: 'Connection was lost. Reconnecting...',
    },
  },
};

export default en;
