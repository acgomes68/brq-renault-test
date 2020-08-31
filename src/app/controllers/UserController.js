import * as Yup from 'yup';
import User from '../models/User';

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
