const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const db = require('./models');


//routers
const postRouter = require('./routes/Posts')
app.use("/posts" ,postRouter);

const eventsRouter = require('./routes/events');
app.use('/events', eventsRouter);

const eventCategoriesRouter = require('./routes/eventCategories');
app.use('/eventCategories', eventCategoriesRouter);



db.sequelize.sync().then(() =>{
    app.listen(3003,() =>{
        console.log('server  is running ');
    });
});
