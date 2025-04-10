import axios from "axios";

export const protect = async (req, res, next) => {

    let token;
    if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }


    try {
        const resp = await axios.get(`${process.env.USER_SERVICE}/profile`, {

            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        req.user = resp.data.user;
        next();
    } catch (err) {
        console.error(err)
        return res.status(401).json({
            message: "Unauthorized",
            err
        })
    }

}



export const captainProtect = async (req, res, next) => {

    let token;
    
    if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    
    console.log("TOken in midd of ride ", token);

    try {

        const resp = await axios.get(`${process.env.CAPTAIN_SERVICE}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        req.captain = resp.data.captain;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}