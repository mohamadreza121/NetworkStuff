import type { Metadata } from "next";
import { LinuxCommandReference } from "@/components/linux-command-reference";

export const metadata: Metadata = { title: "Linux Command Reference", description: "A searchable Linux networking command library with examples, expected signals, and next-step guidance.", alternates: { canonical: "/reference/linux" } };
export default function LinuxReferencePage() { return <LinuxCommandReference />; }
