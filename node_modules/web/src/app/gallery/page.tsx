"use client";

import { MediaImg } from "@/components/ui/MediaImg";

const GALLERY_IMAGES = [
  "https://images.prismic.io/truekind/ZurDj7VsGrYSvh0W_1.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/Z-Aml3dAxsiBvxen_gallery-3.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/ZurSVbVsGrYSvisH_1.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/Z6D3P5bqstJ9-Ldy_Close-upPortraitwithGoldenLighting.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/ZurP_7VsGrYSvijF_1.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/Z-AmlndAxsiBvxem_gallery-2.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/Zuq-1LVsGrYSvhqc_s764qjse3.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/ZurL27VsGrYSviVl_1.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/ZurR3bVsGrYSviqH_1.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/Z-AmlHdAxsiBvxek_gallery-4.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/Z9b18ziBA97Gihj7_bha-%26-tea-tree-acne-clearing-toner.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/Z6D9rZbqstJ9-LhO_PortraitofaWomanAgainstBlueSky.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/ZurTmbVsGrYSviws_1.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/ZurNf7VsGrYSviaK_1.jpg?auto=format,compress",
  "https://images.prismic.io/truekind/Z-AmlXdAxsiBvxel_gallery-1.jpg?auto=format,compress",
];

export default function GalleryPage() {
  return (
    <section className="container">
      <h1 className="font-heading">Glow Up Gallery</h1>
      <div className="row gy-5 mt-16">
        {GALLERY_IMAGES.map((src, index) => (
          <div key={index} className="col-md-4">
            <div className="media-img" style={{ height: "25rem" }}>
              <MediaImg src={src} alt={`Gallery Image ${index + 1}`} sizes="(max-width:768px) 100vw, 33vw" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}