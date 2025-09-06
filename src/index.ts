export interface ArchyNode {
  label: string;
  nodes?: Array<ArchyNode | string>;
}

export interface ArchyOptions {
  unicode?: boolean;
}

const UNICODE_CHARS = ["│", "└", "├", "─", "┬"] as const;
const ASCII_CHARS = ["|", "`", "+", "-", "-"] as const;

function archy(
  obj: ArchyNode | string,
  prefix = "",
  opts: ArchyOptions = {}
): string {
  const [pipe, corner, tee, dash, branch] =
    opts.unicode === false ? ASCII_CHARS : UNICODE_CHARS;
  if (typeof obj === "string") obj = { label: obj };
  const nodes = obj.nodes || [];
  const len = nodes.length;
  const label = obj.label;
  let out = prefix;
  if (label.indexOf("\n") < 0) {
    out += label + "\n";
  } else {
    out +=
      label.split("\n").join("\n" + prefix + (len ? pipe : " ") + " ") + "\n";
  }
  if (!len) return out;

  const sliceBase = prefix.length + 2;
  for (let i = 0; i < len; i++) {
    const node = nodes[i];
    const last = i === len - 1;
    const nextPrefix = prefix + (last ? "  " : pipe + " ");
    let childNodes: any;
    const hasChildren =
      typeof node === "object" &&
      node &&
      (childNodes = node.nodes) &&
      childNodes.length > 0;

    out +=
      prefix +
      (last ? corner : tee) +
      dash +
      (hasChildren ? branch : dash) +
      " ";

    if (hasChildren) {
      const childRendered = archy(node, nextPrefix, opts);
      out += childRendered.slice(sliceBase);
    } else {
      let childLabel = typeof node === "string" ? node : node.label;
      if (childLabel.indexOf("\n") < 0) {
        out += childLabel + "\n";
      } else {
        out += childLabel.split("\n").join("\n" + nextPrefix + "  ") + "\n";
      }
    }
  }
  return out;
}

export default archy;
