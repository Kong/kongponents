const MODIFIER_KEY_CODES = ['ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'AltLeft']

export type Command = {
  /**
   * Command handler.
   */
  trigger: (event: Event) => (Promise<void> | void)

  /**
   * Checks whether the context in which the command is triggering is permitted.
   *
   * The function is passed the associated `KeyboardEvent`. The event’s [`event.composedPath()`][1] method is convenient to check where an event originates (e.g. does it come within the code block?).
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
   */
  isAllowedContext?: (event: Event) => boolean

  /**
   * Disables the shortcut dynamically.
   */
  isDisabled?: () => boolean

  /**
   * Whether to prevent the default action of a command. For example, when adding auto complete features to a text input, one might want to prevent the default action associated with pressing the up and down arrow keys.
   */
  shouldPreventDefaultAction?: boolean
}

/**
 * A small utility class for managing keyboard shortcuts.
 *
 * **Usage**:
 *
 * ```js
 * const keyMap = {
 *   'alt+f': 'toggleFilterMode',
 *   'alt+g': 'toggleFilterMode',
 * }
 *
 * const commands = {
 *   toggleFilterMode: {
 *     trigger: toggleFilterMode,
 *     shouldPreventDefaultAction: true,
 *   },
 * }
 *
 * function toggleFilterMode() {
 *   // Do something …
 * }
 *
 * const shortcutManager = new ShortcutManager(keyMap, commands)
 *
 * shortcutManager.registerListener()
 * ```
 */
export class ShortcutManager<CommandKeyword extends string> {
  commands: Record<CommandKeyword, Command>
  keyMap: Record<string, CommandKeyword>
  boundTriggerShortcuts: typeof this.triggerShortcuts

  constructor(keyMap: Record<string, CommandKeyword>, commands: Record<CommandKeyword, Command>) {
    this.commands = commands
    this.keyMap = Object.fromEntries(Object.entries(keyMap).map(([shortcut, commandKeyword]) => [shortcut.toLowerCase(), commandKeyword]))
    this.boundTriggerShortcuts = this.triggerShortcuts.bind(this)
  }

  registerListener() {
    document.addEventListener('keydown', this.boundTriggerShortcuts)
  }

  unRegisterListener() {
    document.removeEventListener('keydown', this.boundTriggerShortcuts)
  }

  triggerShortcuts(event: KeyboardEvent): void {
    triggerShortcuts(event, this.keyMap, this.commands)
  }
}

function triggerShortcuts<CommandKeyword extends string>(event: KeyboardEvent, keyMap: Record<string, CommandKeyword>, commands: Record<CommandKeyword, Command>): void {
  const code = normalizeKeyCode(event.code)
  const shortcut = [
    event.ctrlKey ? 'ctrl' : '',
    event.shiftKey ? 'shift' : '',
    event.altKey ? 'alt' : '',
    code,
  ].filter((key) => key !== '').join('+')
  const commandKey = keyMap[shortcut]

  if (!commandKey) {
    return
  }

  const command = commands[commandKey]

  // Prevents invoking shortcuts from outside a certain allowed context.
  if (command.isAllowedContext) {
    const isAllowedContext = command.isAllowedContext(event)

    if (!isAllowedContext) {
      return
    }
  }

  if ((command.shouldPreventDefaultAction)) {
    event.preventDefault()
  }

  if (command.isDisabled && command.isDisabled()) {
    return
  }

  command.trigger(event)
}

function normalizeKeyCode(code: string): string {
  // Returns relevant modifier keys as the empty string which is going to be filtered out.
  if (MODIFIER_KEY_CODES.includes(code)) {
    return ''
  }

  return code.replace(/^Key/, '').toLowerCase()
}
