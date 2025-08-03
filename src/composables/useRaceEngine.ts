import { onBeforeUnmount, ref } from 'vue'

export function useRaceEngine(
  frameHandler: (delta: number, now: number) => void
) {
  const isRunning = ref(false)
  let frameId: number | null = null
  let lastFrameTime = 0

  function tick(now: number) {
    try {
      const delta = now - lastFrameTime
      lastFrameTime = now
      frameHandler(delta, now)
      if (isRunning.value) {
        frameId = requestAnimationFrame(tick)
      }
    } catch (error) {
      console.error('Error during executing tick', error)
      pause()
    }
  }

  function start() {
    if (isRunning.value) {
      return
    }
    isRunning.value = true
    lastFrameTime = performance.now()
    frameId = requestAnimationFrame(tick)
  }

  function pause() {
    isRunning.value = false
    if (frameId !== null) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
  }

  onBeforeUnmount(() => {
    pause()
  })

  return { isRunning, start, pause }
}
