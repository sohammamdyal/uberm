const User = require("./../routes/auth");
const getAllUsers = async (req,res) => {
    try{
const users = await User.find();
    }
    catch(error){
        next(error);
    }
}