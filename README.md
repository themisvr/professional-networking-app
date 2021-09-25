# DiNA
DiNA is a professional networking application like LinkedIn


## How to run backend

```
cd /back-end/src
source ../venv/bin/activate
flask init-db # this is needed only once to initialize schema and insert static data
flask run --cert=../cert.pem --key=../key.pem
```

## TODO list

General:
 - Add image in user's profile
 - Images scaling based on mat-cards template

Q12:
 - Implement bonus

