/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck, Zap, HeartHandshake, Eye, Upload, Check, ChevronDown, Calendar, X, CheckCircle } from "lucide-react";

export interface CustomerReview {
  id: string;
  name: string;
  email?: string;
  service: string;
  projectName?: string;
  completionDate?: string;
  rating: number;
  review: string;
  instagram?: string;
  photoUrl?: string;
  confirmGenuine: boolean;
  confirmPublish: boolean;
  status: "pending" | "published";
  submittedAt: string;
}

export default function WhyWorkWithMe() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [isAdmin, setIsAdmin] = useState(window.location.hash === "#admin");

  // Load reviews from localStorage
  const loadReviews = useCallback(() => {
    const stored = localStorage.getItem("sri_creation_reviews");
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse reviews", e);
      }
    } else {
      setReviews([]);
    }
  }, []);

  useEffect(() => {
    loadReviews();

    // Listen to localStorage changes in other tabs for realtime updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sri_creation_reviews") {
        loadReviews();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadReviews]);

  // Listen to hash change for Admin toggle
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === "#admin");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const publishedReviews = useMemo(() => {
    return reviews.filter((r) => r.status === "published");
  }, [reviews]);

  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Keep index bounds correct if publishedReviews size changes
  useEffect(() => {
    if (publishedReviews.length > 0 && activeTestimonialIdx >= publishedReviews.length) {
      setActiveTestimonialIdx(0);
    }
  }, [publishedReviews.length, activeTestimonialIdx]);

  const activeTestimonial = publishedReviews.length > 0 ? publishedReviews[activeTestimonialIdx] : null;

  // States for the review form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [projectName, setProjectName] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [instagram, setInstagram] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [confirmGenuine, setConfirmGenuine] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
        setErrorMessage("Invalid file format. Please upload JPG, PNG, or WEBP.");
        return;
      }
      if (file.size > 1.5 * 1024 * 1024) {
        setErrorMessage("Image is too large. Please upload an image under 1.5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Full Name is required.");
      return;
    }
    if (!service) {
      setErrorMessage("Please select a Service.");
      return;
    }
    if (rating === 0) {
      setErrorMessage("Please select a Star Rating.");
      return;
    }
    if (!review.trim()) {
      setErrorMessage("Please enter your Review.");
      return;
    }
    if (!confirmGenuine || !confirmPublish) {
      setErrorMessage("You must accept both checkboxes to submit your review.");
      return;
    }

    setErrorMessage("");
    setSubmitting(true);

    const newReview: CustomerReview = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: email.trim() || undefined,
      service,
      projectName: projectName.trim() || undefined,
      completionDate: completionDate || undefined,
      rating,
      review: review.trim(),
      instagram: instagram.trim() || undefined,
      photoUrl: photoPreview || undefined,
      confirmGenuine,
      confirmPublish,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    const updatedReviews = [newReview, ...reviews];
    localStorage.setItem("sri_creation_reviews", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setService("");
    setProjectName("");
    setCompletionDate("");
    setRating(0);
    setHoverRating(0);
    setReview("");
    setInstagram("");
    setPhotoPreview(null);
    setConfirmGenuine(false);
    setConfirmPublish(false);
    setSubmitted(false);
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePrev = () => {
    setActiveTestimonialIdx((prev) => (prev === 0 ? publishedReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTestimonialIdx((prev) => (prev === publishedReviews.length - 1 ? 0 : prev + 1));
  };

  const handlePublish = (id: string) => {
    const updated = reviews.map((r) => {
      if (r.id === id) {
        return { ...r, status: "published" as const };
      }
      return r;
    });
    localStorage.setItem("sri_creation_reviews", JSON.stringify(updated));
    setReviews(updated);
  };

  const handleUnpublish = (id: string) => {
    const updated = reviews.map((r) => {
      if (r.id === id) {
        return { ...r, status: "pending" as const };
      }
      return r;
    });
    localStorage.setItem("sri_creation_reviews", JSON.stringify(updated));
    setReviews(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this review?")) {
      const updated = reviews.filter((r) => r.id !== id);
      localStorage.setItem("sri_creation_reviews", JSON.stringify(updated));
      setReviews(updated);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("review-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const highlights = [
    { title: "Screaming Fast Delivery", desc: "Always meeting hard broadcast or YouTube release deadlines with high-performance transcode rendering.", icon: <Zap className="w-5 h-5 text-[#D8B56A]" /> },
    { title: "Direct Communication", desc: "No middle-man. Discuss frame counts, LUT files, and audio layers directly with Sriman in Slack or Discord.", icon: <HeartHandshake className="w-5 h-5 text-[#D8B56A]" /> },
    { title: "Absolute Attention to Detail", desc: "No loose frames, zero flash-frames, precise alignment with audio beats, and natural film-grain balancing.", icon: <ShieldCheck className="w-5 h-5 text-[#D8B56A]" /> }
  ];

  return (
    <section id="testimonials" className="pt-0 pb-28 bg-transparent relative px-6 overflow-hidden border-b border-zinc-900/50">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(255,45,85,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Sriman's Core values (Grid span 6) */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-[#D8B56A]" />
              <span className="font-mono text-xs text-[#D8B56A] font-bold tracking-widest uppercase">
                WHY WORK WITH SRIMAN
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              A Direct Focus On <span className="bg-gradient-to-r from-[#FF2D55] to-[#FF6A3D] bg-clip-text text-transparent">Creative Excellence</span>
            </h2>
            <p className="text-[#C9CDD4] text-sm md:text-base leading-relaxed mb-10 font-sans">
              Collaborating with Sriman means absolute clarity, industry standard workflows, and pristine delivery outputs optimized for television, cinema, or social algorithms.
            </p>

            {/* Core Highlight cards */}
            <div className="flex flex-col gap-6">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-[#F8F6F2]">{item.title}</h4>
                    <p className="text-[#C9CDD4] text-xs mt-1 leading-relaxed max-w-md font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {activeTestimonial === null ? (
            /* Placeholder review card when no reviews are published */
            <div className="lg:col-span-6 w-full max-w-[91%] mx-auto lg:max-w-[91%] lg:mr-0 lg:ml-auto white-glass white-glass-hover p-5 md:p-7 flex flex-col justify-between relative min-h-[315px] transition-all duration-300">
              {/* Background Quotes Watermark */}
              <MessageSquare className="absolute top-6 right-6 w-16 h-16 text-zinc-800/25 pointer-events-none" />

              <div>
                {/* Star counts */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D8B56A] text-[#D8B56A]" />
                  ))}
                </div>

                {/* Feed content */}
                <p className="text-[#C9CDD4] text-sm md:text-base italic leading-relaxed mb-8 font-sans">
                  &ldquo;No customer reviews have been published yet. Be the first to share your experience with SRI CREATION.&rdquo;
                </p>
              </div>

              {/* Submit Your Review Button */}
              <div className="border-t border-white/5 pt-6 flex items-center justify-center mt-auto w-full">
                <button
                  onClick={scrollToForm}
                  className="py-2.5 px-6 rounded-xl font-mono text-[10px] uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#FF2D55] to-[#FF6A3D] cursor-pointer shadow-[0_0_15px_rgba(255,45,85,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Submit Your Review
                </button>
              </div>
            </div>
          ) : (
            /* Published reviews carousel card */
            <div className="lg:col-span-6 w-full max-w-[91%] mx-auto lg:max-w-[91%] lg:mr-0 lg:ml-auto white-glass white-glass-hover p-5 md:p-7 flex flex-col justify-between relative min-h-[315px] transition-all duration-300">
              {/* Background Quotes Watermark */}
              <MessageSquare className="absolute top-6 right-6 w-16 h-16 text-zinc-800/25 pointer-events-none" />

              <div>
                {/* Star counts */}
                <div className="flex gap-1 mb-6">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D8B56A] text-[#D8B56A]" />
                  ))}
                  {[...Array(5 - activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-white/20 fill-transparent" />
                  ))}
                </div>

                {/* Feed content */}
                <p className="text-[#C9CDD4] text-sm md:text-base italic leading-relaxed mb-8 font-sans">
                  &ldquo;{activeTestimonial.review}&rdquo;
                </p>
              </div>

              {/* User metadata & controls row */}
              <div className="border-t border-white/5 pt-6 flex items-center justify-between mt-auto">
                {/* User Identity */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 p-0.5 shadow-[0_8px_32px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#FF2D55]/30">
                    {activeTestimonial.photoUrl ? (
                      <img
                        src={activeTestimonial.photoUrl}
                        alt={activeTestimonial.name}
                        className="w-20 h-20 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF2D55]/20 to-[#FF6A3D]/20 border border-white/10 flex items-center justify-center text-[#FF2D55] font-display text-xl font-bold">
                        {activeTestimonial.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-nunito text-sm text-white">
                      {activeTestimonial.name}
                      {activeTestimonial.instagram && (
                        <span className="text-zinc-400 text-xs font-sans ml-1.5 lowercase">
                          ({activeTestimonial.instagram.startsWith("@") ? activeTestimonial.instagram : `@${activeTestimonial.instagram}`})
                        </span>
                      )}
                    </h4>
                    <p className="text-zinc-500 text-[10px] font-mono tracking-wide uppercase mt-0.5">
                      {activeTestimonial.service}
                      {activeTestimonial.projectName && (
                        <> &bull; <span className="text-[#FF2D55]">{activeTestimonial.projectName}</span></>
                      )}
                      &nbsp;&bull;&nbsp;
                      <span>
                        {new Date(activeTestimonial.submittedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Slider switch controls (only render if there's more than 1 published review) */}
                {publishedReviews.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Previous Testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Next Testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* ⭐ Share Your Experience Section */}
        <div className="mt-24 pt-12 border-t border-white/5 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <span className="w-8 h-[1px] bg-[#D8B56A]" />
              <h3 className="font-mono text-xs text-[#D8B56A] font-bold tracking-widest uppercase flex items-center gap-1.5">
                ⭐ Share Your Experience
              </h3>
              <span className="w-8 h-[1px] bg-[#D8B56A]" />
            </div>
            <p className="text-[#C9CDD4] text-xs md:text-sm font-sans max-w-xl mx-auto mt-2">
              We'd love to hear your feedback and showcase your experience with SRI CREATION.
            </p>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-3xl mx-auto white-glass white-glass-hover p-6 md:p-10 rounded-2xl relative transition-all duration-300">
            {/* Ambient neon backdrop gradient glow strictly in card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2D55]/3 via-[#D8B56A]/2 to-transparent pointer-events-none rounded-2xl" />

            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                  Thank You, {name}!
                </h3>
                <p className="text-[#C9CDD4] text-sm max-w-md mx-auto mb-8 font-sans">
                  Your feedback has been successfully submitted. We appreciate you taking the time to share your experience with SRI CREATION.
                </p>
                <button
                  onClick={resetForm}
                  className="py-3 px-8 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  Submit Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-[#FF2D55] text-xs font-sans font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D55] shrink-0" />
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="text-zinc-400 text-[10px] font-mono uppercase tracking-wider mb-2 flex items-center">
                      Full Name <span className="text-[#FF2D55] ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-xs md:text-sm font-sans focus:outline-none focus:border-[#FF2D55]/50 focus:ring-1 focus:ring-[#FF2D55]/50 focus:bg-white/[0.07] transition-all duration-300 w-full"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-zinc-400 text-[10px] font-mono uppercase tracking-wider mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-xs md:text-sm font-sans focus:outline-none focus:border-[#FF2D55]/50 focus:ring-1 focus:ring-[#FF2D55]/50 focus:bg-white/[0.07] transition-all duration-300 w-full"
                    />
                  </div>

                  {/* Service Availed */}
                  <div className="flex flex-col">
                    <label className="text-zinc-400 text-[10px] font-mono uppercase tracking-wider mb-2 flex items-center">
                      Service Availed <span className="text-[#FF2D55] ml-1">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white text-xs md:text-sm font-sans focus:outline-none focus:border-[#FF2D55]/50 focus:ring-1 focus:ring-[#FF2D55]/50 focus:bg-white/[0.07] transition-all duration-300 w-full appearance-none cursor-pointer pr-10"
                      >
                        <option value="" disabled className="text-zinc-500 bg-zinc-950">Select Service</option>
                        <option value="Cinematic Video Editing" className="bg-zinc-950 text-white">Cinematic Video Editing</option>
                        <option value="Photography" className="bg-zinc-950 text-white">Photography</option>
                        <option value="Poster Design" className="bg-zinc-950 text-white">Poster Design</option>
                        <option value="Wedding & Event Shoot" className="bg-zinc-950 text-white">Wedding & Event Shoot</option>
                        <option value="Traditional Video" className="bg-zinc-950 text-white">Traditional Video</option>
                        <option value="Model Portfolio" className="bg-zinc-950 text-white">Model Portfolio</option>
                        <option value="Business Advertisement" className="bg-zinc-950 text-white">Business Advertisement</option>
                        <option value="Short Film Production" className="bg-zinc-950 text-white">Short Film Production</option>
                        <option value="Content Creation & Storytelling" className="bg-zinc-950 text-white">Content Creation & Storytelling</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Project Name */}
                  <div className="flex flex-col">
                    <label className="text-zinc-400 text-[10px] font-mono uppercase tracking-wider mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="e.g. Summer Commercial Reel"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-xs md:text-sm font-sans focus:outline-none focus:border-[#FF2D55]/50 focus:ring-1 focus:ring-[#FF2D55]/50 focus:bg-white/[0.07] transition-all duration-300 w-full"
                    />
                  </div>

                  {/* Project Completion Date */}
                  <div className="flex flex-col">
                    <label className="text-zinc-400 text-[10px] font-mono uppercase tracking-wider mb-2">
                      Project Completion Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={completionDate}
                        onChange={(e) => setCompletionDate(e.target.value)}
                        style={{ colorScheme: "dark" }}
                        className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-xs md:text-sm font-sans focus:outline-none focus:border-[#FF2D55]/50 focus:ring-1 focus:ring-[#FF2D55]/50 focus:bg-white/[0.07] transition-all duration-300 w-full cursor-pointer pr-10"
                      />
                    </div>
                  </div>

                  {/* Instagram Username */}
                  <div className="flex flex-col">
                    <label className="text-zinc-400 text-[10px] font-mono uppercase tracking-wider mb-2">
                      Instagram (Optional)
                    </label>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="e.g. @john_doe"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-xs md:text-sm font-sans focus:outline-none focus:border-[#FF2D55]/50 focus:ring-1 focus:ring-[#FF2D55]/50 focus:bg-white/[0.07] transition-all duration-300 w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mt-2">
                  {/* Rating */}
                  <div className="flex flex-col">
                    <label className="text-zinc-400 text-[10px] font-mono uppercase tracking-wider mb-3 flex items-center">
                      Rating <span className="text-[#FF2D55] ml-1">*</span>
                    </label>
                    <div className="flex gap-1.5 items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform duration-200 hover:scale-125 cursor-pointer focus:outline-none"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`w-7 h-7 transition-colors duration-200 ${
                              star <= (hoverRating || rating)
                                ? "fill-[#D8B56A] text-[#D8B56A]"
                                : "text-white/20 fill-transparent hover:text-white/40"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upload Photo */}
                  <div className="flex flex-col">
                    <label className="text-zinc-400 text-[10px] font-mono uppercase tracking-wider mb-2">
                      Upload Photo (Optional)
                    </label>
                    {photoPreview ? (
                      <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-xl p-2.5">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-12 h-12 object-cover rounded-lg border border-white/10"
                        />
                        <div className="flex-1 overflow-hidden">
                          <span className="text-xs text-zinc-300 block truncate">Photo Selected</span>
                          <span className="text-[10px] text-zinc-500 font-mono">JPG, PNG, WEBP accepted</span>
                        </div>
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative border border-dashed border-white/20 hover:border-[#FF2D55]/40 rounded-xl p-3 transition-all duration-300 bg-white/[0.04] flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Upload className="w-4 h-4 text-zinc-400" />
                          <span className="text-xs text-zinc-400 font-sans">Choose photo...</span>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <span className="text-[9px] font-mono text-zinc-500">Max 5MB</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Your Review */}
                <div className="flex flex-col mt-2">
                  <label className="text-zinc-400 text-[10px] font-mono uppercase tracking-wider mb-2 flex items-center">
                    Your Review <span className="text-[#FF2D55] ml-1">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us about your experience working with SRI CREATION..."
                    className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-xs md:text-sm font-sans focus:outline-none focus:border-[#FF2D55]/50 focus:ring-1 focus:ring-[#FF2D55]/50 focus:bg-white/[0.07] transition-all duration-300 w-full resize-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col gap-3.5 mt-2">
                  <label className="flex items-start gap-3 cursor-pointer group text-xs text-zinc-400 select-none">
                    <input
                      type="checkbox"
                      checked={confirmGenuine}
                      onChange={(e) => setConfirmGenuine(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 ${
                      confirmGenuine
                        ? "bg-[#FF2D55] border-[#FF2D55] text-white"
                        : "border-white/20 group-hover:border-white/40 bg-white/5"
                    }`}>
                      {confirmGenuine && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>I confirm this is my genuine review. <span className="text-[#FF2D55]">*</span></span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group text-xs text-zinc-400 select-none">
                    <input
                      type="checkbox"
                      checked={confirmPublish}
                      onChange={(e) => setConfirmPublish(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 ${
                      confirmPublish
                        ? "bg-[#FF2D55] border-[#FF2D55] text-white"
                        : "border-white/20 group-hover:border-white/40 bg-white/5"
                    }`}>
                      {confirmPublish && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>I allow SRI CREATION to publish this review on the website. <span className="text-[#FF2D55]">*</span></span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex justify-center md:justify-start">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="relative group py-3 px-8 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#FF2D55] to-[#FF6A3D] cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(255,45,85,0.3)] hover:shadow-[0_0_30px_rgba(255,45,85,0.6)]"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                      </div>
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>



        {/* Admin Dashboard Modal Overlay */}
        {isAdmin && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/95 backdrop-blur-xl flex justify-center p-4 md:p-10">
            <div className="w-full max-w-4xl h-fit white-glass rounded-[32px] p-6 md:p-10 relative mt-16 md:mt-24 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
                <div>
                  <h2 className="font-display text-xl md:text-3xl font-bold text-white flex items-center gap-2">
                    ⚙️ Review Management Dashboard
                  </h2>
                  <p className="text-[#C9CDD4] text-xs font-sans mt-1">
                    Approve, publish, unpublish, or delete customer review submissions in real-time.
                  </p>
                </div>
                <button
                  onClick={() => {
                    window.location.hash = "";
                    setIsAdmin(false);
                  }}
                  className="p-2.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="Close Admin Portal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Reviews List */}
              <div className="flex flex-col gap-6 text-left">
                {reviews.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                    <p className="text-zinc-500 text-sm font-sans">No reviews submitted yet.</p>
                  </div>
                ) : (
                  reviews.map((rev) => {
                    const formattedDate = new Date(rev.submittedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    });

                    return (
                      <div
                        key={rev.id}
                        className="white-glass p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-5 justify-between items-start md:items-center hover:border-white/10 transition-all"
                      >
                        {/* Identity & Content */}
                        <div className="flex gap-4 items-start flex-1">
                          {/* Photo */}
                          <div className="shrink-0">
                            {rev.photoUrl ? (
                              <img
                                src={rev.photoUrl}
                                alt={rev.name}
                                className="w-14 h-14 rounded-full object-cover border border-white/10"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF2D55]/20 to-[#FF6A3D]/20 border border-white/10 flex items-center justify-center text-[#FF2D55] font-display text-base font-bold">
                                {rev.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>

                          {/* Text details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h4 className="font-nunito text-sm text-white font-bold truncate">
                                {rev.name}
                              </h4>
                              {rev.instagram && (
                                <span className="text-zinc-500 text-xs font-sans">
                                  ({rev.instagram.startsWith("@") ? rev.instagram : `@${rev.instagram}`})
                                </span>
                              )}
                              <span className="text-zinc-600 text-[10px] font-mono">
                                • {formattedDate}
                              </span>
                            </div>

                            {/* Service & Project */}
                            <div className="text-zinc-400 text-xs font-sans mb-2 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[#FF2D55] font-semibold">{rev.service}</span>
                              {rev.projectName && (
                                <span className="text-zinc-500">• Project: {rev.projectName}</span>
                              )}
                              {rev.completionDate && (
                                <span className="text-zinc-600">• Completed: {rev.completionDate}</span>
                              )}
                            </div>

                            {/* Star Rating */}
                            <div className="flex gap-0.5 mb-2.5">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-[#D8B56A] text-[#D8B56A]" />
                              ))}
                              {[...Array(5 - rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 text-white/10 fill-transparent" />
                              ))}
                            </div>

                            {/* Review text */}
                            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-sans italic bg-white/[0.02] p-3 rounded-xl border border-white/5">
                              &ldquo;{rev.review}&rdquo;
                            </p>
                          </div>
                        </div>

                        {/* Status & Actions Column */}
                        <div className="flex md:flex-col items-end gap-3 shrink-0 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0 mt-3 md:mt-0 justify-between md:justify-start">
                          {/* Status Badge */}
                          <span className={`text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md border ${
                            rev.status === "published"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          }`}>
                            {rev.status}
                          </span>

                          {/* Button Group */}
                          <div className="flex gap-2">
                            {rev.status === "pending" ? (
                              <button
                                onClick={() => handlePublish(rev.id)}
                                className="py-1.5 px-3 rounded-lg font-mono text-[9px] uppercase tracking-wider font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer"
                              >
                                Publish
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnpublish(rev.id)}
                                className="py-1.5 px-3 rounded-lg font-mono text-[9px] uppercase tracking-wider font-bold text-zinc-300 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                              >
                                Unpublish
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(rev.id)}
                              className="py-1.5 px-3 rounded-lg font-mono text-[9px] uppercase tracking-wider font-bold text-white bg-red-600 hover:bg-red-500 transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
