const expres = require('express');
const User = require('../Models/User');
const brcypt = require('bcrypt') // for encryption
const router = expres.Router();
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

// get request for signup where singup page is rendered
router.get('/signup', (req, res) => {
    res.render('../Templates/Basic', { page: 'signup', error: null });
})

// get request for login where login page is rendered
router.get('/login', (req, res) => {
    res.render('../Templates/Basic', { page: 'login', error: null })
})

// post request for creating account in database
router.post('/signup', async (req, res) => {
    //sending json response

    // finding user
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        res.json({ success: false, message: "Email Already exits" })
    }
    else {
        const salt = await brcypt.genSalt(10);
        const secPass = await brcypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        const data = {
            user: {
                id: user.id
            }
        }
        //sending authtoken
        const authtoken = jwt.sign(data, secret);
        res.json({ success: true, authtoken: authtoken })
    }
})

// post reqeust for logging in 
router.post('/login', async (req, res) => {

    //sending corresponding json response 

    const { email, password } = req.body;

    // find user with entered email
    let user = await User.findOne({ email });
    if (!user) {
        res.json({ success: false, message: "Invalid login" })
    }
    else {
        // compare both the passwords
        const passCompaare = await brcypt.compare(password, user.password);
        if (!passCompaare) {
            res.json({ success: false, message: "Invalid login" })
        }
        else {
            const data = {
                user: {
                    id: user.id,
                 }
            }
            // send an authorisation token
            const authtoken = jwt.sign(data, secret);
            res.json({ success: true, authtoken: authtoken })
        }
    }
})

// request to get user id using authorisation token provided
router.post('/getuserid', async (req, res) => {
    if(!req.headers.authtoken){
    res.json({success:false})}
    else{
    const token = req.headers.authtoken;
    const data = jwt.verify(token, secret);
    User.findById(data.user.id).then(result=>{
        res.json({ success:true,id: data.user.id ,author:result.name});
    })
    }
})
module.exports = router;
