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
  opts: ArchyOptions = {},
): string {
  const chars: readonly [string, string, string, string, string] =
    opts.unicode === false ? ASCII_CHARS : UNICODE_CHARS;
  return _archy(obj, prefix, prefix, ...chars);
}

function _archy(
  obj: ArchyNode | string,
  linePrefix: string,
  contPrefix: string,
  pipe: string,
  corner: string,
  tee: string,
  dash: string,
  branch: string,
): string {
  if (typeof obj === "string") obj = { label: obj };
  const nodes = obj.nodes || [];
  const len = nodes.length;
  const label = obj.label;

  let out = linePrefix + label;
  if (~label.indexOf("\n")) {
    out =
      linePrefix +
      label.split("\n").join("\n" + contPrefix + (len ? pipe : " ") + " ");
  }
  out += "\n";

  if (!len) return out;

  for (let i = 0; i < len; i++) {
    const node = nodes[i];
    const last = i === len - 1;
    const childContPrefix = contPrefix + (last ? "  " : pipe + " ");

    const isObj = typeof node === "object" && node;
    const childNodes = isObj ? (node as ArchyNode).nodes : null;
    const hasChildren = childNodes && childNodes.length > 0;

    out +=
      contPrefix +
      (last ? corner : tee) +
      dash +
      (hasChildren ? branch : dash) +
      " ";

    if (hasChildren) {
      out += _archy(
        node as ArchyNode,
        "",
        childContPrefix,
        pipe,
        corner,
        tee,
        dash,
        branch,
      );
    } else {
      const childLabel = isObj ? (node as ArchyNode).label : (node as string);
      if (childLabel.indexOf("\n") < 0) {
        out += childLabel + "\n";
      } else {
        out +=
          childLabel.split("\n").join("\n" + childContPrefix + "  ") + "\n";
      }
    }
  }
  return out;
}

export default archy;
