"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { SocialMedia } from "../lib/social";

export default function SocialMediaDialog({ media, onClose }: { media: SocialMedia; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={`social-media${media.portrait ? " social-media--portrait" : ""}`}
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="social-media__panel">
        <header className="social-media__header">
          <h2 id={titleId}>{media.title}</h2>
          <button type="button" onClick={onClose} aria-label="Close video">×</button>
        </header>
        <div className="social-media__player">
          {media.kind === "video" ? (
            <video src={media.src} controls autoPlay playsInline preload="metadata" poster={media.poster ?? undefined} onError={() => setFailed(true)}>
              Your browser cannot play this video.
            </video>
          ) : (
            <iframe
              src={media.src}
              title={media.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </div>
        {failed ? <p className="social-media__message" role="status">This video could not be loaded. Please try again later.</p> : null}
        {media.href ? (
          <a className="social-media__source" href={media.href} target="_blank" rel="noopener noreferrer">
            Open on {media.kind === "youtube" ? "YouTube" : "Instagram"} <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </dialog>
  );
}
