// import * as Yup from 'yup';
import Url from '../models/Url';

class UrlController {
    async show(req, res) {
        try {
            const { id } = req.params;

            const urls = await Url.findByPk(id);
            const { hits } = urls;

            if (!urls) {
                return res.status(404).json({ error: 'URL not found' });
            }

            urls.hits = hits + 1;
            res.redirect(301, urls.url);

            return true;
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const url = await Url.findByPk(id);
            if (!url) {
                return res.status(404).json({ error: 'URL not found' });
            }
            await url.destroy();
            return res.json({});
        } catch (error) {
            return res.status(502).json({ error });
        }
    }
}

export default new UrlController();
