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

## Client Pages

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
