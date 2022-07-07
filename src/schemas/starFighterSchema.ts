import joi from "joi";

const userSchema = joi.object({
    firstUser: joi.string().required(),
    secondUser: joi.string().required()
});

export default userSchema;