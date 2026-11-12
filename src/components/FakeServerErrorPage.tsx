"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Home, RotateCw } from "lucide-react";
import styles from "./FakeServerErrorPage.module.css";

function ServerErrorIllustration() {
  return (
    <div className={styles.illustrationWrap} aria-hidden="true">
      <div className={styles.pulseHalo} />
      <svg
        className={styles.serverSvg}
        viewBox="0 0 140 108"
        width="140"
        height="108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle vertical rack rails */}
        <line
          x1="34"
          y1="48"
          x2="34"
          y2="58"
          stroke="#334155"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="88"
          y1="48"
          x2="88"
          y2="58"
          stroke="#334155"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Upper Server Unit */}
        <rect
          x="16"
          y="18"
          width="90"
          height="30"
          rx="6"
          fill="#151b26"
          stroke="#334155"
          strokeWidth="1.5"
        />
        <line
          x1="22"
          y1="22"
          x2="100"
          y2="22"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="29" cy="33" r="2.75" fill="#22c55e" opacity="0.85" />
        <circle cx="39" cy="33" r="2.75" fill="#475569" />
        <rect x="64" y="30" width="8" height="6" rx="1.5" fill="#252f40" />
        <rect x="76" y="30" width="8" height="6" rx="1.5" fill="#252f40" />
        <rect x="88" y="30" width="8" height="6" rx="1.5" fill="#252f40" />

        {/* Lower Server Unit (Faulted) */}
        <rect
          x="16"
          y="58"
          width="90"
          height="30"
          rx="6"
          fill="#131620"
          stroke="#7f1d1d"
          strokeWidth="1.5"
        />
        <circle cx="29" cy="73" r="6" fill="#ef4444" opacity="0.22" />
        <circle
          cx="29"
          cy="73"
          r="3"
          fill="#ef4444"
          className={styles.faultLed}
        />
        <circle cx="39" cy="73" r="2.75" fill="#f59e0b" opacity="0.75" />
        <rect x="64" y="70" width="8" height="6" rx="1.5" fill="#232836" />
        <rect x="76" y="70" width="8" height="6" rx="1.5" fill="#232836" />

        {/* Elevated Warning Badge */}
        <g className={styles.warningBadgeGroup}>
          <circle
            cx="108"
            cy="72"
            r="22"
            fill="#141118"
            stroke="rgba(248, 113, 113, 0.55)"
            strokeWidth="1.5"
          />
          <polygon
            points="108,59 121,81 95,81"
            fill="rgba(239, 68, 68, 0.22)"
            stroke="#f87171"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <line
            x1="108"
            y1="66.5"
            x2="108"
            y2="74"
            stroke="#fef2f2"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="108" cy="77.75" r="1.3" fill="#fef2f2" />
        </g>
      </svg>
    </div>
  );
}

export default function FakeServerErrorPage() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [diagnosticTimestamp, setDiagnosticTimestamp] = useState("—");
  const retryTimerRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const formattedUtc = new Date()
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);
    setDiagnosticTimestamp(`${formattedUtc} UTC`);

    return () => {
      if (retryTimerRef.current !== null) {
        window.clearTimeout(retryTimerRef.current);
      }
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleTryAgain = () => {
    if (isRetrying) return;

    setIsRetrying(true);
    setStatusMessage("Attempting to reload the page…");

    retryTimerRef.current = window.setTimeout(() => {
      window.location.reload();
    }, 650);

    resetTimerRef.current = window.setTimeout(() => {
      setIsRetrying(false);
      setStatusMessage("Server still unavailable. Please try again shortly.");
    }, 2500);
  };

  return (
    <div className={styles.errorShell}>
      <div className={styles.backdropGrid} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />

      <main className={styles.errorCard} aria-labelledby="server-error-heading">
        <ServerErrorIllustration />

        <div className={styles.statusBadge}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>Service Interrupted</span>
        </div>

        <h1 id="server-error-heading" className={styles.heading}>
          500 – Internal Server Error
        </h1>

        <p className={styles.leadMessage}>
          Something went wrong while loading this page.
        </p>

        <p className={styles.subMessage}>
          The server encountered an unexpected condition and could not fulfill
          your request. Please try again in a few moments or return to the
          homepage.
        </p>

        <div className={styles.actionsRow}>
          <button
            type="button"
            onClick={handleTryAgain}
            aria-disabled={isRetrying}
            aria-busy={isRetrying}
            className={styles.primaryBtn}
          >
            <RotateCw
              className={`w-4 h-4 shrink-0 ${styles.retryIcon} ${
                isRetrying ? styles.retryIconSpinning : ""
              }`}
              aria-hidden="true"
            />
            <span>{isRetrying ? "Retrying…" : "Try Again"}</span>
          </button>

          <Link href="/" className={styles.secondaryBtn}>
            <Home className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Go Back to Homepage</span>
          </Link>
        </div>

        <p className={styles.retryStatus} role="status" aria-live="polite">
          {statusMessage}
        </p>

        <div className={`${styles.diagnosticBar} font-mono`}>
          <span>ERR_INTERNAL_SERVER_ERROR</span>
          <span>{diagnosticTimestamp}</span>
        </div>
      </main>
    </div>
  );
}
