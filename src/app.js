const path = require('path');
const hbs = require('hbs');
const express = require('express');


const geocode = require('./utils/geoCode');
const forecast = require('./utils/foreCast');


// console.log(__dirname);
//  console.log(path.join(__dirname, '../public'));

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');


//setup handlebar and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// app.set('views', path.join(__dirname, '../views'));

//Setup static directory
app.use(express.static(path.join(publicDirectoryPath)));


app.get('', (req, res) => {
    res.render('index', { title: 'Weather ', name: 'Arif' });
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About page ', name: 'Arif' });
});

/**When someone tries to get something at a specific route, we set that up 
 using a method on app.It is app dot Get this, lets us configure what the 
 server should do when someone tries to get the resource at a specific route*/
// app.get('', (req, res) => {
//     res.send('<h1>hello node js</h1>');
// });

/* And it also takes in a function.Now the function is where we describe 
what we want to do when someone visits this particular route. */
app.get('/help', (req, res) => {
    res.render('help', { title: 'Help ', name: 'Arif' });
});

/*Now, this function gets called with two very important arguments.
The first is an object containing information about the incoming 
request to the server.This is commonly called REQUEST, which is short for 
req.You'll see this used throughout the documentation.The other 
argument is the response. So this contains a bunch of methods allowing us 
to customize what we're going to send back to the requester. */

// app.get('/about', (req, res) => {
//     res.send('<h1>About page node js</h1>');
// });
app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({ error: 'must provide --address' });
    }
    geocode(address, (error, { lat, lng, loc } = {}) => {
        if (error) {
            return res.send({ error: 'Address not found' });
        }
        forecast(lng, lat, (error, foreCastdata) => {
            if (error) {
                return res.send({ error: error });
            }
            res.send({
                forecast: foreCastdata,
                location: loc,
                address: req.query.address
            });
        });
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'must provide a serch term' });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: ' help page not found',
        title: '404 ',
        name: 'Arif'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'page not found',
        title: '404 ',
        name: 'Arif'
    });
});


app.get('', () => {

});

/*Now the other optional argument we can pass to the listen method is a 
callback function, which just runs when the server is up and running. */
app.listen(3000, () => {
    console.log('server is up on port 3000');
});