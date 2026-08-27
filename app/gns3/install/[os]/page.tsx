import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage, type GuideStep } from "@/components/guide-page";

const names = { windows: "Windows", linux: "Linux", macos: "macOS" };
const baseSteps: GuideStep[] = [
  { title: "Confirm host capacity", detail: "Reserve CPU, memory, and storage for the GNS3 application, its VM, and the appliances you are licensed to run." },
  { title: "Enable virtualization", detail: "Confirm hardware virtualization is enabled in firmware and visible to the host operating system." },
  { title: "Download from the official source", detail: "Use the current official GNS3 distribution and verify the publisher before installing." },
  { title: "Install the desktop application", detail: "Keep the standard components unless your organization has a managed package policy." },
  { title: "Install a supported hypervisor", detail: "Choose a supported virtualization backend and avoid running competing hypervisors at the same time." },
  { title: "Import the GNS3 VM", detail: "Import the supplied VM appliance and allocate conservative resources first." },
  { title: "Connect application and VM", detail: "Select the imported VM in preferences and wait for a healthy server status." },
  { title: "Validate local server state", detail: "Confirm the application can reach both its local server and the GNS3 VM." },
  { title: "Create a clean project", detail: "Use a dedicated project directory for topology, notes, captures, and exported configurations." },
  { title: "Add a legal appliance image", detail: "Import only images you are entitled to use. Record the source, version, and checksum.", command: "sha256sum appliance-image.bin" },
  { title: "Build a two-node topology", detail: "Add two lightweight nodes, connect them, and start them one at a time." },
  { title: "Open a console", detail: "Confirm console access and save a minimal baseline configuration." },
  { title: "Capture one packet flow", detail: "Start a link capture, generate test traffic, then stop and label the capture." },
  { title: "Export a portable checkpoint", detail: "Stop nodes, export the project without proprietary images, and retain a README with prerequisites." },
];
export function generateStaticParams() { return Object.keys(names).map((os) => ({ os })); }
export async function generateMetadata({ params }: { params: Promise<{ os: string }> }): Promise<Metadata> { const { os } = await params; const name = names[os as keyof typeof names]; return name ? { title: `Install GNS3 on ${name}`, description: `A verified ${name} installation workflow for GNS3 labs.`, alternates: { canonical: `/gns3/install/${os}` } } : { title: "Guide not found" }; }
export default async function InstallGuide({ params }: { params: Promise<{ os: string }> }) { const { os } = await params; const name = names[os as keyof typeof names]; if (!name) notFound(); return <GuidePage eyebrow={`GNS3 / ${name.toUpperCase()} INSTALL`} title={`Install GNS3 on ${name}`} description="Build a stable, legal lab platform and verify every dependency before importing network appliances." steps={baseSteps} nextHref="/labs" nextLabel="Open the lab library" />; }
