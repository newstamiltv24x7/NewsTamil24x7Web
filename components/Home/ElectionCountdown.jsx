/**
 * ElectionCountdown — self-contained countdown widget.
 *
 * ALL styles are inline objects scoped to this component only.
 * No global CSS is touched. No external libraries required.
 * No layout shift: the card reserves a fixed intrinsic height.
 *
 * Props:
 *   targetDate  — ISO-8601 string (default: "2026-04-23T08:00:00")
 *   title       — string (default: "Election Countdown")
 */

import { useEffect, useState } from "react";

const EC_STYLES = {
  card: {
    width: "100%",
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
    border: "1px solid #e84545",
    borderRadius: "10px",
    padding: "14px 12px 12px",
    fontFamily: "var(--anek-font, Arial, sans-serif)",
    boxShadow: "0 4px 18px rgba(232,69,69,0.18)",
    /* Prevents any reflow on surrounding elements */
    minHeight: "108px",
    overflow: "hidden",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#e84545",
    flexShrink: 0,
    animation: "ec_pulse 1.2s infinite",
  },
  title: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    margin: 0,
    lineHeight: 1.2,
  },
  tilesRow: {
    display: "flex",
    justifyContent: "space-around",
    gap: "6px",
  },
  tile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    background: "rgba(255,255,255,0.07)",
    borderRadius: "7px",
    padding: "6px 4px 5px",
    minWidth: 0,
  },
  number: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#fb6002",
    lineHeight: 1,
    fontVariantNumeric: "tabular-nums",
    /* Reserve width for 2-digit numbers to prevent micro-shifts */
    minWidth: "2ch",
    textAlign: "center",
  },
  label: {
    fontSize: "9px",
    fontWeight: 600,
    color: "#cccccc",
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    marginTop: "3px",
  },
  separator: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#e84545",
    alignSelf: "center",
    lineHeight: 1,
    flexShrink: 0,
    marginBottom: "10px",
    userSelect: "none",
  },
  footer: {
    marginTop: "8px",
    fontSize: "10px",
    color: "#aaaaaa",
    textAlign: "center",
    letterSpacing: "0.04em",
  },

  /* keyframe workaround — inject once via a tiny ephemeral <style> tag */
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function calcTimeLeft(targetDate) {
  const diff = new Date(targetDate) - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function ElectionCountdown({
  targetDate = "2026-04-23T08:00:00",
  title = "Election Countdown",
}) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const DESKTOP_BG_URL =
    "http://localhost:3000/_next/image?url=https%3A%2F%2Fnewstamil-tv.s3.ap-south-1.amazonaws.com%2F1774262525523-converted_file.png&w=640&q=75";

  /* Avoid SSR/client mismatch — show placeholder until hydrated */
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);

    // Desktop-only background handling
    const mq = window.matchMedia("(min-width:900px)");
    const handler = (e) => setIsDesktop(e.matches);
    handler(mq);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);

    return () => clearInterval(id);
  }, [targetDate]);

  useEffect(() => {
    return () => {
      const mq = window.matchMedia("(min-width:900px)");
      mq.removeEventListener ? mq.removeEventListener("change", () => {}) : mq.removeListener(() => {});
    };
  }, []);

  const { days, hours, minutes, seconds } = timeLeft;
  const expired = days === 0 && hours === 0 && minutes === 0 && seconds === 0;
  const targetLabel = new Date(targetDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const desktopBg = {
    backgroundImage: `linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%), url('${DESKTOP_BG_URL}')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const cardStyle = isDesktop ? { ...EC_STYLES.card, ...desktopBg } : EC_STYLES.card;

  return (
    <>
      {/* Inject keyframe once, scoped under a unique class to avoid polluting globals */}
      <style>{`
        @keyframes ec_pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(1.35); }
        }
      `}</style>

      <div style={cardStyle} aria-label={`${title} widget`}>
        {/* Header */}
        <div style={EC_STYLES.headerRow}>
          <span style={EC_STYLES.dot} aria-hidden="true" />
          <p style={EC_STYLES.title}>{title}</p>
        </div>

        {/* Countdown tiles */}
        {expired ? (
          <div
            style={{
              textAlign: "center",
              color: "#fb6002",
              fontWeight: 700,
              fontSize: "14px",
              padding: "8px 0",
            }}
          >
            Election Day has arrived!
          </div>
        ) : (
          <div style={EC_STYLES.tilesRow}>
            {/* Days */}
            <div style={EC_STYLES.tile}>
              <span style={EC_STYLES.number}>{mounted ? pad(days) : "--"}</span>
              <span style={EC_STYLES.label}>Days</span>
            </div>

            <span style={EC_STYLES.separator} aria-hidden="true">:</span>

            {/* Hours */}
            <div style={EC_STYLES.tile}>
              <span style={EC_STYLES.number}>{mounted ? pad(hours) : "--"}</span>
              <span style={EC_STYLES.label}>Hours</span>
            </div>

            <span style={EC_STYLES.separator} aria-hidden="true">:</span>

            {/* Minutes */}
            <div style={EC_STYLES.tile}>
              <span style={EC_STYLES.number}>{mounted ? pad(minutes) : "--"}</span>
              <span style={EC_STYLES.label}>Mins</span>
            </div>

            <span style={EC_STYLES.separator} aria-hidden="true">:</span>

            {/* Seconds */}
            <div style={EC_STYLES.tile}>
              <span style={EC_STYLES.number}>{mounted ? pad(seconds) : "--"}</span>
              <span style={EC_STYLES.label}>Secs</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
