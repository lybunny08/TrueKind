export const instant = false;

import ArticleDetail from "@/components/journal/ArticleDetail";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} />;
}