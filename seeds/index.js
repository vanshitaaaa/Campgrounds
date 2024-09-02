
const mongoose = require('mongoose');
const cities = require('./cities');
const {places , descriptors}= require('./seedhelpers');
const Campground = require('../models/campground');
//import axios, {isCancel, AxiosError} from 'axios';

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error" , console.error.bind(console,"connection error:"));
db.once("open" , ()=>{
    console.log("Database Connected !");
});

const sample = array => array[Math.floor(Math.random() *array.length)];

//async function seedImg() {
    //try {
     // const resp = await axios.get('https://api.unsplash.com/photos/random', {
       // params: {
        //  client_id: '0CcqmNPdNbzWgsy6qoKbA5YF5S4GWIpLKYsIQq8DZXQ',
        //  collections: 9912362,
        //},
      //})
     // return resp.data.urls.regular;
   // } catch (err) {
    //  console.error(err)
    //}
  //}

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0 ; i < 20 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://random.imagecdn.app/500/150",
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae qui, voluptatum itaque obcaecati mollitia deleniti pariatur odio id, accusamus aliquam distinctio praesentium labore officia aspernatur necessitatibus recusandae quia nulla ex.',

        })
        await camp.save();
    }

}

seedDB().then(() =>{
    mongoose.connection.close();
})
