const app = require('./app');
const { Logger } = require('logger-colors');

require('dotenv').config();
const logger = new Logger();
const port = Number(process.env.PORT) || 3000;;

app.listen(port, (error) => {
    if (!error) {
        logger.success('Server is Successfully Running')
        logger.success(`App is listening on http://localhost:${port}`);
    } else {
        logger.error(`Error occured, server can't start`, error);
    }
});
