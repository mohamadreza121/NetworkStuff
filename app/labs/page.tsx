import type { Metadata } from "next";
import { LabLibrary } from "@/components/lab-library";

export const metadata: Metadata = { title: "Network Engineering Labs", description: "Practice Cisco, Linux, GNS3, and Ansible workflows without exposing the solution first.", alternates: { canonical: "/labs" } };
export default function LabsPage() { return <LabLibrary />; }
