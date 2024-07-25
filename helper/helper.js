module.exports = {
    validationErrorConvertor: (validation) => {
        let error=Object.values(validation.errors)[0].message
        return error;
    },
};