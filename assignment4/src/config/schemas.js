const postUserSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        age: {
            type: 'string'
        },
        gender: {
            type: 'string'
        },
        email: {
            type: 'string'
        }
    },
    required: [
        'id',
        'name',
        'age',
        'gender',
        'email'
    ],
    additionalProperties: false,
};

const putUserSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        age: {
            type: 'string'
        },
        email: {
            type: 'string'
        }
    },
    required: [],
    additionalProperties: false,
};

module.exports = {
    postUserSchema,
    putUserSchema
};