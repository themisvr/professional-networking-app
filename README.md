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

Q1:
 - Make front end run on HTTPS

Q2:
 - Add error handling in front end when a user already exists

Q4:
 - Add support for exporting XML
 - Export all required data

Q5:
 - Back end: Retrieve articles that connected users have posted as well as any non connected users (siblings)
 - Front end: Add ability to create new article
 - Front end: Add ability to comment on an existing article

Q7:
 - Back/Front end: Show jobs from not connected users
 - Back/Front end: Show job posts based on personal skills (Bonus: Matrix Factorization Collaborative Filtering)

Q8:
 - Create chat page as well as chat functionality

Q9:
 - Create notification page

Q12:
 - Implement bonus

