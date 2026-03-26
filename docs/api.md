# API форума (Server)

Базовый URL (локально): `http://localhost:3001`

Все эндпоинты ниже защищены middleware `isAuth`.

## Формат ответов

- Для `Topic`, `Comment`, `Reply` в ответе есть вложенный объект автора: `author`
- Для `Reaction` в ответе есть вложенный объект пользователя: `user`

Поля пользователя в ответах:

- `id`
- `firstName`
- `secondName`
- `displayName`

## Ошибки

- `400` — некорректные входные данные (в том числе ошибки валидации Sequelize `@Length`)
- `403` — не авторизован (когда нет `user.id`)
- `404` — сущность не найдена
- `500` — внутренняя ошибка сервера

Пример ответа при ошибке валидации (`400`):

```json
{
  "message": "Некорректные данные",
  "errors": [
    { "message": "...", "path": "title", "value": "..." }
  ]
}
```

## Проверка здоровья сервера

### GET `/health`

```bash
curl -sS "http://localhost:3001/health"
```

## Топики

### GET `/api/topics`
Возвращает список топиков (сначала новые) с `author`.

```bash
curl -sS "http://localhost:3001/api/topics"
```

### GET `/api/topics/:id`
Возвращает один топик по id с `author`.

```bash
curl -sS "http://localhost:3001/api/topics/1"
```

### POST `/api/topics`
Создает новый топик и возвращает его с `author`.

Тело запроса:

- `title` (строка, 1..255)
- `content` (строка, 1..50000)

```bash
curl -sS -X POST "http://localhost:3001/api/topics" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test topic","content":"Hello"}'
```

### DELETE `/api/topics/:id`

```bash
curl -sS -X DELETE "http://localhost:3001/api/topics/1" -i
```

## Comments

### GET `/api/topics/:topicId/comments`
Возвращает комментарии топика (сначала новые) с `author`.

```bash
curl -sS "http://localhost:3001/api/topics/1/comments"
```

### GET `/api/comments/:id`
Возвращает комментарий по id с `author`.

```bash
curl -sS "http://localhost:3001/api/comments/1"
```

### POST `/api/topics/:topicId/comments`
Создает комментарий и возвращает его с `author`.

Тело запроса:

- `text` (строка, 1..50000)

```bash
curl -sS -X POST "http://localhost:3001/api/topics/1/comments" \
  -H "Content-Type: application/json" \
  -d '{"text":"Test comment"}'
```

### DELETE `/api/comments/:id`

```bash
curl -sS -X DELETE "http://localhost:3001/api/comments/1" -i
```

## Ответы

### GET `/api/comments/:commentId/replies`
Возвращает ответы на комментарий (сначала новые) с `author`.

```bash
curl -sS "http://localhost:3001/api/comments/1/replies"
```

### GET `/api/replies/:id`
Возвращает ответ по id с `author`.

```bash
curl -sS "http://localhost:3001/api/replies/1"
```

### POST `/api/comments/:commentId/replies`
Создает ответ и возвращает его с `author`.

Тело запроса:

- `text` (строка, 1..50000)

```bash
curl -sS -X POST "http://localhost:3001/api/comments/1/replies" \
  -H "Content-Type: application/json" \
  -d '{"text":"Test reply"}'
```

### DELETE `/api/replies/:id`

```bash
curl -sS -X DELETE "http://localhost:3001/api/replies/1" -i
```

## Реакции

### GET `/api/reactions?targetType=comment|reply&targetId=:id`
Возвращает реакции для сущности (сначала старые) с вложенным `user`.

```bash
curl -sS "http://localhost:3001/api/reactions?targetType=comment&targetId=1"
```

### POST `/api/reactions`
Создает или обновляет реакцию пользователя (уникальность по `userId + targetType + targetId`) и возвращает запись с вложенным `user`.

Тело запроса:

- `targetType`: `"comment"` или `"reply"`
- `targetId`: положительное целое число
- `emoji`: допустимый emoji из серверного списка (также ограничен 1..16 символами валидатором модели)

```bash
curl -sS -X POST "http://localhost:3001/api/reactions" \
  -H "Content-Type: application/json" \
  -d '{"targetType":"comment","targetId":1,"emoji":"🔥"}'
```

### DELETE `/api/reactions`
Удаляет реакцию текущего пользователя для указанной сущности.

Тело запроса:

- `targetType`: `"comment"` или `"reply"`
- `targetId`: положительное целое число

```bash
curl -sS -X DELETE "http://localhost:3001/api/reactions" \
  -H "Content-Type: application/json" \
  -d '{"targetType":"comment","targetId":1}' -i
```

