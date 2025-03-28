import { projects } from "../data/projectData.js";
import { authorize } from "../middleware/authorize.js";
import { canUpdateProject, canViewProject } from "../policies/projectPolicy.js";

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
  //   console.log("Project is : ", project);
  authorize(canViewProject, project)(req, res, () => {
    handleResponse(res, 200, "Project retrived successfully", project);
  });
};
export const updateProject = (req, res) => {
  const { name } = req.body;
  const projectId = parseInt(req.params.id);
  const project = getProjectById(projectId, res);

  authorize(canUpdateProject, project)(req, res, () => {
    const projectIndex = projects.findIndex((obj) => obj.id === project.id);
    project[projectIndex].name = name;
    handleResponse(res, 200, "Project updated successfully", project);
  });
};

const getProjectById = (id, res) => {
  const project = projects.find((project) => project.id === id);
  if (!project) handleResponse(res, 404, "Project not found");
  return project;
};
