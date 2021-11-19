# CalcuApp

## Introduction

> This application is created for the second programming assingment of the SENG 560 course of Fall 21' semester at West Virginia University.
>
> The author of this code is Michael Ferns. Below are instructions on how to run the application along with required submission information.

## Clone Repo

> If you are reading this README, then you're visiting the repo for the application. Go ahead and clone down a copy of the repo.
>
> Note: This repo makes use of a submodule, so you'll have to clone using a recursive flag. Ex: git clone https://github.com/michaeldferns/calcuapp.git --recursive

## Run Options

### Primary Option - docker-compose

> The project is setup such that Docker can be used to spin up a NGiNX server hosting a React application and an Express web server.
>
> Docker Desktop is a simple way to get started with Docker. If you do not have Docker Desktop installed, you can visit the Docker website here: https://www.docker.com/products/docker-desktop
>
> From the root of the project folder, running "docker-compose up" will start the containers necessary for execution.

### Secondary Option - Development Commands

> If you do not want to download Docker Decktop, you could simply use the dev commands to run dev instances of the client and server.
>
> In order to do so, you'll have to install Node locally. I wrote the project with Node version 16.13.0 installed.
>
> You can install Node here: https://nodejs.org/en/download/
>
> With node installed you should be able to run npm install with a command line in both the client and server directories. This will install dependencies.
>
> To run the React client: npm start
> To run the Express server: npm start

## About The App

> The app itself is a simple web based calculator ui. The client sends requests to the server which makes use of another classmates library to perform math operations.
>
> The library used can be found here: https://github.com/mhorbatak/SENG560_Assgn_1

## Client

### About Authentication

> The application features session based auth.
>
> The routes of the application are wrapped in conditional logic to redirect if necessary. Basically, uou must authenticate before you'll be able to use the full scope of the application

### Navigation

> From an authenticated state, you'll be able to use a navigation in the top right to access all pages.

### Unauthenticated Routes

#### /auth

> This path leads to a login screen. The application is setup to instantiate a sqlite database on startup so a new user will need to be registered at "/auth/register" to get started.

#### /auth/register

> A registration screen. You can make up any email and password between the length of 8 and 200 characters.
>
> No logic exists to actually send emails so do not worry about actually owning the email address used.
>
> On a successful registration, you will be regirected to the login screen with that email pre-popilated in the email field.

### Authenticated Routes

#### /

> The home screen after a successful authentication. The screen will display the calculator, which is fully operational with fancy logic to disable buttons based on the current input.

#### /history

> A history screen displaying all past inputs for the account in use. You'll be able to use this page to paginate between past inputs and their resulting values.

#### /profile

> This would essentially be a settings page in a production application. It just features a button to delete the current account.
>
> History records are cascade deleted when the user is deleted.

### Library Usage

> As mentioned earlier, this application makes use of a library created by a fellow classmate. This is the key aspect to the assignment. The experience was relatively simple.
>
> The repository was added to this one as a submodule.
>
> All of the provided math operations of the library are used in the calculator logic except for the exponent one. There was no issue with that equation, I just used a reference image for the UI and I realized late in the project that there was no button for exponents.
>
> Not many drastic changes were necessary to make use of the library. Just two accommodations were made within the endpoint logic. For one, the only error handling in the operation functions resulted in a string return. For this reason, any string return value resulted in just a 500 reponse status. Beyond that, the function for division did not handle cases of divide by zero, so that also resulted in a 500 error.
>
> Beyond that, it was an enjoyable experince.
