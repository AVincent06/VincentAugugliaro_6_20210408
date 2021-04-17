# VincentAugugliaro_6_07042021

Repository for project 6 of the web developer path at OpenClassrooms

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To make this API work, you need to have access to a MongoDB Atlas account ( https://www.mongodb.com/cloud/atlas/signup ) in read/write mode. 
You need to run the frontend server that you can find on the following repository:

```
https://github.com/OpenClassrooms-Student-Center/dwj-projet6
```

### Installing

From the root folder of the clone project locally on your machine, install all :

```
npm install
```

Create your own ```.env``` file from the ```.env.example``` file to set up your environment variables.
Follow the template on the right:

```
# App
APP_PORT=yourPortNumberHere

# DB
DB_NAME=yourDataBaseNameHere
DB_USER=yourUserNameHere
DB_PASSWORD=yourPasswordHere

# Token
TOKEN_KEY=yourSecretKey
TOKEN_DURATION=yourTokenTimeLife
```

Then start the backend server:

```
node server.js
```

## Built With

* [Mongo](https://docs.atlas.mongodb.com/) - a fully-managed cloud database
* [Express](https://expressjs.com/en/starter/installing.html) - a minimal and flexible Node.js web application framework
* [Node](https://nodejs.org/en/docs/) - a JavaScript runtime

## Versioning

I use [GitHub](https://github.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/AVincent06/VincentAugugliaro_6_20210408/tags). 

## Author

* **Vincent Augugliaro** - *Initial work* - [My GitHub Profile](https://github.com/AVincent06)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Thanks to Will Alexander and his course "Go Full Stack with Node.js, Express and MongoDB" which allowed me to set up the right structure. https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb
* Thanks to my mentor Guillaume Gasperi for his support.
