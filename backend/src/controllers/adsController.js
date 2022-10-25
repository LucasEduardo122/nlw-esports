const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {convertHour, convertMinutesHour} = require('../utils/convertHour');

module.exports = {
    async getAds(req, res) {
        const ads = await prisma.ad.findMany()
        return res.json(ads.map(ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hoursStart: convertMinutesHour(ad.hoursStart),
                hoursEnd: convertMinutesHour(ad.hoursEnd),
            }
        }))
    },

    async getAdsDiscord(req, res) {
        const adId = req.params.id;

        const ad = await prisma.ad.findUniqueOrThrow({
            select: {
                discord: true
            },
            where: {
                id: adId
            }
        })
        return res.json({ discord: ad.discord })
    },

    async postAds(req, res) {
        const body = req.body

        console.log(body)

        const ad = await prisma.ad.create({
            data: {
                gameId: body.gameId,
                name: body.name,
                yearsPlaying: Number(body.yearsPlaying),
                discord: body.discord,
                weekDays: body.weekDays.join(','),
                hoursStart: convertHour(body.hoursStart),
                hoursEnd: convertHour(body.hoursEnd),
                useVoiceChannel: body.useVoiceChannel == 'Sim' ? true : false ,
            }
        })

        return res.status(201).json(ad)
    }
}