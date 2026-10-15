# TASK_DECOMPOSITION.md

# HW2 — Drum Kit Engine

## 1. Project Objective

Build a browser-based Drum Kit Engine using semantic HTML5, modern CSS, and Vanilla JavaScript ES6+.

The implementation must follow a contract-first, task-by-task workflow. Each subsystem must be implemented and verified independently before integration.

## 2. Architectural Constraints

- Use Vanilla HTML5, CSS, and JavaScript ES6+ only.
- Do not use jQuery, Bootstrap, Tailwind, or external JavaScript libraries/CDNs.
- Use semantic HTML and accessible controls.
- Store sound-source information in HTML `data-sound` attributes.
- Keep the audio engine independent of keyboard and UI event handlers.
- Use `const` by default and `let` only when reassignment is necessary.
- Use the standard `keydown` event and `event.key`.
- Ignore repeated keyboard events using `event.repeat`.
- Do not use deprecated `keypress` or `event.keyCode`.
- Do not use inline JavaScript event handlers such as `onclick`.
- Inspect Git diffs and test each task before committing.

## 3. Work Breakdown Structure (WBS)

| Task ID | Subsystem | Scope | Verification |
|---|---|---|---|
| T-01 | Specification and contracts | Define HTML structure, sound attributes, keyboard mapping, and subsystem interfaces. | Review this document before implementation. |
| T-02 | HTML sound contract | Create semantic drum-pad controls and define their `data-sound` attributes before implementing JavaScript. | Inspect the HTML and verify that every pad has a valid sound-source contract. |
| T-03 | Audio playback engine | Implement an independent audio playback function that supports polyphonic playback. | Trigger multiple sounds in quick succession and verify that they can overlap. |
| T-04 | Keyboard event handling | Bind keyboard input to drum pads using `keydown` and prevent repeated playback using `event.repeat`. | Test each mapping and verify that holding a key does not repeatedly trigger sounds. |
| T-05 | FIFO Beat Recorder | Record triggered beat events in a first-in, first-out queue with timestamps. | Verify event ordering and timestamp recording. |
| T-06 | Integration and quality assurance | Integrate the subsystems and test functionality, accessibility, responsiveness, and error handling. | Test keyboard interaction, overlapping audio, recording order, and browser console errors. |

## 4. Interface Contracts

### HTML-to-Audio Contract

- Each drum pad must identify its audio source using `data-sound`.
- Each pad must expose a keyboard mapping through a clearly defined HTML data attribute.
- JavaScript must read the attributes instead of maintaining a duplicated hardcoded mapping.
- The exact attribute names and values must remain consistent across HTML and JavaScript.

### Audio Engine Contract

- The audio engine must expose a playback function that can be called independently of keyboard events.
- The engine must support multiple sounds playing concurrently.
- Keyboard event handling must not contain the audio engine's core playback implementation.

### Keyboard Contract

- Listen for `keydown`.
- Use `event.key` for key identification.
- Ignore events for which `event.repeat` is true.
- Resolve the pressed key to the corresponding drum pad and invoke the audio engine only when a valid mapping exists.

### Beat Recorder Contract

- Store beat events in a FIFO queue.
- Each recorded event must contain a timestamp and sufficient information to identify the triggered sound or pad.
- Preserve the chronological order in which valid beat events are recorded.
- Keep recording logic separate from the core audio playback implementation.

## 5. Atomic Commit Plan

Each commit must contain one logically isolated change. Do not combine unrelated HTML, CSS, and JavaScript implementation tasks in a single commit.

1. `docs(spec): define drum kit contracts and WBS`
2. `feat(html): define semantic drum pad sound contract`
3. `feat(css): style responsive drum kit interface`
4. `feat(js): implement independent polyphonic audio engine`
5. `feat(js): bind keyboard events with repeat throttling`
6. `feat(js): implement FIFO beat recorder`
7. `test: verify drum kit contracts and interactions`

The HTML sound contract must be committed before any JavaScript implementation begins.

## 6. Quality Gates

- HTML sound-source and keyboard-mapping contracts are consistent.
- Multiple sounds can play concurrently.
- Holding a key does not trigger repeated playback through keyboard auto-repeat.
- FIFO recording preserves event order and timestamps.
- The interface is usable with keyboard controls.
- The layout works at a 375px viewport without horizontal scrolling.
- No JavaScript console errors occur during normal operation.
- Git history demonstrates the required atomic development workflow.

## 7. Implementation Status

- [x] T-01: Specification and contracts documented.
- [ ] T-02: HTML sound contract.
- [ ] T-03: Independent polyphonic audio engine.
- [ ] T-04: Keyboard event handling.
- [ ] T-05: FIFO Beat Recorder.
- [ ] T-06: Integration and quality assurance.
