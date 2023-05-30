const ru = {
  translation: {
    header: {
      brand: "Hexlet Chat",
      register: "Регистрация",
      login: "Войти",
      logout: "Выйти",
    },
    login: {
      title: "Войти",
      registerText: "Нет аккаунта?",
      registerLink: "Регистрация",
      form: {
        username: "Ваш ник",
        password: "Пароль",
        submit: "Войти",
      },
      errors: {
        required: "Обязательное поле",
        wrongCredentials: "Неверные имя пользователя или пароль",
      },
    },
    register: {
      title: "Регистрация",
      form: {
        username: "Имя пользователя",
        password: "Пароль",
        passwordConfirmation: "Подтвердите пароль",
        submit: "Зарегистрироваться",
      },
      errors: {
        required: "Обязательное поле",
        usernameLength: "От 3 до 20 символов",
        passwordLength: "Не менее 6 символов",
        passwordMatch: "Пароли должны совпадать",
        userExists: "Такой пользователь уже существует",
      },
    },
    chat: {
      channels: {
        channels: "Каналы",
        add: "Добавить канал",
        rename: "Переименовать",
        remove: "Удалить",
      },
      modals: {
        addChannel: {
          title: "Добавить канал",
          placeholder: "Имя канала",
          close: "Отменить",
          submit: "Добавить",
          success: "Канал создан",
          errors: {
            required: "Обязательное поле",
            channelExists: "Канал существует",
          },
        },
        renameChannel: {
          title: "Переименовать канал",
          placeholder: "Имя канала",
          close: "Отменить",
          submit: "Переименовать",
          success: "Канал переименован",
          errors: {
            required: "Обязательное поле",
            channelExists: "Канал существует",
          },
        },
        removeChannel: {
          title: "Удалить канал",
          body: "Вы уверены?",
          close: "Отменить",
          submit: "Удалить",
          success: "Канал удален",
        },
      },
      messages: {
        form: {
          placeholder: "Сообщение",
          submit: "Отправить",
        },
      },
    },
    errors: {
      page: {
        title: "Упс!",
        body: "произошла непредвиденная ошибка.",
      },
      networkError: "Что-то пошло не так. Попробуйте позже",
      connectionLost: "Соединение прервано. Переподключаюсь...",
    },
  },
};

export default ru;
