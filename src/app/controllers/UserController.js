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
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
            return res.json(user);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        try {
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
        const { url } = req.body;
        const schema = Yup.object().shape({
            url: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        try {
            const { userId } = req.params;
            const shortUrl = shortId.generate();
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }

            if (!validUrl.isUri(url)) {
                return res.status(400).json({ error: 'Invalid URL' });
            }

            const urls = await Url.create({
                url,
                shortUrl,
                userId,
                hits: 0,
            });

            return res.json({
                urls,
                url,
                shortUrl,
                userId,
            });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
            await user.destroy();
            return res.json(user);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }
}

export default new UserController();
