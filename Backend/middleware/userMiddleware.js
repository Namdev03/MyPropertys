import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access",
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.payload.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};