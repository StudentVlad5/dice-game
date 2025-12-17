import { useState, useEffect, useRef } from "react";
import {
  Button,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Stack,
} from "@mui/material";
import { TopMainBarProps } from "./helps/Interfaces";
import showToast from "./helps/showToast";

export default function TopMainBar({
  winNumber,
  over,
  number,
  setResults,
  setNumber,
  setWinNumber,
  setOver,
  setSnackbar,
}: TopMainBarProps) {
  const [displayNumber, setDisplayNumber] = useState<number | null>(winNumber);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationRef = useRef<number | null>(null);

  // --- Animation Effect ---
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const runAnimation = (targetNumber: number) => {
    setIsAnimating(true);
    let startTimestamp: number | null = null;
    const duration = 1000;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(
        startValue + (targetNumber - startValue) * easeProgress
      );

      setDisplayNumber(currentVal);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  const play = () => {
    if (number <= 0 || number >= 100) {
      showToast({
        message: "Please select a number between 1 and 99",
        severity: "error",
        setSnackbar,
      });
    }

    const rnd = Math.floor(Math.random() * 99) + 1;
    const win = over ? rnd > number : rnd < number;

    setWinNumber(rnd);
    runAnimation(rnd);

    if (win) {
      showToast({
        message: "You win!",
        severity: "success",
        setSnackbar,
      });
    } else {
      showToast({
        message: "You lose!",
        severity: "error",
        message_2: `Win number is ${
          rnd > number ? "higher" : "lower"
        } than ${number}`,
        setSnackbar,
      });
    }

    setResults((prevResults) => {
      const updated = [
        ...prevResults,
        {
          date: Date.now(),
          userNumber: number,
          over,
          winNumber: rnd,
        },
      ].slice(-10);
      localStorage.setItem("results", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Stack spacing={3} width={320} alignItems="center" sx={{ mt: 4 }}>
      <Stack alignItems="center">
        <Typography variant="overline" color="text.secondary" mt="80px">
          Winning Number
        </Typography>
        <Typography
          variant="h2"
          textAlign="center"
          fontWeight="bold"
          color={isAnimating ? "primary.main" : "text.primary"}
        >
          {displayNumber ?? "—"}
        </Typography>
      </Stack>

      <hr style={{ width: "100%", opacity: 0.2 }} />

      <RadioGroup
        row
        value={over ? "over" : "under"}
        onChange={(e) => setOver(e.target.value === "over")}
      >
        <FormControlLabel
          value="under"
          control={<Radio />}
          label="Under"
          disabled={isAnimating}
        />
        <FormControlLabel
          value="over"
          control={<Radio />}
          label="Over"
          disabled={isAnimating}
        />
      </RadioGroup>

      <Stack width="100%" spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption">0</Typography>
          <Typography variant="caption">100</Typography>
        </Stack>
        <Slider
          value={number}
          min={0}
          max={100}
          disabled={isAnimating}
          onChange={(_, v) => setNumber(v as number)}
          valueLabelDisplay="auto"
        />
        <Typography textAlign="center" variant="h6">
          {over ? "Over" : "Under"} {number}
        </Typography>
      </Stack>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={play}
        disabled={isAnimating}
        sx={{ height: 50, fontWeight: "bold" }}
      >
        {isAnimating ? "ROLLING..." : "PLAY"}
      </Button>
    </Stack>
  );
}
