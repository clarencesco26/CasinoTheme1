import { defineComponent, ref, computed, watch, onMounted, onUnmounted, type PropType } from 'vue'
import { X } from 'lucide-vue-next'

interface PopupImage {
  id: number
  imageUrl: string
  href: string
  orderNum: number
  isPinned: boolean
}

export default defineComponent({
  name: 'PopupModal',
  props: {
    images: {
      type: Array as PropType<PopupImage[]>,
      required: true
    },
    type: {
      type: String as PropType<'carousel' | 'single'>,
      default: 'carousel'
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    redirectDomain: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const currentIndex = ref(0)
    const startX = ref(0)
    const isDragging = ref(false)
    const translateX = ref(0)
    const autoScrollInterval = ref<NodeJS.Timeout | null>(null)

    // Sort images: pinned first, then randomize others
    const sortedImages = computed(() => {
      if (props.images.length === 0) return []
      
      const pinned = props.images.filter(img => img.isPinned)
      const unpinned = props.images.filter(img => !img.isPinned)
      
      // Shuffle unpinned
      const shuffled = [...unpinned].sort(() => Math.random() - 0.5)
      
      return [...pinned, ...shuffled]
    })

    // For single type, randomly pick one image
    const singleImage = computed(() => {
      if (props.type === 'single' && sortedImages.value.length > 0) {
        const randomIndex = Math.floor(Math.random() * sortedImages.value.length)
        return sortedImages.value[randomIndex]
      }
      return null
    })

    const displayImages = computed(() => {
      if (props.type === 'single') {
        return singleImage.value ? [singleImage.value] : []
      }
      return sortedImages.value.slice(0, 4) // Max 4 for carousel
    })

    const canGoPrev = computed(() => currentIndex.value > 0)
    const canGoNext = computed(() => currentIndex.value < displayImages.value.length - 1)

    const handleClose = () => {
      emit('close')
    }

    const handleOverlayClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose()
      }
    }

    const goToSlide = (index: number) => {
      if (index >= 0 && index < displayImages.value.length) {
        currentIndex.value = index
      }
    }

    const nextSlide = () => {
      if (canGoNext.value) {
        currentIndex.value++
      } else {
        // Loop back to first slide
        currentIndex.value = 0
      }
    }

    const prevSlide = () => {
      if (canGoPrev.value) {
        currentIndex.value--
      }
    }

    // Auto-scroll functionality for carousel
    const startAutoScroll = () => {
      if (props.type !== 'carousel' || displayImages.value.length <= 1) return
      
      stopAutoScroll()
      autoScrollInterval.value = setInterval(() => {
        nextSlide()
      }, 3000) // Auto-scroll every 3 seconds
    }

    const stopAutoScroll = () => {
      if (autoScrollInterval.value) {
        clearInterval(autoScrollInterval.value)
        autoScrollInterval.value = null
      }
    }

    const resetAutoScroll = () => {
      stopAutoScroll()
      startAutoScroll()
    }

    // Touch/Swipe handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (props.type !== 'carousel' || displayImages.value.length <= 1) return
      stopAutoScroll() // Pause auto-scroll when user interacts
      startX.value = e.touches[0].clientX
      isDragging.value = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.value) return
      const currentX = e.touches[0].clientX
      translateX.value = currentX - startX.value
    }

    const handleTouchEnd = () => {
      if (!isDragging.value) return
      
      const threshold = 50
      if (translateX.value < -threshold && canGoNext.value) {
        nextSlide()
      } else if (translateX.value > threshold && canGoPrev.value) {
        prevSlide()
      }
      
      isDragging.value = false
      translateX.value = 0
      resetAutoScroll() // Resume auto-scroll after interaction
    }

    const handleImageClick = (image: PopupImage) => {
      if (image.href) {
        const fullUrl = props.redirectDomain 
          ? `${props.redirectDomain}${image.href}`
          : image.href
        window.open(fullUrl, '_blank', 'noopener,noreferrer')
      }
    }

    // Prevent body scroll when modal is open
    watch(() => props.isOpen, (isOpen) => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
        currentIndex.value = 0
        startAutoScroll() // Start auto-scroll when popup opens
      } else {
        document.body.style.overflow = ''
        stopAutoScroll() // Stop auto-scroll when popup closes
      }
    })

    onUnmounted(() => {
      document.body.style.overflow = ''
      stopAutoScroll()
    })

    return () => {
      if (!props.isOpen || displayImages.value.length === 0) return null

      return (
        <div
          class="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={handleOverlayClick}
        >
          {/* Modal Container */}
          <div
            class="relative w-full max-w-md bg-[var(--color-bg-secondary)] border-2 border-[var(--color-secondary)] rounded-lg overflow-hidden animate-slide-up-scale"
            onClick={(e: Event) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              class="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-[var(--color-bg-primary)] border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
              onClick={handleClose}
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div class="relative">
              {/* Image Display */}
              <div
                class="relative overflow-hidden"
                style={{ aspectRatio: props.type === 'single' ? '0.7' : '1.5' }}
                onTouchstart={handleTouchStart}
                onTouchmove={handleTouchMove}
                onTouchend={handleTouchEnd}
              >
                <div
                  class="flex transition-transform duration-300 ease-out h-full"
                  style={{
                    transform: `translateX(calc(-${currentIndex.value * 100}% + ${isDragging.value ? translateX.value : 0}px))`
                  }}
                >
                  {displayImages.value.map((image) => (
                    <div
                      key={image.id}
                      class="flex-shrink-0 w-full h-full cursor-pointer"
                      onClick={() => handleImageClick(image)}
                    >
                      <img
                        src={image.imageUrl}
                        alt="Popup"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator */}
              {props.type === 'carousel' && displayImages.value.length > 1 && (
                <div class="flex justify-center gap-2 py-4 bg-[var(--color-bg-primary)]">
                  {displayImages.value.map((_, index) => (
                    <button
                      key={index}
                      class={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentIndex.value
                          ? 'bg-[var(--color-secondary)] w-6'
                          : 'bg-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]/50'
                      }`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              )}

              {/* Single Image Footer */}
              {props.type === 'single' && (
                <div class="p-4 bg-[var(--color-bg-primary)] border-t-2 border-[var(--color-secondary)]">
                  <p class="font-pixel text-xs md:text-sm text-center text-[var(--color-secondary)]">
                    TAP IMAGE TO VISIT
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
  }
})
