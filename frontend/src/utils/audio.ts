/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

let audioCtx: AudioContext | null = null;
let isMuted = localStorage.getItem("sound_muted") === "true";

export const getMuteState = (): boolean => {
  return isMuted;
};

export const setMuteState = (muted: boolean) => {
  isMuted = muted;
  localStorage.setItem("sound_muted", muted ? "true" : "false");
};

/**
 * Synthesizes a premium cinematic soft click sound on the fly
 * combining a high-frequency noise transient (for tactile feel)
 * and a decaying body sine wave (for tone).
 */
export const playClickSound = () => {
  if (isMuted) return;

  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // 1. High-frequency noise transient (Apple UI camera shutter/tactile key click feel)
    const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.008, audioCtx.sampleRate); // 8ms noise
    const channelData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      channelData[i] = Math.random() * 2 - 1;
    }

    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(2200, now);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.04, now); // subtle 4% volume transient
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.006);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    // 2. Decaying sine wave body (resonance)
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.035); // frequency slide

    // Volume envelope (15% peak volume, decaying to 0 in 35ms)
    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.14, now + 0.002); // 14% target volume
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);

    noiseSource.start(now);
    osc.start(now);
    osc.stop(now + 0.045);
  } catch (error) {
    console.warn("AudioContext failed to initialize or play sound:", error);
  }
};
