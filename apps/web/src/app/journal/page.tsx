"use client";

import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { MediaImg } from "@/components/ui/MediaImg";

export default function JournalPage() {
  const featured = BLOG_POSTS.find((p) => p.featured)!;
  const others = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <div>
      <section className="container">
        <h1 className="font-heading text-center">clean Journal</h1>
        <p className="maxwidth text-center mx-auto text-gray3 mt-4">
          Healty tips on skincare, regimen and overall a better lifestyle.
        </p>

        <div className="row gy-5 mt-16">
          {others.map((post) => (
            <div key={post.slug} className="col-md-4">
              <article className="journal__card">
                <Link href={`/journal/${post.slug}`} className="article-card">
                  <div className="journal__card-image">
                    <MediaImg src={post.image} alt={post.title} sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div className="journal__card-text">
                    <h3 className="journal__card-title">{post.title}</h3>
                    {post.excerpt && <p className="journal__card-desc">{post.excerpt}</p>}
                    <div className="journal__card-detail">
                      <span>{formatDate(post.date)}</span>
                      <span className="link">Read more</span>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          ))}
        </div>

        {featured && (
          <div className="row mt-16">
            <div className="col-md-8">
              <article className="journal__card featured">
                <Link href={`/journal/${featured.slug}`} className="article-card">
                  <div className="journal__card-image">
                    <p className="ribbon">Featured</p>
                    <MediaImg src={featured.image} alt={featured.title} sizes="(max-width:768px) 100vw, 66vw" />
                  </div>
                  <div className="journal__card-text">
                    <h3 className="journal__card-title">{featured.title}</h3>
                    <p className="journal__card-desc">{featured.excerpt}</p>
                    <div className="journal__card-detail">
                      <span>{formatDate(featured.date)}</span>
                      <span className="link">Read more</span>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}