import { Children, type ReactElement, type ReactNode, cloneElement, isValidElement, useId } from "react"

const isElementWithProps = (
  node: ReactNode
): node is ReactElement<{ id?: string; children?: ReactNode } & Record<string, unknown>> => isValidElement(node)

const collectSvgIds = (node: ReactNode, ids = new Set<string>()) => {
  if (!isElementWithProps(node)) return ids
  if (node.props.id) ids.add(node.props.id)
  Children.forEach(node.props.children, (child) => collectSvgIds(child, ids))
  return ids
}

const remapReferenceValue = (value: string, idMap: ReadonlyMap<string, string>) => {
  const urlRemappedValue = value.replace(/url\(#([^)]+)\)/g, (match, id) => {
    const mapped = idMap.get(id)
    return mapped ? `url(#${mapped})` : match
  })

  if (!urlRemappedValue.startsWith("#")) return urlRemappedValue

  const mapped = idMap.get(urlRemappedValue.slice(1))
  return mapped ? `#${mapped}` : urlRemappedValue
}

type RemappedStringProps = Partial<Record<string, string>>

const remapSvgProps = (
  props: { id?: string; children?: ReactNode } & Record<string, unknown>,
  idMap: ReadonlyMap<string, string>
): {
  props: RemappedStringProps
  changed: boolean
} => {
  const mappedId = props.id ? idMap.get(props.id) : undefined
  const remappedPropEntries = Object.entries(props).flatMap(([key, value]) => {
    if (key === "children" || typeof value !== "string") return []

    const newValue = remapReferenceValue(value, idMap)
    return newValue !== value ? ([[key, newValue]] as const) : []
  })

  return {
    props: {
      ...(mappedId && mappedId !== props.id ? { id: mappedId } : {}),
      ...(Object.fromEntries(remappedPropEntries) as RemappedStringProps)
    },
    changed: (mappedId !== undefined && mappedId !== props.id) || remappedPropEntries.length > 0
  }
}

const remapSvgChildren = (
  children: ReactNode,
  idMap: ReadonlyMap<string, string>
): {
  children: ReactNode[]
  changed: boolean
} => {
  const childResults = Children.toArray(children).map((child) => remapSvgNode(child, idMap))

  return {
    children: childResults.map((result) => result.node),
    changed: childResults.some((result) => result.changed)
  }
}

const remapSvgNode = (node: ReactNode, idMap: ReadonlyMap<string, string>): { node: ReactNode; changed: boolean } => {
  if (!isElementWithProps(node)) return { node, changed: false }

  const remappedProps = remapSvgProps(node.props, idMap)
  const remappedChildren = remapSvgChildren(node.props.children, idMap)
  const changed = remappedProps.changed || remappedChildren.changed

  if (!changed) return { node, changed: false }

  return {
    node: cloneElement(node, {
      ...remappedProps.props,
      ...(remappedChildren.changed ? { children: remappedChildren.children } : {})
    }),
    changed: true
  }
}

const remapSvgIds = <T extends ReactElement>(iconElement: T, idNamespace: string): T => {
  const ids = collectSvgIds(iconElement)
  if (ids.size === 0) return iconElement

  const idMap = new Map<string, string>()
  ids.forEach((id) => idMap.set(id, `${id}-${idNamespace}`))

  const result = remapSvgNode(iconElement, idMap)
  return result.node as T
}

export const useSvg = <T extends ReactElement>(iconElement: T): T => {
  const generatedId = useId()
  const idNamespace = generatedId.replace(/:/g, "")

  return remapSvgIds(iconElement, idNamespace)
}
