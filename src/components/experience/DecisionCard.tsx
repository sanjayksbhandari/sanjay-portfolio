import type { DecisionRecord } from "@/types/content";

/**
 * Experience Framework — Decision Card. Moved verbatim from Phase 6's
 * `DecisionRecordBlock` — a decision, the alternative considered, why
 * it was chosen, and the trade-off accepted. Generic enough to use
 * anywhere a decision needs to be recorded with its reasoning attached,
 * not just inside a Case Study (e.g. a future Architecture deep-dive).
 */
export function DecisionCard({ decision }: { decision: DecisionRecord }) {
  return (
    <div className="surface-sm border-l-accent-600 border-l-2 p-5 pl-5">
      <p className="font-medium tracking-[-0.015em] text-neutral-800">{decision.decision}</p>
      {decision.alternativeConsidered ? (
        <p className="mt-2 text-sm text-neutral-600">
          <span className="type-label-muted">Alternative considered — </span>
          {decision.alternativeConsidered}
        </p>
      ) : null}
      <p className="mt-2 text-sm text-neutral-600">
        <span className="type-label-muted">Why — </span>
        {decision.whyChosen}
      </p>
      {decision.tradeoffAccepted ? (
        <p className="mt-2 text-sm text-neutral-600">
          <span className="type-label-muted">Tradeoff accepted — </span>
          {decision.tradeoffAccepted}
        </p>
      ) : null}
    </div>
  );
}
