const addMock = {
    resRequired: {
        "code": 5,
        "errors": [
            {
                "instancePath": "",
                "schemaPath": "#/required",
                "keyword": "required",
                "params": {
                    "missingProperty": "id"
                },
                "message": "must have required property 'id'"
            },
            {
                "instancePath": "",
                "schemaPath": "#/required",
                "keyword": "required",
                "params": {
                    "missingProperty": "name"
                },
                "message": "must have required property 'name'"
            },
            {
                "instancePath": "",
                "schemaPath": "#/required",
                "keyword": "required",
                "params": {
                    "missingProperty": "age"
                },
                "message": "must have required property 'age'"
            },
            {
                "instancePath": "",
                "schemaPath": "#/required",
                "keyword": "required",
                "params": {
                    "missingProperty": "gender"
                },
                "message": "must have required property 'gender'"
            },
            {
                "instancePath": "",
                "schemaPath": "#/required",
                "keyword": "required",
                "params": {
                    "missingProperty": "email"
                },
                "message": "must have required property 'email'"
            }
        ]
    },
    resAdditional: {
        "code": 1,
        "errors": [
            {
                "instancePath": "",
                "schemaPath": "#/additionalProperties",
                "keyword": "additionalProperties",
                "params": {
                    "additionalProperty": "job"
                },
                "message": "must NOT have additional properties"
            }
        ]
    }
};

const viewMock = {
    allUsers: [
        {
            "id": "1",
            "name": "updated name",
            "age": "22",
            "gender": "Male",
            "email": "userone@gmail.com"
        },
        {
            "id": "2",
            "name": "user two",
            "age": "24",
            "gender": "Female",
            "email": "usertwo@gmail.com"
        },
        {
            "id": "3",
            "name": "user three",
            "age": "23",
            "gender": "Male",
            "email": "userthree@gmail.com"
        }
    ],
    allUsersTwo: [
        {
            "age": "22",
            "email": "userone@gmail.com",
            "gender": "Male",
            "id": "1",
            "name": "updated name"
        },
        {
            "age": "24",
            "email": "usertwo@gmail.com",
            "gender": "Female",
            "id": "2",
            "name": "user two"
        },
        {
            "age": "23",
            "email": "userthree@gmail.com",
            "gender": "Male",
            "id": "3",
            "name": "user three"
        },
        {
            "age": "22",
            "email": "userone@gmail.com",
            "gender": "Male",
            "id": "10",
            "name": "updated name"
        }
    ],
    singleUser: {
        "age": "22",
        "email": "userone@gmail.com",
        "gender": "Male",
        "id": "1",
        "name": "updated name"
    }     
};

const editMock = {
    reqShemaInvalid: {
        "name": "updated name",
        "age": "223",
        "email": "tes@gmail.com",
        "job": "test"
    },
    resShemaInvalid: {
        "code": 1,
        "errors": [
            {
                "instancePath": "",
                "schemaPath": "#/additionalProperties",
                "keyword": "additionalProperties",
                "params": {
                    "additionalProperty": "job"
                },
                "message": "must NOT have additional properties"
            }
        ]
    },
    reqWell: {
        "name": "Ricardo",
        "age": "28",
        "email": "test@tcs.com"
    },
}
module.exports = {
    addMock,
    viewMock,
    editMock
};