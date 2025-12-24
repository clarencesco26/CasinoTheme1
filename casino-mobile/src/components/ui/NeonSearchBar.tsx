import { defineComponent, ref } from 'vue'
import { Search } from 'lucide-vue-next'

export default defineComponent({
  name: 'NeonSearchBar',
  props: {
    placeholder: {
      type: String,
      default: 'SEARCH GAMES...'
    }
  },
  emits: ['search'],
  setup(props, { emit }) {
    const isFocused = ref(false)

    const handleSearch = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('search', target.value)
    }

    return () => (
      <div class="relative w-full max-w-2xl mx-auto mb-12 group">
        {/* Glow Background */}
        <div
          class={`absolute -inset-1 bg-[var(--color-secondary)] rounded-lg opacity-20 transition duration-500 ${
            isFocused.value ? 'opacity-60' : ''
          }`}
        />

        <div class="relative flex items-center">
          <div class="absolute left-4 text-[var(--color-secondary)] animate-pulse">
            <Search size={20} />
          </div>

          <input
            type="text"
            placeholder={props.placeholder}
            onInput={handleSearch}
            onFocus={() => (isFocused.value = true)}
            onBlur={() => (isFocused.value = false)}
            class={`
              w-full text-white font-pixel text-sm md:text-base
              py-4 pl-12 pr-4
              border-2 outline-none
              placeholder:text-[var(--color-text-muted)] placeholder:font-terminal placeholder:text-lg
              transition-all duration-300
              ${
                isFocused.value
                  ? 'border-[var(--color-primary)] bg-[var(--color-bg-secondary)]'
                  : 'border-[var(--color-secondary)]/50 hover:border-[var(--color-secondary)] bg-transparent'
              }
            `}
          />

          {/* Corner Accents */}
          <div
            class={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-300 ${
              isFocused.value ? 'border-[var(--color-primary)]' : 'border-[var(--color-secondary)]'
            }`}
          />
          <div
            class={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-300 ${
              isFocused.value ? 'border-[var(--color-primary)]' : 'border-[var(--color-secondary)]'
            }`}
          />
          <div
            class={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-300 ${
              isFocused.value ? 'border-[var(--color-primary)]' : 'border-[var(--color-secondary)]'
            }`}
          />
          <div
            class={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-300 ${
              isFocused.value ? 'border-[var(--color-primary)]' : 'border-[var(--color-secondary)]'
            }`}
          />
        </div>
      </div>
    )
  }
})
