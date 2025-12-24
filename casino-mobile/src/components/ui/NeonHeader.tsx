import { defineComponent, type PropType } from 'vue'
import { Gamepad2 } from 'lucide-vue-next'
import UserProfile from './UserProfile'
import { useScrollDirection } from '../../composables/useScrollDirection'

interface TextBanner {
  id: number
  title: string
  href: string
  orderNum: number
}

export default defineComponent({
  name: 'NeonHeader',
  components: {
    UserProfile
  },
  props: {
    textBanners: {
      type: Array as PropType<TextBanner[]>,
      default: () => []
    },
    redirectDomain: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { showBanner } = useScrollDirection()

    return () => (
      <header class="fixed top-0 left-0 right-0 z-50 w-full border-b border-[var(--color-border-primary)]/30 bg-[var(--color-bg-primary)]/95 backdrop-blur-md">
        {/* Text Banner Section */}
        {props.textBanners.length > 0 && (
          <div 
            class="bg-[var(--color-bg-secondary)] border-b-2 border-[var(--color-secondary)] transition-all duration-300 ease-in-out overflow-hidden"
            style={{
              maxHeight: showBanner.value ? '100px' : '0',
              opacity: showBanner.value ? '1' : '0',
              transform: showBanner.value ? 'translateY(0)' : 'translateY(-100%)'
            }}
          >
            <div class="container mx-auto px-4 py-2 overflow-x-auto scrollbar-hide">
              <div class="flex gap-3 md:gap-4 justify-center items-center flex-nowrap">
                {props.textBanners.map((banner, index) => (
                  <span
                    key={banner.id}
                    class="flex-shrink-0 px-4 py-1 font-pixel text-[10px] md:text-xs text-[var(--color-primary)] whitespace-nowrap"
                  >
                    {banner.title}
                    {index < props.textBanners.length - 1 && (
                      <span class="ml-2 text-[var(--color-secondary)]">★</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Header Content */}
        <div class="container mx-auto py-4 px-4">
          <div class="flex flex-row items-center justify-between gap-4">
            {/* Logo Section */}
            <div class="flex items-center gap-2 md:gap-4 group cursor-default">
              <Gamepad2 
                size={32} 
                class="text-[var(--color-secondary)] animate-pulse md:w-10 md:h-10" 
              />
              <div class="flex flex-col">
                <h1 class="font-pixel text-sm md:text-2xl lg:text-4xl text-[var(--color-primary)] tracking-widest uppercase relative">
                  <span class="relative z-10">
                    ARCADE
                  </span>
                </h1>
                <span class="font-pixel text-[8px] md:text-xs lg:text-sm text-[var(--color-secondary)] tracking-[0.3em] mt-0.5 md:mt-1">
                  CASINO ZONE
                </span>
              </div>
            </div>

            {/* User Profile - RPG Style */}
            <div class="flex justify-end">
              <UserProfile />
            </div>
          </div>
        </div>
      </header>
    )
  }
})
