const { 
  Client, 
  GatewayIntentBits, 
  ModalBuilder, 
  TextInputBuilder, 
  TextInputStyle, 
  ActionRowBuilder 
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('clientReady', () => {
  console.log(`Bot iniciado como ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {

  // comando /reativacao
  if (interaction.isChatInputCommand() && interaction.commandName === 'reativacao') {

    const modal = new ModalBuilder()
      .setCustomId('formReativacao')
      .setTitle('Formulário de Reativação');

    const crm = new TextInputBuilder()
      .setCustomId('crm')
      .setLabel('CRM ID')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const estabelecimento = new TextInputBuilder()
      .setCustomId('estabelecimento')
      .setLabel('Estabelecimento')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const plano = new TextInputBuilder()
      .setCustomId('plano')
      .setLabel('Plano')
      .setStyle(TextInputStyle.Short);

    const assinatura = new TextInputBuilder()
      .setCustomId('assinatura')
      .setLabel('Assinatura gerada? (Sim/Não)')
      .setStyle(TextInputStyle.Short);

    const obs = new TextInputBuilder()
      .setCustomId('obs')
      .setLabel('Observações')
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      new ActionRowBuilder().addComponents(crm),
      new ActionRowBuilder().addComponents(estabelecimento),
      new ActionRowBuilder().addComponents(plano),
      new ActionRowBuilder().addComponents(assinatura),
      new ActionRowBuilder().addComponents(obs)
    );

    await interaction.showModal(modal);
  }

  // envio do formulário
  if (interaction.isModalSubmit() && interaction.customId === 'formReativacao') {

    const data = {
      crm: interaction.fields.getTextInputValue('crm'),
      estabelecimento: interaction.fields.getTextInputValue('estabelecimento'),
      plano: interaction.fields.getTextInputValue('plano'),
      assinatura: interaction.fields.getTextInputValue('assinatura'),
      observacoes: interaction.fields.getTextInputValue('obs')
    };

    console.log("Dados recebidos:", data);

    await interaction.reply({
      content: "✅ Reativação enviada com sucesso!",
      ephemeral: true
    });
  }

});

client.login(process.env.DISCORD_TOKEN);