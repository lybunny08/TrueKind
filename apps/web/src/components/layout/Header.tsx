"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { CartIcon, InstagramIcon } from "@/components/ui/Icons";
import { useCart } from "@/contexts/cart";

const NAV_LINKS = [
  { href: "/products", label: "Shop" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/gallery", label: "Gallery" },
  { href: "/journal", label: "Journal" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, toggleCart } = useCart();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header id="header" className={isHome && !isScrolled && !isOpen ? "is--white" : ""}>
      <div className="container">
        <nav className="navbar">
          {/* Hamburger (mobile only) */}
          <div className="navbar-hamburger" onClick={() => setIsOpen(!isOpen)}>
            <div className={`navbar-hamburger-line ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <div className={`navbar-hamburger-line ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </div>

          {/* Logo */}
          <Link href="/" className="navbar-logo" aria-label="Truekind">
            <Logo />
          </Link>

          {/* Menu */}
          <div className={`navbar-menu ${isOpen ? "is--open" : ""}`}>
            <ul className="navbar-menu-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="navbar-menu-list-item">
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="navbar-menu-list-item-link link">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="navbar-menu-list-item d-block d-md-none">
                <Link href="/login" onClick={() => setIsOpen(false)} className="navbar-menu-list-item-link link">Sign Up/Login</Link>
              </li>
            </ul>
            <div className="navbar-menu-foot d-block d-md-none">
              <p className="font-small text-gray2 text-uppercase mb-2">Contact Us</p>
              <ul>
                <li><a href="mailto:contact@truekindskincare.com" className="link">contact@truekindskincare.com</a></li>
                <li><a href="tel:+918939997071" className="link">+91 89399 97071</a></li>
              </ul>
            </div>
            <div className="navbar-menu-socmed d-flex d-md-none">
              <ul>
                <li className="navbar-menu-socmed-item icon-round">
                  <a href="https://instagram.com/truekind.skin" target="_blank" rel="noreferrer"><InstagramIcon className="h-4 w-4" /></a>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA (cart pill) */}
          <div className="navbar-cta">
            <ul className="navbar-menu-list">
              <li className="navbar-menu-list-item">
                <button id="cart-nav" onClick={toggleCart} aria-label="Cart" className="navbar-menu-list-item-link">
                  <CartIcon />
                </button>
                <span className="cart-count">{itemCount > 0 ? itemCount : ""}</span>
              </li>
              <div className="border-vertical" />
              <li className="navbar-menu-list-item">
                <Link href="/login" aria-label="Login" className="navbar-menu-list-item-link">
                  <svg className="login-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1"/><path d="M2 14C2 11 4.5 9 8 9C11.5 9 14 11 14 14" stroke="currentColor" strokeWidth="1"/></svg>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}