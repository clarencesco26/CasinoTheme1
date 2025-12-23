import { defineComponent } from 'vue'
import { Gamepad2 } from 'lucide-vue-next'
import UserProfile from './UserProfile'

export default defineComponent({
  name: 'NeonHeader',
  components: {
    UserProfile
  },
  setup() {
    return () => (
      <header class="fixed top-0 left-0 right-0 z-50 w-full py-4 px-4 border-b border-[var(--color-border-primary)]/30 bg-[var(--color-bg-primary)]/95 backdrop-blur-md shadow-[0_4px_20px_var(--color-primary-glow)]">
        <div class="container mx-auto">
          <div class="flex flex-row items-center justify-between gap-4">
            {/* Logo Section */}
            <div class="flex items-center gap-2 md:gap-4 group cursor-default">
              <Gamepad2 
                size={32} 
                class="text-[var(--color-secondary)] drop-shadow-[0_0_10px_var(--color-secondary)] animate-pulse md:w-10 md:h-10" 
              />
              <div class="flex flex-col">
                <h1 class="font-pixel text-sm md:text-2xl lg:text-4xl text-[var(--color-text-primary)] tracking-widest uppercase relative">
                  <span class="absolute -inset-1 blur-lg bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <span
                    class="relative z-10"
                    style={{
                      textShadow: `
                        0 0 5px var(--color-text-primary),
                        0 0 10px var(--color-primary),
                        0 0 20px var(--color-primary)
                      `
                    }}
                  >
                    ARCADE
                  </span>
                </h1>
                <span class="font-pixel text-[8px] md:text-xs lg:text-sm text-[var(--color-secondary)] tracking-[0.3em] mt-0.5 md:mt-1 drop-shadow-[0_0_5px_var(--color-secondary)]">
                  CASINO ZONE
                </span>
              </div>
            </div>

            {/* User Profile - RPG Style */}
            <div class="flex justify-end">
              <UserProfile />
            </div>
          </div>

          {/* Navigation */}
          <div class="mt-6 relative">
            <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent shadow-[0_0_10px_var(--color-primary)]" />
            <nav class="flex gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center">
              {['TOP RATED', 'NEW GAMES', 'LIVE CASINO', 'CRYPTO', 'TOURNAMENTS'].map((item, i) => (
                <button
                  key={item}
                  class={`
                    font-terminal text-lg md:text-xl whitespace-nowrap px-4 py-1
                    transition-all duration-300
                    hover:text-[var(--color-secondary)] hover:drop-shadow-[0_0_8px_var(--color-secondary)] hover:-translate-y-1
                    ${i === 0 ? 'text-[var(--color-primary)] drop-shadow-[0_0_5px_var(--color-primary)]' : 'text-[var(--color-text-tertiary)]'}
                  `}
                >
                  [{item}]
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
    )
  }
})
