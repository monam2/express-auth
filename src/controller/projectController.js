import { projects } from "../data/projectData.js";
import { authorize } from "../middleware/authorize.js";
import { canViewProject } from "../policies/projectPolicy.js";

const handleResponse = (res, status, message, project = null) => {
  res.status(status).json({
    status,
    message,
    project,
  });
};

export const viewProject = (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = getProjectById(projectId, res);
  console.log("Project is : ", project);
  authorize(canViewProject, project)(req, res, () => {
    handleResponse(res, 200, "Project retrived successfully", project);
  });
};
export const updateProject = (res, req) => {};

const getProjectById = (id, res) => {
  const project = projects.find((project) => project.id === id);
  if (!project) handleResponse(res, 404, "Project not found");
  return project;
};
