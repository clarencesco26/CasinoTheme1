import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RetroGrid',
  setup() {
    return () => (
      <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[var(--color-bg-primary)]">
        {/* Horizon glow */}
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--color-bg-secondary)] via-[var(--color-bg-tertiary)] to-[#2d0b42] opacity-80" />

        {/* Sun */}
        <div class="absolute top-[10%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-warning)] blur-sm opacity-80">
          <div
            class="absolute bottom-0 left-0 w-full h-1/2 bg-[var(--color-bg-primary)] z-10"
            style={{
              clipPath: 'polygon(0 10%, 100% 10%, 100% 20%, 0 20%, 0 30%, 100% 30%, 100% 40%, 0 40%, 0 55%, 100% 55%, 100% 70%, 0 70%, 0 100%, 100% 100%)'
            }}
          />
        </div>

        {/* Grid Floor */}
        <div
          class="absolute bottom-0 left-[-50%] w-[200%] h-[50vh] origin-bottom"
          style={{
            transform: 'perspective(500px) rotateX(60deg)',
            backgroundImage: `
              linear-gradient(transparent 95%, var(--color-primary) 95%),
              linear-gradient(90deg, transparent 95%, var(--color-secondary) 95%)
            `,
            backgroundSize: '40px 40px',
            animation: 'grid-move 1s linear infinite'
          }}
        >
          <div class="absolute inset-0 bg-gradient-to-t from-transparent via-[var(--color-bg-primary)] to-[var(--color-bg-primary)]" />
        </div>

        {/* Vignette */}
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-60" />
      </div>
    )
  }
})
