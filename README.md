# YPracticum Web Developer Bootcamp: Project 15

This repository contains the full API of "Around the U.S." project that features user authorization and user registration and handles cards and users.

---

**Live Site Deployed on Google Cloud Platform**
[https://deserie.students.nomoreparties.site/signin](https://deserie.students.nomoreparties.site/signin)

---

# The Application

This is a 3-tier application with a React based frontend, Express.js API and MongoDB database.

## Functionality:

- Allows users to register and login using an email address and password. JWT have been used to ensure users don't have to re-enter their credentials when they revisit the site. Tokens are valid for 7 days.
- Allows users to update their profile name, profile picture and description
- Allows users to post/delete/like/dislike cards. Users can delete only the cards they themselves created.
- MongoDB is used for storing user and cards data
- Authentication using JSON web tokens
- Let's Encrypt SSL certificate
- Helmet used to secure HTTP headers returned by Express app
- CORS protection allows access only from selected routes
- Data validation with Celebrate and Joi
- Bcrypt used for password hashing.
- Winston is used to provide error and request logging for easier maintenance
