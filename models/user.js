import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone_number:{
        type: Number,
        required: true,
        unique: true
    },
    role:{
            type: String,
            required: true
        }
})


// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// Virtual field to get a person data for a user (for ease of querying)
userSchema.virtual('person', {
    ref: 'person',
    localField: '_id',
    foreignField: 'user'
});

userSchema.virtual('class', {
    ref: 'class',
    localField: '_id',
    foreignField: 'teacher_id'
});

// userSchema.methods.getRole = function() {
//     return this.role;
//   };

// Compare hashed password
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getToken = function() {
    return jwt.sign({ id: this._id, username: this.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
};



export default mongoose.model('User', userSchema);