import { useState } from "react"
import type { ResolvedRecipe } from "@dittojs/core"

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
    <div className="summary-block">
      <div className="summary-block-heading">
        <h3>{title}</h3>
        {values.length > 0 ? <span>{values.length} items</span> : null}
      </div>
      {values.length > 0 ? (
        <ul className="summary-value-list">
          {visible.map((value, index) => (
            <li className="summary-value" key={`${title}-${value}-${index}`}>
              {value}
            </li>
          ))}
          {hiddenCount > 0 ? (
            <li className="summary-value summary-value-muted">+{hiddenCount} more</li>
          ) : null}
        </ul>
      ) : (
        <p>{empty}</p>
      )}
    </div>
  )
}

export function LiveStackSummary({ recipe }: { recipe: ResolvedRecipe }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside
      className={`side-panel resolver-ledger${expanded ? "" : " is-collapsed"}`}
      aria-label="Resolver ledger"
    >
      <div className="panel-header">
        <div>
          <p className="eyebrow">Resolver output</p>
          <h2>Resolver Ledger</h2>
        </div>
        <button
          type="button"
          className="summary-toggle"
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
        <p className="summary-collapsed-copy">Summary hidden.</p>
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
      <div className="summary-block">
        <div className="summary-block-heading">
          <h3>Warnings / conflicts</h3>
          {errors.length + recipe.warnings.length > 0 ? (
            <span>{errors.length + recipe.warnings.length} items</span>
          ) : null}
        </div>
        {errors.length > 0 || recipe.warnings.length > 0 ? (
          <ul>
            {errors.map((conflict, index) => (
              <li key={`${conflict.message}-${index}`} className="issue-line">
                <AppIcon name="warning" />
                {conflict.message}
              </li>
            ))}
            {recipe.warnings.map((warning, index) => (
              <li key={`${warning.message}-${index}`}>{warning.message}</li>
            ))}
          </ul>
        ) : (
          <p>No resolver warnings or conflicts.</p>
        )}
      </div>
    </>
  )
}

export function DependencyNotes({ recipe }: { recipe: ResolvedRecipe }) {
  return (
    <aside className="side-panel resolver-ledger" aria-label="Resolver ledger">
      <div className="panel-header">
        <p className="eyebrow">Manifest ledger</p>
        <h2>Resolver Ledger</h2>
      </div>
      <ResolverLedgerBody recipe={recipe} />
    </aside>
  )
}

export function StackSummaryTable({ recipe }: { recipe: ResolvedRecipe }) {
  return (
    <div className="summary-table">
      {stackSummary(recipe).map((row) => (
        <div className="summary-row" key={row.label}>
          <span>{row.label}</span>
          <strong>{row.value}</strong>
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
    <div className="review-card validation-stamp">
      <div className="panel-header">
        <p className="eyebrow">Validation</p>
        <h2>Stamped Checks</h2>
      </div>
      <ul className="check-list">
        {checks.map((check) => (
          <li key={check.label}>
            <AppIcon name={check.passed ? "check" : "warning"} />
            <span>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
