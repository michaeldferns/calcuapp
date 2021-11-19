# CalcuApp

## Introduction

> This application is created for the second programming assingment of the SENG 560 course of Fall 21' semester at West Virginia University.
>
> The author of this code is Michael Ferns. Below are instructions on how to run the application along with required submission information.

## Clone Repo

> If you are reading this README, then you're visiting the repo for the application. Go ahead and clone down a copy of the repo.
> Note: This repo makes use of a submodule, so you'll have to clone using a recursive flag. Ex: git clone https://github.com/michaeldferns/calcuapp.git --recursive

## Run Options

### Primary Option - docker-compose

> The project is setup such that Docker can be used to spin up a NGiNX server hosting a React application and an Express web server.
>
> Docker Desktop is a simple way to get started with Docker. If you do not have Docker Desktop installed, you can visit the Docker website here: https://www.docker.com/products/docker-desktop
>
> From the root of the project folder, running "docker-compose up" will start the containers necessary for execution.

### Secondary Option - Development Commands

> If you do not want to download Docker Decktop, you could simply use the dev commands to run dev instances of the client and server. \n
>
> In order to do so, you'll have to install Node locally. I wrote the project with Node version 16.13.0 installed.
>
> You can install Node here: https://nodejs.org/en/download/
