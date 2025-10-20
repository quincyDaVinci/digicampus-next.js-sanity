export default function Page() {
  return (
    <main id="main" className="flex flex-col gap-8 p-6">
      <h1 className="text-fluid-3xl font-semibold">Welkom 👋</h1>
      <p className="text-fluid-base text-[rgb(var(--dc-text)/0.85)]">
        Deze branch is opgeschoond: pagina-opbouwende componenten zijn verwijderd zodat je met een schone lei
        nieuwe secties en UI kunt opzetten. De globale shell (zoals de header) blijft behouden.
      </p>
      <div className="rounded-2xl border border-dc bg-dc-surface-98 p-5">
        <p className="text-sm text-[rgb(var(--dc-text)/0.7)]">
          Tip: maak nieuwe componenten in <code>src/components/sections</code> of <code>src/components/ui</code> en importeer
          ze hier zodra ze klaar zijn.
        </p>
      </div>
    </main>
  )
}