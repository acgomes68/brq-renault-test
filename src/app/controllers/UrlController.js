// import * as Yup from 'yup';
import Url from '../models/Url';
import User from '../models/User';

class UrlController {
    async show(req, res) {
        try {
            const { id } = req.params;

            const urls = await Url.findByPk(id);

            if (!urls) {
                return res.status(404).json({ error: 'URL not found' });
            }

            res.redirect(301, urls.url);
        } catch (error) {
            return res.status(502).json({ error });
        }
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

        // const dateWithSub = subHours(url.date, 2);

        // if (isBefore(dateWithSub, new Date())) {
        //     return res.status(401).json({
        //         error: 'You can only cancel urls 2 hours in advance',
        //     });
        // }

        url.canceled_at = new Date();

        await url.save();

        return res.json(url);
    }
}

export default new UrlController();
