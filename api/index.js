const express = require('express');
const sequelize = require('./db.js');
const app = express();
const cors = require('cors');
const router = require('./routes/router.js');

app.use(cors());
app.use(express.json({}))
app.use(express.urlencoded({
     extended: true
}))


sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synchronized. Connection to the database established.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });




app.set('port', process.env.PORT || 8080)
let server = app.listen(app.get('port'),
   function(err){
       if(err) throw err;
       var message = 'Server is running @ http://localhost:' + server.address().port
       console.log(message);
   }
)
app.use('/api/v1',router)