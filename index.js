const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const app = express();
const members = require('./members');

// Handlebars middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');   

//Init body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// home page route
app.get("/", (req, res) => res.render('index', {title: 'Members app', members}));


// Init middlewaree
app.use(logger);    

// app.get("/",(req,res) => {
//     res.sendFile(path.join(__dirname,"public", "index.html"))
// });

// Set a static folder
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/members', require("./route/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));