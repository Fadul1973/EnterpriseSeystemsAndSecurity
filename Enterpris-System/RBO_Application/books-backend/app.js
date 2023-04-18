var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Adding extra modules
var bodyParser = require("body-parser");
var cors = require('cors');

// adding the new router
var bookRouter = require('./routes/book.routes');
var audiobookRouter = require('./routes/audiobook.routes');
var supplierRouter = require('./routes/supplier.routes');
// Creating the chat socket
var chatSocket = require('socket.io')(
    {
        cors: {
            origins: ['http://localhost:8081']
        }
    }
);

// Importing the chat controller
var chatController = require('./controllers/chat.controller');

var chat = chatSocket
  .of('/chat') //We are defining an endpoint for the chat
  .on('connection', function (socket) {
      chatController.respond(chat,socket);
  });

var app = express();
// adding cors module
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Database connection code
const db = require("./models");
const Role = db.roles;

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}).then(() => {
  console.log("Connected to the database successfully!");
  initial();
}).catch(err => {
    console.log("Failed to connect to the database!", err);
    process.exit();
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Configuring the main routes
app.use('/bookshop', bookRouter);
app.use('/', bookRouter);

app.use('/bookshop', supplierRouter);
app.use('/', supplierRouter);

app.use('/audiobookshop', audiobookRouter);
app.use('/', audiobookRouter);

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, chatSocket };

