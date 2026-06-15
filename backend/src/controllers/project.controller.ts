import { Request, Response, NextFunction } from 'express';
import { projects } from '../models/projects.data';

export const getAllProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(200).json({
      status: 'success',
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

export const getProjectBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = projects.find((p) => p.slug === req.params.slug);
    if (!project) {
      res.status(404).json({ status: 'error', message: 'Project not found' });
      return;
    }
    res.status(200).json({ status: 'success', data: project });
  } catch (err) {
    next(err);
  }
};
