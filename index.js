const app=require("./app");
const {infoLogger} = require("./src/shared/logger");
const PORT=process.env.PORT || 8080;

app.listen(PORT,function () {
    infoLogger.info(`app listening on port ${PORT}`);
})