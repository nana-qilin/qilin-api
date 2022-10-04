export interface DiscordEmbed {
    title: string,
    description: string,
    url: string,
    color: number,
    footer: {
        text: string,
        icon_url: string
    },
    thumbnail: {
        url: string,
        height?: number,
        width?: number
    },
    author: {
        name: string,
        url: string,
        icon_url: string
    },
    fields: [{
        name: string,
        value: string,
        inline?: boolean
    }]
}