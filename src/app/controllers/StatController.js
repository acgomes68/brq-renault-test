import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';
import Stat from '../models/Stat';
import User from '../models/User';
import Url from '../models/Url';

class StatController {
    async index(req, res) {
        const hits = await Url.sum('hits');
        const urlCount = await Url.count();
        const topUrls = await Url.findAll({
            order: [['hits', 'DESC']],
            attributes: ['id', 'hits', 'url', 'short_url'],
            limit: 10,
        });
        return res.json({ hits, urlCount, topUrls });
    }

    async show(req, res) {
        const { UrlId } = req.params;
        const urls = await Url.findByPk(UrlId);

        if (!urls) {
            return res.status(404).json({ error: 'URL not found' });
        }

        return res.json({
            id: urls.id,
            hits: urls.hits,
            url: urls.url,
            shortUrl: urls.shortUrl,
        });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            provider_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { provider_id, date } = req.body;

        const checkIsProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });

        if (!checkIsProvider) {
            return res.status(401).json({
                error: 'You can only create stats with providers',
            });
        }

        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are not permitted' });
        }

        const checkAvailability = await Stat.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkAvailability) {
            return res
                .status(400)
                .json({ error: 'Stat date is not available' });
        }

        const stat = await Stat.create({
            user_id: req.userId,
            provider_id,
            date: hourStart,
        });

        return res.json(stat);
    }

    async delete(req, res) {
        const stat = await Stat.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['name', 'email'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                },
            ],
        });

        if (stat.user_id !== req.userId) {
            return res.status(401).json({
                error: "You don't have permission to cancel this stat",
            });
        }

        const dateWithSub = subHours(stat.date, 2);

        if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({
                error: 'You can only cancel stats 2 hours in advance',
            });
        }

        stat.canceled_at = new Date();

        await stat.save();

        return res.json(stat);
    }
}

export default new StatController();
