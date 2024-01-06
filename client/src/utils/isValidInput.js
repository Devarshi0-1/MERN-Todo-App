const isValid = (...params) => {
    let isVal = true;
    params.forEach((elem) => {
        if (isHavingOnlyWhiteSpaces(elem) || elem.length === 0) isVal = false;
    });
    return isVal;
};

const isHavingOnlyWhiteSpaces = (elem) => {
    if (elem.replace(/\s/g, '').length) return false;
    return true;
};

export default isValid;
