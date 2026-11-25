"use client";

import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

const EXPLORE = [
  { href: "/products", label: "Shop" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/gallery", label: "Gallery" },
  { href: "/journal", label: "Journal" },
  { href: "/login", label: "Sign Up/Login" },
];

export function Footer() {
  return (
    <footer id="footer">
      <div className="footer__parallax">
        <Image src="/footer.jpg" alt="" className="footer__parallax-image" width={2880} height={1238} sizes="100vw" />
      </div>

      <div className="footer__wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row gy-5">
                <div className="col-md-4">
                  <p className="subtitle">Explore</p>
                  <ul>{EXPLORE.map((l) => <li key={l.href}><Link href={l.href} className="link">{l.label}</Link></li>)}</ul>
                </div>
                <div className="col-md-4">
                  <p className="subtitle">Follow Us</p>
                  <ul>
                    <li><a href="https://instagram.com/truekind.skin" target="_blank" rel="noreferrer" className="link">Instagram</a></li>
                    <li><a href="https://facebook.com/truekind.skin" target="_blank" rel="noreferrer" className="link">Facebook</a></li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <p className="subtitle">Contact Us</p>
                  <ul>
                    <li><a href="mailto:contact@truekindskincare.com" className="link">tk@brandsofia.com</a></li>
                    <li><a href="tel:+918939997071" className="link">1111-2222-3333</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5 footer__email-wrapper order-1 order-md-2">
              <div className="footer__email">
                <h5 className="footer__email-title text-uppercase">Hear more<br />from Us</h5>
                <p className="maxwidth-0 text-gray2">Get the latest news about skincare tips and new products.</p>
                <NewsletterForm dark />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__copyright-wrapper container">
        <div className="footer__copyright">
          <p className="font-small">Clean, Conscious, Clinical Skincare! Honest products that truly work</p>
          <p>© 2025 TrueKind, All Rights Reserved</p>
        </div>
        <ul className="footer__copyright-links">
          <li><Link href="/disclaimer" className="underline">Disclaimer</Link></li>
          <li><Link href="/credits" className="underline">Credits</Link></li>
          <li>Website By: <a href="https://abhishekjha.me/" target="_blank" rel="noreferrer" className="underline">Abhishek</a> &amp; <a href="https://reksaandhika.com/" target="_blank" rel="noreferrer" className="underline">Reksa</a></li>
        </ul>
      </div>
    </footer>
  );
}