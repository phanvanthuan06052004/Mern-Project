import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    Username: {
         type: String,
         required: true,
     },
     password: {
         type: String,
         required: true,
     },
     
     role: {
         type: String,
         required: true,
         enum: ['admin', 'user'],
     },
    
 }, {
     timestamps: true, //auto create createdAt and updatedAt fields
});



const User = mongoose.model('User', userSchema);
export default User;