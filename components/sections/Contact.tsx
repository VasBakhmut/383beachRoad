"use client";

import Image from "next/image";
import RevealSlide from "@/components/RevealSlide";
import { agents, agencyAddress, property } from "@/lib/content";

const fields = [
  { name: "name", label: "Full name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
] as const;

export default function Contact() {
  return (
    <section id="contact" className="relative bg-bg px-6 pt-28 md:px-10 md:pt-36 lg:px-16">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 lg:col-span-7">
          <RevealSlide direction="left">
            <p className="eyebrow mb-6">Enquire</p>
            <h2 className="font-display max-w-lg text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Book an inspection
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              {property.fullAddress} is offered via {property.saleType.toLowerCase()}, inspection{" "}
              {property.inspection.toLowerCase()}. Register your interest and an agent will be in touch.
            </p>
          </RevealSlide>

          <RevealSlide direction="left" delay={0.1} className="mt-12 max-w-xl">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label htmlFor={field.name} className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className="border-b border-line bg-transparent py-2 text-base outline-none transition-colors focus:border-fg"
                      required={field.name !== "phone"}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="I'd like to arrange a private inspection..."
                  className="resize-none border-b border-line bg-transparent py-2 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-fg"
                />
              </div>

              <button
                type="submit"
                className="font-display mt-2 w-fit cursor-pointer rounded-full bg-fg px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85"
              >
                Request Inspection
              </button>
            </form>
          </RevealSlide>
        </div>

        <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
          <RevealSlide direction="right">
            <p className="eyebrow mb-6">Listing Agents</p>
            <div className="flex flex-col gap-8">
              {agents.map((agent) => (
                <div key={agent.name} className="flex items-center gap-4 border-t border-line pt-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line">
                    <span className="font-display text-sm tracking-wide text-muted">{agent.initials}</span>
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold tracking-tight">{agent.name}</p>
                    <p className="text-sm text-muted">{agent.agency}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-muted">{agencyAddress}</p>
          </RevealSlide>
        </div>
      </div>

      <div className="relative mt-28 h-56 w-full overflow-hidden md:h-72">
        <Image src="/images/footer-aerial.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-8 md:px-10 lg:px-16">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
            {property.fullAddress}
          </p>
          <p className="mt-2 text-xs text-white/60">
            &copy; {new Date().getFullYear()} &middot; Private sale &middot; Listing content courtesy of Buxton Sandringham
          </p>
        </div>
      </div>
    </section>
  );
}
