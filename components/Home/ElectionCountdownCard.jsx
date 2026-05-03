import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useTheme } from "@/theme/ThemeContext";

// Target: May 4, 2026 at 4:00 AM IST (Tamil Nadu Assembly Election 2026 results)
const TARGET_DATE = new Date("2026-05-04T04:00:00+05:30");

const ELECTION_URL = "https://election.newstamil.tv";

function CountdownBox({ value, label }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 46,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 46,
          height: 46,
          borderRadius: "8px",
          background: "linear-gradient(145deg, #1a0a00 0%, #2e1200 100%)",
          border: "2px solid rgba(255,120,0,0.5)",
          boxShadow: "0 4px 20px rgba(255,102,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(255,102,0,0.25)",
            transform: "translateY(-50%)",
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#ff6600",
            lineHeight: 1,
            letterSpacing: "0.04em",
            textShadow: "0 0 12px rgba(255,102,0,0.8), 0 0 24px rgba(255,102,0,0.4)",
          }}
        >
          {String(value).padStart(2, "0")}
        </Typography>
      </Box>
      <Typography
        sx={{
          mt: 0.5,
          fontSize: "0.55rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,220,180,0.75)",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

function Separator() {
  return (
    <Typography
      sx={{
        fontSize: "1.35rem",
        fontWeight: 700,
        color: "#ff6600",
        lineHeight: 1,
        px: 0.25,
        mb: "16px",
        textShadow: "0 0 10px rgba(255,102,0,0.7)",
        "@keyframes blink": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.2 },
        },
        animation: "blink 1s step-start infinite",
      }}
    >
      :
    </Typography>
  );
}

export default function ElectionCountdownCard() {
  const { mode } = useTheme();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculate = () => {
      const now = new Date();
      const diff = TARGET_DATE - now;
      if (diff <= 0) {
        setIsLive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <Box sx={{ width: "100%", my: 1.5 }}>
      <a
        href={ELECTION_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block" }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #0d0500 0%, #1e0800 30%, #2a0e00 60%, #0d0500 100%)",
            border: "1.5px solid rgba(255,102,0,0.4)",
            cursor: "pointer",
            "@keyframes borderGlow": {
              "0%, 100%": { boxShadow: "0 0 20px rgba(255,102,0,0.25), 0 0 60px rgba(255,60,0,0.1), inset 0 0 30px rgba(255,102,0,0.04)" },
              "50%": { boxShadow: "0 0 35px rgba(255,102,0,0.45), 0 0 80px rgba(255,60,0,0.2), inset 0 0 30px rgba(255,102,0,0.08)" },
            },
            animation: "borderGlow 2.5s ease-in-out infinite",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
            },
          }}
        >
          {/* Decorative star particles */}
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                width: { xs: "150px", sm: "200px", md: "250px" },
                height: { xs: "150px", sm: "200px", md: "250px" },
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(255,${80 + i * 15},0,0.08) 0%, transparent 70%)`,
                top: i % 2 === 0 ? "-20%" : "auto",
                bottom: i % 2 !== 0 ? "-20%" : "auto",
                left: `${(i * 18) % 80}%`,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Top Indian flag stripe */}
          <Box sx={{ display: "flex", height: "5px" }}>
            <Box sx={{ flex: 1, background: "#ff9933" }} />
            <Box sx={{ flex: 1, background: "#ffffff" }} />
            <Box sx={{ flex: 1, background: "#138808" }} />
          </Box>

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              px: 1.5,
              py: 1.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
            }}
          >
            {/* LEFT: Title + subtitle */}
            <Box
              sx={{
                textAlign: "center",
                flex: "0 0 auto",
                maxWidth: "100%",
              }}
            >
              {/* Ballot icon row */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75, mb: 0.75 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#138808",
                    boxShadow: "0 0 8px #138808",
                  }}
                />
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#138808",
                    boxShadow: "0 0 8px #138808",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 900,
                  lineHeight: 1.2,
                  color: "#ffffff",
                  fontFamily: "var(--anek-font)",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  mb: 0.25,
                }}
              >
                தமிழ்நாடு சட்டமன்றத்
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 900,
                  lineHeight: 1.2,
                  color: "#ff6600",
                  fontFamily: "var(--anek-font)",
                  textShadow: "0 0 16px rgba(255,102,0,0.6)",
                  mb: 0.5,
                }}
              >
                தேர்தல் 2026
              </Typography>
            </Box>

            {/* CENTER/RIGHT: Countdown or Live */}
            <Box
              sx={{
                flex: "1 1 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              {isLive ? (
                // LIVE result banner
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      px: 3,
                      py: 1.2,
                      borderRadius: "50px",
                      background: "linear-gradient(90deg, #cc0000 0%, #ff0000 50%, #cc0000 100%)",
                      border: "1.5px solid rgba(255,100,100,0.6)",
                      "@keyframes liveGlow": {
                        "0%, 100%": { boxShadow: "0 0 20px rgba(255,0,0,0.5), 0 0 40px rgba(255,0,0,0.2)" },
                        "50%": { boxShadow: "0 0 35px rgba(255,0,0,0.8), 0 0 60px rgba(255,0,0,0.4)" },
                      },
                      animation: "liveGlow 1.5s ease-in-out infinite",
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#fff",
                        "@keyframes pulse": {
                          "0%, 100%": { transform: "scale(1)", opacity: 1 },
                          "50%": { transform: "scale(1.4)", opacity: 0.7 },
                        },
                        animation: "pulse 1s ease-in-out infinite",
                        boxShadow: "0 0 8px rgba(255,255,255,0.9)",
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                        color: "#fff",
                        letterSpacing: "0.1em",
                      }}
                    >
                      LIVE NOW
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "rgba(255,200,150,0.8)",
                      fontWeight: 500,
                    }}
                  >
                    Click to watch results →
                  </Typography>
                </Box>
              ) : (
                // COUNTDOWN
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
                  <Typography
                    sx={{
                  fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,200,150,0.7)",
                    }}
                  >
                    Results Countdown
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 0.5 }}>
                    {timeLeft.days > 0 && (
                      <>
                        <CountdownBox value={timeLeft.days} label="Days" />
                        <Separator />
                      </>
                    )}
                    <CountdownBox value={timeLeft.hours} label="Hours" />
                    <Separator />
                    <CountdownBox value={timeLeft.minutes} label="Minutes" />
                    <Separator />
                    <CountdownBox value={timeLeft.seconds} label="Seconds" />
                  </Box>
                </Box>
              )}
            </Box>


          </Box>

          {/* Bottom Indian flag stripe */}
          <Box sx={{ display: "flex", height: "5px" }}>
            <Box sx={{ flex: 1, background: "#138808" }} />
            <Box sx={{ flex: 1, background: "#ffffff" }} />
            <Box sx={{ flex: 1, background: "#ff9933" }} />
          </Box>
        </Box>
      </a>
    </Box>
  );
}
