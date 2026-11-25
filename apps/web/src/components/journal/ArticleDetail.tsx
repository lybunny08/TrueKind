"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function ArticleDetail({ slug }: { slug: string }) {
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="bg-white">
      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/journal"
            className="text-xs uppercase tracking-widest font-medium hover:underline mb-8 inline-block"
          >
            ← Back to Journal
          </Link>
          <h1 className="font-playfair text-3xl md:text-4xl font-light leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-xs text-black/60 mb-8">{formatDate(post.date)}</p>
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative h-[500px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-black/80 leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <p className="text-sm text-black/70 leading-relaxed mb-6">
            {post.content}
          </p>
          <p className="text-sm text-black/70 leading-relaxed mb-6">
            At TrueKind, we believe that great skincare starts with honesty.
            Our transparent formulations are created with ingredients you can
            trust, backed by science and crafted with care.
          </p>
        </div>
      </article>

      <section className="py-16 border-t border-black/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs uppercase tracking-widest font-medium mb-8">
            More from the Journal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link key={p.slug} href={`/journal/${p.slug}`} className="group">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 mb-4"
                />
                <h3 className="font-playfair text-lg font-light leading-tight group-hover:underline">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}