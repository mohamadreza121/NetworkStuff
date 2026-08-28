import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { CcnaHub } from "@/components/ccna-hub";
import { CcnaLessonArticle } from "@/components/ccna-lesson-article";
import { CcnaModulePage } from "@/components/ccna-module-page";
import { LinuxLearningHub } from "@/components/linux-learning-hub";
import { LinuxLearningLessonArticle } from "@/components/linux-learning-lesson-article";
import { LinuxLearningModulePage } from "@/components/linux-learning-module-page";
import { LessonArticle } from "@/components/lesson-article";
import { TechnologyHub } from "@/components/technology-hub";
import { ccnaLegacyRoutes, ccnaLessons, ccnaModules, getCcnaLessonByRoute, getCcnaModuleByRoute } from "@/content/cisco/ccna";
import { getHub, hubs } from "@/content/hubs";
import { getLinuxLessonByRoute, getLinuxModuleByRoute, linuxLegacyRoutes, linuxLessons, linuxModules } from "@/content/linux/network-engineering";
import { getLesson, lessons } from "@/lib/lessons";

export function generateStaticParams() {
  const routes = [
    ...hubs.map((hub) => hub.slug),
    ...ccnaModules.map((moduleEntry) => ["cisco", "ccna", moduleEntry.slug]),
    ...ccnaLessons.map((lesson) => {
      const moduleEntry = ccnaModules.find((item) => item.id === lesson.moduleId);
      return ["cisco", "ccna", moduleEntry?.slug ?? lesson.moduleId, lesson.slug];
    }),
    ...linuxModules.map((moduleEntry) => ["linux", moduleEntry.slug]),
    ...linuxLessons.map((lesson) => {
      const moduleEntry = linuxModules.find((item) => item.id === lesson.moduleId);
      return ["linux", moduleEntry?.slug ?? lesson.moduleId, lesson.slug];
    }),
    ...lessons.map((lesson) => lesson.slug),
    ...Object.keys(ccnaLegacyRoutes).map((route) => route.split("/")),
    ...Object.keys(linuxLegacyRoutes).map((route) => route.split("/")),
  ];
  return [...new Map(routes.map((slug) => [slug.join("/"), { slug }])).values()];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug.join("/") === "cisco/ccna") return { title: "Complete CCNA 200-301 v1.1 Learning Path", description: "All current Cisco CCNA objectives mapped to original lessons, diagrams, configuration, verification, troubleshooting, and practice.", alternates: { canonical: "/learn/cisco/ccna" } };
  const ccnaModule = getCcnaModuleByRoute(slug);
  if (ccnaModule) return { title: `${ccnaModule.title} — CCNA 200-301 v1.1`, description: ccnaModule.description, alternates: { canonical: `/learn/cisco/ccna/${ccnaModule.slug}` } };
  const ccnaLesson = getCcnaLessonByRoute(slug);
  if (ccnaLesson) return { title: `${ccnaLesson.title} — CCNA 200-301 v1.1`, description: ccnaLesson.summary, alternates: { canonical: `/learn/${slug.join("/")}` }, openGraph: { title: `${ccnaLesson.title} | NetPath CCNA`, description: ccnaLesson.summary, type: "article" } };
  const legacyTarget = ccnaLegacyRoutes[slug.join("/")];
  if (legacyTarget) return { title: "CCNA lesson moved", alternates: { canonical: legacyTarget } };
  if (slug.join("/") === "linux") return { title: "Linux for Network Engineers — Complete Learning Path", description: "A complete Linux network operations curriculum covering host networking, routing, services, troubleshooting, security, VPNs, virtualization, automation, observability, and incident practice.", alternates: { canonical: "/learn/linux" } };
  const linuxModule = getLinuxModuleByRoute(slug);
  if (linuxModule) return { title: `${linuxModule.title} — Linux Network Operations`, description: linuxModule.description, alternates: { canonical: `/learn/linux/${linuxModule.slug}` } };
  const linuxLesson = getLinuxLessonByRoute(slug);
  if (linuxLesson) return { title: `${linuxLesson.title} — Linux for Network Engineers`, description: linuxLesson.summary, alternates: { canonical: `/learn/${slug.join("/")}` }, openGraph: { title: `${linuxLesson.title} | NetPath Linux`, description: linuxLesson.summary, type: "article" } };
  const linuxLegacyTarget = linuxLegacyRoutes[slug.join("/")];
  if (linuxLegacyTarget) return { title: "Linux lesson moved", alternates: { canonical: linuxLegacyTarget } };
  const hub = getHub(slug);
  if (hub) return { title: hub.title, description: hub.description, alternates: { canonical: `/learn/${hub.slug.join("/")}` } };
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
  if (slug.join("/") === "cisco/ccna") return <CcnaHub />;
  const ccnaModule = getCcnaModuleByRoute(slug);
  if (ccnaModule) return <CcnaModulePage moduleEntry={ccnaModule} />;
  const ccnaLesson = getCcnaLessonByRoute(slug);
  if (ccnaLesson) return <main><CcnaLessonArticle lesson={ccnaLesson} /></main>;
  const legacyTarget = ccnaLegacyRoutes[slug.join("/")];
  if (legacyTarget) redirect(legacyTarget);
  if (slug.join("/") === "linux") return <LinuxLearningHub />;
  const linuxModule = getLinuxModuleByRoute(slug);
  if (linuxModule) return <LinuxLearningModulePage moduleEntry={linuxModule} />;
  const linuxLesson = getLinuxLessonByRoute(slug);
  if (linuxLesson) return <main><LinuxLearningLessonArticle lesson={linuxLesson} /></main>;
  const linuxLegacyTarget = linuxLegacyRoutes[slug.join("/")];
  if (linuxLegacyTarget) redirect(linuxLegacyTarget);
  const hub = getHub(slug);
  if (hub) return <TechnologyHub hub={hub} />;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  return <main><LessonArticle lesson={lesson} /></main>;
}
