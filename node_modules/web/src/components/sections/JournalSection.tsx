"use client";

import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { MediaImg } from "@/components/ui/MediaImg";

export function JournalSection() {
  const featured = BLOG_POSTS.find((p) => p.featured)!;
  const others = BLOG_POSTS.filter((p) => !p.featured).slice(0, 2);

  return (
    <section id="journal">
      <div className="container">
        {/* Mobile title */}
        <div className="d-block d-md-none text-center mb-5">
          <h2 className="journal__title"><span className="font-serif">clean</span> Journal</h2>
          <p className="maxwidth text-center px-3 px-md-0">Healty tips on skincare, regimen and overall a better lifestyle.</p>
        </div>

        <div className="row gx-0 gy-5 gy-md-0">
          {/* Featured (left half) */}
          <div className="col-md-6 pe-0 pe-md-5">
            <article className="journal__card featured">
              <Link href={`/journal/${featured.slug}`} className="article-card">
                <div className="journal__card-image">
                  <p className="ribbon">Featured</p>
                  <MediaImg src={featured.image} alt={featured.title} sizes="(max-width:768px) 100vw, 45vw" />
                </div>
                <div className="journal__card-text">
                  <h3 className="journal__card-title">{featured.title}</h3>
                  <p className="journal__card-desc">{featured.excerpt}</p>
                  <div className="journal__card-detail"><span>{formatDate(featured.date)}</span><span className="link">Read more</span></div>
                </div>
              </Link>
            </article>
          </div>

          {/* Right half: desktop title + 2 cards + more */}
          <div className="col-md-6 d-flex flex-column align-items-center">
            <h2 className="journal__title d-none d-md-block"><span className="font-serif">clean</span> Journal</h2>
            <p className="journal__desc maxwidth d-none d-md-block">Healty tips on skincare, regimen and overall a better lifestyle.</p>

            <div className="row gy-5 gy-md-0 w-100">
              {others.map((p) => (
                <div key={p.slug} className="col-md-6">
                  <article className="journal__card">
                    <Link href={`/journal/${p.slug}`} className="article-card">
                      <div className="journal__card-image"><MediaImg src={p.image} alt={p.title} sizes="(max-width:768px) 100vw, 22vw" /></div>
                      <div className="journal__card-text">
                        <h3 className="journal__card-title">{p.title}</h3>
                        <div className="journal__card-detail"><span>{formatDate(p.date)}</span><span className="link">Read more</span></div>
                      </div>
                    </Link>
                  </article>
                </div>
              ))}
            </div>

            <div className="journal__more icon-clone magnet">
              <Link href="/journal" className="arrowlong white"><ArrowRight /></Link>
              <Link href="/journal" className="link">See all</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.2" /></svg>;
}