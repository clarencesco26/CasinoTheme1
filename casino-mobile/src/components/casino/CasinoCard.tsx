import { defineComponent, type PropType } from 'vue'
import PixelButton from '../ui/PixelButton'
import { Star, Zap } from 'lucide-vue-next'

type ColorVariant = 'pink' | 'cyan' | 'purple'

export default defineComponent({
  name: 'CasinoCard',
  components: {
    PixelButton
  },
  props: {
    name: {
      type: String,
      required: true
    },
    bonus: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    features: {
      type: Array as PropType<string[]>,
      required: true
    },
    color: {
      type: String as PropType<ColorVariant>,
      required: true
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const colorMap = {
      pink: 'var(--color-primary)',
      cyan: 'var(--color-secondary)',
      purple: 'var(--color-accent)'
    }

    const baseColor = colorMap[props.color]

    return () => (
      <div
        class="relative group h-full"
        style={{ animationDelay: `${props.delay}ms` }}
      >
        {/* Card Container */}
        <div
          class="
            relative
            h-[400px] md:h-[540px] lg:h-[560px]
            bg-[var(--color-bg-card)] backdrop-blur-md
            border-2 border-transparent
            p-3 md:p-4 lg:p-6
            flex flex-col gap-2 md:gap-3 lg:gap-4
            transition-all duration-300
            hover:-translate-y-2 hover:scale-[1.02]
            overflow-hidden
          "
          style={{
            boxShadow: `0 0 15px ${baseColor}40`,
            borderColor: baseColor
          }}
        >
          {/* Neon Sign Header */}
          <div class="text-center mb-2 relative flex-shrink-0">
            <div
              class="absolute inset-0 blur-xl opacity-50"
              style={{ backgroundColor: baseColor }}
            />
            <h3
              class="relative font-pixel text-xs md:text-lg lg:text-2xl tracking-tighter uppercase animate-flicker leading-tight"
              style={{
                color: '#fff',
                textShadow: `
                  0 0 5px #fff,
                  0 0 10px #fff,
                  0 0 20px ${baseColor},
                  0 0 40px ${baseColor},
                  0 0 80px ${baseColor}
                `
              }}
            >
              {props.name}
            </h3>
            <div class="h-0.5 w-full mt-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          </div>

          {/* Game Image Placeholder */}
          <div class="relative w-full aspect-video flex-shrink-0 overflow-hidden rounded-sm mb-2">
            <div
              class="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    ${baseColor}10 10px,
                    ${baseColor}10 20px
                  )
                `
              }}
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="font-pixel text-xs md:text-sm opacity-50"
                style={{ color: baseColor }}
              >
                GAME IMAGE
              </div>
            </div>
            {/* Glowing border */}
            <div
              class="absolute inset-0 border-2 opacity-30"
              style={{ borderColor: baseColor }}
            />
          </div>

          {/* Bonus Info */}
          <div class="text-center py-2 md:py-3 border-y border-dashed border-[var(--color-border-muted)] flex-shrink-0">
            <p class="font-terminal text-sm md:text-lg text-[var(--color-text-secondary)] mb-1">WELCOME BONUS</p>
            <p
              class="font-pixel text-[10px] md:text-base lg:text-xl text-[var(--color-text-primary)] drop-shadow-md leading-tight"
              style={{ textShadow: `2px 2px 0px ${baseColor}` }}
            >
              {props.bonus}
            </p>
          </div>

          {/* Features */}
          <ul class="flex-1 space-y-1 md:space-y-2 my-1 overflow-hidden">
            {props.features.map((feature, i) => (
              <li key={i} class="flex items-center gap-1 md:gap-2 font-terminal text-xs md:text-sm lg:text-base text-[var(--color-text-secondary)]">
                <Zap size={12} color={baseColor} class="animate-pulse flex-shrink-0" />
                <span class="truncate">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Rating */}
          <div class="flex justify-center gap-0.5 md:gap-1 mb-2 flex-shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < props.rating ? 'var(--color-warning)' : 'none'}
                color={i < props.rating ? 'var(--color-warning)' : 'var(--color-text-muted)'}
                class={i < props.rating ? 'drop-shadow-[0_0_5px_var(--color-warning)]' : ''}
              />
            ))}
          </div>

          {/* CTA */}
          <div class="flex-shrink-0">
            <PixelButton variant={props.color} class="w-full text-[8px] md:text-xs lg:text-sm py-2 px-2">
              PLAY NOW
            </PixelButton>
          </div>

          {/* Corner Decorations */}
          <div
            class="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2"
            style={{ borderColor: baseColor }}
          />
          <div
            class="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2"
            style={{ borderColor: baseColor }}
          />
          <div
            class="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2"
            style={{ borderColor: baseColor }}
          />
          <div
            class="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2"
            style={{ borderColor: baseColor }}
          />
        </div>
      </div>
    )
  }
})
