import { Router } from 'express';
import { getAllProjects, getProjectBySlug } from '../controllers/project.controller';

const router = Router();

router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);

export default router;
