import type { Dish } from '@/data/menu'

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_2px_12px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(196,30,58,0.15)]">
      <div className="relative h-[200px] overflow-hidden bg-cream">
        {/* Foto de ambientación: el nombre del plato ya está en el título, por eso alt vacío */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dish.image}
          alt=""
          loading="lazy"
          width={600}
          height={400}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {dish.badge && (
          <span className="absolute left-3 top-3 inline-block rounded-full bg-red px-2 py-0.5 text-xs font-semibold text-white">{dish.badge}</span>
        )}
        {dish.featured && (
          <span
            role="img"
            aria-label="Plato destacado"
            className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-gold text-sm"
          >
            ⭐
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-tight text-ink">{dish.name}</h3>
          <p className="whitespace-nowrap text-base font-bold text-brand">{dish.price}</p>
        </div>
        <p className="flex-1 text-sm leading-normal text-muted">{dish.description}</p>
      </div>
    </article>
  )
}
