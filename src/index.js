require('dotenv').config();
const { sequelize } = require('./db');
const app = require('./app');
const Models = require('./db/models'); // This import is for modelsSync works

const PORT = process.env.PORT || 5500;

const setUpConnection = async () => {
    await sequelize.authenticate();
    console.log('[sequelize] Connection stablished successfully.');
};

const syncModels = async () => {
    await sequelize.sync();
    console.log('[sequelize] All models were synchronized successfully.');
};

(async () => {
    try {
        await setUpConnection();
        await syncModels();
    } catch (error) {
        console.log(`[sequelize]: Unable to connect to database: ${error}`);
    }
    app.listen(PORT, () => {
        console.log(`[server] Server is running at http://localhost:${PORT}/`);
        console.log('[server] Press ctrl+c to terminate');
    });
})();
