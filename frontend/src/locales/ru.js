const ru = {
  translation: {
    header: {
      brand: 'Group Chat',
      register: 'Регистрация',
      login: 'Войти',
      logout: 'Выйти',
    },
    login: {
      title: 'Войти',
      registerText: 'Нет аккаунта?',
      registerLink: 'Регистрация',
      form: {
        username: 'Ваш ник',
        password: 'Пароль',
        submit: 'Войти',
      },
      errors: {
        required: 'Обязательное поле',
        wrongCredentials: 'Неверные имя пользователя или пароль',
      },
    },
    register: {
      title: 'Регистрация',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        passwordConfirmation: 'Подтвердите пароль',
        submit: 'Зарегистрироваться',
      },
      errors: {
        required: 'Обязательное поле',
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passwordMatch: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
      },
    },
    chat: {
      channels: {
        title: 'Каналы',
        add: 'Добавить канал',
        optionsLabel: 'Управление каналом',
        rename: 'Переименовать',
        remove: 'Удалить',
      },
      modals: {
        addChannel: {
          title: 'Добавить канал',
          placeholder: 'Имя канала',
          close: 'Отменить',
          submit: 'Отправить',
          success: 'Канал создан',
          errors: {
            required: 'Обязательное поле',
            channelExists: 'Должно быть уникальным',
            channelLength: 'От 3 до 20 символов',
          },
        },
        renameChannel: {
          title: 'Переименовать канал',
          placeholder: 'Имя канала',
          close: 'Отменить',
          submit: 'Отправить',
          success: 'Канал переименован',
          errors: {
            required: 'Обязательное поле',
            channelExists: 'Канал существует',
            channelLength: 'От 3 до 20 символов',
          },
        },
        removeChannel: {
          title: 'Удалить канал',
          body: 'Вы уверены?',
          close: 'Отменить',
          submit: 'Удалить',
          success: 'Канал удалён',
        },
      },
      messages: {
        form: {
          label: 'Новое сообщение',
          placeholder: 'Сообщение',
          submit: 'Отправить',
        },
      },
    },
    errors: {
      page: {
        title: 'Упс!',
        body: 'произошла непредвиденная ошибка.',
      },
      networkError: 'Ошибка соединения',
      connectionLost: 'Соединение прервано. Переподключаюсь...',
    },
  },
};

export default ru;
