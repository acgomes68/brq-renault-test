import 'dotenv/config';

import * as Yup from 'yup';
import * as validUrl from 'valid-url';
import * as shortId from 'shortid';
import User from '../models/User';
import Url from '../models/Url';

class UserController {
    async index(req, res) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async show(req, res) {
        try {
            const { userId } = req.params;
            const hasUser = await User.findByPk(userId);

            if (!hasUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            const hits = await Url.sum('hits', {
                where: { userId },
            });
            const urlCount = await Url.count({ where: { userId } });
            const topUrls = await Url.findAll({
                where: { userId },
                order: [['hits', 'DESC']],
                attributes: ['id', 'hits', 'url', 'short_url'],
                limit: 10,
            });
            return res.json({ hits, urlCount, topUrls });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async store(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'User name is required' });
            }
            const hasItem = await User.findOne({
                where: { name: req.body.name },
            });

            if (hasItem) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const { id, name } = await User.create(req.body);

            return res.json({
                id,
                name,
            });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async update(req, res) {
        try {
            const { url } = req.body;
            const schema = Yup.object().shape({
                url: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'URL is required' });
            }
            const { userId } = req.params;
            const shortUrl = shortId.generate();
            const hasUser = await User.findByPk(userId);

            if (!hasUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (!validUrl.isUri(url)) {
                return res.status(400).json({ error: 'Invalid URL' });
            }

            const hasUrl = await Url.findOne({
                where: { url },
            });

            if (hasUrl) {
                return res.status(400).json({ error: 'URL already exists' });
            }

            const { APP_URL } = process.env;
            const { APP_PORT } = process.env;

            const urls = await Url.create({
                url,
                shortUrl: `${APP_URL}:${APP_PORT}/${shortUrl}`,
                userId,
                hits: 0,
            });

            return res.status(201).json({
                id: urls.id,
                hits: urls.hits,
                url: urls.url,
                shortUrl: urls.shortUrl,
            });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.destroy();
            return res.json(user);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }
}

export default new UserController();
