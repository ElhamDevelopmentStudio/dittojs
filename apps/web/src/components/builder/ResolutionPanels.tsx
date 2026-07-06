import type { ResolvedRecipe } from "@dittojs/core"

import {
  addedAutomatically,
  blockingConflicts,
  lockSummaries,
  selectedByIntent,
  stackSummary,
} from "../../builder/resolver-view-model"
import { AppIcon } from "../icons"

function ListBlock({ title, values, empty }: { title: string; values: string[]; empty: string }) {
  return (
    <div className="summary-block">
      <h3>{title}</h3>
      {values.length > 0 ? (
        <ul>
          {values.map((value, index) => (
            <li key={`${title}-${value}-${index}`}>{value}</li>
          ))}
        </ul>
      ) : (
        <p>{empty}</p>
      )}
    </div>
  )
}

export function LiveStackSummary({ recipe }: { recipe: ResolvedRecipe }) {
  const locks = lockSummaries(recipe)
  const errors = blockingConflicts(recipe)

  return (
    <aside className="side-panel" aria-label="Live stack summary">
      <div className="panel-header">
        <p className="eyebrow">Resolver output</p>
        <h2>Live Stack Summary</h2>
      </div>
      <ListBlock
        title="Selected by you"
        values={selectedByIntent(recipe)}
        empty="No explicit selections yet."
      />
      <ListBlock
        title="Added automatically"
        values={addedAutomatically(recipe)}
        empty="No resolver additions."
      />
      <div className="summary-block">
        <h3>Locked dependencies</h3>
        {locks.length > 0 ? (
          <ul>
            {locks.map((lock) => (
              <li key={lock.moduleId}>
                <span>{lock.label}</span>
                <small>{lock.reasons.map((reason) => reason.reason).join(" ")}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No locked dependencies.</p>
        )}
      </div>
      <div className="summary-block">
        <h3>Warnings / conflicts</h3>
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
    </aside>
  )
}

export function DependencyNotes({ recipe }: { recipe: ResolvedRecipe }) {
  return (
    <aside className="side-panel" aria-label="Dependency notes">
      <div className="panel-header">
        <p className="eyebrow">Dependency notes</p>
        <h2>Resolver Decisions</h2>
      </div>
      <ListBlock
        title="Selected by you"
        values={selectedByIntent(recipe)}
        empty="No explicit selections yet."
      />
      <ListBlock
        title="Added automatically"
        values={addedAutomatically(recipe)}
        empty="No automatic additions yet."
      />
      <div className="summary-block">
        <h3>Locked dependencies</h3>
        {lockSummaries(recipe).length > 0 ? (
          <ul>
            {lockSummaries(recipe).map((lock, index) => (
              <li key={`${lock.moduleId}-${index}`}>
                {lock.label}
                <small>{lock.reasons.map((reason) => reason.reason).join(" ")}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No locked dependencies.</p>
        )}
      </div>
      <ListBlock
        title="Resolver warnings/errors"
        values={[
          ...blockingConflicts(recipe).map((conflict) => conflict.message),
          ...recipe.warnings.map((warning) => warning.message),
        ]}
        empty="No resolver warnings or errors."
      />
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
    <div className="review-card">
      <div className="panel-header">
        <p className="eyebrow">Validation</p>
        <h2>Template Checks</h2>
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
