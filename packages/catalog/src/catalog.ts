import type { ModuleManifest } from "@dittosh/core"

import { blockManifests } from "./modules/blocks.js"
import { compositionManifests } from "./modules/compositions.js"
import { componentManifests } from "./modules/components.js"
import { formManifests } from "./modules/forms.js"
import { frameworkManifests } from "./modules/framework.js"
import { hookManifests } from "./modules/hooks.js"
import { httpManifests } from "./modules/http.js"
import { pageCompositionManifests } from "./modules/pages.js"
import { presetManifests } from "./modules/presets.js"
import { primitiveEngineManifests } from "./modules/primitive-engines.js"
import { projectStructureManifests } from "./modules/project-structures.js"
import { routingManifests } from "./modules/routing.js"
import { sampleDataManifests } from "./modules/sample-data.js"
import { stateManifests } from "./modules/state.js"
import { stylingManifests } from "./modules/styling.js"
import { supportManifests } from "./modules/support.js"
import { toolingManifests } from "./modules/tooling.js"
import { uiLibraryManifests } from "./modules/ui.js"
import { validationManifests } from "./modules/validation.js"

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
