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
 - Fix pending buttons when someone is waiting for a connection to be done
 - Add image in user's profile

Q7:
 - Back/Front end: Show jobs from not connected users
 - Back/Front end: Show job posts based on personal skills (Bonus: Matrix Factorization Collaborative Filtering)

Q8:
 - Create chat page as well as chat functionality

Q12:
 - Implement bonus

