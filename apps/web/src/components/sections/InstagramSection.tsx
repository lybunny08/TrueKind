"use client";

import Image from "next/image";
import { InstagramIcon } from "@/components/ui/Icons";

export function InstagramSection() {
  return (
    <section id="connect">
      <div className="container">
        <div className="row gx-md-0">
          <div className="col-md-2 d-none d-md-flex flex-column justify-content-between">
            <div className="media-img n-a parallax-scroll"><Image src="/connect-1.jpg" alt="Connect 1" width={142} height={95} /></div>
          </div>
          <div className="col-md-8">
            <p className="connect__title-1 left-text">Get the latest news about skincare tips and new products.</p>
            <div className="media-img connect__image"><Image src="/connect.jpg" alt="Connect 2" width={523} height={359} /></div>
          </div>
          <div className="col-md-2 d-none d-md-flex align-items-end">
            <div className="media-img n-a parallax-scroll"><Image src="/IMG_7461.jpg" alt="Connect 3" width={142} height={189} /></div>
          </div>
        </div>
        <h2 className="connect__title-2 text-center font-serif">on <br /> instagram</h2>
        <a href="https://www.instagram.com/truekind.skin/" target="_blank" rel="noreferrer" className="connect__socmed icon-global">
          <span>Instagram</span>
          <span className="icon-global-right"><InstagramIcon className="h-4 w-4" /></span>
        </a>
      </div>
    </section>
  );
}