import { createCrudController } from "../../utils/contentHelpers";
import { TvNewsService } from "./tvNews.service";

export const TvNewsController = createCrudController(TvNewsService, "TV News video");

