import * as express from 'express';

import * as got from 'got';

import { DiscordEmbed } from '../utils/interfaces/notifications';

export default class NotificationController {
    public basePath = '/notify';
    public router = express.Router();

    public constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.basePath, this.index);
        this.router.post(`${this.basePath}/discord/:id/:token`, this.discord);
    }

    index = (request: express.Request, response: express.Response) => {
        response.send(`<h1><b>ヾ(•ω•\`)o</b></h1><br>Hello World!`)
    }

    discord = async (request: express.Request, response: express.Response) => {
        try {
            // await new DiscordNotify(request.body, request.params.id, request.params.token).send();
            response.sendStatus(200)
        }
        catch(error) {
            response.status(500).send(`<h1><b>(っ◞‸◟ c)</b></h1><br>Something went wrong!<br><br>${error}`)
        }
    }
}

class DiscordNotify {
    public data: DiscordEmbed;
    public url: string;

    public constructor(data: DiscordEmbed, id: string, token: string) {
        this.data = data;
        this.url = `https://discord.com/api/webhooks/${id}/${token}`;
    }

    private Embed() {
        return {
            title: this.data.title,
            type: "rich",
            description: this.data.description,
            url: this.data.url,
            timestamp: new Date().toISOString(),
            color: this.data.color,
            footer: this.data.footer,
            thumbnail: this.data.thumbnail,
            author: this.data.author,
            fields: this.data.fields
        }
    }

    public async send() {
        await got.default.post(this.url, {
            headers: {
                'Content-Type': 'application/json'
            },
            json: {
                embeds: [this.Embed()]
            }
        }).json()
    }
}