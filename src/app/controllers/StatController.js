// import * as Yup from 'yup';
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
}

export default new StatController();
