const Ajv = require('ajv');
const { Logger } = require('logger-colors');

const logger = new Logger();

function JSONSchema(schema) {
    return (req, res, next) => {
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(schema);

        const valid = validate(req.body);
        if (valid) {
            next();
        } else {
            const e = {
                code: validate.errors.length,
                errors: validate.errors,
            };

            logger.error('ERROR REQUEST', true);
            logger.error(JSON.stringify(e), false);
            logger.error('');
            logger.info('----------------------------------------------------');

            res.status(400).send(e);
        }
    };

}


module.exports = JSONSchema;