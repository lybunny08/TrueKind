"use client";

import Image from "next/image";

export function QualitySection() {
  return (
    <section id="quality" className="container">
      <div className="row gx-md-0 gy-5">
        <div className="col-md-6">
          <span className="pill">Quality</span>
          <h5 className="font-normal mt-5 maxwidth">Only proven Ingredients, quality over quantity always!</h5>
          <p className="mt-5 maxwidth text-gray3">Its about what we don&apos;t put in. Squeaky clean formulas with over 1500 Negative Ingredients.</p>
        </div>
        <div className="col-md-6">
          <div className="media-img" style={{ position: "relative", height: "25rem" }}>
            <Image src="/175A3642-3-741.jpg" alt="Quality" fill sizes="50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}