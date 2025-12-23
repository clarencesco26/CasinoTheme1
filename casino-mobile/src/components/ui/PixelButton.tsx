import { defineComponent } from 'vue'

type PixelButtonVariant = 'pink' | 'cyan' | 'purple'

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
        shadow: 'shadow-[0_0_10px_var(--color-primary-glow),inset_0_0_10px_var(--color-primary-glow)]',
        hover: 'hover:bg-[var(--color-primary)]/10 hover:shadow-[0_0_20px_var(--color-primary-glow),inset_0_0_20px_var(--color-primary-glow)]'
      },
      cyan: {
        border: 'border-[var(--color-secondary)]',
        text: 'text-[var(--color-secondary)]',
        shadow: 'shadow-[0_0_10px_var(--color-secondary-glow),inset_0_0_10px_var(--color-secondary-glow)]',
        hover: 'hover:bg-[var(--color-secondary)]/10 hover:shadow-[0_0_20px_var(--color-secondary-glow),inset_0_0_20px_var(--color-secondary-glow)]'
      },
      purple: {
        border: 'border-[var(--color-accent)]',
        text: 'text-[var(--color-accent)]',
        shadow: 'shadow-[0_0_10px_var(--color-accent-glow),inset_0_0_10px_var(--color-accent-glow)]',
        hover: 'hover:bg-[var(--color-accent)]/10 hover:shadow-[0_0_20px_var(--color-accent-glow),inset_0_0_20px_var(--color-accent-glow)]'
      }
    }

    return () => {
      const style = colors[props.variant]
      
      return (
        <button
          class={`
            relative px-4 py-2 md:px-6 md:py-3
            font-pixel text-[10px] md:text-sm uppercase tracking-widest
            border-2 md:border-4 ${style.border} ${style.text} ${style.shadow} ${style.hover}
            bg-black/50 backdrop-blur-sm
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
