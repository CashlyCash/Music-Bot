const axios = require("axios");
const { MessageEmbed } = require("discord.js");

const getLyrics = (title) =>
  new Promise(async (ful, rej) => {
    const url = new URL("https://some-random-api.ml/lyrics");
    url.searchParams.append("title", title);

    try {
      const { data } = await axios.get(url.href);
      ful(data);
    } catch (error) {
      rej(error);
    }
  });

const substring = (length, value) => {
  const replaced = value.replace(/\n/g, "--");
  const regex = `.{1,${length}}`;
  const lines = replaced
    .match(new RegExp(regex, "g"))
    .map((line) => line.replace(/--/g, "\n"));

  return lines;
};

const createResponse = async (title) => {
  try {
    const data = await getLyrics(title);

    const embeds = substring(4096, data.lyrics).map((value, index) => {
      const isFirst = index === 0;

      return new MessageEmbed({
        title: isFirst ? `${data.title} - ${data.author}` : null,
        thumbnail: isFirst ? { url: data.thumbnail.genius } : null,
        description: value,
      });
    });

    return { embeds, ephemeral: true };
  } catch (error) {
    return { content: "Unable to find this songs lyrcis", ephemeral: true };
  }
};

const sendLyrics = (songTitle) => {
  return createResponse(songTitle)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log({ err }));
};

module.exports = sendLyrics;
