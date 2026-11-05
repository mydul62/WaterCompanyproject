"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Droplet,
  CheckCircle2,
  Trash2,
  Phone,
  Mail,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Cart / Sample Drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: "sample-1",
      name: "5-Gallon Commercial Water Bottle",
      variant: "BPA-Free Polycarbonate with Cap",
      qty: 1,
      image: "/acuasafe/water-bottle-splash.jpg",
      price: "Sample (Free)",
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openRFQ = () => {
    window.dispatchEvent(new CustomEvent("open-rfq"));
  };

  const navMenuItems = [
    {
      label: "Home",
      href: "/",
      sub: [
        { label: "Bottled Water Delivery (Current)", href: "/" },
        { label: "Commercial Dispenser Systems", href: "/#services" },
        { label: "Purification & Purity Standards", href: "/sustainability" },
        { label: "Packaging & Bottling Plant", href: "/our-business" },
      ],
    },
    {
      label: "Pages",
      href: "/our-business",
      sub: [
        { label: "Our Business & Plant", href: "/our-business" },
        { label: "Q Pail Manufacturing Division", href: "/q-pail" },
        { label: "LEED Platinum Sustainability", href: "/sustainability" },
        { label: "Research & Development (R&D)", href: "/research-and-development" },
        { label: "Tool Room & Precision Machining", href: "/tool-room" },
        { label: "Career & Open Positions", href: "/careers" },
        { label: "Frequently Asked Questions (FAQs)", href: "/faqs" },
      ],
    },
    {
      label: "Services",
      href: "/#services",
      sub: [
        { label: "Residential Bottled Water Delivery", href: "/#services" },
        { label: "Corporate Dispenser Rental & Setup", href: "/#services" },
        { label: "Automated Monthly Water Subscription", href: "/#services" },
        { label: "Custom Label Mineral Water", href: "/products" },
        { label: "Water Quality Testing & Filtration", href: "/sustainability" },
      ],
    },
    {
      label: "Shop",
      href: "/products",
      sub: [
        { label: "All Products & Containers", href: "/products" },
        { label: "5-Gallon Water Jars & Bottles", href: "/products?genre=Plastic" },
        { label: "Plastic Bottles & Containers", href: "/products?genre=Plastic" },
        { label: "Metal Cans & Tin Pails", href: "/products?genre=Metal" },
        { label: "Water Cooler Dispensers", href: "/products" },
      ],
    },
    {
      label: "Elements",
      href: "/sustainability",
      sub: [
        { label: "5-Steps Purity Filtration Process", href: "/#filtration" },
        { label: "Certifications: ISO, FSSC & GMP", href: "/#certifications" },
        { label: "LEED Platinum Eco Credentials", href: "/sustainability" },
        { label: "Request Free Sample Service", href: "/products" },
      ],
    },
    {
      label: "Blog",
      href: "/#media",
      sub: [
        { label: "Benefits of Pure Drinking Water", href: "/#media" },
        { label: "Eco-Friendly Bottle Recycling Guide", href: "/sustainability" },
        { label: "Industry Stories & Press Releases", href: "/#media" },
      ],
    },
    {
      label: "Contact",
      href: "/#contact",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        openRFQ();
      },
    },
  ];

  return (
    <>
      {/* Top Header Bar matching Acuasafe Screenshot c1caf1c3.jpg */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled
            ? "shadow-[0_4px_25px_rgba(0,0,0,0.08)] py-3"
            : "py-4 sm:py-5 border-b border-slate-100"
        }`}
      >
        <div className="max-w-[1638px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo: Acuasafe Droplet Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-[1.02] select-none"
          >
            <div className="relative h-10 sm:h-11 w-44 sm:w-48">
              <Image
                src="/acuasafe/acuasafe-logo.svg"
                alt="Acuasafe - Drinking Water Delivery & Bottled Water"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] font-semibold text-[#1e293b]">
            {navMenuItems.map((item, idx) => {
              const isHome = item.label === "Home";
              const isActive =
                (isHome && pathname === "/") ||
                (item.href === "/products" && pathname?.startsWith("/products")) ||
                (item.href === "/our-business" && pathname === "/our-business");

              return (
                <div
                  key={idx}
                  className="relative group py-2"
                  onMouseEnter={() => item.sub && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    onClick={item.onClick}
                    className={`flex items-center gap-1 transition-colors duration-200 ${
                      isActive
                        ? "text-[#00c2e8] font-bold"
                        : "hover:text-[#00c2e8] text-[#1e293b]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.sub && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180 text-[#00c2e8]" : "text-slate-400"
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.sub && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-2 min-w-[260px] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-100 p-2.5 flex flex-col gap-1">
                        {item.sub.map((subItem, sIdx) => (
                          <Link
                            key={sIdx}
                            href={subItem.href}
                            className="px-4 py-2.5 rounded-xl text-[14px] text-slate-700 hover:text-[#00c2e8] hover:bg-[#e6f9fd] font-medium transition-all flex items-center justify-between group/sub"
                          >
                            <span>{subItem.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-[#00c2e8]" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons & Request A Quote CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-slate-700 hover:text-[#00c2e8] transition-colors p-2 rounded-full hover:bg-slate-100"
              aria-label="Search"
              title="Search Products & Content"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Shopping Cart / Samples Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-slate-700 hover:text-[#00c2e8] transition-colors p-2 rounded-full hover:bg-slate-100"
              aria-label="View Cart and Samples"
              title="Cart / Sample Requests"
            >
              <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#00c2e8] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                {cartItems.reduce((acc, it) => acc + it.qty, 0)}
              </span>
            </button>

            {/* Request A Quote Button (Cyan Pill) */}
            <button
              onClick={openRFQ}
              className="hidden sm:inline-flex items-center justify-center px-6 sm:px-7 py-2.5 rounded-full bg-[#00c2e8] hover:bg-[#00acc1] text-white font-bold text-[14px] tracking-wide shadow-[0_4px_16px_rgba(0,194,232,0.35)] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Request A Quote
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-800 hover:text-[#00c2e8] rounded-lg transition-colors"
              aria-label="Open Mobile Menu"
            >
              {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer so content does not hide behind fixed navbar */}
      <div className="h-[72px] sm:h-[84px]" />

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="relative h-9 w-36">
                  <Image
                    src="/acuasafe/acuasafe-logo.svg"
                    alt="Acuasafe"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Quick Search */}
              <div className="mb-6 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#00c2e8]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>

              {/* Mobile Navigation List */}
              <div className="space-y-2">
                {navMenuItems.map((item, idx) => (
                  <div key={idx} className="border-b border-slate-50 pb-2">
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between py-2 text-left font-semibold text-slate-800 text-[15px]"
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          if (item.sub) {
                            e.preventDefault();
                            setActiveDropdown(
                              activeDropdown === item.label ? null : item.label
                            );
                          } else {
                            if (item.onClick) item.onClick(e);
                            setMobileOpen(false);
                          }
                        }}
                        className="flex-1"
                      >
                        {item.label}
                      </Link>
                      {item.sub && (
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            activeDropdown === item.label ? "rotate-180 text-[#00c2e8]" : ""
                          }`}
                        />
                      )}
                    </button>

                    {item.sub && activeDropdown === item.label && (
                      <div className="pl-4 pt-1 pb-2 space-y-1.5 border-l-2 border-[#00c2e8]/40 ml-2">
                        {item.sub.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-sm text-slate-600 hover:text-[#00c2e8]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openRFQ();
                }}
                className="w-full py-3 rounded-full bg-[#00c2e8] text-white font-bold text-center shadow-lg hover:bg-[#00acc1] transition-colors"
              >
                Request A Quote
              </button>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#00c2e8]" /> +880 1819 343635
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#00c2e8]" /> info@acuasafe.com
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quick Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-6 h-6 text-[#00c2e8]" />
                <input
                  type="text"
                  placeholder="Search water bottles, dispensers, pails, certifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-lg font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="mt-4">
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                Quick Results
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {[
                  { title: "5-Gallon Commercial Water Bottle (H2O Clear)", href: "/products/plastic-bottle-1" },
                  { title: "Liquid Washing Container (HDPE)", href: "/products/plastic-bottle-2" },
                  { title: "Chemical Bottle 500ML", href: "/products/plastic-bottle-3" },
                  { title: "LEED Platinum Sustainability Report", href: "/sustainability" },
                  { title: "Q Pail Manufacturing Division & Printing", href: "/q-pail" },
                ]
                  .filter((item) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-[#e6f9fd] text-slate-700 hover:text-[#00c2e8] transition-colors"
                    >
                      <span className="text-sm font-semibold">{item.title}</span>
                      <ArrowRight className="w-4 h-4 text-[#00c2e8]" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart & Sample Request Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white shadow-2xl h-full p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#00c2e8]" />
                  <h3 className="text-lg font-bold text-slate-900">Your Sample Basket</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Droplet className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-semibold">Your basket is empty</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Add sample bottles or containers to request free industrial testing.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                      <div className="relative w-14 h-14 bg-white rounded-xl overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500">{item.variant}</p>
                        <p className="text-xs font-semibold text-[#00c2e8] mt-0.5">
                          {item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => setCartItems([])}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-600">Sample Charge</span>
                <span className="text-base font-bold text-emerald-600">FREE (0.00 USD)</span>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  openRFQ();
                }}
                className="w-full py-3.5 rounded-full bg-[#00c2e8] text-white font-bold text-sm shadow-[0_6px_20px_rgba(0,194,232,0.4)] hover:bg-[#00acc1] transition-all hover:scale-[1.02]"
              >
                Proceed to Request Samples
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
