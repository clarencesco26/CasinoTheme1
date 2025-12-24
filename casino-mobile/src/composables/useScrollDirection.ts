import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollDirection() {
  const isScrollingDown = ref(false)
  const showBanner = ref(true)
  
  let lastScrollY = 0
  let ticking = false

  const updateScrollDirection = () => {
    const currentScrollY = window.scrollY

    // Determine scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 0) {
      // Scrolling down
      if (!isScrollingDown.value) {
        isScrollingDown.value = true
        showBanner.value = false
      }
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up
      if (isScrollingDown.value) {
        isScrollingDown.value = false
        showBanner.value = true
      }
    }

    lastScrollY = currentScrollY
    ticking = false
  }

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollDirection)
      ticking = true
    }
  }

  onMounted(() => {
    lastScrollY = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    showBanner,
    isScrollingDown
  }
}
