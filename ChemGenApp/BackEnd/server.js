import express from 'express';
import bodyParser from 'body-parser';
// import cors from 'cors'
// import mongoose from 'mongoose';
// both of the commented imports require packages which I have not installed.  They are used to access databases

const app = express();
const router = express.Router();

//app.use(cors());
app.use(bodyParser.json());

/* This code is basically what would be needed to access a MongoDB database
mongoose.connect('');

const connection = mongoos.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established successfully!');
}
*/

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));