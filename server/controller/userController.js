const {User} = require('../model/User');
const bcrypt = require('bcrypt');
const generatedToken = require('../util/generateToken');


// user registeration controller
// @route POST /user/register
const userRegister = async (req, res) => {
    const {fullname, email, password} = req.body;
    try {
        const exitingUser = await User.findOne({email});
        if(exitingUser){
            return res.status(403).json({
                status: "failure",
                msg: "user already exists"
            })
        }
        // hasing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname, email, password: hashedPassword
        });

        await User.create(newUser);

        return res.status(201).json({
            status: "success",
            data: {
                newUser
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            msg: error.message
        })
    }
}



// user login controller
// @route POST /user/login
const userLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const exitingUser = await User.findOne({email});
        if(!exitingUser){
            return res.status(404).json({
                status: "failure",
                msg: "user not found"
            })
        }

        if(exitingUser && bcrypt.compareSync(password, exitingUser?.password)){
            return res.status(201).json({
                msg: "logged in successfully",
                token: generatedToken(exitingUser?._id),
                data: exitingUser
            })
        } else {
            return res.status(403).json({
                status: "failure",
                msg: "email or password is incorrect",
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            msg: error.message
        })
    }
}
// post method for logout

const userLogout = async (req, res) => {
    const userId = req.userAuthId;
    try {
        const user = await User.findById(userId);
        delete user._id;
        res.status(200).json({
            message: "User logout successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            msg: error.message
        })
    }
}

// get profile data
// @route GET /user/profile
const getProfile = async(req, res) => {

    try {
        const users = await User.find();

        res.status(200).json({
            status: "success", 
            data: users
        })
        
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            msg: error.message
        })
    }   
}


module.exports = {
    userRegister,
    userLogin,
    getProfile,
    userLogout
}