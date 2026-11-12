import { createCrudRouter } from "../../utils/contentHelpers";
import { CaseStudyController } from "./caseStudy.controller";
import { CaseStudyValidation } from "./caseStudy.validation";

export const caseStudyRoutes = createCrudRouter(CaseStudyController, {
  hasSlugRoute: true,
  hasResetRoute: true,
  createSchema: CaseStudyValidation.create,
  updateSchema: CaseStudyValidation.update,
});
