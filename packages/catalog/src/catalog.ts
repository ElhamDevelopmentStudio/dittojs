import type { ModuleManifest } from "@dittojs/core"

import { blockManifests } from "./modules/blocks"
import { componentManifests } from "./modules/components"
import { formManifests } from "./modules/forms"
import { frameworkManifests } from "./modules/framework"
import { httpManifests } from "./modules/http"
import { presetManifests } from "./modules/presets"
import { primitiveEngineManifests } from "./modules/primitive-engines"
import { stateManifests } from "./modules/state"
import { stylingManifests } from "./modules/styling"
import { toolingManifests } from "./modules/tooling"
import { uiLibraryManifests } from "./modules/ui"
import { validationManifests } from "./modules/validation"

export const catalog: ModuleManifest[] = [
  ...frameworkManifests,
  ...toolingManifests,
  ...stylingManifests,
  ...uiLibraryManifests,
  ...primitiveEngineManifests,
  ...componentManifests,
  ...blockManifests,
  ...formManifests,
  ...validationManifests,
  ...stateManifests,
  ...httpManifests,
  ...presetManifests,
]
