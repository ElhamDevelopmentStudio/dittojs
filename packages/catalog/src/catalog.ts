import type { ModuleManifest } from "@dittojs/core"

import { blockManifests } from "./modules/blocks"
import { compositionManifests } from "./modules/compositions"
import { componentManifests } from "./modules/components"
import { formManifests } from "./modules/forms"
import { frameworkManifests } from "./modules/framework"
import { hookManifests } from "./modules/hooks"
import { httpManifests } from "./modules/http"
import { pageCompositionManifests } from "./modules/pages"
import { presetManifests } from "./modules/presets"
import { primitiveEngineManifests } from "./modules/primitive-engines"
import { projectStructureManifests } from "./modules/project-structures"
import { routingManifests } from "./modules/routing"
import { sampleDataManifests } from "./modules/sample-data"
import { stateManifests } from "./modules/state"
import { stylingManifests } from "./modules/styling"
import { supportManifests } from "./modules/support"
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
  ...hookManifests,
  ...routingManifests,
  ...componentManifests,
  ...sampleDataManifests,
  ...supportManifests,
  ...blockManifests,
  ...pageCompositionManifests,
  ...compositionManifests,
  ...formManifests,
  ...validationManifests,
  ...stateManifests,
  ...httpManifests,
  ...presetManifests,
]
