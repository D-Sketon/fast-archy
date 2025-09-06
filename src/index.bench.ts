import { bench, group, run, summary } from "mitata";
import archyFast from "./index";
import archy from "archy";

const beepNodeSmall = {
  label: "beep",
  nodes: ["ity", "boop"],
};

const beepNodeMedium = {
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
};

const beepNodeLarge = {
  label: "root\nwith\nmultiple\nlines",
  nodes: Array.from({ length: 20 }, (_, i) => ({
    label: `node-${i}\nline-${i}`,
    nodes: Array.from({ length: 10 }, (_, j) => ({
      label: `child-${i}-${j}`,
      nodes: Array.from({ length: 5 }, (_, k) => ({
        label: `leaf-${i}-${j}-${k}\nwith\nmultiple\nlines`,
        nodes:
          k % 3 === 0
            ? [`deep-${i}-${j}-${k}-0`, `deep-${i}-${j}-${k}-1`]
            : undefined,
      })),
    })),
  })),
};

summary(() => {
  group("archy - simple tree", () => {
    bench("fast-archy", () => {
      archyFast(beepNodeSmall);
    }).gc("inner");

    bench("archy", () => {
      archy(beepNodeSmall);
    }).gc("inner");
  });
});

summary(() => {
  group("archy - medium tree", () => {
    bench("fast-archy", () => {
      archyFast(beepNodeMedium);
    }).gc("inner");

    bench("archy", () => {
      archy(beepNodeMedium);
    }).gc("inner");
  });
});

summary(() => {
  group("archy - complex tree", () => {
    bench("fast-archy", () => {
      archyFast(beepNodeLarge);
    }).gc("inner");

    bench("archy", () => {
      archy(beepNodeLarge);
    }).gc("inner");
  });
});

summary(() => {
  group("archy - ascii mode", () => {
    bench("fast-archy (ascii)", () => {
      archyFast(beepNodeMedium, "", { unicode: false });
    }).gc("inner");

    bench("archy (ascii)", () => {
      archy(beepNodeMedium, "", { unicode: false });
    }).gc("inner");
  });
});

(async () => {
  await run();
})();
