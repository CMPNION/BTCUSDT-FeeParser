API allows to get bid/ask/avg BTCUSDT price with fee.


# Fast up docker-compose:

```
npm run dev:up
```


# .env.development example:
```
# Файл окружения для сервиса BTCSERVICE

# путь к env-файлу
ENV_FILE=.env.development

# режим сборки / запуска
NODE_ENV=dev
NODE_VERSION=23

# название сервиса (используется в именах контейнеров)
APP_NAME=BTCSERVICE

# порты бэкенда
APP_PORT=3000
APP_EXTERNAL_PORT=3000

# Redis
REDIS_PORT=6379
REDIS_EXTERNAL_PORT=6379

# хост для подключения из кода (имя сервиса в docker-compose)
REDIS_HOST=redis

# дополнительные переменные для приложения
REDIS_DB=0
REDIS_URL=redis://redis:6379
REDIS_USER=redis
REDIS_PASSWORD=

# задержка обновления цены (в секундах)
UPDATE_DELAY=10

# комиссия сервиса (в процентах)
SERVICE_FEE=0.01
```


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
