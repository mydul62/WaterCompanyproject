import { createCrudRouter } from "../../utils/contentHelpers";
import { TvNewsController } from "./tvNews.controller";
import { TvNewsValidation } from "./tvNews.validation";

export const tvNewsRoutes = createCrudRouter(TvNewsController, {
  hasSlugRoute: true,
  hasResetRoute: true,
  createSchema: TvNewsValidation.create,
  updateSchema: TvNewsValidation.update,
});
