import { onBeforeUnmount, ref } from 'vue'

export function useRaceEngine(
  frameHandler: (delta: number, now: number) => void
) {
  const isRunning = ref(false)
  let frameId: number | null = null
  let lastFrameTime = performance.now()

  function tick(now: number) {
    const delta = now - lastFrameTime
    lastFrameTime = now
    frameHandler(delta, now)
    if (isRunning.value) {
      frameId = requestAnimationFrame(tick)
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

  return { isRunning, start, pause, tick }
}
