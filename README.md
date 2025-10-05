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
clk: ~4.09 GHz
cpu: 13th Gen Intel(R) Core(TM) i5-13400F
runtime: node 24.8.0 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• archy - simple tree
------------------------------------------- -------------------------------
fast-archy                   195.44 ns/iter 198.27 ns   █
                    (182.32 ns … 246.92 ns) 240.23 ns ▂▆██▄▄▄▃▁▁▂▂▁▁▁▂▁▁▂▁▁
                  gc(  1.72 ms …   5.42 ms) 431.98  b (148.50  b…817.90  b)

archy                        719.36 ns/iter 723.93 ns    ▆█
                      (648.58 ns … 1.01 µs) 995.53 ns ▁▂▁██▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  gc(  1.81 ms …   4.36 ms)   1.88 kb (  1.45 kb…  2.35 kb)

summary
  fast-archy
   3.68x faster than archy

• archy - medium tree
------------------------------------------- -------------------------------
fast-archy                     1.32 µs/iter   1.37 µs  ▅         █ ▄       
                        (1.23 µs … 1.47 µs)   1.44 µs ▄█▆▅▆▃▄▄▃▁████▆▄▃▂▂▂▂
                  gc(  1.80 ms …   2.49 ms)   2.44 kb (  2.42 kb…  3.36 kb)

archy                          3.45 µs/iter   3.59 µs   ▅█
                        (3.25 µs … 3.84 µs)   3.82 µs ▂▆██▆▇▄▆▆▃▁▃█▆▁█▂▁▂▁▂
                  gc(  1.91 ms …   2.55 ms)   8.40 kb (  7.74 kb…  8.42 kb)

summary
  fast-archy
   2.61x faster than archy

• archy - complex tree
------------------------------------------- -------------------------------
fast-archy                   755.84 µs/iter 758.30 µs  ██
                      (720.30 µs … 1.04 ms) 949.80 µs ▅███▄▃▂▃▁▂▁▁▁▁▁▁▁▁▁▁▁
                  gc(  1.75 ms …   2.82 ms)   1.40 mb (  1.12 mb…  2.06 mb)

archy                          1.41 ms/iter   1.41 ms  ▇█▆
                        (1.34 ms … 2.05 ms)   1.72 ms ▅███▇▄▄▃▂▂▁▁▁▁▁▁▁▂▁▂▁
                  gc(  1.82 ms …   2.71 ms)   3.20 mb (  2.18 mb…  4.69 mb)

summary
  fast-archy
   1.86x faster than archy

• archy - ascii mode
------------------------------------------- -------------------------------
fast-archy (ascii)           865.90 ns/iter 879.13 ns        ▃█▂
                      (791.55 ns … 1.01 µs) 972.95 ns ▂▆▄▂▂▂▁███▇▂▄▃▂▂▂▂▁▁▁
                  gc(  1.79 ms …   3.34 ms)   2.12 kb (  2.06 kb…  3.25 kb)

archy (ascii)                  2.66 µs/iter   2.76 µs  ▃▂█▆         ▆
                        (2.50 µs … 2.89 µs)   2.88 µs ▂████▅▂▇▄▅▂▅▄██▇▄▅▁▄▂
                  gc(  1.91 ms …   4.22 ms)   8.53 kb (  8.48 kb…  9.63 kb)

summary
  fast-archy (ascii)
   3.07x faster than archy (ascii)

• archy - beepHexo
------------------------------------------- -------------------------------
fast-archy                     4.56 ms/iter   4.63 ms          █▆
                        (4.13 ms … 5.11 ms)   5.04 ms ▁▅▂▃▁▂▁▂▂██▇▆▃▃▃▃▁▁▁▁
                  gc(  1.83 ms …   3.64 ms)  10.19 mb (  9.93 mb… 10.19 mb)

archy                         11.21 ms/iter  11.60 ms  ▄▅▄▂       ▂█ ▇
                      (10.47 ms … 12.66 ms)  12.20 ms ▇█████▄▄▃▄▃▇██▄█▄▆▄▁▃
                  gc(  2.01 ms …   3.18 ms)  29.90 mb ( 29.90 mb… 29.90 mb)

summary
  fast-archy
   2.46x faster than archy
```

## License

MIT
