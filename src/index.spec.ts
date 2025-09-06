import { describe, it, expect } from "vitest";
import archy from "./index";

describe("archy", () => {
  it("multi-line", () => {
    const s = archy({
      label: "beep\none\ntwo",
      nodes: [
        "ity",
        {
          label: "boop",
          nodes: [
            {
              label: "o_O\nwheee",
              nodes: [
                {
                  label: "oh",
                  nodes: ["hello", "puny\nmeat"],
                },
                "creature",
              ],
            },
            "party\ntime!",
          ],
        },
      ],
    });
    expect(s).toBe(
      [
        "beep",
        "│ one",
        "│ two",
        "├── ity",
        "└─┬ boop",
        "  ├─┬ o_O",
        "  │ │ wheee",
        "  │ ├─┬ oh",
        "  │ │ ├── hello",
        "  │ │ └── puny",
        "  │ │     meat",
        "  │ └── creature",
        "  └── party",
        "      time!",
        "",
      ].join("\n")
    );
  });

  it("beep", () => {
    const s = archy({
      label: "beep",
      nodes: [
        "ity",
        {
          label: "boop",
          nodes: [
            {
              label: "o_O",
              nodes: [
                {
                  label: "oh",
                  nodes: ["hello", "puny"],
                },
                "human",
              ],
            },
            "party!",
          ],
        },
      ],
    });
    expect(s).toBe(
      [
        "beep",
        "├── ity",
        "└─┬ boop",
        "  ├─┬ o_O",
        "  │ ├─┬ oh",
        "  │ │ ├── hello",
        "  │ │ └── puny",
        "  │ └── human",
        "  └── party!",
        "",
      ].join("\n")
    );
  });

  it("beep (ascii)", () => {
    const s = archy(
      {
        label: "beep",
        nodes: [
          "ity",
          {
            label: "boop",
            nodes: [
              {
                label: "o_O",
                nodes: [
                  {
                    label: "oh",
                    nodes: ["hello", "puny"],
                  },
                  "human",
                ],
              },
              "party!",
            ],
          },
        ],
      },
      "",
      { unicode: false }
    );
    expect(s).toBe(
      [
        "beep",
        "+-- ity",
        "`-- boop",
        "  +-- o_O",
        "  | +-- oh",
        "  | | +-- hello",
        "  | | `-- puny",
        "  | `-- human",
        "  `-- party!",
        "",
      ].join("\n")
    );
  });

  it("string as root node", () => {
    const s = archy("single string");
    expect(s).toBe("single string\n");
  });

  it("string as root node with nodes", () => {
    const s = archy({
      label: "root string",
      nodes: ["child1", "child2"],
    });
    expect(s).toBe(["root string", "├── child1", "└── child2", ""].join("\n"));
  });

  it("empty nodes array", () => {
    const s = archy({
      label: "empty",
      nodes: [],
    });
    expect(s).toBe("empty\n");
  });

  it("undefined nodes", () => {
    const s = archy({
      label: "no nodes",
    });
    expect(s).toBe("no nodes\n");
  });

  it("single line label", () => {
    const s = archy({
      label: "single",
      nodes: ["child"],
    });
    expect(s).toBe(["single", "└── child", ""].join("\n"));
  });

  it("leaf nodes", () => {
    const s = archy({
      label: "root",
      nodes: [{ label: "leaf1", nodes: [] }, { label: "leaf2" }, "string leaf"],
    });
    expect(s).toBe(
      ["root", "├── leaf1", "├── leaf2", "└── string leaf", ""].join("\n")
    );
  });

  it("mixed string and object nodes", () => {
    const s = archy({
      label: "root",
      nodes: ["string node", { label: "object node", nodes: ["child"] }],
    });
    expect(s).toBe(
      ["root", "├── string node", "└─┬ object node", "  └── child", ""].join(
        "\n"
      )
    );
  });

  it("empty string node", () => {
    const s = archy({
      label: "",
      nodes: [""],
    });
    expect(s).toBe(["", "└── ", ""].join("\n"));
  });

  it("explicit unicode true", () => {
    const s = archy(
      {
        label: "test",
        nodes: ["child"],
      },
      "",
      { unicode: true }
    );
    expect(s).toBe(["test", "└── child", ""].join("\n"));
  });

  it("default unicode (undefined)", () => {
    const s = archy({
      label: "test",
      nodes: ["child"],
    });
    expect(s).toBe(["test", "└── child", ""].join("\n"));
  });

  it("custom prefix", () => {
    const s = archy(
      {
        label: "root",
        nodes: ["child"],
      },
      "  "
    );
    expect(s).toBe(["  root", "  └── child", ""].join("\n"));
  });

  it("multi-line leaf node", () => {
    const s = archy({
      label: "root",
      nodes: ["line1\nline2"],
    });
    expect(s).toBe(["root", "└── line1", "    line2", ""].join("\n"));
  });

  it("nested multi-line", () => {
    const s = archy({
      label: "root\nline2",
      nodes: [
        {
          label: "child\nchild2",
          nodes: ["grandchild"],
        },
      ],
    });
    expect(s).toBe(
      [
        "root",
        "│ line2",
        "└─┬ child",
        "  │ child2",
        "  └── grandchild",
        "",
      ].join("\n")
    );
  });

  // Test deep nesting
  it("deep nesting", () => {
    const s = archy({
      label: "level1",
      nodes: [
        {
          label: "level2",
          nodes: [
            {
              label: "level3",
              nodes: ["level4"],
            },
          ],
        },
      ],
    });
    expect(s).toBe(
      ["level1", "└─┬ level2", "  └─┬ level3", "    └── level4", ""].join("\n")
    );
  });
});
