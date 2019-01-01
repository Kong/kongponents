let error = console.error

console.error = function (message) {
  error.apply(console, arguments) // keep default behavior
  throw (message instanceof Error ? message : new Error(message))
}