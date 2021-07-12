
# React App - Task list Manager

This project corresponds to the coding challenge to apply for the position of Fullstack Developer at InfoCasas.

This repository contains a application developed in React, which corresponds to a task management application.

## Pre-requisites

For the correct operation of this project, it is necessary that you have the following dependencies installed

- Node
- npm

## Installing pre-requisites

The steps described here are for Ubuntu or Debian-derived distros

#### Install NodeJS

 1. Open your terminal or press `Ctrl + Alt + T`. 
 To install node.js use the following command

```bash
$ sudo apt install nodejs
```
2. Once installed, verify it by checking the installed version using the following command:

```bash
$ node -v or node –version
```
#### Install NPM
It is recommended to install Node Package Manager(NPM) with Node.js. 

NPM is an open source library of Node.js packages.
To install NPM, use the following commands

```bash
$ sudo apt install npm
```
Once installed, verify it by checking the installed version using the following command:

```bash
$ npm -v or npm –version
```

Node and NPM will be successfully installed on your machine.

## Installation of project

Open a terminal and clone this repository using

```bash
$ git clone https://github.com/santiagocarlos/task-manager-react.git
```

Change to the newly created repository folder with

```bash
$ cd task-manager-react
```

### Install dependences

Run
```bash
$ npm install
```

### API Integration
This project is geared towards consuming data from the [Laravel API Task Manager](https://github.com/santiagocarlos/task-manager-laravel-api) developed as part of this challenge as well.

If you followed all the steps described in the [Readme](https://github.com/santiagocarlos/task-manager-laravel-api/blob/master/README.md) of that [repo](https://github.com/santiagocarlos/task-manager-laravel-api), and if you have this API running, with Laravel's own server `php artisan serve`

It is necessary, at this point to update the `TodoStore.js` file, on `line 4`

```
import React from 'react';
import { observable, action, computed, configure, runInAction } from 'mobx';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'; //modify for integrate Laravel API
configure({enforceActions: true});
```
If you mounted the API using a domain and virtual host, enter the corresponding URL.

### Start Application
Run
```bash
$ npm install
```
