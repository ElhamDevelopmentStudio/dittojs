import { useCallback, useEffect, useMemo, useState } from "react"
import { catalog } from "@dittojs/catalog"
import { resolveRecipe } from "@dittojs/core"

import type { BuilderOption, BuilderStep } from "../builder/builder-options"
import { allSelectableOptions, moduleIdsForOption } from "../builder/builder-options"
import { canGenerate, cliCommand, isLocked, lockExplanation } from "../builder/resolver-view-model"
import { AppShell, Header } from "../components/layout/app-shell"
import {
  archiveUrlFromBase64,
  fetchGenerationClient,
  type GenerationClient,
  type GenerationResponse,
} from "../services/generation-client"
import { CoreConfigurationPage } from "../pages/core-configuration-page"
import { FeaturesBlocksPage } from "../pages/features-blocks-page"
import { GeneratingPage, generationSteps } from "../pages/generating-page"
import { LandingPage } from "../pages/landing-page"
import { ProjectStructurePage } from "../pages/project-structure-page"
import { ReviewManifestPage } from "../pages/review-manifest-page"
import { SuccessPage } from "../pages/success-page"
import { CatalogPreviewRoute } from "../previews/catalog-preview-route"

type GeneratedTemplateState = {
  response: GenerationResponse
  archiveUrl: string
}

const defaultRoutePresetId = "preset.react-recommended"

const stepPaths: Record<BuilderStep, string> = {
  landing: "/",
  core: "/templates/core",
  features: "/templates/features",
  structure: "/templates/structure",
  review: "/templates/review",
  generating: "/templates/generating",
  success: "/templates/success",
}

export type AppProps = {
  generationClient?: GenerationClient
  initialStep?: BuilderStep
  initialPresetId?: string
  initialUserSelections?: string[]
}

function stepFromPath(pathname: string): BuilderStep | undefined {
  switch (pathname.replace(/\/+$/, "") || "/") {
    case "/":
      return "landing"
    case "/templates":
    case "/templates/core":
      return "core"
    case "/templates/features":
      return "features"
    case "/templates/structure":
      return "structure"
    case "/templates/review":
      return "review"
    case "/templates/generating":
      return "generating"
    case "/templates/success":
      return "success"
    default:
      return undefined
  }
}

function currentPathStep(): BuilderStep | undefined {
  if (typeof window === "undefined") {
    return undefined
  }

  return stepFromPath(window.location.pathname)
}

function currentPreviewId(): string | undefined {
  if (typeof window === "undefined") {
    return undefined
  }

  const match = /^\/preview\/(.+)$/.exec(window.location.pathname)

  return match?.[1] === undefined ? undefined : decodeURIComponent(match[1])
}

function resolveForState(presetId: string | undefined, userSelections: string[]) {
  const input: {
    catalog: typeof catalog
    userSelections: string[]
    presetId?: string
  } = {
    catalog,
    userSelections,
  }

  if (presetId !== undefined) {
    input.presetId = presetId
  }

  return resolveRecipe(input)
}

function moduleIdsForGroup(groupId: string): string[] {
  return allSelectableOptions
    .filter((option) => option.groupId === groupId)
    .flatMap((option) => moduleIdsForOption(option))
}

function errorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Generation failed while writing files. Please retry or return to Review."
}

export function App(props: AppProps) {
  const previewId = currentPreviewId()

  if (previewId !== undefined) {
    return <CatalogPreviewRoute previewId={previewId} />
  }

  return <BuilderApp {...props} />
}

function BuilderApp({
  generationClient = fetchGenerationClient,
  initialStep,
  initialPresetId,
  initialUserSelections = [],
}: AppProps) {
  const resolvedInitialStep = initialStep ?? currentPathStep() ?? "landing"
  const shouldSeedRoutePreset =
    resolvedInitialStep !== "landing" &&
    initialPresetId === undefined &&
    initialUserSelections.length === 0
  const [step, setStep] = useState<BuilderStep>(resolvedInitialStep)
  const [presetId, setPresetId] = useState<string | undefined>(
    shouldSeedRoutePreset ? defaultRoutePresetId : initialPresetId,
  )
  const [userSelections, setUserSelections] = useState<string[]>(initialUserSelections)
  const [notice, setNotice] = useState<string | undefined>()
  const [copyState, setCopyState] = useState<string | undefined>()
  const [manifestOpen, setManifestOpen] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [generationError, setGenerationError] = useState<string | undefined>()
  const [generatedTemplate, setGeneratedTemplate] = useState<GeneratedTemplateState | undefined>()

  const recipe = useMemo(
    () => resolveForState(presetId, userSelections),
    [presetId, userSelections],
  )
  const command = useMemo(() => cliCommand(presetId, userSelections), [presetId, userSelections])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const path = stepPaths[step]

    if (window.location.pathname !== path) {
      window.history.pushState({ step }, "", path)
    }
  }, [step])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const handlePopState = () => {
      const nextStep = currentPathStep() ?? "landing"

      setStep(nextStep)
      if (nextStep !== "landing") {
        setPresetId((currentPresetId) => currentPresetId ?? defaultRoutePresetId)
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    if (step === "success" && generatedTemplate === undefined) {
      setStep("review")
    }
  }, [generatedTemplate, step])

  useEffect(() => {
    return () => {
      if (generatedTemplate !== undefined) {
        URL.revokeObjectURL(generatedTemplate.archiveUrl)
      }
    }
  }, [generatedTemplate])

  const resetToLanding = useCallback(() => {
    setStep("landing")
    setPresetId(undefined)
    setUserSelections([])
    setManifestOpen(false)
    setGenerationError(undefined)
    setGeneratedTemplate(undefined)
  }, [])

  const createPreset = useCallback((nextPresetId: string) => {
    setPresetId(nextPresetId)
    setUserSelections([])
    setStep("review")
    setNotice(undefined)
  }, [])

  const customizePreset = useCallback((nextPresetId: string) => {
    setPresetId(nextPresetId)
    setUserSelections([])
    setStep("core")
    setNotice(undefined)
  }, [])

  const startGenerating = useCallback(() => {
    setPresetId("preset.react-recommended")
    setUserSelections([])
    setStep("core")
    setNotice(undefined)
  }, [])

  const selectOption = useCallback(
    (option: BuilderOption) => {
      setCopyState(undefined)

      if (option.comingSoon === true) {
        setNotice(`${option.label} is coming soon.`)
        return
      }

      const optionModuleIds = moduleIdsForOption(option)

      if (optionModuleIds.length === 0) {
        return
      }

      const selected = optionModuleIds.every((moduleId) =>
        recipe.effectiveSelections.includes(moduleId),
      )
      const userSelected = optionModuleIds.every((moduleId) => userSelections.includes(moduleId))
      const lockedModuleId = selected
        ? optionModuleIds.find((moduleId) => isLocked(recipe, moduleId))
        : undefined

      if (lockedModuleId !== undefined) {
        setNotice(
          lockExplanation(recipe, lockedModuleId) ?? `${option.label} is locked by the resolver.`,
        )
        return
      }

      if (selected && !userSelected) {
        setNotice(`${option.label} is included by the selected preset or resolver.`)
        return
      }

      setNotice(undefined)
      setUserSelections((currentSelections) => {
        const optionModuleIdSet = new Set(optionModuleIds)

        if (optionModuleIds.every((moduleId) => currentSelections.includes(moduleId))) {
          return currentSelections.filter((selection) => !optionModuleIdSet.has(selection))
        }

        const groupModuleIds =
          option.groupMode === "exactly-one"
            ? new Set(moduleIdsForGroup(option.groupId))
            : undefined
        const withoutGroup =
          groupModuleIds === undefined
            ? currentSelections
            : currentSelections.filter((selection) => !groupModuleIds.has(selection))

        const withoutOption = withoutGroup.filter((selection) => !optionModuleIdSet.has(selection))

        return [...withoutOption, ...optionModuleIds]
      })
    },
    [recipe, userSelections],
  )

  const copyCliCommand = useCallback(async () => {
    if (navigator.clipboard?.writeText === undefined) {
      setCopyState("Clipboard is unavailable in this browser.")
      return
    }

    await navigator.clipboard.writeText(command)
    setCopyState("CLI command copied.")
  }, [command])

  const downloadArchive = useCallback(() => {
    if (generatedTemplate === undefined) {
      return
    }

    const link = document.createElement("a")

    link.href = generatedTemplate.archiveUrl
    link.download = generatedTemplate.response.fileName
    link.rel = "noopener"
    document.body.append(link)
    link.click()
    link.remove()
  }, [generatedTemplate])

  const runGeneration = useCallback(async () => {
    if (!canGenerate(recipe)) {
      return
    }

    setStep("generating")
    setManifestOpen(false)
    setGenerationError(undefined)
    setGenerationStep(0)

    let interval: number | undefined

    interval = window.setInterval(() => {
      setGenerationStep((currentStep) => Math.min(currentStep + 1, generationSteps.length - 1))
    }, 300)

    try {
      const request: {
        userSelections: string[]
        projectName: string
        presetId?: string
      } = {
        userSelections,
        projectName: "ditto-template",
      }

      if (presetId !== undefined) {
        request.presetId = presetId
      }

      const response = await generationClient.generate(request)
      const archiveUrl = archiveUrlFromBase64(response)

      window.clearInterval(interval)
      setGenerationStep(generationSteps.length - 1)
      setGeneratedTemplate({
        response,
        archiveUrl,
      })
      setStep("success")
    } catch (error: unknown) {
      window.clearInterval(interval)
      setGenerationError(errorMessage(error))
      setStep("generating")
    }
  }, [generationClient, presetId, recipe, userSelections])

  const backToReview = useCallback(() => {
    setGenerationError(undefined)
    setStep("review")
  }, [])

  return (
    <AppShell>
      <Header
        isLanding={step === "landing"}
        onHome={resetToLanding}
        onTemplates={startGenerating}
      />
      {notice !== undefined ? (
        <div className="notice" role="status" aria-live="polite">
          <span className="notice-icon" aria-hidden="true">
            i
          </span>
          <div>
            <strong>Resolver note</strong>
            <span>{notice}</span>
          </div>
          <button
            type="button"
            aria-label="Dismiss resolver note"
            onClick={() => setNotice(undefined)}
          >
            Close
          </button>
        </div>
      ) : null}
      {step === "landing" ? (
        <LandingPage
          onCreatePreset={createPreset}
          onCustomizePreset={customizePreset}
          onStart={startGenerating}
        />
      ) : null}
      {step === "core" ? (
        <CoreConfigurationPage
          recipe={recipe}
          onSelectOption={selectOption}
          onBack={() => setStep("landing")}
          onContinue={() => setStep("features")}
        />
      ) : null}
      {step === "features" ? (
        <FeaturesBlocksPage
          recipe={recipe}
          onSelectOption={selectOption}
          onBack={() => setStep("core")}
          onContinue={() => setStep("structure")}
        />
      ) : null}
      {step === "structure" ? (
        <ProjectStructurePage
          recipe={recipe}
          onSelectOption={selectOption}
          onBack={() => setStep("features")}
          onContinue={() => setStep("review")}
        />
      ) : null}
      {step === "review" ? (
        <ReviewManifestPage
          recipe={recipe}
          manifestOpen={manifestOpen}
          copyState={copyState}
          onBack={() => setStep("structure")}
          onGenerate={runGeneration}
          onOpenManifest={() => setManifestOpen(true)}
          onCloseManifest={() => setManifestOpen(false)}
          onCopyCli={copyCliCommand}
        />
      ) : null}
      {step === "generating" ? (
        <GeneratingPage
          activeStep={generationStep}
          error={generationError}
          onRetry={runGeneration}
          onBackToReview={backToReview}
        />
      ) : null}
      {step === "success" && generatedTemplate !== undefined ? (
        <SuccessPage
          response={generatedTemplate.response}
          manifestOpen={manifestOpen}
          copyState={copyState}
          onDownload={downloadArchive}
          onOpenManifest={() => setManifestOpen(true)}
          onCloseManifest={() => setManifestOpen(false)}
          onCopyCli={copyCliCommand}
        />
      ) : null}
    </AppShell>
  )
}
