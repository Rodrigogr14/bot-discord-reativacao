const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('reativacao')
    .setDescription('Abrir formulário de reativação')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken('MTQ4MTM5MTA2NTA5NjUyMzk0Nw.GU06N4.eie9ODVJ55_xIXnnpdCVUdezyd5FYX9KvVcfvc');

(async () => {
  try {
    console.log('Registrando comando...');

    await rest.put(
      Routes.applicationGuildCommands('1481391065096523947', '689989595617820716'),
      { body: commands },
    );

    console.log('Comando registrado com sucesso.');
  } catch (error) {
    console.error(error);
  }
})();