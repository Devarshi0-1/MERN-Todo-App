import jwt from 'jsonwebtoken';
export const sendCookie = (user, res, message, statusCode = 200) => {
    const maxAge = 15 * 24 * 60 * 60 * 1000;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
        .status(statusCode)
        .cookie('token', token, {
        httpOnly: true,
        maxAge,
        sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
        secure: process.env.NODE_ENV === 'Development' ? false : true,
        // @ts-ignore
        origin: process.env.FRONTEND_URL,
    })
        .json({
        success: true,
        message,
    });
};
export const isEmpty = (...strings) => {
    strings.forEach((str) => {
        if (str === null ||
            str === undefined ||
            str.length <= 0 ||
            isHavingOnlyWhiteSpaces(str))
            return true;
    });
    return false;
};
const isHavingOnlyWhiteSpaces = (elem) => {
    if (elem.replace(/\s/g, '').length)
        return false;
    return true;
};
