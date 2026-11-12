import { createCrudController } from "../../utils/contentHelpers";
import { BlogService } from "./blog.service";

export const BlogController = createCrudController(BlogService, "Blog post");

