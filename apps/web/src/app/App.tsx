import { useCallback, useEffect, useMemo, useState } from "react"
import { catalog } from "@dittojs/catalog"
import { resolveRecipe } from "@dittojs/core"

import type { BuilderOption, BuilderStep } from "../builder/builder-options"
import { allSelectableOptions } from "../builder/builder-options"
import { canGenerate, cliCommand, isLocked, lockExplanation } from "../builder/resolver-view-model"
import { AppShell, Header } from "../components/layout/AppShell"
import {
  archiveUrlFromBase64,
  fetchGenerationClient,
  type GenerationClient,
  type GenerationResponse,
} from "../services/generation-client"
import { CoreConfigurationPage } from "../pages/CoreConfigurationPage"
import { FeaturesBlocksPage } from "../pages/FeaturesBlocksPage"
import { GeneratingPage, generationSteps } from "../pages/GeneratingPage"
import { LandingPage } from "../pages/LandingPage"
import { ProjectStructurePage } from "../pages/ProjectStructurePage"
import { ReviewManifestPage } from "../pages/ReviewManifestPage"
import { SuccessPage } from "../pages/SuccessPage"

type GeneratedTemplateState = {
  response: GenerationResponse
  archiveUrl: string
}

export type AppProps = {
  generationClient?: GenerationClient
  initialStep?: BuilderStep
  initialPresetId?: string
  initialUserSelections?: string[]
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
    .filter((option) => option.groupId === groupId && option.moduleId !== undefined)
    .map((option) => option.moduleId as string)
}

function errorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Generation failed while writing files. Please retry or return to Review."
}

export function App({
  generationClient = fetchGenerationClient,
  initialStep = "landing",
  initialPresetId,
  initialUserSelections = [],
}: AppProps) {
  const [step, setStep] = useState<BuilderStep>(initialStep)
  const [presetId, setPresetId] = useState<string | undefined>(initialPresetId)
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
    return () => {
      if (generatedTemplate !== undefined) {
        URL.revokeObjectURL(generatedTemplate.archiveUrl)
      }
    }
  }, [generatedTemplate])

  const resetToLanding = useCallback(() => {
    setStep("landing")
    setManifestOpen(false)
    setGenerationError(undefined)
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

      if (option.moduleId === undefined) {
        return
      }

      const moduleId = option.moduleId
      const selected = recipe.effectiveSelections.includes(moduleId)
      const userSelected = userSelections.includes(moduleId)

      if (selected && isLocked(recipe, moduleId)) {
        setNotice(lockExplanation(recipe, moduleId) ?? `${option.label} is locked by the resolver.`)
        return
      }

      if (selected && !userSelected) {
        setNotice(`${option.label} is included by the selected preset or resolver.`)
        return
      }

      setNotice(undefined)
      setUserSelections((currentSelections) => {
        if (currentSelections.includes(moduleId)) {
          return currentSelections.filter((selection) => selection !== moduleId)
        }

        const groupModuleIds =
          option.groupMode === "exactly-one"
            ? new Set(moduleIdsForGroup(option.groupId))
            : undefined
        const withoutGroup =
          groupModuleIds === undefined
            ? currentSelections
            : currentSelections.filter((selection) => !groupModuleIds.has(selection))

        return [...withoutGroup, moduleId]
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
      <Header onHome={resetToLanding} />
      {notice !== undefined ? (
        <div className="notice" role="status">
          {notice}
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
