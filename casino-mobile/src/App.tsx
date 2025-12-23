import { defineComponent, ref, computed } from 'vue'
import RetroGrid from './components/casino/RetroGrid'
import PixelSparkles from './components/casino/PixelSparkles'
import NeonHeader from './components/ui/NeonHeader'
import CasinoCard from './components/casino/CasinoCard'
import PixelButton from './components/ui/PixelButton'
import NeonSearchBar from './components/ui/NeonSearchBar'

export default defineComponent({
  name: 'App',
  setup() {
    const searchQuery = ref('')

    const casinos = [
      {
        name: 'NEON VEGAS',
        bonus: '500% UP TO $5000',
        rating: 5,
        features: ['Instant Payouts', 'Crypto Accepted', 'VIP Program'],
        color: 'pink' as const
      },
      {
        name: 'CYBER SLOTS',
        bonus: '200 FREE SPINS',
        rating: 4,
        features: ['No Wager Spins', 'Daily Cashback', '24/7 Support'],
        color: 'cyan' as const
      },
      {
        name: 'RETRO BET',
        bonus: '$1000 WELCOME PACK',
        rating: 5,
        features: ['Sports Betting', 'Live Dealer', 'High Limits'],
        color: 'purple' as const
      },
      {
        name: 'PIXEL PALACE',
        bonus: '300% MATCH BONUS',
        rating: 4,
        features: ['Exclusive Games', 'Weekly Tournaments', 'Mobile App'],
        color: 'cyan' as const
      },
      {
        name: 'SYNTH SPIN',
        bonus: '100% + 50 SPINS',
        rating: 5,
        features: ['Low Volatility', 'Jackpot Drops', 'Fast KYC'],
        color: 'pink' as const
      },
      {
        name: 'VAPOR WIN',
        bonus: '$2500 RELOAD',
        rating: 4,
        features: ['Retro Theme', 'Loyalty Shop', 'Weekly Races'],
        color: 'purple' as const
      },
      {
        name: 'NEON RUSH',
        bonus: '400% + 100 SPINS',
        rating: 5,
        features: ['Mega Jackpots', 'VIP Rewards', 'No Limits'],
        color: 'pink' as const
      },
      {
        name: 'CYBER PALACE',
        bonus: '$3000 BONUS',
        rating: 4,
        features: ['Instant Withdrawal', 'Live Chat', 'Daily Drops'],
        color: 'cyan' as const
      },
      {
        name: 'ARCADE GOLD',
        bonus: '250% MATCH',
        rating: 5,
        features: ['Golden Spins', 'Cashback', 'Mobile First'],
        color: 'purple' as const
      },
      {
        name: 'FLASH BET',
        bonus: '150 NO WAGER',
        rating: 4,
        features: ['Lightning Fast', 'Crypto Only', 'No KYC'],
        color: 'cyan' as const
      },
      {
        name: 'RETRO RUSH',
        bonus: '600% MEGA BONUS',
        rating: 5,
        features: ['Max Cashout', 'VIP Club', 'Weekly Bonus'],
        color: 'pink' as const
      },
      {
        name: 'NEON BLITZ',
        bonus: '$5000 PACKAGE',
        rating: 5,
        features: ['High Roller', 'Private Tables', 'Concierge'],
        color: 'purple' as const
      },
      {
        name: 'PIXEL SPIN',
        bonus: '300 FREE GAMES',
        rating: 4,
        features: ['Low Stakes', 'Tournaments', 'Leaderboard'],
        color: 'cyan' as const
      },
      {
        name: 'VAPOR SLOTS',
        bonus: '200% + 200 SPINS',
        rating: 5,
        features: ['Mega Wins', 'Daily Races', 'Loyalty Points'],
        color: 'pink' as const
      },
      {
        name: 'SYNTH PALACE',
        bonus: '$10000 VIP',
        rating: 5,
        features: ['Exclusive Access', 'Personal Host', 'Max Limits'],
        color: 'purple' as const
      }
    ]

    const filteredCasinos = computed(() =>
      casinos.filter((casino) =>
        casino.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    )

    const handleSearch = (query: string) => {
      searchQuery.value = query
    }

    return () => {
      return (
      <div class="min-h-screen w-full relative bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden scanlines">
        {/* Background Elements */}
        <RetroGrid />
        <PixelSparkles />

        {/* Main Content */}
        <div class="relative z-10 flex flex-col min-h-screen">
          <NeonHeader />

          <main class="flex-1 container mx-auto px-3 py-8 pt-[200px] md:pt-[220px]">
            {/* Hero Section */}
            <div class="text-center mb-8 space-y-4">
              <h2 class="font-pixel text-lg md:text-3xl lg:text-4xl text-[var(--color-accent)] drop-shadow-[0_0_10px_var(--color-accent)] animate-pulse leading-relaxed">
                INSERT COIN TO PLAY
              </h2>
              <p class="font-terminal text-xl md:text-2xl lg:text-3xl text-[var(--color-secondary-light)] max-w-2xl mx-auto leading-relaxed drop-shadow-[0_0_5px_var(--color-secondary-glow)] px-2">
                EXPERIENCE THE FUTURE OF GAMING WITH OUR CURATED SELECTION OF
                HIGH-VOLTAGE CASINOS
              </p>
            </div>

            {/* Search Bar */}
            <NeonSearchBar onSearch={handleSearch} />

            {/* Casino Grid - Mobile: 2 cards per row, Tablet+: 3 cards per row */}
            {filteredCasinos.value.length > 0 ? (
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-w-7xl mx-auto">
                {filteredCasinos.value.map((casino, index) => (
                  <CasinoCard key={index} {...casino} delay={index * 100} />
                ))}
              </div>
            ) : (
              <div class="text-center py-20 border-2 border-dashed border-[var(--color-primary)]/30 rounded-lg bg-[var(--color-bg-secondary)]/40 backdrop-blur-sm">
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
              <div class="inline-block p-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] max-w-full">
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

              <footer class="mt-8 md:mt-12 font-terminal text-[var(--color-text-muted)] text-sm md:text-lg">
                <p>© 2024 ARCADE CASINO ZONE. ALL RIGHTS RESERVED.</p>
                <p class="text-xs mt-2 opacity-50">HIGH SCORE: 999,999</p>
              </footer>
            </div>
          </main>
        </div>
      </div>
      )
    }
  }
})

