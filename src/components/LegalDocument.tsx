import Link from 'next/link'
import { legalSections } from '@/data/legal'

/** Documento legal con jerarquía de títulos (h1 → h2 → h3) y listas reales. */
export function LegalDocument({ title }: { title: string }) {
  return (
    <div className="bg-cream px-6 py-14 sm:py-20">
      <article className="mx-auto max-w-4xl rounded-2xl border border-line bg-surface px-6 py-8 shadow-sm sm:px-10 sm:py-12">
        <Link href="/" className="mb-8 inline-flex min-h-11 items-center text-sm font-semibold text-brand hover:text-brand-dark">
          ← Volver al inicio
        </Link>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand">Rústica Perú</p>
        <h1 className="mb-3 font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
        <p className="text-sm font-bold uppercase tracking-wide text-muted">Políticas de privacidad de datos personales</p>
        <p className="mb-10 mt-1 text-sm font-bold text-ink">RUSTICA CLUB MEMBRESIAS S.A.C.</p>

        <div className="space-y-9">
          {legalSections.map(section => (
            <section key={section.title}>
              <h2 className="mb-3 text-lg font-bold text-ink">{section.title}</h2>
              {section.paragraphs?.map(paragraph => (
                <p key={paragraph} className="mb-3 text-base leading-7 text-body">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="list-disc space-y-1.5 pl-6 text-base leading-7 text-body">
                  {section.bullets.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.groups?.map(group => (
                <div key={group.subtitle} className="mt-5">
                  <h3 className="mb-2 font-bold text-ink">{group.subtitle}</h3>
                  <ul className="list-disc space-y-1.5 pl-6 text-base leading-7 text-body">
                    {group.bullets.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {section.footer && <p className="mt-3 text-base leading-7 text-body">{section.footer}</p>}
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}
