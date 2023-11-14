const config = require("./config.json");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("node:fs");

let link;

const file = fs.readFileSync(`./${config.fileName}`);
const fileStats = fs.statSync(`./${config.fileName}`);

const audioDuration = new Promise((resolve) => {
  ffmpeg.ffprobe(`./${config.fileName}`, function (err, metadata) {
    return resolve(Math.floor(metadata.format.duration));
  });
});

const randomFixedInteger = function (length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};

async function main() {
  await fetch(
    `https://discord.com/api/v9/channels/${config.channel}/attachments`,
    {
      method: "POST",
      headers: {
        Host: "discord.com",
        Authorization: config.token,
        "X-Super-Properties": config.xSuperProperties,
        "Accept-Language": "en-US",
        "X-Discord-Locale": "en-GB",
        "X-Debug-Options": "bugReporterEnabled",
        "User-Agent": "Discord-Android/177021;RNA",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate",
      },

      body: JSON.stringify({
        files: [
          {
            filename: config.fileName,
            file_size: fileStats.size,
            id: randomFixedInteger(1),
          },
        ],
      }),
    }
  ).then((res) => {
    if (res.status !== 200) return console.log(res.status);
    res.text().then(async (body) => {
      const data = JSON.parse(body);
      link =
        data.attachments[0].upload_url.split("/")[3] +
        "/" +
        data.attachments[0].upload_url.split("/")[4].split("?")[0];
      await fetch(data.attachments[0].upload_url, {
        method: "PUT",
        headers: {
          Host: "discord-attachments-uploads-prd.storage.googleapis.com",
          "User-Agent": "Discord-Android/177021;RNA",
          "Content-Type": "audio/ogg",
          "Content-Length": fileStats.size,
          "Accept-Encodig": "gzip, deflate",
          Connection: "close",
        },

        body: file,
      }).then(async (res) => {
        if (res.status !== 200) return console.log(res.status);
        await fetch(
          `https://discord.com/api/v9/channels/${config.channel}/messages`,
          {
            method: "POST",
            headers: {
              Host: "discord.com",
              Authorization: config.token,
              "X-Debug-Options": "bugReporterEnabled",
              "Accept-Language": "en-GB",
              "X-Super-Properties": config.xSuperProperties,
              "User-Agent": "Discord-Android/177021;RNA",
              "Content-Type": "application/json",
              "Accept-Encoding": "gzip, deflate",
            },

            body: JSON.stringify({
              content: "",
              channel_id: config.channel,
              type: 0,
              flags: 8192,
              attachments: [
                {
                  id: "0",
                  filename: "voice-message.ogg",
                  uploaded_filename: link,
                  duration_secs: await audioDuration,
                  waveform: "AAAAAAACAQMCAQIDAwMBAwMFAgMDBg==",
                },
              ],

              nonce: randomFixedInteger(19),
            }),
          }
        ).then((res) => {
          console.log(`${res.status} -> Send voice message`);
        });
      });
    });
  });
}

main();
