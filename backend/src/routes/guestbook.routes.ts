import { Router } from 'express';
import { listEntries, createEntry } from '../controllers/guestbook.controller';

const router = Router();

router.get('/', listEntries);
router.post('/', createEntry);

export default router;
