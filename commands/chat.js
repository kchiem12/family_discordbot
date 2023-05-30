const { SlashCommandBuilder } = require("discord.js");
const { request } = require("undici");

const openai_url = new URL("https://api.openai.com/v1/chat/completions");

const header = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API}`,
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Interact with ChatGPT!")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to send to ChatGPT")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const post_body = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${interaction.options.getString("message")}`,
          },
        ],
      });

      const { body } = await request(openai_url, {
        method: "POST",
        headers: header,
        body: post_body,
      });

      const responseBody = await body.json();

      console.log(responseBody);

      console.log(responseBody.choices[0].message);

      await interaction.editReply(responseBody.choices[0].message.content);
    } catch (err) {
      console.error(`Error making request: ${err}`);
    }
  },
};
