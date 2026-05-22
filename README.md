# Angular Users Dashboard

Тестовое Angular-приложение для работы с пользователями через API JSONPlaceholder.

## Функциональность

### Пользователи

- Просмотр списка пользователей
- Переход на страницу пользователя
- Создание пользователя
- Редактирование пользователя
- Удаление пользователя
- Поиск пользователей по имени или email
- Пагинация таблицы

### Формы

- Reactive Forms
- Валидация обязательных полей
- Валидация email

### UI/UX

- NG-ZORRO UI Kit
- Адаптивный интерфейс
- Loading/error состояния
- Confirm modal при удалении

---

## Стек

- Angular 20
- TypeScript
- SCSS
- Angular Router
- Angular Reactive Forms
- Angular HttpClient
- NG-ZORRO

---

## API

Используется:

```txt
https://jsonplaceholder.typicode.com/users
```

## Важно

JSONPlaceholder является mock API.

Методы:

- POST
- PUT
- DELETE

возвращают успешный ответ, но изменения не сохраняются после перезагрузки страницы.

## Установка и запуск

Установка зависимостей

```
npm install
```

Запуск проекта

```
npm start
```

Production build

```
npm run build
```

## Маршруты

- /users — список пользователей
- /users/:id — детали пользователя
- /users/new — создание пользователя
- /users/:id/edit — редактирование пользователя

## Деплой

Проект задеплоен на Netlify:

[ДЕМО](https://quick-dashboard-angular.netlify.app)

## GitHub

Репозиторий:

[GITHUB](https://github.com/sashaprovorova/angular-users-dashboard)
