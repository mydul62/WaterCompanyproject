import { createCrudController, createCrudRouter } from "../../utils/contentHelpers";
import { CaseStudyService } from "./caseStudy.service";

const controller = createCrudController(CaseStudyService, "Case study");

export const caseStudyRoutes = createCrudRouter(controller, {
  hasSlugRoute: true,
  hasResetRoute: true,
});

