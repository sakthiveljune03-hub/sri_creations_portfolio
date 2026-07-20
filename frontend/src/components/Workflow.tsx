/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Clock, CheckSquare, Award, ArrowRight, PlayCircle } from "lucide-react";
import { WORKFLOW } from "../data";

export default function Workflow() {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const activeStep = WORKFLOW[activeStepIdx];

  return (
    <section id="workflow" className="pt-0 pb-28 bg-transparent relative px-6 overflow-hidden border-t border-zinc-900/50">
      {/* Glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(255,45,85,0.03)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-[#D8B56A]" />
              <span className="font-mono text-xs text-[#D8B56A] font-bold tracking-widest uppercase">
                SRI CREATION
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-[#F8F6F2]">
              The Cinematic <span className="bg-gradient-to-r from-[#FF2D55] to-[#FF6A3D] bg-clip-text text-transparent">Post-Pipeline</span>
            </h2>
          </div>
          <p className="text-[#C9CDD4] text-sm md:text-base max-w-lg font-sans leading-relaxed">
            A meticulous step-by-step methodology to transform chaotic raw footage sequences into a highly polished, locked cinematic master.
          </p>
        </div>

        {/* Workflow Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Steps Left Selector list (Column span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2 px-1">
              SELECT PIPELINE PHASE:
            </span>
            {WORKFLOW.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white/[0.18] backdrop-blur-md border-white/35 shadow-[0_10px_40px_rgba(0,0,0,0.1),_0_0_20px_rgba(255,255,255,0.15)]"
                      : "bg-white/[0.08] backdrop-blur-md border-white/20 text-zinc-400 hover:text-white hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs font-bold px-2 py-1 rounded-md ${
                      isActive ? "bg-[#FF2D55]/20 text-[#FF2D55] border border-[#FF2D55]/30 animate-pulse" : "bg-white/5 border border-[rgba(255,255,255,0.12)] text-zinc-500"
                    }`}>
                      {step.step}
                    </span>
                    <div>
                      <h4 className={`font-display font-bold text-sm ${isActive ? "text-white" : "text-zinc-400"}`}>
                        {step.title}
                      </h4>
                      <p className="text-zinc-500 text-[11px] mt-0.5 font-sans font-medium">{step.duration}</p>
                    </div>
                  </div>
                  <PlayCircle className={`w-4 h-4 transition-transform duration-300 ${
                    isActive ? "text-[#FF2D55] rotate-90 scale-110" : "text-zinc-600 opacity-0 group-hover:opacity-100"
                  }`} />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 w-full max-w-[91%] mx-auto lg:max-w-[91%] lg:mr-0 lg:ml-auto rounded-2xl white-glass white-glass-hover p-5 md:p-7 transition-all duration-500 relative overflow-hidden group min-h-[342px] flex flex-col justify-between">
            {/* Ambient neon backdrop gradient glow strictly in card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2D55]/5 via-[#D8B56A]/5 to-transparent pointer-events-none" />

            <div>
              {/* Step indicator tag */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-zinc-300 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                  PHASE {activeStep.step} &bull; PIPELINE
                </span>
                <span className="font-mono text-xs text-[#D8B56A] flex items-center gap-1.5 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  {activeStep.duration}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-4 group-hover:text-[#FF2D55] transition-colors">
                {activeStep.title}
              </h3>
              <p className="text-[#C9CDD4] text-sm md:text-base leading-relaxed mb-8 font-sans">
                {activeStep.description}
              </p>

              {/* Deliverables lists */}
              <div>
                <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-3">
                  Key Deliverables / Milestone:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeStep.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300 bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                      <CheckSquare className="w-4 h-4 text-[#FF2D55] shrink-0" />
                      <span className="font-mono text-[11px] font-medium text-zinc-300">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage bottom info */}
            <div className="border-t border-white/5 mt-8 pt-4 flex items-center justify-between text-zinc-500 font-mono text-[10px] uppercase">
              <span>POST PRODUCTION &bull; QUALITY ASSURANCE</span>
              <span className="text-[#FF2D55] flex items-center gap-1">
                Phase {activeStepIdx + 1} of 5 <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
