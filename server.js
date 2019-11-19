app = require('./config/custom-express.js');

app.listen(process.env.PORT || 3000,() => {
    console.log(`Rodando ${process.env.PORT || 3000}`);
});