import { createCrudRouter } from "../../utils/contentHelpers";
import { BlogController } from "./blog.controller";
import { BlogValidation } from "./blog.validation";

export const blogRoutes = createCrudRouter(BlogController, {
  hasSlugRoute: true,
  hasResetRoute: true,
  createSchema: BlogValidation.create,
  updateSchema: BlogValidation.update,
});
