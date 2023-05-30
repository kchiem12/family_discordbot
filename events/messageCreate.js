const { Events } = require("discord.js");
const { request } = require("undici");

const openai_url = new URL("https://api.openai.com/v1/chat/completions");

const header = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API}`,
};

module.exports = {
  name: Events.MessageCreate,
  async execute(m) {
    if (m.author.bot || m.guild) return;

    console.log(m.author.id);

    try {
      const post_body = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${m.content}`,
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

      m.author.send(responseBody.choices[0].message.content);
    } catch (err) {
      console.error(err);
    }
  },
};
