# **we Buy**

Part of the weBuy ecommerce web application.

---

## Live preview

### [weBuy(Live)](https://we-buy-omega.vercel.app/)

### [we Bank(Live)](https://we-bank.vercel.app/)

---

## **Description and goals**

An ecommerce website that fascillitates transactions between two different organizations.

- A Bank organization(we Bank)
  - [link to we-buy](https://github.com/ss-joy/weBuy)
- An ecommerce website(we Buy)

The main objective of this project is to demonstrate transactions and communications between different api endpoints.This project gives users the ability to order and buy various kinds of items from an ecommerce shop. In order to complete the purchase they need to sign up to a different entity. A fictional ecommerce called **weBuy**.

---

## Features

- Fully typesafe frontend and backend code written in Typescript.
- Complete **runtime data validation** implemented with zod both in client and server side.
- Fully implemented Authentication and Authorization.
- Fully responsive in all screen sizes and devices.

---

## Technologies used

- <mark>Typescript</mark> : Typesafe code implementation
- <mark>NextJs</mark> :Frontend and Backend integration
- <mark>MongoDb</mark> :Database
- <mark>Mongoose</mark> : Database ODM
- <mark>Tailwind CSS</mark> : Styling
- <mark>Radix UI</mark> : Icons,Accessible components
- <mark>Next Auth</mark> : Authentication and Authorization

## Some screenshots

- Homepage:

  ![HomePage](/public/githubimages/homepage.png)

## Setup:

- First clone this github repo.
- Install all the dependencies using npm.
  - `npm i`
- Run the command `npm run dev`.
- This should start the application at http://localhost:3000
- Now add some environment variables.
  - Add a .env.local file inside the root folder.
  - Then add these envionment variables in the .env.local file:
    - **MONGODB_URI**
    - **NEXTAUTH_SECRET**
