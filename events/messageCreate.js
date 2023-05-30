const { Events } = require("discord.js");
const { request } = require("undici");
const { Messages } = require("../dbObjects");

const openai_url = new URL("https://api.openai.com/v1/chat/completions");

const header = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API}`,
};

module.exports = {
  name: Events.MessageCreate,
  async execute(m) {
    if (m.author.bot || m.guild) return;

    const message = await Messages.findOne({ where: { user_id: m.author.id } });

    try {
      const messages_arr = [];

      if (message) {
        messages_arr.push({
          role: "user",
          content: message.get("user_message"),
        });
        messages_arr.push({
          role: "assistant",
          content: message.get("gpt_message"),
        });
      }

      messages_arr.push({
        role: "user",
        content: `${m.content}`,
      });

      const post_body = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages_arr,
      });

      const { body } = await request(openai_url, {
        method: "POST",
        headers: header,
        body: post_body,
      });

      const responseBody = await body.json();

      console.log(responseBody);

      console.log(responseBody.choices[0].message);

      if (message) {
        await Messages.update(
          {
            gpt_message: responseBody.choices[0].message.content,
            user_message: m.content,
          },
          { where: { user_id: m.author.id } }
        );
      } else {
        await Messages.create({
          user_id: m.author.id,
          gpt_message: responseBody.choices[0].message.content,
          user_message: m.content,
        });
      }

      m.author.send(responseBody.choices[0].message.content);
    } catch (err) {
      console.error(err);
    }
  },
};
