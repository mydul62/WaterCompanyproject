import { createCrudController, createCrudRouter } from "../../utils/contentHelpers";
import { TvNewsService } from "./tvNews.service";

const controller = createCrudController(TvNewsService, "TV News video");

export const tvNewsRoutes = createCrudRouter(controller, {
  hasSlugRoute: true,
  hasResetRoute: true,
});

