import { defineComponent, ref, computed, onMounted } from 'vue'
import NeonHeader from './components/ui/NeonHeader'
import CasinoCard from './components/casino/CasinoCard'
import PixelButton from './components/ui/PixelButton'
import NeonSearchBar from './components/ui/NeonSearchBar'
import PopupModal from './components/ui/PopupModal'
import Footer from './components/ui/Footer'
import { usePopupFlow } from './composables/usePopupFlow'

interface Board {
  id: number
  brandName: string
  brandImage: string
  title: string
  prize: string
  prizeDescription: string
  href: string
  isPinned: boolean
}

interface Category {
  id: number
  title: string
  subtitle: string
  orderNum: number
  boards: Board[]
}

interface PopupImage {
  id: number
  imageUrl: string
  href: string
  orderNum: number
  isPinned: boolean
}

interface TextBanner {
  id: number
  title: string
  href: string
  orderNum: number
}

interface SiteData {
  success: boolean
  data: {
    categories: Category[]
    systemSettings: {
      telegramLink: string
      microsoftTeamsLink: string
      redirectDomain: string
    }
    popups: {
      first: PopupImage[]
      bigSingle: PopupImage[]
      second: PopupImage[]
    }
    textBanners: {
      header: TextBanner[]
      footer: TextBanner[]
    }
  }
}

export default defineComponent({
  name: 'App',
  components: {
    PopupModal,
    Footer
  },
  setup() {
    const searchQuery = ref('')
    const selectedCategory = ref('all')
    const categories = ref<Category[]>([])
    const allBoards = ref<Board[]>([])
    const systemSettings = ref({
      telegramLink: '',
      microsoftTeamsLink: '',
      redirectDomain: ''
    })
    const headerTextBanners = ref<TextBanner[]>([])
    const footerTextBanners = ref<TextBanner[]>([])

    // Initialize popup flow
    const {
      isPopupOpen,
      getCurrentPopupImages,
      getCurrentPopupType,
      handlePopupClose,
      initializePopupFlow
    } = usePopupFlow()

    onMounted(async () => {
      try {
        const response = await fetch('/site.json')
        const data: SiteData = await response.json()
        if (data.success) {
          categories.value = data.data.categories
          // Flatten all boards from all categories
          allBoards.value = data.data.categories.flatMap(cat => cat.boards)
          
          // Store system settings
          if (data.data.systemSettings) {
            systemSettings.value = data.data.systemSettings
          }
          
          // Store header text banners
          if (data.data.textBanners?.header) {
            headerTextBanners.value = data.data.textBanners.header.sort((a, b) => a.orderNum - b.orderNum)
          }
          
          // Store footer text banners
          if (data.data.textBanners?.footer) {
            footerTextBanners.value = data.data.textBanners.footer.sort((a, b) => a.orderNum - b.orderNum)
          }
          
          // Initialize popup flow with popup data
          if (data.data.popups) {
            initializePopupFlow(data.data.popups)
          }
        }
      } catch (error) {
        console.error('Failed to load site data:', error)
      }
    })

    const filteredBoards = computed(() => {
      let boards = allBoards.value

      // Filter by category
      if (selectedCategory.value !== 'all') {
        const categoryMap: Record<string, string> = {
          'best': 'En İyi Siteler',
          'trusted': 'En Güvenilir Siteler'
        }
        const categoryTitle = categoryMap[selectedCategory.value]
        const category = categories.value.find(cat => cat.title === categoryTitle)
        boards = category?.boards || []
      }

      // Filter by search
      if (searchQuery.value) {
        boards = boards.filter((board) =>
          board.brandName.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }

      return boards
    })

    const handleSearch = (query: string) => {
      searchQuery.value = query
    }

    return () => {
      return (
      <div class="min-h-screen w-full relative bg-[#010A29] text-[var(--color-text-primary)] overflow-x-hidden">
        {/* Popup Modal System */}
        <PopupModal
          images={getCurrentPopupImages()}
          type={getCurrentPopupType()}
          isOpen={isPopupOpen.value}
          onClose={handlePopupClose}
          redirectDomain={systemSettings.value.redirectDomain}
        />

        {/* Main Content */}
        <div class="relative z-10 flex flex-col min-h-screen pt-[50px]">
          <NeonHeader 
            textBanners={headerTextBanners.value}
            redirectDomain={systemSettings.value.redirectDomain}
          />

          <main class="flex-1 container mx-auto px-3 py-8 pt-[140px] md:pt-[160px]">
            {/* Hero Section */}
            <div class="text-center mb-8 space-y-4">
              <h2 class="font-pixel text-lg md:text-3xl lg:text-4xl text-[var(--color-primary)] animate-pulse leading-relaxed">
                INSERT COIN TO PLAY
              </h2>
              <p class="font-terminal text-xl md:text-2xl lg:text-3xl text-[var(--color-secondary-light)] max-w-2xl mx-auto leading-relaxed px-2">
                EXPERIENCE THE FUTURE OF GAMING WITH OUR CURATED SELECTION OF
                HIGH-VOLTAGE CASINOS
              </p>
            </div>

            {/* Search Bar */}
            <NeonSearchBar onSearch={handleSearch} />

            {/* Categories Section */}
            <div class="mb-8 mt-8 max-w-md mx-auto px-4">
              <div class="grid grid-cols-2 gap-2 md:gap-4">
                <button
                  class={`
                    font-pixel text-[8px] sm:text-[10px] md:text-sm px-3 sm:px-4 md:px-6 py-2 md:py-3
                    border-2 transition-all duration-300 whitespace-nowrap
                    ${selectedCategory.value === 'all' 
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10' 
                      : 'border-[var(--color-border-muted)] text-[var(--color-text-tertiary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)]'
                    }
                  `}
                  onClick={() => selectedCategory.value = 'all'}
                >
                  ALL WEBSITES
                </button>
                <button
                  class={`
                    font-pixel text-[8px] sm:text-[10px] md:text-sm px-3 sm:px-4 md:px-6 py-2 md:py-3
                    border-2 transition-all duration-300 whitespace-nowrap
                    ${selectedCategory.value === 'best' 
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10' 
                      : 'border-[var(--color-border-muted)] text-[var(--color-text-tertiary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)]'
                    }
                  `}
                  onClick={() => selectedCategory.value = 'best'}
                >
                  BEST WEBSITES
                </button>
                <button
                  class={`
                    col-span-2 font-pixel text-[8px] sm:text-[10px] md:text-sm px-3 sm:px-4 md:px-6 py-2 md:py-3
                    border-2 transition-all duration-300 whitespace-nowrap
                    ${selectedCategory.value === 'trusted' 
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10' 
                      : 'border-[var(--color-border-muted)] text-[var(--color-text-tertiary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)]'
                    }
                  `}
                  onClick={() => selectedCategory.value = 'trusted'}
                >
                  TRUSTED WEBSITES
                </button>
              </div>
            </div>

            {/* Casino Grid - Mobile: 2 cards per row, Tablet+: 3 cards per row */}
            {filteredBoards.value.length > 0 ? (
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-w-7xl mx-auto">
                {filteredBoards.value.map((board, index) => (
                  <CasinoCard
                    key={board.id}
                    name={board.brandName}
                    bonus={`${board.prize} ${board.prizeDescription}`}
                    rating={board.isPinned ? 5 : 4}
                    features={[board.title, 'Visit Website', 'More Info']}
                    color="cyan"
                    delay={index * 100}
                    href={board.href}
                    redirectDomain={systemSettings.value.redirectDomain}
                  />
                ))}
              </div>
            ) : (
              <div class="text-center py-20 border-2 border-dashed border-[var(--color-primary)]/30 rounded-lg bg-[var(--color-bg-secondary)]/40">
                <p class="font-pixel text-xl text-[var(--color-primary)] animate-pulse">
                  NO GAMES FOUND
                </p>
                <p class="font-terminal text-[var(--color-text-tertiary)] mt-2">
                  TRY A DIFFERENT SEARCH TERM...
                </p>
              </div>
            )}

            {/* Footer CTA */}
            <div class="mt-12 md:mt-20 text-center pb-12">
              <div class="inline-block p-1 border-2 border-[var(--color-secondary)] max-w-full">
                <div class="bg-[var(--color-bg-secondary)] p-4 md:p-8">
                  <h3 class="font-pixel text-sm md:text-xl lg:text-2xl mb-4 md:mb-6 text-[var(--color-text-primary)] leading-relaxed">
                    READY TO LEVEL UP?
                  </h3>
                  <div class="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
                    <PixelButton variant="cyan">VIEW ALL CASINOS</PixelButton>
                    <PixelButton variant="pink">JOIN VIP CLUB</PixelButton>
                  </div>
                </div>
              </div>
            </div>
          </main>
          
          {/* Footer */}
          <Footer 
            systemSettings={systemSettings.value}
            textBanners={footerTextBanners.value}
          />
        </div>
      </div>
      )
    }
  }
})

