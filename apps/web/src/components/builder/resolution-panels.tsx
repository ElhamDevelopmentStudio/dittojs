import { useState } from "react"
import type { ResolvedRecipe } from "@dittosh/core"

import {
  addedAutomatically,
  blockingConflicts,
  lockSummaries,
  selectedByIntent,
  stackSummary,
} from "../../builder/resolver-view-model"
import { AppIcon } from "../icons"

function visibleSummaryItems(values: string[]) {
  const visible = values.slice(0, 8)
  const hiddenCount = Math.max(values.length - visible.length, 0)

  return { visible, hiddenCount }
}

function LedgerBlock({ title, values, empty }: { title: string; values: string[]; empty: string }) {
  const { visible, hiddenCount } = visibleSummaryItems(values)

  return (
    <div className="grid gap-3 border-t border-white/15 pt-4 first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-(family-name:--font-display) text-[0.86rem] font-bold text-[#f8f8f4]">
          {title}
        </h3>
        {values.length > 0 ? (
          <span className="text-[0.7rem] text-[#b9bfbb]">{values.length} items</span>
        ) : null}
      </div>
      {values.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/10 pt-3 max-[980px]:grid-cols-2">
          {visible.map((value, index) => (
            <li
              className="flex items-start gap-2 text-[0.75rem] leading-5 text-[#b9bfbb] before:mt-2 before:h-[0.18rem] before:w-2 before:flex-none before:bg-(--builder-accent) before:content-['']"
              key={`${title}-${value}-${index}`}
            >
              {value}
            </li>
          ))}
          {hiddenCount > 0 ? (
            <li className="text-[0.75rem] italic text-[#b9bfbb]">+{hiddenCount} more</li>
          ) : null}
        </ul>
      ) : (
        <p className="text-[0.75rem] leading-5 text-[#b9bfbb]">{empty}</p>
      )}
    </div>
  )
}

export function LiveStackSummary({ recipe }: { recipe: ResolvedRecipe }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside
      className={`sticky top-26 grid max-h-[calc(100dvh-7.5rem)] gap-4 overflow-auto bg-(--builder-ink) p-5 text-white shadow-[0.35rem_0.35rem_0_rgba(232,81,47,0.7)] max-[980px]:static max-[980px]:max-h-none ${expanded ? "" : "self-start"}`}
      aria-label="Resolver ledger"
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-4">
        <div>
          <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold uppercase text-(--builder-accent)">
            Resolver output
          </p>
          <h2 className="font-(family-name:--font-display) text-lg font-bold text-[#f8f8f4]">
            Resolver Ledger
          </h2>
        </div>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center border border-[#3a403c] bg-[#252a27] text-[#f8f8f4] hover:border-(--builder-accent)"
          aria-label={expanded ? "Hide resolver ledger" : "Show resolver ledger"}
          aria-expanded={expanded}
          title={expanded ? "Hide resolver ledger" : "Show resolver ledger"}
          onClick={() => setExpanded((current) => !current)}
        >
          <AppIcon name={expanded ? "close" : "arrow-right"} />
        </button>
      </div>
      {expanded ? (
        <ResolverLedgerBody recipe={recipe} />
      ) : (
        <p className="text-[0.75rem] text-[#b9bfbb]">Summary hidden.</p>
      )}
    </aside>
  )
}

function ResolverLedgerBody({ recipe }: { recipe: ResolvedRecipe }) {
  const locks = lockSummaries(recipe)
  const errors = blockingConflicts(recipe)

  return (
    <>
      <LedgerBlock
        title="Selected by you"
        values={selectedByIntent(recipe)}
        empty="No explicit selections yet."
      />
      <LedgerBlock
        title="Added automatically"
        values={addedAutomatically(recipe)}
        empty="No resolver additions."
      />
      <LedgerBlock
        title="Locked dependencies"
        values={locks.map((lock) => lock.label)}
        empty="No locked dependencies."
      />
      <div className="grid gap-3 border-t border-white/15 pt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-(family-name:--font-display) text-[0.86rem] font-bold text-[#f8f8f4]">
            Warnings / conflicts
          </h3>
          {errors.length + recipe.warnings.length > 0 ? (
            <span className="text-[0.7rem] text-[#b9bfbb]">
              {errors.length + recipe.warnings.length} items
            </span>
          ) : null}
        </div>
        {errors.length > 0 || recipe.warnings.length > 0 ? (
          <ul className="grid gap-2 text-[0.75rem] leading-5 text-[#b9bfbb]">
            {errors.map((conflict, index) => (
              <li key={`${conflict.message}-${index}`} className="flex gap-2 text-[#ffb09e]">
                <AppIcon name="warning" />
                {conflict.message}
              </li>
            ))}
            {recipe.warnings.map((warning, index) => (
              <li key={`${warning.message}-${index}`}>{warning.message}</li>
            ))}
          </ul>
        ) : (
          <p className="text-[0.75rem] text-[#b9bfbb]">No resolver warnings or conflicts.</p>
        )}
      </div>
    </>
  )
}

export function DependencyNotes({ recipe }: { recipe: ResolvedRecipe }) {
  return (
    <aside
      className="sticky top-26 grid max-h-[calc(100dvh-7.5rem)] gap-4 overflow-auto bg-(--builder-ink) p-5 text-white shadow-[0.35rem_0.35rem_0_rgba(232,81,47,0.7)] max-[980px]:static max-[980px]:max-h-none"
      aria-label="Resolver ledger"
    >
      <div className="border-b border-white/15 pb-4">
        <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold uppercase text-(--builder-accent)">
          Manifest ledger
        </p>
        <h2 className="font-(family-name:--font-display) text-lg font-bold text-[#f8f8f4]">
          Resolver Ledger
        </h2>
      </div>
      <ResolverLedgerBody recipe={recipe} />
    </aside>
  )
}

export function StackSummaryTable({ recipe }: { recipe: ResolvedRecipe }) {
  return (
    <div className="grid border-t border-(--color-border-strong)">
      {stackSummary(recipe).map((row) => (
        <div
          className="grid grid-cols-[minmax(9rem,0.55fr)_minmax(0,1fr)] gap-4 border-b border-(--color-border-strong) py-4 max-[640px]:grid-cols-1"
          key={row.label}
        >
          <span className="font-(family-name:--font-mono) text-[0.62rem] font-bold uppercase text-(--color-muted-foreground)">
            {row.label}
          </span>
          <strong className="text-sm">{row.value}</strong>
        </div>
      ))}
    </div>
  )
}

export function ValidationCard({ recipe }: { recipe: ResolvedRecipe }) {
  const checks = [
    {
      label: "Package policy passed",
      passed: recipe.conflicts.every((conflict) => !conflict.message.includes("Package")),
    },
    {
      label: "Tailwind v4 setup verified",
      passed: recipe.effectiveSelections.includes("styling.tailwind"),
    },
    {
      label: "TypeScript build ready",
      passed: recipe.effectiveSelections.includes("tooling.typescript"),
    },
    {
      label: "Template validation ready",
      passed: blockingConflicts(recipe).length === 0,
    },
  ]

  return (
    <div className="relative grid gap-4 border border-l-4 border-(--color-border-strong) border-l-(--builder-accent) bg-(--color-paper) p-5 after:absolute after:top-4 after:right-4 after:rotate-[-4deg] after:border after:border-(--builder-accent) after:px-2 after:py-1 after:font-(family-name:--font-mono) after:text-[0.65rem] after:font-bold after:text-(--builder-accent) after:content-['PASSED']">
      <div>
        <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold uppercase text-(--builder-accent)">
          Validation
        </p>
        <h2 className="font-(family-name:--font-display) text-xl font-bold">Stamped Checks</h2>
      </div>
      <ul className="grid gap-2">
        {checks.map((check) => (
          <li
            className="flex items-center gap-2 border-t border-(--color-border) pt-2 text-sm first:border-t-0 first:pt-0"
            key={check.label}
          >
            <AppIcon name={check.passed ? "check" : "warning"} />
            <span>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
