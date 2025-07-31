import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useRaceEngine } from '../../src/composables/useRaceEngine'

describe('useRaceEngine with fake timers', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
  })

  it('start schedules frame and frameHandler is called on next frame; pause cancels further ticks', () => {
    const frameHandler = vi.fn()
    const { isRunning, start, pause } = useRaceEngine(frameHandler)

    // Before starting, should not be running
    expect(isRunning.value).toBe(false)

    // Start -> schedules one frame
    start()
    expect(isRunning.value).toBe(true)

    // Advance to the next frame: handler should be invoked once
    vi.advanceTimersToNextFrame()
    expect(frameHandler).toHaveBeenCalledWith(expect.any(Number), expect.any(Number))

    // Capture the current call count
    const callCount = frameHandler.mock.calls.length

    // Pause the loop
    pause()
    expect(isRunning.value).toBe(false)

    // Advance timers again: handler should NOT be called further
    vi.advanceTimersToNextFrame()
    expect(frameHandler).toHaveBeenCalledTimes(callCount)
  })
})
