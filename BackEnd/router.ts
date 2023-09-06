import { Router } from "express";

import * as controllers from "./controllers";

const router = Router();

router.get("", controllers.asas);

export default router;