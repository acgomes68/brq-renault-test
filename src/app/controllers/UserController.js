import * as Yup from 'yup';
import User from '../models/User';
import Url from '../models/Url';

const validUrl = require('valid-url');

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

            const { id, urls } = await Url.create(req.body);

            return res.json({
                id,
                urls,
            });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async update(req, res) {
        const { user_id, urls } = req.body;
        const schema = Yup.object().shape({
            user_id: Yup.int().required(),
            urls: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        try {
            const user = await User.findByPk(user_id);
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }

            if (!validUrl.isUri(urls)) {
                return res.status(400).json({ error: 'Invalid URL' });
            }
            // let hash = await models.storeURL(req.body.url);
            // res.send(req.hostname + '/' +hash);
            // catch(e) {
            //     console.log(e);
            //     res.send('error occurred while storing URL.');
            // }
            const hasItem = await Url.findOne({
                where: { user_id, urls },
            });

            if (hasItem) {
                return res.status(400).json({ error: 'URLS already exists' });
            }

            const { user_id, urls } = await Url.update(req.body);

            return res.json({
                user_id,
                urls,
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
