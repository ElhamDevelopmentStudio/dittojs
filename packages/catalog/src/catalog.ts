import type { ModuleManifest } from "@dittojs/core"

import { blockManifests } from "./modules/blocks"
import { compositionManifests } from "./modules/compositions"
import { componentManifests } from "./modules/components"
import { formManifests } from "./modules/forms"
import { frameworkManifests } from "./modules/framework"
import { httpManifests } from "./modules/http"
import { presetManifests } from "./modules/presets"
import { primitiveEngineManifests } from "./modules/primitive-engines"
import { projectStructureManifests } from "./modules/project-structures"
import { stateManifests } from "./modules/state"
import { stylingManifests } from "./modules/styling"
import { toolingManifests } from "./modules/tooling"
import { uiLibraryManifests } from "./modules/ui"
import { validationManifests } from "./modules/validation"

export const catalog: ModuleManifest[] = [
  ...frameworkManifests,
  ...projectStructureManifests,
  ...toolingManifests,
  ...stylingManifests,
  ...uiLibraryManifests,
  ...primitiveEngineManifests,
  ...componentManifests,
  ...blockManifests,
  ...compositionManifests,
  ...formManifests,
  ...validationManifests,
  ...stateManifests,
  ...httpManifests,
  ...presetManifests,
]
