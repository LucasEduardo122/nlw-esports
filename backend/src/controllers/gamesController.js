const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {convertMinutesHour} = require('../utils/convertHour');
module.exports = {
    async getGames(req, res) {
        const games = await prisma.game.findMany({
            include: {
                _count: {
                    select: {
                        ads: true
                    }
                }
            }
        });

        return res.json(games)
    },

    async getGameID(req, res) {
        const gameId = req.params.id;

        const ads = await prisma.ad.findMany({
            select: {
                id: true,
                gameId: true,
                name: true,
                yearsPlaying: true,
                discord: true,
                weekDays: true,
                hoursStart: true,
                hoursEnd: true,
                useVoiceChannel: true,
            },

            where: {
                gameId,
            },

            orderBy: {
                createdAt: 'desc',
            }
        })

        console.log(gameId)

        return res.json(ads.map(ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hoursStart: convertMinutesHour(ad.hoursStart),
                hoursEnd: convertMinutesHour(ad.hoursEnd),
            }
        }))
    },
}