import { Router } from 'express';
import { trackEvent, getStats } from '../controllers/analytics.controller';

const router = Router();

router.post('/track', trackEvent);
router.get('/stats', getStats); // TODO: protect with admin auth in production

export default router;
