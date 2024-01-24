export function errorHandler(inputText: string, locale: string): string {
    if (locale === 'en') {
        return inputText;
    }
    const translations: { [key: string]: string } = {
        'Your account email is not confirmed': 'Вы не подтвердили почту',
        'Invalid identifier or password': 'Неправильные логин или пароль',
        'Incorrect code provided': 'Код сброса пароля устарел или неверен',
        'email is a required field': 'Поле почты не может быть пустым',
        'email must be a valid email': 'Неправильный формат почты',
        'username is a required field': 'Имя пользователя не может быть пустым',
        'Email or Username are already taken': 'Почта или имя пользователя уже заняты',
    };

    const translation = translations[inputText];

    return translation || inputText;
}
