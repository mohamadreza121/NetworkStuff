import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders production metadata without the development marker", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(html, /<title>NetPath — The practical path to network engineering<\/title>/);
});

test("serves the Phase 4 critical-route sweep without internal 404s", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("routes", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  const routes = [
    "/", "/roadmap", "/learn", "/learn/cisco/ccna", "/learn/cisco/ccna/network-foundations",
    "/learn/cisco/ccna/network-foundations/network-components",
    "/learn/cisco/ccna/ethernet-switching/mac-learning-and-flooding",
    "/learn/cisco/ccna/ip-addressing/ipv6-address-types",
    "/learn/cisco/ccna/routing/ospf-neighbors-and-router-id",
    "/learn/cisco/ccna/security/layer2-security",
    "/learn/cisco/ccna/automation/rest-apis-and-json",
    "/learn/linux/networking/ip-command", "/labs", "/labs/ospf-multi-area", "/reference",
    "/reference/linux", "/reference/cisco", "/reference/palo-alto", "/reference/fortigate",
    "/reference/git", "/reference/ansible",
    "/projects", "/projects/gns3", "/projects/packet-tracer",
    "/projects/gns3/enterprise-dual-site", "/projects/packet-tracer/campus-vlan-network",
    "/troubleshooting", "/troubleshooting/ospf-exstart", "/interview", "/job-ready",
    "/tools", "/tools/subnet-calculator", "/tools/vlsm-planner", "/tools/ipv6-helper",
    "/tools/wildcard-calculator", "/tools/ospf-cost-calculator", "/tools/eigrp-calculator",
    "/tools/acl-builder", "/glossary",
    "/automation", "/firewalls", "/firewalls/palo-alto", "/gns3", "/packet-tracer", "/about",
  ];
  for (const route of routes) {
    const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), env, ctx);
    assert.equal(response.status, 200, `${route} returned ${response.status}`);
    await response.arrayBuffer();
  }
});
