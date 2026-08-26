import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LessonArticle } from "@/components/lesson-article";
import { getLesson, lessons } from "@/lib/lessons";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lesson not found" };

  return {
    title: lesson.title,
    description: lesson.description,
    alternates: { canonical: `/learn/${lesson.slug.join("/")}` },
    openGraph: {
      title: `${lesson.title} | NetPath`,
      description: lesson.description,
      type: "article",
    },
  };
}

export default async function LessonRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  return <main><LessonArticle lesson={lesson} /></main>;
}

