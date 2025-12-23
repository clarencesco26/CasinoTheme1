import { defineComponent } from 'vue'
import { User, Coins } from 'lucide-vue-next'

export default defineComponent({
  name: 'UserProfile',
  props: {
    username: {
      type: String,
      default: 'PLAYER 1'
    },
    level: {
      type: Number,
      default: 42
    },
    credits: {
      type: Number,
      default: 2500
    },
    xp: {
      type: Number,
      default: 75
    },
    maxXp: {
      type: Number,
      default: 100
    }
  },
  setup(props) {
    return () => (
      <div class="flex items-center gap-4 bg-[var(--color-bg-secondary)]/40 backdrop-blur-md p-2 rounded-lg border border-[var(--color-accent)]/50 shadow-[0_0_10px_var(--color-accent-glow)] group hover:border-[var(--color-accent)] transition-all duration-300">
        {/* Avatar Section */}
        <div class="relative">
          <div class="w-12 h-12 bg-[var(--color-bg-primary)] border-2 border-[var(--color-secondary)] flex items-center justify-center overflow-hidden shadow-[0_0_10px_var(--color-secondary)]">
            <User size={24} class="text-[var(--color-secondary)]" />
            <div class="absolute inset-0 bg-gradient-to-tr from-[var(--color-secondary)]/20 to-transparent" />
          </div>
          <div class="absolute -bottom-2 -right-2 bg-[var(--color-primary)] text-[var(--color-bg-primary)] font-pixel text-[8px] px-1 py-0.5 border border-[var(--color-text-primary)]">
            LVL {props.level}
          </div>
        </div>

        {/* Stats Section */}
        <div class="flex flex-col gap-1">
          <div class="flex items-center justify-between gap-4">
            <span class="font-pixel text-xs text-[var(--color-accent)] drop-shadow-[0_0_5px_var(--color-accent)]">
              {props.username}
            </span>
          </div>

          {/* XP Bar */}
          <div class="w-24 h-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-text-muted)] relative overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-light)]"
              style={{ width: `${(props.xp / props.maxXp) * 100}%` }}
            />
            {/* Scanline effect on bar */}
            <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] opacity-30 w-full animate-[scanline_2s_linear_infinite]" />
          </div>

          {/* Credits */}
          <div class="flex items-center gap-1 text-[var(--color-primary)]">
            <Coins size={10} class="animate-pulse" />
            <span class="font-terminal text-sm tracking-wider drop-shadow-[0_0_5px_var(--color-primary)]">
              {props.credits.toLocaleString()} CR
            </span>
          </div>
        </div>
      </div>
    )
  }
})
