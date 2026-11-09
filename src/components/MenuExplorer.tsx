'use client'

import { useState } from 'react'
import { Dropdown } from './Dropdown'
import { DishCard } from './DishCard'
import { Chevron } from './Icons'
import { LiveNotice } from './LiveNotice'
import { StatusMessage } from './StatusMessage'
import { useBranches, useMenu } from '@/lib/useRemote'

const itemBase = 'flex min-h-11 w-full cursor-pointer items-center gap-2 px-4 py-3 text-left text-sm'

export function MenuExplorer() {
  const [branch, setBranch] = useState('barranco')
  const [category, setCategory] = useState('menus')

  const { data: branchGroups, status: branchStatus, reload: reloadBranches } = useBranches()
  const branches = (branchGroups ?? []).flatMap(group => group.branches)
  const currentBranch = branches.find(item => item.value === branch) ?? branches[0]
  const menu = useMenu(currentBranch?.value ?? null)
  const categories = menu.data?.categories ?? []
  const dishes = menu.data?.dishes ?? []
  const loading = menu.status === 'loading'
  // Si la sede no vende la categoría elegida, se muestra la primera que sí tenga platos
  const currentCategory = categories.find(item => item.value === category) ?? categories[0]
  const filtered = currentCategory ? dishes.filter(dish => dish.category === currentCategory.value) : []

  return (
    <div className="min-h-screen bg-surface">
      <div className="on-dark bg-charcoal px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-gold">Explora nuestra carta</p>
            <h1 className="font-display text-3xl font-bold text-white">Menú Interactivo</h1>
          </div>

          <Dropdown
            wrapperClassName="relative"
            triggerClassName={open =>
              `flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border-[1.5px] border-red px-5 py-3 text-sm font-semibold text-white ${open ? 'bg-red' : 'bg-charcoal'}`
            }
            trigger={open => (
              <>
                <span aria-hidden="true">📍</span>
                <span>
                  <span className="sr-only">Local: </span>
                  {currentBranch?.label ?? 'Cargando…'}
                </span>
                <Chevron open={open} />
              </>
            )}
            panelClassName="absolute right-0 z-20 mt-2 max-h-[min(460px,65vh)] w-72 overflow-y-auto rounded-xl border border-line bg-surface text-ink shadow-2xl"
          >
            {close =>
              (branchGroups ?? []).map(group => (
                <div key={group.label} role="group" aria-label={group.label}>
                  <p aria-hidden="true" className="sticky top-0 bg-sand px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted">
                    {group.label}
                  </p>
                  {group.branches.map(item => {
                    const selected = item.value === branch
                    return (
                      <button
                        key={item.value}
                        type="button"
                        aria-current={selected ? 'true' : undefined}
                        onClick={() => {
                          setBranch(item.value)
                          close()
                        }}
                        className={`${itemBase} ${selected ? 'bg-red-tint font-semibold text-brand' : 'hover:bg-cream'}`}
                      >
                        <span aria-hidden="true" className="w-4">
                          {selected ? '✓' : ''}
                        </span>
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              ))
            }
          </Dropdown>
        </div>
      </div>

      {/* En pantallas pequeñas la barra no queda fija para no tapar el contenido al ampliar el texto */}
      <div className="z-10 border-b border-line bg-cream px-4 py-3 lg:sticky lg:top-[68px]">
        <div className="relative mx-auto max-w-5xl">
          <Dropdown
            wrapperClassName="relative"
            panelId="menu-categories"
            triggerClassName={open =>
              `flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border-[1.5px] border-red px-4 py-2.5 text-left text-sm font-bold ${
                open ? 'bg-red text-white shadow-[0_8px_20px_rgba(196,30,58,0.18)]' : 'bg-surface text-ink'
              }`
            }
            trigger={open => (
              <>
                <span className="flex w-5 flex-col gap-1" aria-hidden="true">
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest">Categorías</span>
                  <span className="block">{currentCategory?.label ?? 'Sin categorías'}</span>
                </span>
                <Chevron open={open} />
              </>
            )}
            panelClassName="absolute inset-x-0 z-20 mt-3 grid max-h-[min(520px,65vh)] grid-cols-1 gap-2 overflow-y-auto rounded-2xl border border-line bg-surface p-3 shadow-2xl sm:grid-cols-2 sm:p-4 lg:grid-cols-3"
          >
            {close =>
              categories.map(cat => {
                const selected = cat.value === currentCategory?.value
                return (
                  <button
                    key={cat.value}
                    type="button"
                    aria-current={selected ? 'true' : undefined}
                    onClick={() => {
                      setCategory(cat.value)
                      close()
                    }}
                    className={`min-h-11 cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-semibold ${
                      selected ? 'border-red bg-red text-white' : 'border-line bg-cream text-ink hover:border-red'
                    }`}
                  >
                    {selected && <span aria-hidden="true">✓ </span>}
                    {cat.label}
                  </button>
                )
              })
            }
          </Dropdown>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <LiveNotice
          status={branchStatus === 'error' && !branchGroups ? 'error' : menu.status}
          hasData={menu.data !== null}
          what="la carta"
          onRetry={branchStatus === 'error' && !branchGroups ? reloadBranches : menu.reload}
        />
        {menu.data !== null && categories.length === 0 ? (
          <div className="mt-4">
            <StatusMessage kind="info">Esta sede todavía no tiene platos publicados. Prueba con otro local.</StatusMessage>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="mb-1 font-display text-2xl font-bold text-ink">{currentCategory?.label}</h2>
                <p className="max-w-2xl text-sm text-muted">{currentCategory?.description}</p>
              </div>
              {/* role="status": el lector anuncia el cambio de categoría o de local */}
              <p role="status" className="text-sm text-muted">
                {loading ? 'Cargando…' : `${filtered.length} opciones · Local ${currentBranch?.label}`}
              </p>
            </div>
            <div aria-busy={loading} className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${loading ? 'opacity-60' : ''}`}>
              {filtered.map(dish => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
