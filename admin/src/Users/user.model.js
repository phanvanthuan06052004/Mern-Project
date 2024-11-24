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

//handle json web token(JWT)
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model('User', userSchema);
export default User;