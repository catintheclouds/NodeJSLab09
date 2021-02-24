const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

const auth = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer", "")
        .trim();
    console.log("Token: ", token);
    try {
        const data = jwt
            .verify(token, process.env.JWT_KEY, (err, data) => {
                if (err) {
                    console.log("Token verification failed: ", err.message);
                } else {
                    console.log("User verified: ", data);
                }
            });
        req.user_id = data._id;
        req.token = token;

        const user = await User.findOne({_id: data._id});
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(JSON.stringify(error));
        console.log(error.stack);
        res.status(401).send({error: "Not authorized to access this resource"});
    }
};

module.exports = auth;