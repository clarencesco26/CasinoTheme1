import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TestApp',
  setup() {
    return () => (
      <div style={{ 
        background: 'linear-gradient(to bottom, #1a0b2e, #2d0b42)', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#00FFFF',
        fontSize: '48px',
        fontFamily: 'monospace'
      }}>
        <h1 style={{
          textShadow: '0 0 10px #00FFFF, 0 0 20px #FF10F0',
          animation: 'pulse 2s infinite'
        }}>
          🎰 TSX IS WORKING! 🎰
        </h1>
      </div>
    )
  }
})
