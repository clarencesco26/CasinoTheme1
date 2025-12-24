import { defineComponent } from 'vue'

type PixelButtonVariant = 'pink' | 'cyan' | 'purple' | 'red'

export default defineComponent({
  name: 'PixelButton',
  props: {
    variant: {
      type: String as () => PixelButtonVariant,
      default: 'pink' as PixelButtonVariant
    }
  },
  setup(props, { slots, attrs }) {
    const colors = {
      pink: {
        border: 'border-[var(--color-primary)]',
        text: 'text-[var(--color-primary)]',
        hover: 'hover:bg-[var(--color-primary)]/10'
      },
      cyan: {
        border: 'border-[var(--color-secondary)]',
        text: 'text-[var(--color-secondary)]',
        hover: 'hover:bg-[var(--color-secondary)]/10'
      },
      purple: {
        border: 'border-[var(--color-accent)]',
        text: 'text-[var(--color-accent)]',
        hover: 'hover:bg-[var(--color-accent)]/10'
      },
      red: {
        border: 'border-[var(--color-primary)]',
        text: 'text-[var(--color-primary)]',
        hover: 'hover:bg-[var(--color-primary)]/10'
      }
    }

    return () => {
      const style = colors[props.variant]
      
      return (
        <button
          class={`
            relative px-4 py-2 md:px-6 md:py-3
            font-pixel text-[10px] md:text-sm uppercase tracking-widest
            border-2 md:border-4 ${style.border} ${style.text} ${style.hover}
            bg-black/50
            transition-all duration-200
            active:scale-95 active:translate-y-1
            animate-chromatic
            group
            ${attrs.class || ''}
          `}
          {...attrs}
        >
          <span class="relative z-10 drop-shadow-md group-hover:animate-pulse">
            {slots.default?.()}
          </span>

          {/* Corner accents for 8-bit feel */}
          <div class={`absolute -top-1 -left-1 w-2 h-2 bg-black border-r border-b ${style.border}`} />
          <div class={`absolute -top-1 -right-1 w-2 h-2 bg-black border-l border-b ${style.border}`} />
          <div class={`absolute -bottom-1 -left-1 w-2 h-2 bg-black border-r border-t ${style.border}`} />
          <div class={`absolute -bottom-1 -right-1 w-2 h-2 bg-black border-l border-t ${style.border}`} />
        </button>
      )
    }
  }
})
