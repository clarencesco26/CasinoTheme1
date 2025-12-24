import { defineComponent, type PropType } from 'vue'
import { MessageCircle, Users } from 'lucide-vue-next'

interface SystemSettings {
  telegramLink: string
  microsoftTeamsLink: string
  redirectDomain: string
}

interface TextBanner {
  id: number
  title: string
  href: string
  orderNum: number
}

export default defineComponent({
  name: 'Footer',
  props: {
    systemSettings: {
      type: Object as PropType<SystemSettings>,
      default: () => ({
        telegramLink: '',
        microsoftTeamsLink: '',
        redirectDomain: ''
      })
    },
    textBanners: {
      type: Array as PropType<TextBanner[]>,
      default: () => []
    }
  },
  setup(props) {
    return () => (
      <footer class="bg-[var(--color-bg-secondary)] border-t-2 border-[var(--color-secondary)] py-8 mt-12">
        <div class="container mx-auto px-4">
          {/* Logo and Description */}
          <div class="text-center mb-6">
            <h3 class="font-pixel text-xl md:text-2xl text-[var(--color-primary)] mb-2">
              ARCADE
            </h3>
            <p class="font-terminal text-sm md:text-base text-[var(--color-text-secondary)]">
              CASINO ZONE
            </p>
          </div>

          {/* Social Links */}
          {(props.systemSettings.telegramLink || props.systemSettings.microsoftTeamsLink) && (
            <div class="flex justify-center gap-4 mb-6">
              {props.systemSettings.telegramLink && (
                <a
                  href={props.systemSettings.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 px-4 py-2 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white transition-all duration-200 font-terminal text-sm"
                >
                  <MessageCircle size={20} />
                  <span>TELEGRAM</span>
                </a>
              )}
              {props.systemSettings.microsoftTeamsLink && (
                <a
                  href={props.systemSettings.microsoftTeamsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 px-4 py-2 border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200 font-terminal text-sm"
                >
                  <Users size={20} />
                  <span>TEAMS</span>
                </a>
              )}
            </div>
          )}

          {/* Divider */}
          <div class="h-px bg-[var(--color-border-muted)] my-6"></div>

          {/* Copyright */}
          <div class="text-center">
            <p class="font-terminal text-[var(--color-text-muted)] text-xs md:text-sm">
              © 2024 ARCADE CASINO ZONE. ALL RIGHTS RESERVED.
            </p>
            <p class="font-terminal text-[var(--color-text-muted)] text-xs mt-2 opacity-50">
              HIGH SCORE: 999,999
            </p>
          </div>

          {/* Text Banner Section */}
          {props.textBanners.length > 0 && (
            <>
              {/* Divider */}
              <div class="h-px bg-[var(--color-border-muted)] my-6"></div>
              
              <div class="overflow-x-auto scrollbar-hide">
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
            </>
          )}
        </div>
      </footer>
    )
  }
})
