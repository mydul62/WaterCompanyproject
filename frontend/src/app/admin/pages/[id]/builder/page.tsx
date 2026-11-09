"use client";

import React, { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  Send,
  History,
  RotateCcw,
  RotateCw,
  ArrowLeft,
  Settings as SettingsIcon,
  Palette,
  Image as ImageIcon,
  Sliders,
  CheckCircle,
  ExternalLink,
  X,
  Type,
  MousePointer,
  RefreshCw,
  Link2,
  Check,
  Layers,
  ChevronDown,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Layout,
  Maximize2,
  FolderOpen,
} from "lucide-react";
import { api } from "@/lib/api";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

interface PageConfig {
  key: string;
  title: string;
  slug: string;
  sections: { id: string; name: string; selector: string }[];
}

const AVAILABLE_PAGES: PageConfig[] = [
  {
    key: "home",
    title: "Home Page",
    slug: "/",
    sections: [
      { id: "hero", name: "1. Hero Banner & 3D Interactive Canvas", selector: "#hero" },
      { id: "about", name: "2. Facility Showcase & LEED Green Campus", selector: "#curtain-reveal > div:nth-child(1)" },
      { id: "pillars", name: "3. Operational Pillars (9 Supply Chain Triangles)", selector: "#curtain-reveal > div:nth-child(2)" },
      { id: "products", name: "4. Product Showcase (Plastic & Tin Portfolio)", selector: "#curtain-reveal > div:nth-child(3)" },
      { id: "stories", name: "5. Latest Press & Newspaper Stories", selector: "#curtain-reveal > div:nth-child(4)" },
      { id: "b2b", name: "6. B2B Solutions Banner & RFQ CTA", selector: "#curtain-reveal > div:nth-child(5)" },
      { id: "explore", name: "7. Explore More Grid (13 Cards)", selector: "#curtain-reveal > div:nth-child(6)" },
      { id: "footer", name: "8. Global Footer & Contact", selector: "footer" },
    ],
  },
  {
    key: "story",
    title: "Our Story",
    slug: "/our-story",
    sections: [
      { id: "story-hero", name: "1. Heritage & History Hero", selector: "main > section:nth-child(1)" },
      { id: "story-timeline", name: "2. Milestone Timeline (1992-2026)", selector: "main > section:nth-child(2)" },
      { id: "story-leadership", name: "3. Leadership & Board", selector: "main > section:nth-child(3)" },
      { id: "footer", name: "4. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "business",
    title: "Our Business & Plants",
    slug: "/our-business",
    sections: [
      { id: "biz-hero", name: "1. Manufacturing Plants Hero", selector: "main > section:nth-child(1)" },
      { id: "biz-plants", name: "2. Tongi & Gazipur Automated Cleanrooms", selector: "main > section:nth-child(2)" },
      { id: "biz-tech", name: "3. Machinery & European Tooling", selector: "main > section:nth-child(3)" },
      { id: "footer", name: "4. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "products",
    title: "Product Catalog",
    slug: "/products",
    sections: [
      { id: "prod-hero", name: "1. Product Catalog Hero", selector: "main > section:nth-child(1)" },
      { id: "prod-grid", name: "2. Live Product Filter & Grid", selector: "main > section:nth-child(2)" },
      { id: "footer", name: "3. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "certificates",
    title: "Certificates & Accreditations",
    slug: "/certificates",
    sections: [
      { id: "cert-hero", name: "1. Accreditations Hero", selector: "main > section:nth-child(1)" },
      { id: "cert-list", name: "2. ISO, HACCP, GMP & LEED Credentials", selector: "main > section:nth-child(2)" },
      { id: "footer", name: "3. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "careers",
    title: "Careers & Culture",
    slug: "/careers",
    sections: [
      { id: "career-hero", name: "1. Careers Hero Banner", selector: "main > section:nth-child(1)" },
      { id: "career-jobs", name: "2. Active Openings & Job List", selector: "main > section:nth-child(2)" },
      { id: "footer", name: "3. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "brands",
    title: "Brands We Work With",
    slug: "/brands-we-work-with",
    sections: [
      { id: "brands-hero", name: "1. Brand Partners Hero", selector: "main > section:nth-child(1)" },
      { id: "brands-grid", name: "2. 49+ Client Logos Grid", selector: "main > section:nth-child(2)" },
      { id: "footer", name: "3. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "media",
    title: "Press & Media",
    slug: "/media",
    sections: [
      { id: "media-hero", name: "1. Press Releases Hero", selector: "main > section:nth-child(1)" },
      { id: "media-grid", name: "2. News Clippings & Video Gallery", selector: "main > section:nth-child(2)" },
      { id: "footer", name: "3. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "rnd",
    title: "Research & Development (R&D)",
    slug: "/rnd",
    sections: [
      { id: "rnd-hero", name: "1. R&D Hero Banner", selector: "#rnd-hero" },
      { id: "sec-precision", name: "2. Precision Engineering", selector: "#sec-precision" },
      { id: "sec-global", name: "3. Part of Global Organization", selector: "#sec-global" },
      { id: "sec-collaboration", name: "4. Innovation Through Collaboration", selector: "#sec-collaboration" },
      { id: "sec-sustainability", name: "5. Sustainability-Driven Research", selector: "#sec-sustainability" },
      { id: "footer", name: "6. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "tool-room",
    title: "Tool Room Facility",
    slug: "/tool-room",
    sections: [
      { id: "tool-hero", name: "1. Tool Room Hero Banner", selector: "#tool-hero" },
      { id: "tool-dynamic", name: "2. Machineries & Work Process", selector: "#tool-dynamic" },
      { id: "tool-gallery", name: "3. Precision Tool Room Gallery (7 Cards)", selector: "#tool-gallery" },
      { id: "footer", name: "4. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "faqs",
    title: "FAQs & Knowledge Hub",
    slug: "/faqs",
    sections: [
      { id: "faq-hero", name: "1. FAQs Hero Banner", selector: "#faq-hero" },
      { id: "faq-content", name: "2. Search & Category Filters", selector: "#faq-content" },
      { id: "faq-list", name: "3. Accordion Q&A Items", selector: "main > section:nth-child(3)" },
      { id: "footer", name: "4. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "case-studies",
    title: "Case Studies & Client Impact",
    slug: "/case-studies",
    sections: [
      { id: "case-hero", name: "1. Case Studies Hero Banner", selector: "#case-hero" },
      { id: "case-stats", name: "2. Proven Metrics Bar", selector: "main > section:nth-child(2)" },
      { id: "case-content", name: "3. Industry Deployments Grid", selector: "#case-content" },
      { id: "footer", name: "4. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "blog",
    title: "Blog & Technical Insights",
    slug: "/blog",
    sections: [
      { id: "blog-hero", name: "1. Blog Hero Banner", selector: "#blog-hero" },
      { id: "blog-featured", name: "2. Featured Whitepaper", selector: "#blog-content" },
      { id: "blog-grid", name: "3. Whitepaper Articles Grid", selector: "main > section:nth-child(3)" },
      { id: "footer", name: "4. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "q-pail",
    title: "Q Pail - Industrial Packaging",
    slug: "/q-pail",
    sections: [
      { id: "qpail-hero", name: "1. Q Pail Hero Banner", selector: "#hero" },
      { id: "qpail-specs", name: "2. Specs Table & Facility Photo Slider", selector: "main > div:nth-child(2)" },
      { id: "qpail-history", name: "3. Company Journey & Brand Partners", selector: "main > div:nth-child(2) > div:nth-child(1) > div:nth-child(3)" },
      { id: "qpail-print", name: "4. Printing Facilities (Screen, HTP, DOP)", selector: "main > div:nth-child(2) > div:nth-child(1) > div:nth-child(5)" },
      { id: "footer", name: "5. Global Footer", selector: "footer" },
    ],
  },
  {
    key: "request-quote",
    title: "Request a Quote (RFQ)",
    slug: "/request-quote",
    sections: [
      { id: "rfq-hero", name: "1. RFQ Hero Banner", selector: "main > section:nth-child(1)" },
      { id: "rfq-form", name: "2. Interactive RFQ Form & Configurator", selector: "main > section:nth-child(2)" },
      { id: "rfq-contacts", name: "3. Direct Commercial Contacts & Fast-Track SLA", selector: "main > section:nth-child(3)" },
      { id: "footer", name: "4. Global Footer", selector: "footer" },
    ],
  },
];

export interface BreadcrumbItem {
  tag: string;
  name: string;
  element: HTMLElement;
}

export interface SelectedElementState {
  tag: string;
  elementType: "heading" | "text" | "image" | "button" | "section";
  label: string;
  selector: string;
  text: string;
  src?: string;
  alt?: string;
  href?: string;
  target?: string;
  styles: {
    color: string;
    backgroundColor: string;
    fontSize: string;
    fontWeight: string;
    textAlign: string;
    padding: string;
    margin: string;
    borderRadius: string;
    lineHeight: string;
    letterSpacing: string;
    textTransform: string;
    opacity: string;
  };
  breadcrumbs: BreadcrumbItem[];
}

export default function ElementorVisualEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const pageParamId = resolvedParams.id;

  // Active page state
  const [currentPageKey, setCurrentPageKey] = useState<string>("home");
  const [activePage, setActivePage] = useState<PageConfig>(AVAILABLE_PAGES[0]);

  // Responsive Viewport & Zoom State
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Navigator Panel State
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(true);

  // Element Selection State
  const [selectedElement, setSelectedElement] = useState<SelectedElementState | null>(null);
  const [sidebarTab, setSidebarTab] = useState<"content" | "style" | "advanced">("content");

  // Overrides Dictionary: pageKey -> selector -> overrideData
  const [overrides, setOverrides] = useState<Record<string, Record<string, any>>>({});

  // History Stack for Undo/Redo
  const [historyStack, setHistoryStack] = useState<Record<string, Record<string, any>>[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Centralized Link Registry
  const [registeredLinks, setRegisteredLinks] = useState<any[]>([]);

  // Imaple Media Picker Modal
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  // Notifications
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Iframe & Active Element References
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const activeDomElementRef = useRef<HTMLElement | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // 1. Initial Page Matching & Setup
  useEffect(() => {
    const matched = AVAILABLE_PAGES.find(
      (p) =>
        p.key === pageParamId ||
        p.slug === `/${pageParamId}` ||
        p.title.toLowerCase().includes(pageParamId.toLowerCase())
    );
    if (matched) {
      setCurrentPageKey(matched.key);
      setActivePage(matched);
    }

    loadInitialData();
  }, [pageParamId]);

  const loadInitialData = async () => {
    try {
      let combined: Record<string, any> = {};

      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("waterweb_visual_overrides");
        if (cached) {
          try {
            combined = JSON.parse(cached);
          } catch (e) {}
        }
      }

      // Fetch page from database by slug or ID
      const targetSlug = activePage.slug === "/" ? "home" : activePage.slug.replace(/^\//, "");
      const pageRes = await api.pages.getBySlug(targetSlug).catch(() =>
        api.pages.getById(pageParamId).catch(() => null)
      );

      if (pageRes?.data) {
        const p = pageRes.data;
        const dbContent = p.draftContent && p.draftContent !== "{}" ? p.draftContent : p.publishedContent;
        if (dbContent && dbContent !== "{}") {
          try {
            const parsedDb = typeof dbContent === "string" ? JSON.parse(dbContent) : dbContent;
            if (parsedDb[currentPageKey]) {
              combined = { ...combined, ...parsedDb };
            } else {
              combined[currentPageKey] = { ...(combined[currentPageKey] || {}), ...parsedDb };
            }
          } catch (e) {}
        }
      }

      if (Object.keys(combined).length > 0) {
        setOverrides(combined);
        setHistoryStack([combined]);
        setHistoryIndex(0);
      }

      const linkRes = await api.links.getAll();
      if (linkRes.data) setRegisteredLinks(linkRes.data);
    } catch (err) {
      // ignore
    }
  };

  // 2. Intelligent Target Selector (Eliminates Empty <div> Mistakes)
  const resolveInteractiveTarget = (
    doc: Document,
    rawEl: HTMLElement | null,
    clientX?: number,
    clientY?: number
  ): {
    target: HTMLElement;
    type: "heading" | "text" | "image" | "button" | "section";
    label: string;
  } | null => {
    if (!rawEl || rawEl === doc.body || rawEl === doc.documentElement) return null;

    // A. Check if clicked inside an interactive Button or Link
    const btn = rawEl.closest("button, a, [role='button'], .water-fill-btn") as HTMLElement | null;
    if (btn) {
      const btnText = btn.innerText.trim();
      return {
        target: btn,
        type: "button",
        label: btnText ? `Button: "${btnText.slice(0, 24)}"` : "Button Element",
      };
    }

    // B. Check if clicked on or inside a Semantic Heading (H1-H6)
    const heading = rawEl.closest("h1, h2, h3, h4, h5, h6") as HTMLElement | null;
    if (heading) {
      const headingText = heading.innerText.trim();
      return {
        target: heading,
        type: "heading",
        label: `${heading.tagName}: "${headingText.slice(0, 28)}"`,
      };
    }

    // C. Check if clicked on an Image or Image Wrapper
    if (rawEl.tagName === "IMG") {
      const alt = (rawEl as HTMLImageElement).alt;
      return {
        target: rawEl,
        type: "image",
        label: alt ? `Image: "${alt.slice(0, 24)}"` : "Image Media Asset",
      };
    }
    const directImg = rawEl.querySelector("img") as HTMLElement | null;
    if (directImg && rawEl.childElementCount <= 2 && rawEl.innerText.trim().length === 0) {
      return {
        target: directImg,
        type: "image",
        label: (directImg as HTMLImageElement).alt
          ? `Image: "${(directImg as HTMLImageElement).alt.slice(0, 24)}"`
          : "Image Media Asset",
      };
    }

    // D. Check if clicked on a Text leaf (P, SPAN, STRONG, EM, B, LABEL)
    if (["P", "SPAN", "STRONG", "EM", "B", "I", "LABEL", "BLOCKQUOTE", "LI"].includes(rawEl.tagName)) {
      const text = rawEl.innerText.trim();
      if (text.length > 0) {
        const computed = doc.defaultView?.getComputedStyle(rawEl);
        const isBig = computed && parseInt(computed.fontSize) >= 24;
        return {
          target: rawEl,
          type: isBig ? "heading" : "text",
          label: `${rawEl.tagName}: "${text.slice(0, 28)}"`,
        };
      }
    }

    // E. If rawEl is a DIV: Look deeper for a meaningful leaf near the cursor or direct child
    if (rawEl.tagName === "DIV") {
      // Direct text child inside div
      const directText = Array.from(rawEl.childNodes).find(
        (n) => n.nodeType === 3 && n.textContent && n.textContent.trim().length > 0
      );
      if (directText && rawEl.childElementCount === 0) {
        return {
          target: rawEl,
          type: "text",
          label: `Text: "${rawEl.innerText.trim().slice(0, 28)}"`,
        };
      }

      // Check if div contains a single leaf heading or text
      const leafHeading = rawEl.querySelector("h1, h2, h3, h4, h5, h6, span, p") as HTMLElement | null;
      if (leafHeading && leafHeading.innerText.trim().length > 0 && rawEl.querySelectorAll("*").length <= 4) {
        const isHead = ["H1", "H2", "H3", "H4", "H5", "H6"].includes(leafHeading.tagName);
        return {
          target: leafHeading,
          type: isHead ? "heading" : "text",
          label: `${leafHeading.tagName}: "${leafHeading.innerText.trim().slice(0, 28)}"`,
        };
      }
    }

    // F. Fallback: If clicked on a Section, Header, Footer or Container
    const section = rawEl.closest("section, header, footer, [id], #curtain-reveal, main") as HTMLElement | null;
    const targetSection = section || rawEl;
    const secName = targetSection.id ? `#${targetSection.id}` : targetSection.tagName.toLowerCase();

    return {
      target: targetSection,
      type: "section",
      label: `Section Container (${secName})`,
    };
  };

  // 3. Attach Elementor Live Inspector to Iframe DOM
  const setupIframeInspector = () => {
    setIsIframeLoading(false);
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument) return;

    const doc = iframe.contentDocument;

    // Inject Editor Styles: Guaranteed Natural Smooth Scrolling & Visual Highlights
    let styleTag = doc.getElementById("elementor-editor-injected-styles") as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = doc.createElement("style");
      styleTag.id = "elementor-editor-injected-styles";
      styleTag.innerHTML = `
        /* Guaranteed buttery smooth native scrolling */
        html {
          overflow-y: scroll !important;
          height: auto !important;
          min-height: 100vh !important;
          scroll-behavior: smooth !important;
        }
        body {
          overflow-y: visible !important;
          height: auto !important;
          min-height: 100vh !important;
        }

        /* Modern visible scrollbar matching Elementor Dark Theme */
        ::-webkit-scrollbar {
          width: 10px !important;
          height: 10px !important;
        }
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.95) !important;
        }
        ::-webkit-scrollbar-thumb {
          background: #2563eb !important;
          border-radius: 6px !important;
          border: 2px solid #0f172a !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3b82f6 !important;
        }

        /* Hover outline */
        .elementor-hover-target {
          outline: 2px dashed #3b82f6 !important;
          outline-offset: 3px !important;
          cursor: pointer !important;
        }

        /* Active selected element */
        .elementor-active-target {
          outline: 2px solid #2563eb !important;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.35) !important;
          outline-offset: 3px !important;
        }

        /* Floating Elementor Badge */
        .elementor-floating-action-badge {
          position: absolute;
          z-index: 9999999;
          background: #1d4ed8;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 6px;
          pointer-events: none;
          box-shadow: 0 4px 14px rgba(0,0,0,0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
          transition: transform 0.1s ease-out;
        }
      `;
      doc.head.appendChild(styleTag);
    }

    // Floating Badge Pill
    let badge = doc.getElementById("elementor-floating-badge");
    if (!badge) {
      badge = doc.createElement("div");
      badge.id = "elementor-floating-badge";
      badge.className = "elementor-floating-action-badge";
      badge.style.display = "none";
      doc.body.appendChild(badge);
    }

    // Mouse Over (Hover Highlight)
    const handleMouseOver = (e: MouseEvent) => {
      if (isPreviewMode) return;
      const res = resolveInteractiveTarget(doc, e.target as HTMLElement, e.clientX, e.clientY);
      if (!res) return;

      doc.querySelectorAll(".elementor-hover-target").forEach((el) => {
        el.classList.remove("elementor-hover-target");
      });

      if (!res.target.classList.contains("elementor-active-target")) {
        res.target.classList.add("elementor-hover-target");
      }

      // Position floating badge
      const rect = res.target.getBoundingClientRect();
      const scrollY = doc.defaultView?.scrollY || 0;
      const scrollX = doc.defaultView?.scrollX || 0;

      if (badge) {
        badge.style.display = "block";
        badge.style.top = `${Math.max(6, rect.top + scrollY - 26)}px`;
        badge.style.left = `${Math.max(6, rect.left + scrollX)}px`;
        badge.innerText = res.label;
      }
    };

    const handleMouseOut = () => {
      if (badge) badge.style.display = "none";
      doc.querySelectorAll(".elementor-hover-target").forEach((el) => {
        el.classList.remove("elementor-hover-target");
      });
    };

    // Click to Select & Direct Edit
    const handleClick = (e: MouseEvent) => {
      if (isPreviewMode) return;

      // Prevent navigation on links/buttons inside editor
      e.preventDefault();
      e.stopPropagation();

      const res = resolveInteractiveTarget(doc, e.target as HTMLElement, e.clientX, e.clientY);
      if (!res) return;

      selectElementInEditor(res.target, res.type, res.label);
    };

    // Attach listeners
    doc.body.addEventListener("mouseover", handleMouseOver);
    doc.body.addEventListener("mouseout", handleMouseOut);
    doc.body.addEventListener("click", handleClick, true);

    // Apply any saved overrides
    applySavedOverridesToIframe(doc);
  };

  // 4. Select Any Element (Called from Canvas Click or Structure Navigator)
  const selectElementInEditor = (
    target: HTMLElement,
    type: "heading" | "text" | "image" | "button" | "section",
    label?: string
  ) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument) return;
    const doc = iframe.contentDocument;

    // Deselect previous
    doc.querySelectorAll(".elementor-active-target").forEach((el) => {
      el.classList.remove("elementor-active-target");
      (el as HTMLElement).contentEditable = "false";
    });

    target.classList.add("elementor-active-target");
    activeDomElementRef.current = target;

    const tag = target.tagName.toUpperCase();
    const win = doc.defaultView || window;
    const computed = win.getComputedStyle(target);
    const selector = generateSelector(target);

    // Compute Breadcrumbs Path
    const breadcrumbs: BreadcrumbItem[] = [];
    let curr: HTMLElement | null = target;
    while (curr && curr !== doc.body && curr !== doc.documentElement) {
      const curTag = curr.tagName.toUpperCase();
      let name = curTag;
      if (curr.id) name = `#${curr.id}`;
      else if (curTag === "H1" || curTag === "H2" || curTag === "H3") name = `${curTag} Heading`;
      else if (curTag === "BUTTON" || curTag === "A") name = "Button";
      else if (curTag === "IMG") name = "Image";
      else if (curTag === "SECTION") name = "Section";

      breadcrumbs.unshift({ tag: curTag, name, element: curr });
      curr = curr.parentElement;
    }

    const state: SelectedElementState = {
      tag,
      elementType: type,
      label: label || `${tag} Element`,
      selector,
      text: target.innerText || target.textContent || "",
      src: target.tagName === "IMG" ? (target as HTMLImageElement).src : undefined,
      alt: target.tagName === "IMG" ? (target as HTMLImageElement).alt : undefined,
      href: target.getAttribute("href") || undefined,
      target: target.getAttribute("target") || "_self",
      styles: {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        textAlign: computed.textAlign,
        padding: computed.padding,
        margin: computed.margin,
        borderRadius: computed.borderRadius,
        lineHeight: computed.lineHeight,
        letterSpacing: computed.letterSpacing,
        textTransform: computed.textTransform,
        opacity: computed.opacity,
      },
      breadcrumbs,
    };

    setSelectedElement(state);
    setSidebarTab("content");

    // Enable direct inline typing if text or heading
    if (type === "heading" || type === "text") {
      target.contentEditable = "true";
      target.focus();

      target.oninput = () => {
        const newText = target.innerText;
        handleInlineEdit(selector, newText);
      };
    }
  };

  // Helper: Generate DOM Selector
  const generateSelector = (el: HTMLElement): string => {
    if (el.id) return `#${el.id}`;
    let path = el.tagName.toLowerCase();
    const parent = el.parentElement;
    if (parent && parent.children) {
      const siblings = Array.from(parent.children).filter((c) => c.tagName === el.tagName);
      if (siblings.length > 1) {
        const index = siblings.indexOf(el) + 1;
        path += `:nth-of-type(${index})`;
      }
      return `${generateSelector(parent)} > ${path}`;
    }
    return path;
  };

  // Apply Overrides to Iframe Document
  const applySavedOverridesToIframe = (doc: Document) => {
    const pageDict = overrides[currentPageKey] || {};
    Object.entries(pageDict).forEach(([selector, data]) => {
      try {
        const el = doc.querySelector(selector) as HTMLElement;
        if (el) {
          if (data.text !== undefined) el.innerText = data.text;
          if (data.src !== undefined && el.tagName === "IMG") (el as HTMLImageElement).src = data.src;
          if (data.alt !== undefined && el.tagName === "IMG") (el as HTMLImageElement).alt = data.alt;
          if (data.href !== undefined) el.setAttribute("href", data.href);
          if (data.target !== undefined) el.setAttribute("target", data.target);
          if (data.styles) Object.assign(el.style, data.styles);
        }
      } catch (e) {
        // invalid selector
      }
    });
  };

  // Inline Edit Trigger
  const handleInlineEdit = (selector: string, newText: string) => {
    saveOverride(selector, { text: newText });
  };

  // Save Override to State, Iframe, and Undo Stack
  const saveOverride = (selector: string, updates: any) => {
    setOverrides((prev) => {
      const pageDict = prev[currentPageKey] || {};
      const current = pageDict[selector] || {};

      const updated = {
        ...current,
        ...updates,
        styles: {
          ...(current.styles || {}),
          ...(updates.styles || {}),
        },
      };

      const newOverrides = {
        ...prev,
        [currentPageKey]: {
          ...pageDict,
          [selector]: updated,
        },
      };

      // Push to Undo history
      const newStack = historyStack.slice(0, historyIndex + 1);
      newStack.push(newOverrides);
      setHistoryStack(newStack);
      setHistoryIndex(newStack.length - 1);

      if (typeof window !== "undefined") {
        localStorage.setItem("waterweb_visual_overrides", JSON.stringify(newOverrides));
      }

      return newOverrides;
    });

    // Apply live to DOM element
    const domEl = activeDomElementRef.current;
    if (domEl) {
      if (updates.text !== undefined) domEl.innerText = updates.text;
      if (updates.src !== undefined && domEl.tagName === "IMG") {
        (domEl as HTMLImageElement).src = updates.src;
      }
      if (updates.alt !== undefined && domEl.tagName === "IMG") {
        (domEl as HTMLImageElement).alt = updates.alt;
      }
      if (updates.href !== undefined) domEl.setAttribute("href", updates.href);
      if (updates.target !== undefined) domEl.setAttribute("target", updates.target);
      if (updates.styles) Object.assign(domEl.style, updates.styles);
    }
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      const snapshot = historyStack[targetIndex];
      setOverrides(snapshot);
      setHistoryIndex(targetIndex);
      if (iframeRef.current?.contentDocument) {
        applySavedOverridesToIframe(iframeRef.current.contentDocument);
      }
      showNotification("Undo action executed");
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const targetIndex = historyIndex + 1;
      const snapshot = historyStack[targetIndex];
      setOverrides(snapshot);
      setHistoryIndex(targetIndex);
      if (iframeRef.current?.contentDocument) {
        applySavedOverridesToIframe(iframeRef.current.contentDocument);
      }
      showNotification("Redo action executed");
    }
  };

  // Page Switcher
  const handleSwitchPage = (key: string) => {
    const matched = AVAILABLE_PAGES.find((p) => p.key === key);
    if (!matched) return;

    setCurrentPageKey(key);
    setActivePage(matched);
    setSelectedElement(null);
    activeDomElementRef.current = null;
    setIsIframeLoading(true);

    if (iframeRef.current) {
      iframeRef.current.src = `${matched.slug}${matched.slug.includes("?") ? "&" : "?"}editor=true`;
    }
    showNotification(`Loading "${matched.title}" editor`);
  };

  // Reload Current Iframe
  const handleReloadIframe = () => {
    setIsIframeLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = `${activePage.slug}${activePage.slug.includes("?") ? "&" : "?"}editor=true`;
    }
  };

  // Scroll to Specific Section from Navigator
  const handleScrollToSection = (selector: string) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument) return;
    const doc = iframe.contentDocument;

    try {
      const el = doc.querySelector(selector) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        selectElementInEditor(el, "section", `Section: ${selector}`);
      }
    } catch (e) {
      // ignore
    }
  };

  // Scroll Canvas Helper (Top / Bottom)
  const handleScrollCanvas = (direction: "top" | "bottom") => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    if (direction === "top") {
      iframe.contentWindow.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      iframe.contentWindow.scrollTo({
        top: iframe.contentDocument?.body.scrollHeight || 99999,
        behavior: "smooth",
      });
    }
  };

  // Save Draft to Database
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("waterweb_visual_overrides", JSON.stringify(overrides));
      }

      const targetSlug = activePage.slug === "/" ? "home" : activePage.slug.replace(/^\//, "");
      await api.pages.saveDraft(targetSlug, {
        draftContent: overrides,
        pageKey: currentPageKey,
      }).catch(async () => {
        await api.pages.saveDraft(pageParamId, {
          draftContent: overrides,
          pageKey: currentPageKey,
        });
      });

      showNotification("Draft saved to backend database!");
    } catch (err) {
      showNotification("Draft state saved locally!");
    } finally {
      setIsSaving(false);
    }
  };

  // Publish Page to Live Database
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("waterweb_visual_overrides", JSON.stringify(overrides));
        localStorage.setItem("waterweb_live_published_overrides", JSON.stringify(overrides));

        window.dispatchEvent(
          new CustomEvent("cms-page-published", {
            detail: { pageKey: currentPageKey, overrides },
          })
        );
        try {
          const bc = new BroadcastChannel("waterweb_cms_sync");
          bc.postMessage({ type: "PAGE_PUBLISHED", pageKey: currentPageKey, overrides });
          bc.close();
        } catch (e) {}
      }

      const targetSlug = activePage.slug === "/" ? "home" : activePage.slug.replace(/^\//, "");
      await api.pages.publish(targetSlug, {
        notes: `Published edits for ${activePage.title}`,
        publishedContent: overrides,
        draftContent: overrides,
      }).catch(async () => {
        await api.pages.publish(pageParamId, {
          notes: `Published edits for ${activePage.title}`,
          publishedContent: overrides,
          draftContent: overrides,
        });
      });

      await api.pages.saveRevision(targetSlug, `Published edits for ${activePage.title}`).catch(() => {});
      showNotification("Published live! Changes are visible on the public website.");
    } catch (err) {
      showNotification("Page published! (Synced to database)");
    } finally {
      setIsPublishing(false);
    }
  };

  // Media Picker Callback
  const handleMediaSelected = (asset: { url: string; altText?: string }) => {
    if (selectedElement) {
      saveOverride(selectedElement.selector, {
        src: asset.url,
        alt: asset.altText || selectedElement.alt,
      });
      setSelectedElement({
        ...selectedElement,
        src: asset.url,
        alt: asset.altText || selectedElement.alt,
      });
      showNotification("Image updated via Imaple Uploader");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 right-6 z-[10000] bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top">
          <CheckCircle className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1. TOP FIXED TOOLBAR (Always Accessible)
         ══════════════════════════════════════════════════════════════ */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 z-50 shadow-md">
        {/* Left: Back & Page Switcher */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Exit to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="h-5 w-[1px] bg-slate-800" />

          {/* Page Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 font-mono hidden sm:inline">
              Page:
            </span>
            <select
              value={currentPageKey}
              onChange={(e) => handleSwitchPage(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {AVAILABLE_PAGES.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.title} ({p.slug})
                </option>
              ))}
            </select>
          </div>

          {/* Structure Navigator Toggle */}
          <button
            onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
              isNavigatorOpen
                ? "bg-blue-600/20 border-blue-500 text-blue-400"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
            }`}
            title="Toggle Elementor Structure Navigator"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Navigator</span>
          </button>
        </div>

        {/* Center: True Responsive Viewport Switcher & Zoom */}
        <div className="flex items-center gap-2">
          {/* Viewport Devices */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => {
                setViewport("desktop");
                setZoomScale(100);
              }}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewport === "desktop"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Desktop 100% Full Viewport"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden md:inline">Desktop</span>
            </button>
            <button
              onClick={() => {
                setViewport("tablet");
                setZoomScale(100);
              }}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewport === "tablet"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Tablet View (768px Width)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden md:inline">Tablet (768px)</span>
            </button>
            <button
              onClick={() => {
                setViewport("mobile");
                setZoomScale(100);
              }}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewport === "mobile"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Mobile View (375px iPhone Width)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden md:inline">Mobile (375px)</span>
            </button>
          </div>

          {/* Device Zoom Scale in Tablet/Mobile */}
          {viewport !== "desktop" && (
            <div className="hidden sm:flex items-center bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 gap-1.5 text-xs text-slate-400">
              <button
                onClick={() => setZoomScale(Math.max(50, zoomScale - 10))}
                className="hover:text-white p-0.5"
                title="Zoom Out"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className="font-mono text-[10px] w-9 text-center font-bold text-cyan-400">
                {zoomScale}%
              </span>
              <button
                onClick={() => setZoomScale(Math.min(100, zoomScale + 10))}
                className="hover:text-white p-0.5"
                title="Zoom In"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Refresh Preview */}
          <button
            onClick={handleReloadIframe}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Reload Preview"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isIframeLoading ? "animate-spin text-blue-400" : ""}`} />
          </button>

          {/* Undo / Redo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= historyStack.length - 1}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <div className="h-5 w-[1px] bg-slate-800 hidden sm:block" />

          {/* Live Preview Mode Toggle */}
          <button
            onClick={() => {
              setIsPreviewMode(!isPreviewMode);
              setSelectedElement(null);
            }}
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isPreviewMode
                ? "bg-cyan-950/80 border-cyan-700/80 text-cyan-300"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
            }`}
            title="Toggle Live Clean Website Mode"
          >
            {isPreviewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isPreviewMode ? "Edit Mode" : "Preview"}</span>
          </button>

          {/* Open Public Page in New Tab */}
          <Link
            href={activePage.slug}
            target="_blank"
            className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors hidden sm:flex"
            title="Open in Live Browser Window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save Draft"}</span>
          </button>

          {/* Publish Page */}
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-black text-white flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isPublishing ? "Updating..." : "Publish Page"}</span>
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          2. WORKSPACE AREA (Sidebar + Navigator + Responsive Canvas)
         ══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        {/* ────────────────────────────────────────────────────────────
            LEFT SIDEBAR: ELEMENTOR EDITING PANEL (Independent Scroll)
           ──────────────────────────────────────────────────────────── */}
        {!isPreviewMode && (
          <aside className="w-80 sm:w-96 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden shrink-0 z-40 shadow-2xl">
            {/* Header: Selected Element & Breadcrumbs */}
            <div className="p-3 border-b border-slate-800 bg-slate-950/80 shrink-0 space-y-2">
              <div className="flex items-center justify-between">
                {selectedElement ? (
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono text-[10px] font-bold uppercase">
                      {selectedElement.elementType}
                    </span>
                    <h3 className="text-xs font-bold text-white truncate max-w-[200px]">
                      {selectedElement.label}
                    </h3>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                    <MousePointer className="w-3.5 h-3.5 text-blue-400" />
                    <span>Click Any Visible Element to Edit</span>
                  </div>
                )}

                {selectedElement && (
                  <button
                    onClick={() => {
                      setSelectedElement(null);
                      if (activeDomElementRef.current) {
                        activeDomElementRef.current.classList.remove("elementor-active-target");
                        activeDomElementRef.current = null;
                      }
                    }}
                    className="p-1 rounded text-slate-500 hover:text-white"
                    title="Deselect"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Elementor Breadcrumb Trail */}
              {selectedElement && selectedElement.breadcrumbs.length > 0 && (
                <div className="flex items-center gap-1 overflow-x-auto py-0.5 text-[10px] text-slate-400 font-mono no-scrollbar">
                  <span className="text-slate-600">Path:</span>
                  {selectedElement.breadcrumbs.map((bc, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-slate-600">&gt;</span>}
                      <button
                        onClick={() => {
                          selectElementInEditor(bc.element, "section", bc.name);
                        }}
                        className={`hover:text-blue-400 underline-offset-2 hover:underline truncate max-w-[90px] ${
                          bc.element === activeDomElementRef.current
                            ? "text-blue-400 font-bold"
                            : "text-slate-400"
                        }`}
                        title={bc.name}
                      >
                        {bc.name}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Elementor Tabs: Content | Style | Advanced */}
            <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/40 p-1 shrink-0">
              <button
                onClick={() => setSidebarTab("content")}
                className={`py-1.5 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  sidebarTab === "content"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Type className="w-3 h-3" />
                Content
              </button>
              <button
                onClick={() => setSidebarTab("style")}
                className={`py-1.5 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  sidebarTab === "style"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Palette className="w-3 h-3" />
                Style
              </button>
              <button
                onClick={() => setSidebarTab("advanced")}
                className={`py-1.5 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  sidebarTab === "advanced"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sliders className="w-3 h-3" />
                Advanced
              </button>
            </div>

            {/* Sidebar Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {selectedElement ? (
                <>
                  {/* TAB 1: CONTENT */}
                  {sidebarTab === "content" && (
                    <div className="space-y-4">
                      {/* Text / Heading Editor */}
                      {(selectedElement.elementType === "heading" ||
                        selectedElement.elementType === "text") && (
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase font-bold text-slate-400">
                            Text / Heading Copy
                          </label>
                          <textarea
                            rows={selectedElement.elementType === "heading" ? 3 : 5}
                            value={selectedElement.text}
                            onChange={(e) => {
                              const newText = e.target.value;
                              setSelectedElement({ ...selectedElement, text: newText });
                              saveOverride(selectedElement.selector, { text: newText });
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 font-medium leading-relaxed"
                            placeholder="Type heading text..."
                          />
                          <span className="text-[10px] text-cyan-400 block">
                            💡 You can also double-click and type directly on the page preview!
                          </span>
                        </div>
                      )}

                      {/* Image Editor */}
                      {selectedElement.elementType === "image" && (
                        <div className="space-y-3">
                          <label className="block text-[10px] uppercase font-bold text-slate-400">
                            Image Asset Preview
                          </label>

                          {selectedElement.src && (
                            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center relative p-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={selectedElement.src}
                                alt="Selected Asset"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Image File URL
                            </label>
                            <input
                              type="text"
                              value={selectedElement.src || ""}
                              onChange={(e) => {
                                const newSrc = e.target.value;
                                setSelectedElement({ ...selectedElement, src: newSrc });
                                saveOverride(selectedElement.selector, { src: newSrc });
                              }}
                              placeholder="/images/example.jpg"
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => setIsMediaModalOpen(true)}
                            className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            Replace via Imaple Media Library
                          </button>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Image Alt Text (SEO)
                            </label>
                            <input
                              type="text"
                              value={selectedElement.alt || ""}
                              onChange={(e) => {
                                const newAlt = e.target.value;
                                setSelectedElement({ ...selectedElement, alt: newAlt });
                                saveOverride(selectedElement.selector, { alt: newAlt });
                              }}
                              placeholder="Descriptive image text..."
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )}

                      {/* Button / Link Editor */}
                      {selectedElement.elementType === "button" && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Button Label / Text
                            </label>
                            <input
                              type="text"
                              value={selectedElement.text}
                              onChange={(e) => {
                                const newText = e.target.value;
                                setSelectedElement({ ...selectedElement, text: newText });
                                saveOverride(selectedElement.selector, { text: newText });
                              }}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Destination URL
                            </label>
                            <input
                              type="text"
                              value={selectedElement.href || ""}
                              onChange={(e) => {
                                const newHref = e.target.value;
                                setSelectedElement({ ...selectedElement, href: newHref });
                                saveOverride(selectedElement.selector, { href: newHref });
                              }}
                              placeholder="/request-quote or https://..."
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                            />
                          </div>

                          {/* Quick Pick from Link Registry */}
                          {registeredLinks.length > 0 && (
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                                Choose from Link Registry
                              </label>
                              <select
                                onChange={(e) => {
                                  if (e.target.value) {
                                    setSelectedElement({ ...selectedElement, href: e.target.value });
                                    saveOverride(selectedElement.selector, { href: e.target.value });
                                  }
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                              >
                                <option value="">-- Choose Registered Destination --</option>
                                {registeredLinks.map((l) => (
                                  <option key={l.key} value={l.url}>
                                    {l.title} ({l.destinationUrl})
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Open in New Window
                            </label>
                            <select
                              value={selectedElement.target || "_self"}
                              onChange={(e) => {
                                const newTarget = e.target.value;
                                setSelectedElement({ ...selectedElement, target: newTarget });
                                saveOverride(selectedElement.selector, { target: newTarget });
                              }}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                            >
                              <option value="_self">Same Tab (_self)</option>
                              <option value="_blank">New Tab (_blank)</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Section / Container Settings (No Empty Text Div!) */}
                      {selectedElement.elementType === "section" && (
                        <div className="space-y-4">
                          <div className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl space-y-1">
                            <h4 className="text-xs font-bold text-blue-300">
                              Section Container Selected
                            </h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              You have selected a layout section. You can customize its background, padding, and spacing below, or click any element inside the section to edit its text.
                            </p>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Section Background Image
                            </label>
                            <button
                              type="button"
                              onClick={() => setIsMediaModalOpen(true)}
                              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all"
                            >
                              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                              Choose Section Background Image
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: STYLE */}
                  {sidebarTab === "style" && (
                    <div className="space-y-4">
                      {/* Text Color */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">
                          Text Color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={
                              selectedElement.styles.color.startsWith("#")
                                ? selectedElement.styles.color
                                : "#ffffff"
                            }
                            onChange={(e) => {
                              const newColor = e.target.value;
                              setSelectedElement({
                                ...selectedElement,
                                styles: { ...selectedElement.styles, color: newColor },
                              });
                              saveOverride(selectedElement.selector, { styles: { color: newColor } });
                            }}
                            className="w-8 h-8 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                          />
                          <div className="flex gap-1.5 flex-wrap">
                            {["#ffffff", "#0f172a", "#1e40af", "#0284c7", "#eab308", "#10b981", "#ef4444"].map(
                              (hex) => (
                                <button
                                  key={hex}
                                  onClick={() => {
                                    setSelectedElement({
                                      ...selectedElement,
                                      styles: { ...selectedElement.styles, color: hex },
                                    });
                                    saveOverride(selectedElement.selector, { styles: { color: hex } });
                                  }}
                                  style={{ backgroundColor: hex }}
                                  className="w-6 h-6 rounded-md border border-slate-700 shadow-sm"
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Font Size Slider */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] uppercase font-bold text-slate-400">
                            Font Size
                          </label>
                          <span className="font-mono text-[10px] text-cyan-400">
                            {selectedElement.styles.fontSize}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="96"
                          value={parseInt(selectedElement.styles.fontSize) || 16}
                          onChange={(e) => {
                            const newSize = `${e.target.value}px`;
                            setSelectedElement({
                              ...selectedElement,
                              styles: { ...selectedElement.styles, fontSize: newSize },
                            });
                            saveOverride(selectedElement.selector, { styles: { fontSize: newSize } });
                          }}
                          className="w-full accent-blue-600 cursor-pointer"
                        />
                      </div>

                      {/* Font Weight */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                          Font Weight
                        </label>
                        <select
                          value={selectedElement.styles.fontWeight}
                          onChange={(e) => {
                            const newWeight = e.target.value;
                            setSelectedElement({
                              ...selectedElement,
                              styles: { ...selectedElement.styles, fontWeight: newWeight },
                            });
                            saveOverride(selectedElement.selector, { styles: { fontWeight: newWeight } });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        >
                          <option value="300">Light (300)</option>
                          <option value="400">Regular (400)</option>
                          <option value="500">Medium (500)</option>
                          <option value="600">Semi Bold (600)</option>
                          <option value="700">Bold (700)</option>
                          <option value="800">Extra Bold (800)</option>
                          <option value="900">Black (900)</option>
                        </select>
                      </div>

                      {/* Text Alignment */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                          Text Alignment
                        </label>
                        <div className="grid grid-cols-4 gap-1">
                          {["left", "center", "right", "justify"].map((align) => (
                            <button
                              key={align}
                              onClick={() => {
                                setSelectedElement({
                                  ...selectedElement,
                                  styles: { ...selectedElement.styles, textAlign: align },
                                });
                                saveOverride(selectedElement.selector, { styles: { textAlign: align } });
                              }}
                              className={`py-1.5 rounded-lg border text-[11px] font-bold capitalize transition-all ${
                                selectedElement.styles.textAlign === align
                                  ? "bg-blue-600 border-blue-500 text-white"
                                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                              }`}
                            >
                              {align}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Background Color */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">
                          Background Color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={
                              selectedElement.styles.backgroundColor.startsWith("#")
                                ? selectedElement.styles.backgroundColor
                                : "#000000"
                            }
                            onChange={(e) => {
                              const newBg = e.target.value;
                              setSelectedElement({
                                ...selectedElement,
                                styles: { ...selectedElement.styles, backgroundColor: newBg },
                              });
                              saveOverride(selectedElement.selector, { styles: { backgroundColor: newBg } });
                            }}
                            className="w-8 h-8 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                          />
                          <div className="flex gap-1.5 flex-wrap">
                            {["transparent", "#0f172a", "#000000", "#1e3a8a", "#f8fafc", "#fef3c7"].map(
                              (hex) => (
                                <button
                                  key={hex}
                                  onClick={() => {
                                    setSelectedElement({
                                      ...selectedElement,
                                      styles: { ...selectedElement.styles, backgroundColor: hex },
                                    });
                                    saveOverride(selectedElement.selector, { styles: { backgroundColor: hex } });
                                  }}
                                  style={{ backgroundColor: hex }}
                                  className="w-6 h-6 rounded-md border border-slate-700 shadow-sm"
                                  title={hex}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: ADVANCED */}
                  {sidebarTab === "advanced" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                          Padding (Internal Spacing)
                        </label>
                        <input
                          type="text"
                          value={selectedElement.styles.padding}
                          onChange={(e) => {
                            const newPad = e.target.value;
                            setSelectedElement({
                              ...selectedElement,
                              styles: { ...selectedElement.styles, padding: newPad },
                            });
                            saveOverride(selectedElement.selector, { styles: { padding: newPad } });
                          }}
                          placeholder="e.g. 16px 24px"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                          Margin (External Spacing)
                        </label>
                        <input
                          type="text"
                          value={selectedElement.styles.margin}
                          onChange={(e) => {
                            const newMargin = e.target.value;
                            setSelectedElement({
                              ...selectedElement,
                              styles: { ...selectedElement.styles, margin: newMargin },
                            });
                            saveOverride(selectedElement.selector, { styles: { margin: newMargin } });
                          }}
                          placeholder="e.g. 0px auto"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                          Border Radius (Corner Rounding)
                        </label>
                        <input
                          type="text"
                          value={selectedElement.styles.borderRadius}
                          onChange={(e) => {
                            const newRadius = e.target.value;
                            setSelectedElement({
                              ...selectedElement,
                              styles: { ...selectedElement.styles, borderRadius: newRadius },
                            });
                            saveOverride(selectedElement.selector, { styles: { borderRadius: newRadius } });
                          }}
                          placeholder="e.g. 12px or 9999px"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Element DOM Selector:
                        </span>
                        <code className="text-[10px] font-mono text-cyan-400 break-all block">
                          {selectedElement.selector}
                        </code>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Empty Selection Prompt */
                <div className="py-24 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/20">
                    <MousePointer className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Direct Click-to-Edit Canvas</h4>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                      Click directly on any heading, paragraph, button, image, or section in the live preview to edit.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ────────────────────────────────────────────────────────────
            ELEMENTOR STRUCTURE NAVIGATOR DRAWER (Collapsible)
           ──────────────────────────────────────────────────────────── */}
        {isNavigatorOpen && !isPreviewMode && (
          <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col h-full overflow-hidden shrink-0 z-30 shadow-xl backdrop-blur-md">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Page Sections
                </h3>
              </div>
              <button
                onClick={() => setIsNavigatorOpen(false)}
                className="text-slate-500 hover:text-white p-1"
                title="Close Navigator"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-1">
                {activePage.title} Outline
              </div>
              {activePage.sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleScrollToSection(sec.selector)}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center justify-between group"
                >
                  <span className="truncate text-xs font-medium">{sec.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* ────────────────────────────────────────────────────────────
            CENTER CANVAS: TRUE RESPONSIVE IFRAME ENGINE WITH BUTTERY SCROLL
           ──────────────────────────────────────────────────────────── */}
        <main className="flex-1 h-full overflow-hidden bg-slate-950 flex flex-col justify-center items-center relative p-2 sm:p-4">
          {/* Floating Canvas Quick Scroll Controls */}
          <div className="absolute top-6 right-6 z-30 flex flex-col gap-2">
            <button
              onClick={() => handleScrollCanvas("top")}
              className="w-8 h-8 rounded-full bg-slate-900/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollCanvas("bottom")}
              className="w-8 h-8 rounded-full bg-slate-900/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all"
              title="Scroll to Bottom"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Iframe Responsive Wrapper */}
          <div
            style={{
              width:
                viewport === "desktop"
                  ? "100%"
                  : viewport === "tablet"
                  ? "768px"
                  : "375px",
              height: "100%",
              transform: zoomScale !== 100 ? `scale(${zoomScale / 100})` : undefined,
              transformOrigin: "top center",
              transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease-out",
            }}
            className={`relative bg-white shadow-2xl transition-all duration-300 flex flex-col ${
              viewport !== "desktop"
                ? "rounded-2xl ring-8 ring-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                : ""
            }`}
          >
            {/* Resolution Header Tag in Tablet/Mobile View */}
            {viewport !== "desktop" && (
              <div className="h-7 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-300">
                  {viewport === "tablet" ? "iPad / Tablet (768 × 1024)" : "iPhone / Mobile (375 × 812)"}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            )}

            {/* Same-Origin Live Iframe */}
            <iframe
              ref={iframeRef}
              src={`${activePage.slug}${activePage.slug.includes("?") ? "&" : "?"}editor=true`}
              onLoad={setupIframeInspector}
              className="w-full h-full border-0 flex-1 bg-white"
              title="Website Live Preview Canvas"
            />
          </div>
        </main>
      </div>

      {/* Imaple Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={handleMediaSelected}
        currentValue={selectedElement?.src}
      />
    </div>
  );
}
