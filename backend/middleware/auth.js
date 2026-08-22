const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;

        if (
            !authorizationHeader ||
            !authorizationHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                message: "Authentication token is required",
            });
        }

        const token = authorizationHeader.split(" ")[1];

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(
            decodedToken.userId
        ).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User no longer exists",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired authentication token",
        });
    }
}

function allowRoles(...roles) {
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You do not have permission to perform this action",
            });
        }

        next();
    };
}

module.exports = {
    protect,
    allowRoles,
};