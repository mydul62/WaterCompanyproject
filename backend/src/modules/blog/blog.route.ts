import { createCrudController, createCrudRouter } from "../../utils/contentHelpers";
import { BlogService } from "./blog.service";

const controller = createCrudController(BlogService, "Blog post");

export const blogRoutes = createCrudRouter(controller, {
  hasSlugRoute: true,
  hasResetRoute: true,
});

