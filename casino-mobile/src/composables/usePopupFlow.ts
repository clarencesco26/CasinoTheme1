import { ref, onMounted } from 'vue'

interface PopupImage {
  id: number
  imageUrl: string
  href: string
  orderNum: number
  isPinned: boolean
}

interface PopupData {
  first: PopupImage[]
  bigSingle: PopupImage[]
  second: PopupImage[]
}

type PopupStage = 'first' | 'bigSingle' | 'second' | 'completed'

const STORAGE_KEY = 'popup_flow_session'

export function usePopupFlow() {
  const currentStage = ref<PopupStage | null>(null)
  const isPopupOpen = ref(false)
  const popupData = ref<PopupData>({
    first: [],
    bigSingle: [],
    second: []
  })

  // Check if popups have been shown in this session
  const hasShownPopups = () => {
    const sessionData = sessionStorage.getItem(STORAGE_KEY)
    return sessionData === 'completed'
  }

  // Mark current stage as completed and move to next
  const completeCurrentStage = () => {
    if (!currentStage.value) return

    const stages: PopupStage[] = ['first', 'bigSingle', 'second', 'completed']
    const currentIndex = stages.indexOf(currentStage.value)
    const nextStage = stages[currentIndex + 1]

    if (nextStage === 'completed') {
      sessionStorage.setItem(STORAGE_KEY, 'completed')
      currentStage.value = 'completed'
      isPopupOpen.value = false
    } else {
      currentStage.value = nextStage
      // Check if next stage has content
      if (nextStage === 'bigSingle' && popupData.value.bigSingle.length === 0) {
        completeCurrentStage() // Skip if no content
      } else if (nextStage === 'second' && popupData.value.second.length === 0) {
        completeCurrentStage() // Skip if no content
      } else {
        isPopupOpen.value = true
      }
    }
  }

  // Initialize popup flow
  const initializePopupFlow = (data: PopupData) => {
    popupData.value = data

    // Always show popups on page load (removed session check)
    // Start with first stage if it has content
    if (data.first && data.first.length > 0) {
      currentStage.value = 'first'
      isPopupOpen.value = true
    } else if (data.bigSingle && data.bigSingle.length > 0) {
      currentStage.value = 'bigSingle'
      isPopupOpen.value = true
    } else if (data.second && data.second.length > 0) {
      currentStage.value = 'second'
      isPopupOpen.value = true
    } else {
      currentStage.value = 'completed'
      sessionStorage.setItem(STORAGE_KEY, 'completed')
    }
  }

  // Get current popup images
  const getCurrentPopupImages = () => {
    if (!currentStage.value || currentStage.value === 'completed') return []
    
    if (currentStage.value === 'first') return popupData.value.first
    if (currentStage.value === 'bigSingle') return popupData.value.bigSingle
    if (currentStage.value === 'second') return popupData.value.second
    
    return []
  }

  // Get current popup type
  const getCurrentPopupType = (): 'carousel' | 'single' => {
    return currentStage.value === 'bigSingle' ? 'single' : 'carousel'
  }

  // Handle popup close
  const handlePopupClose = () => {
    isPopupOpen.value = false
    // Use setTimeout to create a smooth transition between popups
    setTimeout(() => {
      completeCurrentStage()
    }, 300)
  }

  return {
    currentStage,
    isPopupOpen,
    initializePopupFlow,
    getCurrentPopupImages,
    getCurrentPopupType,
    handlePopupClose,
    hasShownPopups
  }
}
