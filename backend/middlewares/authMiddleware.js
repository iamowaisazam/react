import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {

    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authorization token is required."
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.SECRET_KEY);


        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

export default authMiddleware;
