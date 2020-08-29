import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';
import Url from '../models/Url';
import User from '../models/User';

class UrlController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const urls = await Url.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date'],
            attributes: ['id', 'date', 'past', 'cancelable'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });
        return res.json(urls);
    }

    async show(req, res) {
        const { id } = req.params;
        const url = await Url.findByPk(id);
        return res.json(url);
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
                error: 'You can only create urls with providers',
            });
        }

        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are not permitted' });
        }

        const checkAvailability = await Url.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkAvailability) {
            return res.status(400).json({ error: 'Url date is not available' });
        }

        const url = await Url.create({
            user_id: req.userId,
            provider_id,
            date: hourStart,
        });

        return res.json(url);
    }

    async delete(req, res) {
        const url = await Url.findByPk(req.params.id, {
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

        if (url.user_id !== req.userId) {
            return res.status(401).json({
                error: "You don't have permission to cancel this url",
            });
        }

        const dateWithSub = subHours(url.date, 2);

        if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({
                error: 'You can only cancel urls 2 hours in advance',
            });
        }

        url.canceled_at = new Date();

        await url.save();

        return res.json(url);
    }
}

export default new UrlController();
