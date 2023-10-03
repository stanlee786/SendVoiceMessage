<br>
<h3>SendVoiceMessage</h3>
<br>
<details>
    <summary>Table of contents</summary>
    <ol>
        <li>
            <a href="#about">About</a>
        </li>
        <li>
            <a href="#requirements">Requirements</a>
        </li>
        <li>
            <a href="#getting-it-started">Getting it started</a>
        </li>
    </ol>
</details>
<br>

## About

NodeJS application to send custom audio messages as Discord Voice Messages using requests

<br>

<b>FOR EDUCATIONAL PURPOSES ONLY, I AM NOT RESPONSIBLE FOR ANY POTENTIAL DAMAGE CAUSED</b>

<br>

### Requirements

To run this application `NodeJS` is required, you will also need to create a `.env` file

- Install NodeJS from [here](https://nodejs.org/)

- Change the `config.example.json` file to a `config.json` file and fill out the information (without this, the application won't work)

<br>

You'll also need the following binaries in the application root:
- ffmpeg.exe
- ffprobe.exe

On top of that you need an .ogg file (audio file), you can convert an .mp3 file to .ogg
<br>
Make sure to call the file `voice-message.ogg` or change the `filename` field in the config.json to something else

<br>

### Getting it started

Instructions to get the application running:

<br>

1. Clone the `repository`

   ```sh
   git clone https://github.com/stanlee786/SendVoiceMessage.git
   ```

2. Install `NPM` packages

   ```sh
   npm install
   ```

3. `Start` the application

   ```sh
   node index.js
   ```