"use client";

export function AnnouncementBar() {
  return (
    <div className="border-b border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-8 items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-black">
            <a
              href="mailto:contact@truekindskincare.com"
              className="hover:underline transition-colors"
            >
              contact@truekindskincare.com
            </a>
            <a
              href="tel:+918939997071"
              className="hover:underline transition-colors"
            >
              +91 89399 97071
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="/" className="hover:underline transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}