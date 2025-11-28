# fast-archy

![npm bundle size](https://img.shields.io/bundlephobia/min/fast-archy) ![npm](https://img.shields.io/npm/v/fast-archy) ![NPM](https://img.shields.io/npm/l/fast-archy)

Render nested hierarchies `npm ls` style with unicode pipes.

Rewrite of [archy](https://www.npmjs.com/package/archy) in TypeScript, making it faster.

## Install

```sh
npm install fast-archy
```

## Usage

```js
import archy from "fast-archy";

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

console.log(s);
```

Output:

```
beep
│ one
│ two
├── ity
└─┬ boop
  ├─┬ o_O
  │ │ wheee
  │ ├─┬ oh
  │ │ ├── hello
  │ │ └── puny
  │ │     meat
  │ └── creature
  └── party
      time!
```

## API

### archy(obj, prefix?, opts?)

- `obj` `object|string` - Tree object or string label.
  - `obj.label` `string` - Node label.
  - `obj.nodes` `array` - Array of child nodes (same structure as `obj`).
- `prefix` `string` - Custom prefix for tree branches (default: `""`).
- `opts` `object` - Options object.
  - `opts.unicode` `boolean` - Use Unicode characters (default: `true`). If `false`, uses ASCII characters.

## Benchmarks

```
clk: ~4.06 GHz
cpu: 13th Gen Intel(R) Core(TM) i5-13400F
runtime: node 24.11.1 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• archy - simple tree
------------------------------------------- -------------------------------
fast-archy                   187.91 ns/iter 190.82 ns 247.75 ns ▄█▇▃▂▁▁▁▁▁▁
archy                        757.33 ns/iter 759.81 ns   1.03 µs ██▃▂▁▁▁▁▁▁▁

summary
  fast-archy
   4.03x faster than archy

• archy - medium tree
------------------------------------------- -------------------------------
fast-archy                     1.40 µs/iter   1.41 µs   1.52 µs ▃█▆▅▄▂▂▁▂▁▁
archy                          3.75 µs/iter   3.78 µs   3.88 µs ▁▁▂▂▅█▅▃▄▁▂

summary
  fast-archy
   2.68x faster than archy

• archy - complex tree
------------------------------------------- -------------------------------
fast-archy                   773.27 µs/iter 783.20 µs   1.03 ms ▆█▅▂▁▁▁▁▁▁▁
archy                          1.46 ms/iter   1.47 ms   1.76 ms ▃█▆▃▂▂▂▁▁▁▁

summary
  fast-archy
   1.89x faster than archy

• archy - ascii mode
------------------------------------------- -------------------------------
fast-archy (ascii)           910.90 ns/iter 920.92 ns 963.65 ns ▃▅█▆▄▃▃▂▂▁▁
archy (ascii)                  2.82 µs/iter   2.84 µs   2.92 µs ▁▁▁▂▂▆█▆▃▂▂

summary
  fast-archy (ascii)
   3.1x faster than archy (ascii)

• archy - beepHexo
------------------------------------------- -------------------------------
fast-archy                     4.73 ms/iter   4.76 ms   5.02 ms ▄▇█▅▄▂▃▂▂▂▁
archy                         11.80 ms/iter  11.98 ms  12.34 ms ▁▂▁▁▁▃█▄▄▂▁

summary
  fast-archy
   2.49x faster than archy
```

## License

MIT
