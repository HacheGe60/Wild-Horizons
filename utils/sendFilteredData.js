import { getDataFromDB } from "../database/db.js";

export async function sendFilteredData(req) {
    const data = await getDataFromDB();

    const url = new URL(req.url, `http://${req.headers.host}`);
    const segs = url.pathname.split('/').filter(Boolean);

    if (segs.length < 3 || segs[0] !== 'api') {
        return { status: 400, body: { error: 'bad_request', message: 'Ruta esperada: /api/:key/:value' } };
    }

    const key = segs[1];
    const rawValue = decodeURIComponent(segs[2]);

    const norm = v => (typeof v === 'string' ? v : String(v)).toLowerCase();

    if (!data.length || !(key in data[0])) {
        return { status: 400, body: { error: 'bad_request', message: `Clave inválida: "${key}"` } };
    }

    const filtered = data.filter(d => d[key] != null && norm(d[key]) === norm(rawValue));

    if (filtered.length === 0) {
        return { status: 404, body: { error: 'not_found', message: `Sin resultados para ${key}="${rawValue}"` } };
    }

    return { status: 200, body: filtered };
}