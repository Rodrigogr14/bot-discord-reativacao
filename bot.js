require('dotenv').config();

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

client.once('ready', () => {
  console.log(`Bot iniciado como ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  try {
    // COMANDO /reativacao -> abre o formulário
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
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const assinatura = new TextInputBuilder()
        .setCustomId('assinatura')
        .setLabel('Assinatura gerada? (Sim/Não)')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const obs = new TextInputBuilder()
        .setCustomId('obs')
        .setLabel('Observações')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder().addComponents(crm),
        new ActionRowBuilder().addComponents(estabelecimento),
        new ActionRowBuilder().addComponents(plano),
        new ActionRowBuilder().addComponents(assinatura),
        new ActionRowBuilder().addComponents(obs)
      );

      await interaction.showModal(modal);
      return;
    }

    // ENVIO DO FORMULÁRIO
    if (interaction.isModalSubmit() && interaction.customId === 'formReativacao') {
      const data = {
        crm: interaction.fields.getTextInputValue('crm'),
        estabelecimento: interaction.fields.getTextInputValue('estabelecimento'),
        plano: interaction.fields.getTextInputValue('plano'),
        assinatura: interaction.fields.getTextInputValue('assinatura'),
        observacoes: interaction.fields.getTextInputValue('obs')
      };

      console.log('Dados recebidos:', data);

      // Procura o canal pelo nome
    const canal = interaction.guild.channels.cache.get("992592194143789136"); // ID do canal "reativações"

      if (canal) {
        await canal.send(`
🔄 Nova Reativação

CRM: ${data.crm}
Estabelecimento: ${data.estabelecimento}
Plano: ${data.plano}
Assinatura: ${data.assinatura}
Observações: ${data.observacoes}

Responsável: ${interaction.user.username}
`);
      } else {
        console.log('Canal "reativações" não encontrado.');
      }

      await interaction.reply({
        content: '✅ Reativação enviada com sucesso!',
        ephemeral: true
      });
    }
  } catch (error) {
    console.error('Erro no interactionCreate:', error);

    if (interaction.isRepliable()) {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: '❌ Ocorreu um erro ao processar a solicitação.',
          ephemeral: true
        }).catch(() => {});
      } else {
        await interaction.reply({
          content: '❌ Ocorreu um erro ao processar a solicitação.',
          ephemeral: true
        }).catch(() => {});
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);