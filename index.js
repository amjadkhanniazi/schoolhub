import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import 'dotenv/config';
import AuthAPI from './route/auth.js';
import PersonAPI from './route/personAPI.js';
import AddressAPI from './route/addressAPI.js';
import TeacherDetailsAPI from './route/teacherDetailsAPI.js';
import ParentDetailsAPI from './route/parentDetailsAPI.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

connectDB();

app.use('/auth', AuthAPI);
app.use('/person', PersonAPI);
app.use('/address', AddressAPI);
app.use('/teacher', TeacherDetailsAPI);
app.use('/parent', ParentDetailsAPI);




app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
})