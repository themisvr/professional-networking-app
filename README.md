# DiNA
DiNA is a professional networking application like LinkedIn

## Authors

- George Liontos - sdi1600094
- Themis Varveris - sdi1600015

## Tools Used

- Python3 (Flask)
- PostgreSQL
- PyCharm
- TypeScript (Angular)
- Material UI
- Docker
- Various NPM dependencies (package.json)

## Start Docker

```
```

## How to run back-end

```
cd /back-end/src
source ../venv/bin/activate
flask init-db # this is needed only once to initialize schema and insert static data
python3 app.py
```

## How to run front-end

```
cd /front-end/dina
npm install
npm start

Then browse to https://localhost:4200/welcome
```


## Sign Up
This is the sign-up page. You can make an account just filling the fields are shown below. The fields with the asterisk are mandatory otherwise the user can't continue with the registration.
![sing-up](./readme-images/sign-up.png)

## Sign In
This is the sing-in page. After the registration the user can log in with the email and the password.
![sing-in](./readme-images/sign-in.png)

## Admin
This is the admin page. Only admins, that are already in the database, can browse to this page. Admins can see every information regarding the users. They can also extract these data by simply export them in the form of JSON or XML.

![admin-page](./readme-images/admin.png)

## Home - Timeline

This is the home page. This page is shows up when a user is logging in. In this page a user can see its uploaded articles and articles that have been uploaded by its network. A user can leave a comment on the article or press the like button to show its interest. The user can also see articles that are recommended by the DiNA application. We use Matrix Factorization algorithm in order to produce the recommended articles.

![timeline](./readme-images/timeline.png)

![upload-post](./readme-images/upload-post.png)

## Profile Information

This is the profile page. A user can modify his information about his personal interests/skills, working experience and education. He can also choose which of these information wants to be public or private. Private information are only visible by his network. The user can also change his avatar.

![personal-info](./readme-images/personal-info.png)


## Notifications


This is the notifications page. In this page the user can see his connection requests. He can accept or reject the connection request or he can just view the user's profile.

At the bottom of this page, the news feed section, the user can see notifications about comments or likes on his posts.
![notifications](./readme-images/notifications.png)

## Job Posts

![avail-jobs](./readme-images/avail-jobs.png)

![applied-jobs](./readme-images/applied-jobs.png)

![created-jobs](./readme-images/created-jobs.png)

![create-new-jobs](./readme-images/create-new-jobs.png)


## Network

This is the network page. In this page a user can see its network, the users that his connected to. For each connected user can either choose to view the user's profile or chat with him. The network page is shown as a grid of connencted users.
![network](./readme-images/network.png)

Each time a user can search for another user by simply using the search bar in the navbar menu. The results of the searching are shown as a list of users. If there is no user with such name the application shows a corresponding message.

## Chat

![chat](./readme-images/chat.png)


## Settings

This is the settings page. In this page the user can either choose to change his email or his password. Each time he chooses the right box and then he completes the necessary information.
![settings](./readme-images/settings.png)



