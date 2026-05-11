'use client';

import type { Portfolio, WritingPost } from '../../types/portfolio';
import Reveal from '../Reveal';

function formatPostDate(raw: string): string {
  const t = Date.parse(raw);
  if (!Number.isNaN(t)) {
    return new Date(t).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return raw;
}

function pickFeaturedAndRest(posts: WritingPost[]) {
  const idx = posts.findIndex((p) => p.featured);
  const headIdx = idx >= 0 ? idx : 0;
  const featured = posts[headIdx];
  const rest = posts.filter((_, i) => i !== headIdx);
  return { featured, rest };
}

export default function Blog({ data }: Readonly<{ data: Portfolio }>) {
  const posts = data.writingPosts ?? [];
  if (!posts.length) return null;

  const { featured, rest } = pickFeaturedAndRest(posts);

  return (
    <section className="blog section" id="blog">
      <span className="gutter-label">§ 06 — Writing</span>
      <div className="shell blog-shell">
        <Reveal>
          <header className="blog-head">
            <div>
              <span className="eyebrow">Long-form</span>
              <h2 className="display-md">
                Notes from <span className="italic-accent">the desk.</span>
              </h2>
            </div>
          </header>
        </Reveal>
        <Reveal>
          <a className="featured" href={featured.url} target="_blank" rel="noopener noreferrer">
            <div className="featured-meta">
              <span className="featured-tag">Featured · Latest</span>
              <span className="featured-rule"></span>
              <span className="featured-date">{formatPostDate(featured.date)}</span>
              {featured.readingTime ? (
                <span className="featured-read">{featured.readingTime}</span>
              ) : null}
            </div>
            <h3 className="featured-title">{featured.title}</h3>
            <p className="featured-excerpt">{featured.description}</p>
            <span className="featured-cta">
              Read the piece
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </Reveal>
        <ol className="post-list">
          {rest.map((post, i) => (
            <li key={`${post.title}-${post.date}`}>
              <Reveal delay={i * 60}>
                <a className="post" href={post.url} target="_blank" rel="noopener noreferrer">
                  <span className="post-date">{formatPostDate(post.date)}</span>
                  <span className="post-body">
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-summary">{post.description}</p>
                  </span>
                  <span className="post-meta">
                    {post.readingTime ? <span className="post-read">{post.readingTime}</span> : null}
                    <span className="post-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M7 17L17 7M17 7H8M17 7v9" />
                      </svg>
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
