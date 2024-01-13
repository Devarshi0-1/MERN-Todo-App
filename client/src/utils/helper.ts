export const f = new Intl.DateTimeFormat('en-uk', {
    dateStyle: 'short',
});

const isHavingOnlyWhiteSpaces = (elem: string) => {
    if (elem.replace(/\s/g, '').length) return false;
    return true;
};

export const isValid = (...params: string[]) => {
    let isVal = true;
    params.forEach((elem) => {
        if (isHavingOnlyWhiteSpaces(elem) || elem.length === 0) isVal = false;
    });
    return isVal;
};

