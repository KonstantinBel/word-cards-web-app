## Required
- node ^8.9.4
- npm ^5.6.0
- mysql

## After cloning
You need to create .env files in server directory

**server/.env**\
```
PORT=\
DB_NAME=\
DB_USER=\
DB_PASS=\
DB_HOST=\
DB_PORT=\
GOOGLE_ID=123qwe123qwe.apps.googleusercontent.com (for example)\
GOOGLE_SECRET=qqwEQwe12qweq2 (for example)\
OAUTH_CALLBACK_URL=http://127.0.0.1:3000/api/auth/google/callback (for example, if PORT == 3000)\
SESSION_SECRET=qweqwe (for example)
```

## Starting
- start mysql server
- npm run dev/prod (in server dir, running server in development or production mode)
- npm run dev/prod (in client dir, running wrontend building in development or production mode)
