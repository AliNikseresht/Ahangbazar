import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export const useAudioVisualizerLogic = (
  wavesurfer: React.RefObject<WaveSurfer | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  currentSong: { title: string; storage_path: string } | null
) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const animationId = useRef<number>(0);

  useEffect(() => {
    if (!wavesurfer.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const audio = wavesurfer.current.getMediaElement();
    audioCtxRef.current = new (window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext)();

    const source = audioCtxRef.current.createMediaElementSource(audio);
    analyserRef.current = audioCtxRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    source.connect(analyserRef.current);
    analyserRef.current.connect(audioCtxRef.current.destination);

    const bufferLength = analyserRef.current.frequencyBinCount;

    const dataArray = new Uint8Array(bufferLength);

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      animationId.current = requestAnimationFrame(draw);
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 0.8;
      const totalBarsWidth = bufferLength * (barWidth + 1) - 1;
      let x = (canvas.width - totalBarsWidth) / 1.2;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (canvas.height / 2);
        const intensity = dataArray[i];
        const hue = 100 + (intensity / 255) * 60;
        ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId.current);
      window.removeEventListener("resize", resizeCanvas);
      audioCtxRef.current?.close();
    };
  }, [currentSong]);
};
