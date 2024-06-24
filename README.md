# Software Engineering School Assignment

## Steps to start the project

1. Create `.env` file in the root and fill it with values just like in `.env.example`:

   1. To get `CURRENCY_BEACON_API_KEY` you have to create an account in https://currencybeacon.com/account and copy API Token from there
   2. `SENDER_EMAIL_PASSWORD`: using your actual email password is frowned upon, so I used 'App Password' generated from my Gmail account: https://myaccount.google.com/apppasswords

2. Make sure that Docker is up
3. To start the app run:

```sh
docker-compose up
```

# Project Text Stack

- Express.js
- TypeScript
- Docker, docker-compose
- PostgresQL
- TypeORM
- Joi
- Nodemailer
- Node-schedule
- Jest

# API Documentation

## Get current exchange rate USD to UAH

```http
GET /rate
```

#### Response

```
{
  "rate": number,
}
```

## Subscribe email to get the exchange rate updates

```http
POST /subscribe
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `email`   | `string` | **Required**. User email in proper email format |

#### Response

Returns newly created email data

```
{
  "id": string,
  "email": string,
}
```

## Additional 'Unsubscribe' endpoint which is included into the email templates.

```http
GET /unsubscribe
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `email`   | `string` | **Required**. User email in proper email format |

#### Response

Returns success message on 200

```
{
  "message": string,
}
```

## Status Codes

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |

## Steps to test the app

### 1. GET /rate

   <img width="663" alt="image" src="https://github.com/RiinaVi/se-school-assignment/assets/44338265/8e514d54-ef0e-44ea-ae83-19fc2cfede52">

### 2. POST /subscribe

   <img width="788" alt="image" src="https://github.com/RiinaVi/se-school-assignment/assets/44338265/b52baadd-ad47-488c-851b-f0b3a230e4ed">

### 3. Check that email record is now in the database using PostgresQL client like Postico

<img width="613" alt="image" src="https://github.com/RiinaVi/se-school-assignment/assets/44338265/59b40d53-2c7e-44d1-aca4-ec312befb253">

### 4. Submitting the same email would result in 409 error

<img width="804" alt="image" src="https://github.com/RiinaVi/se-school-assignment/assets/44338265/b704a515-fa52-44f3-b8ca-b272ab1611d7">

### 5. Submitting invalid email would result in 400 error

<img width="818" alt="image" src="https://github.com/RiinaVi/se-school-assignment/assets/44338265/0f7dd652-c924-4b88-b518-d89643f55069">

### 4. Receive the email once a day (you may adjust cron job timing for the testing purposes). Important note: when the app is running locally (not in Docker container) - the time zone for email sending is the one that you computer uses. And when the app runs in the container - it's UTC.

<img width="1189" alt="image" src="https://github.com/RiinaVi/se-school-assignment/assets/44338265/23aee0a4-a19e-41af-8181-fb34939ff571">

### 5. Perform /unsubscribe request using the link in the email

<img width="545" alt="image" src="https://github.com/RiinaVi/se-school-assignment/assets/44338265/5475b43a-70f8-48bf-b89d-eaa2f156aa62">

<img width="548" alt="image" src="https://github.com/RiinaVi/se-school-assignment/assets/44338265/6d6636b8-8586-4d15-beb4-90ce227ede38">

### 6. Submitting already unsubscribed email would result in 409 error

<img width="734" alt="image" src="https://github.com/RiinaVi/se-school-assignment/assets/44338265/b84d5823-29cd-4de8-ac31-2f547a72807e">
