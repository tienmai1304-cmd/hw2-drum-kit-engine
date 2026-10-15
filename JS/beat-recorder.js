
/**
 * T-06: FIFO Beat Recorder
 * Records drum events in the order they occur.
 * Each event includes a monotonic timestamp in milliseconds.
 */

const BeatRecorder = (() => {
  const queue = [];
  let head = 0;

  function record({ key, sound, input }) {
    const event = Object.freeze({
      key,
      sound,
      input,
      timestamp: performance.now(),
    });

    queue.push(event);

    return event;
  }

  function dequeue() {
    if (head >= queue.length) {
      return null;
    }

    const event = queue[head];
    head += 1;

    // Compact the queue after consumed events accumulate.
    if (head >= 50 && head * 2 >= queue.length) {
      queue.splice(0, head);
      head = 0;
    }

    return event;
  }

  function getEvents() {
    return queue.slice(head);
  }

  function clear() {
    queue.length = 0;
    head = 0;
  }

  function size() {
    return queue.length - head;
  }

  return Object.freeze({
    record,
    dequeue,
    getEvents,
    clear,
    size,
  });
})();
