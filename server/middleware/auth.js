const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.cookies.token // we want to make sure to get only snippets made by specific user 
        // console.log(token);

        if (!token) return res.status(401).json({ error: "Unauthorized." });

        // validate token and decode it

        const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = validatedUser.jwtData.id; // we set in req object a new key user with the value of id of a decoded token
        // console.log(validatedUser.jwtData.id);
        next(); // continue to the next step
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized." }); // 401 -> not authorized
    }

}

module.exports = auth;
