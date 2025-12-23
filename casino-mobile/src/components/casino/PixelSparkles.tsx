import { defineComponent, onMounted, ref } from 'vue'

interface Sparkle {
  id: number
  left: number
  size: number
  delay: number
  color: string
}

export default defineComponent({
  name: 'PixelSparkles',
  setup() {
    const sparkles = ref<Sparkle[]>([])

    onMounted(() => {
      // Create initial sparkles
      const colors = ['#FF10F0', '#00FFFF', '#B026FF', '#FFFFFF']
      const newSparkles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() > 0.5 ? 4 : 8,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)] as string
      }))
      sparkles.value = newSparkles
    })

    return () => (
      <div class="fixed inset-0 z-10 pointer-events-none overflow-hidden">
        {sparkles.value.map((sparkle) => (
          <div
            key={sparkle.id}
            class="absolute bottom-0 opacity-0"
            style={{
              left: `${sparkle.left}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              backgroundColor: sparkle.color,
              boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
              animation: `float 4s linear infinite`,
              animationDelay: `${sparkle.delay}s`
            }}
          />
        ))}
      </div>
    )
  }
})
