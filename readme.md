## System required
- node ^8.9.4
- npm ^5.6.0
- postgresql (ALTER ROLE user_name SET search_path TO public)

# Deploy

- clone project
- create required .env files:

**server/.env**\
```
PORT=\
DB_NAME=\
DB_USER=\
DB_PASS=\
DB_HOST=\
DB_PORT=\
ACCESS_CONTROL_ALLOW_ORIGIN=http://localhost:3000, ...  (for example)\
GOOGLE_ID=123qwe123qwe.apps.googleusercontent.com (for example)\
GOOGLE_SECRET=qqwEQwe12qweq2 (for example)\
OAUTH_CALLBACK_URL=http://127.0.0.1:3000/api/auth/google/callback (for example, if PORT == 3000)\
SESSION_SECRET=qweqwe (for example)
```

**word-cards-app/.env**\
```
REACT_APP_SERVER=http://localhost:3011 (for example)
```

- create new empty data base
- install npm packages in server, client, word-cards-app folders - '''npm i'''
- build word-cards-app - '''npm run build'''
- start static client webpack - '''npm run prod'''
- start server - '''npm run prod'''

## Comands
- server/ ```npm run dev/prod''' (running server in development or production mode)
- client/ ```npm run dev/prod''' (running frontend building in development or production mode)
- word-cards-app/ ```npm run start/bundle''' (running react app server in development or bundle in production mode)

## Состав проекта
- ExpressJS сервер который выступает в качестве сервера статики и сервера API
- React приложения созданные с использованием утилиты create-react-app

Разработку каждого react приложения можно вести с использование встроенного в create-react-app сервера, при этом использовать
ExpressJS сервер только как поставщика API. В папке app-name запустить ```npm run start```.

Разработка статичной части сайта ведется в папке client с использованием webpack и шаблонизатора pug.
Для сборки статичной части сайта запустить в папке client ```npm run dev``` или ```npm run prod```.

Для релиза необходимо запустить ```npm run bundle``` для кадого react приложения, после этого запустить ExpressJS сервер,
который будет использовать все материалы директорий build в react приложениях и запустить ```npm run dev``` или ```npm run npm run prod``` из папки server.

Для создания нового react приложение нужно в парк прокта запустить ```npx create-ract-app app-name```
и добавить роут в server/routes/index.js (обязательно после роута router.use(/\//, ...)
```
router.use(express.static(path.join(global.PROJECT_DIR, '/app-name/build')))\
router.use('/app-name', (req, res, next) => {\
res.sendFile(path.join(global.PROJECT_DIR, '/app-name/build/index.html'))
})```

## Style guide
https://github.com/airbnb/javascript/tree/master/react
