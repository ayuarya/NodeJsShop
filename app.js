const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController=require('./controllers/error')
const app = express();
const path = require('path')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.get404);
app.listen(3000);
