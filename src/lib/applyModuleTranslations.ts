export type ModuleTextOverride = {
  moduleKey?: string
  fieldPath?: string
  text?: string
}

function setNestedValue(target: Record<string, unknown>, path: string[], value: string) {
  if (!path.length) return
  const lastKey = path[path.length - 1]
  const parentPath = path.slice(0, -1)
  let cursor: Record<string, unknown> | undefined = target

  for (const segment of parentPath) {
    const next = cursor[segment]
    if (next && typeof next === 'object' && !Array.isArray(next)) {
      cursor = next as Record<string, unknown>
    } else {
      return
    }
  }

  if (cursor && lastKey) {
    cursor[lastKey] = value
  }
}

export function applyModuleTextOverrides<T extends {_key?: string; [key: string]: unknown}>(
  modules: T[] | undefined,
  overrides: ModuleTextOverride[] | undefined
): T[] | undefined {
  if (!Array.isArray(modules) || !Array.isArray(overrides)) return modules

  return modules.map((module) => {
    const matchingOverrides = overrides.filter(
      (override) => override?.moduleKey && override.moduleKey === module._key && override.text && override.fieldPath
    )

    if (matchingOverrides.length === 0) return module

    const cloned = {...module} as Record<string, unknown>

    matchingOverrides.forEach(({fieldPath, text}) => {
      if (!fieldPath || !text) return
      const segments = fieldPath.split('.').map((segment) => segment.trim()).filter(Boolean)
      if (segments.length === 0) return
      setNestedValue(cloned, segments, text)
    })

    return cloned as T
  })
}
