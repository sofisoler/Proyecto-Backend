const { Command } = require('commander');

const commander = new Command();

commander.option('--mode <mode>', 'Modo de ejecución del servidor', 'development').parse();

module.exports = {
    commander
};