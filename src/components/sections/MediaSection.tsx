"use client";

import type { MediaSectionProps } from "@/types/sections";
import { urlFor } from "@sanity/lib/image";
import Image from 'next/image'
import { useRef, useState, useEffect } from "react";

/**
 * Media Section - WCAG AA Compliant
 * Displays images or videos with full accessibility support
 * 
 * WCAG AA Compliance features:
 * - Required alt text for all images
 * - Video captions and transcripts
 * - Keyboard navigation support
 * - Focus management
 * - ARIA labels and descriptions
 * - Sufficient color contrast
 * - Responsive and scalable
 */
export default function MediaSection(props: MediaSectionProps) {
  const {
    variant = "contained",
    heading,
    description,
    mediaType = "image",
    image,
    video,
    aspectRatio = "auto",
    maxWidth = "lg",
    rounded = true,
    shadow = false,
    ariaLabel,
    ariaDescribedBy,
  } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // Debug logging
  console.log('MediaSection props:', { mediaType, video, image });

  // Generate unique IDs for ARIA relationships
  const mediaId = `media-${props._key}`;
  const transcriptId = `transcript-${props._key}`;
  const captionId = `caption-${props._key}`;

  // Handle video play/pause for keyboard users
  const handleVideoKeyPress = (e: React.KeyboardEvent<HTMLVideoElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    }
  };

  // Update playing state
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
    };
  }, []);

  // Container class names based on variant
  const containerClasses = {
    fullWidth: "w-full",
    contained: "container mx-auto px-4",
    splitScreen: "container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center",
    card: "container mx-auto px-4",
  };

  // Max width classes
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full",
  };

  // Media wrapper classes
  const mediaClasses = [
    "relative",
    "overflow-hidden",
    rounded && "rounded-lg",
    shadow && "shadow-lg",
  ]
    .filter(Boolean)
    .join(" ");

  // Aspect ratio style - default to 16:9 for videos if not specified
  const getAspectRatioStyle = () => {
    if (aspectRatio !== "auto") {
      return { aspectRatio };
    }
    // Default to 16:9 for videos, auto for images
    if (mediaType === "video") {
      return { aspectRatio: "16/9" };
    }
    return undefined;
  };

  const aspectRatioStyle = getAspectRatioStyle();

  // Build image URL with optimization
  const imageUrl = image
    ? urlFor(image)
        .width(1920)
        .height(1080)
        .fit("max")
        .auto("format")
        .quality(90)
        .url()
    : null;

  const posterUrl = video?.posterImage
    ? urlFor(video.posterImage)
        .width(1920)
        .height(1080)
        .fit("crop")
        .auto("format")
        .quality(80)
        .url()
    : null;

  // Determine if video is embedded (YouTube, Vimeo) or direct
  const isEmbeddedVideo = (url?: string) => {
    if (!url) return false;
    return (
      url.includes("youtube.com") ||
      url.includes("youtu.be") ||
      url.includes("vimeo.com")
    );
  };

  // Convert YouTube/Vimeo URLs to embed format
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;

    // If already an embed URL, return as-is
    if (url.includes("/embed/") || url.includes("player.vimeo.com")) {
      return url;
    }

    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : new URL(url).searchParams.get("v");
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?rel=0`
        : null;
    }

    // Vimeo
    if (url.includes("vimeo.com")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }

    return url;
  };

  return (
    <section
      className={`py-12 md:py-16 lg:py-20`}
      aria-label={ariaLabel || `Media section${heading ? `: ${heading}` : ""}`}
      aria-describedby={ariaDescribedBy}
    >
      <div className={containerClasses[variant]}>
        {/* Heading and description */}
        {(heading || description) && (
          <div
            className={`mb-8 ${
              variant === "splitScreen" ? "" : "text-center mx-auto"
            } ${variant !== "fullWidth" ? maxWidthClasses[maxWidth] : ""}`}
          >
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Media content */}
        <div
          className={
            variant !== "fullWidth" && variant !== "splitScreen"
              ? `mx-auto ${maxWidthClasses[maxWidth]}`
              : ""
          }
        >
          {mediaType === "image" && imageUrl && image?.alt ? (
            <figure className={mediaClasses} style={aspectRatioStyle}>
              <div id={mediaId} aria-describedby={image.caption ? captionId : undefined} className="relative block w-full h-full">
                <Image
                  src={imageUrl}
                  alt={image.alt}
                  width={(image.asset?.metadata?.dimensions?.width) || 1600}
                  height={(image.asset?.metadata?.dimensions?.height) || 900}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 70vw"
                  placeholder={image?.blurDataURL ? 'blur' : undefined}
                  blurDataURL={image?.blurDataURL}
                />
                {/* Gradient overlay from image.overlay */}
                {image?.overlay?.enabled && (() => {
                  const ov = image.overlay as any;
                  const overlayOpacity = typeof ov?.opacity === 'number' ? ov.opacity : 0.5;
                  const start = 'rgba(0,0,0,0)';
                  const end = `rgba(0,0,0,${Math.max(0, Math.min(1, overlayOpacity))})`;
                  const dir = ov?.direction || 'down';
                  const dirToCss: Record<string, string> = {
                    up: 'to top',
                    down: 'to bottom',
                    left: 'to left',
                    right: 'to right',
                  };
                  const cssDir = dirToCss[dir] || 'to bottom';
                  const bgImage = `linear-gradient(${cssDir}, ${start}, ${end})`;

                  return (
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        zIndex: 1,
                        backgroundImage: bgImage,
                      }}
                    />
                  );
                })()}
              </div>
              {image.caption && (
                <figcaption
                  id={captionId}
                  className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400"
                >
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ) : mediaType === "video" && video?.videoUrl ? (
            <div className="space-y-4">
              {isEmbeddedVideo(video.videoUrl) ? (
                // Embedded video (YouTube/Vimeo)
                <div 
                  className={mediaClasses} 
                  style={aspectRatioStyle}
                >
                  <iframe
                    id={mediaId}
                    src={getEmbedUrl(video.videoUrl) || ""}
                    title={video.videoTitle || "Video content"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    aria-label={video.videoTitle || "Video content"}
                    aria-describedby={
                      video.transcript ? transcriptId : undefined
                    }
                  />
                </div>
              ) : (
                // Direct video file
                <div className={mediaClasses} style={aspectRatioStyle}>
                  <video
                    ref={videoRef}
                    id={mediaId}
                    controls={video.controls !== false}
                    autoPlay={video.autoplay || false}
                    loop={video.loop || false}
                    muted={video.autoplay || false} // Must be muted if autoplay
                    poster={posterUrl || undefined}
                    className="w-full h-full"
                    aria-label={video.videoTitle || "Video content"}
                    aria-describedby={
                      video.transcript ? transcriptId : undefined
                    }
                    onKeyDown={handleVideoKeyPress}
                    tabIndex={0}
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                    <track
                      kind="captions"
                      src={video.captionsUrl || ""}
                      srcLang="nl"
                      label="Nederlands"
                      default
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Video transcript (WCAG requirement) */}
              {video.transcript && (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md"
                    style={{
                      backgroundColor: "hsl(var(--dc-surface-90))",
                      color: "hsl(var(--dc-on-surface))",
                    }}
                    aria-expanded={showTranscript}
                    aria-controls={transcriptId}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showTranscript ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    {showTranscript ? "Hide" : "Show"} Transcript
                  </button>
                  {showTranscript && (
                    <div
                      id={transcriptId}
                      className="p-4 rounded-md text-sm"
                      style={{
                        backgroundColor: "hsl(var(--dc-surface-95))",
                        color: "hsl(var(--dc-on-surface))",
                      }}
                      role="region"
                      aria-label="Video transcript"
                    >
                      <h3 className="font-semibold mb-2">Transcript</h3>
                      <p className="whitespace-pre-wrap">{video.transcript}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            // Fallback for missing or incomplete media
            <div
              className={`${mediaClasses} flex items-center justify-center bg-gray-100 dark:bg-gray-800 min-h-[300px]`}
              style={aspectRatioStyle}
              role="img"
              aria-label="No media available"
            >
              <p className="text-gray-500 dark:text-gray-400">
                Media content unavailable
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

