---
title: 'Making CSS Hell'
description: "What if the mechanic of a web game was the styling itself?"
pubDate: 'Jul 24 2023'
updatedDate: 'Oct 07 2025'
heroImage: '../../assets/csshell-cover.png'
tags: 'projects,games,web-dev'
---

_TLDR: [csshell.com](https://csshell.com)_

### The context

Two notable events occurred in June of 2023: One, I had my birthday on the 14th. Leading up to that day, my friend [Anshul](https://github.com/anshulkamath/) created an online "advent calendar" for my birthday, where each day came with a new puzzle to crack. Throughout that period, I had to find clues in disassembled C code, solve an injoke-filled crossword, guess songs in my own Spotify playlist from the first few seconds, play a reversed version of [my own color guessing game](/blog/rugb), and much more. On the day of my birthday, I was personally handed an envelope with dozens of heartfelt notes from my college friends. I was absolutely blown away by the effort that went into making that gift, and I still like to read through those letters when I'm feeling down.

The other notable event in June of 2023 was Anshul's own birthday, ten days later on the 24th. As soon as I realized the scope of Anshul's gift, I knew I needed to get to work immediately if I wanted any chance at meeting his high bar. There's no motivator quite like mutually beneficial friendly competition.

One thing to know about Anshul is that he loves low-level programming. As far as I can tell, the closer he is to dealing with individual bits, the happier he is. He generally despises UX design and used to half-jokingly refer to front-end work as code monkeying.[^1] This led me to wonder: what if my gift was a game that forced Anshul to become the very thing he despised the most? Thus, [CSS Hell](https://csshell.com) was born (originally called Code Monkey).

### Game design

I knew I wanted CSS Hell to be a puzzle game that relied on increasingly deep knowledge of the CSS model to solve. It wasn't long before I settled on the main game mechanic: Each level would contain at least one pair of a "peg" and its corresponding "hole" (indicated with matching colors). The goal of the game is to add CSS properties so that each peg (at least partially) overlaps its corresponding hole. Every element in the puzzle has a "budget" of properties which can be added, usually between `0` (i.e. "locked") and `2`. With a few exceptions, any CSS property in the specification is allowed.

Taking the first level as an example, we'd see that the "peg" (filled-in red circle) has a budget of 1 property. If we were to click on the "hole" (dotted red circle), we would see that it's locked i.e. doesn't accept any additional properties. In the screenshot below, I give the peg a `rotate` value of `90deg`.

![A screenshot of the first level of CSS Hell](/blog/csshell/level-1.png)

The puzzle can be solved by simply adding some `margin-left` to the peg. As my play-tester (and also first-time CSS user) [Albany](https://albanyblackburn.com) discovered, using `padding` is also a valid solution.

![Using padding-left to make the peg wide enough to touch the hole](/blog/csshell/level-1-padding.png)

One interesting challenge I ran into early on was implementing a reliable method of checking whether two DOM elements visually overlap. I could get an element's bounding boxes with `getBoundingClientRect()` (see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)), but that would only work if the element is a rectangle. Even if I made the pegs and holes square, this would exclude `rotate` as an allowed CSS property, which I didn't want to do.

I remembered, though, that there's a surefire way to know all the DOM elements at a particular point: the `elementsFromPoint()` function ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint)). This led to my somewhat cursed but functional solution: each time the user modifies a CSS property, it checks the bounding boxes on each of the pegs and holes. If all the pegs' bounding boxes overlap with their corresponding hole's bounding box, randomly  check 200 points inside the bounding boxes' overlaps. If at least one point hits both the peg and hole in all pairs, it's a solution. It's a hack, for sure, but it allowed me to make virtually no assumptions about which CSS properties players would use.

One lesson I learned in the process of developing CSS Hell is the importance of making it easy to iterate during the prototyping period. After making some initial proof-of-concepts, I took a step backward to refactor everything so that I could entirely specify a level with JSON.

```json
// levels.json
{
  "1": {
    "levelName": "round peg, round hole",
    "elements": [{ "id": "p0" }, { "id": "h0" }],
    "hint": "Have you tried moving the peg to the hole?",
    "elementData": {
      "p0": {
        "style": {
          "position": "absolute",
          "top": "calc((100vh - 5vw) / 2)",
          "left": "calc(100vw / 3)"
        },
        "cssBudget": 1
      },
      "h0": {
        "style": {
          "position": "absolute",
          "top": "calc((100vh - 5vw) / 2)",
          "right": "calc(100vw / 3)"
        }
      }
    },
  },
  // ...
}
```

The extra effort paid for itself dozens of times over. By making level design as frictionless as possible from the start, I was able to progress much faster than I could if I had to touch JSX.

In the process of iterating, I also realized that I'd need to restrict the use of some CSS properties if I wanted players to find the more creative solutions. For example, `transform` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)) was problematic since it allows basically any combination of translations, skews, scales, and rotations in a single property.

Another mechanic of the game is that existing CSS properties on elements aren't allowed to be overridden. This is different from how CSS usually works, but otherwise, it would be too easy for players to find uninteresting solutions. This raised another edge case, though: if an element already has e.g. `margin` set, should the player be able to set e.g. `margin-left`? From a level design perspective, if I want to communicate the fact that the player can't modify the margins of an element, it seems much cleaner to just have a single un-overwritable `margin` property instead of needing to specify a value for every longhand `margin-*` property. So, I settled on a rule that "shorthand properties can't override longhand properties".

### Playtesting and (locally) launching

With these rules in place, I could get to the most fun part: designing and play-testing levels. This process is perhaps most concisely communicated with two text message screenshots.

The joy of discovering the absolute mania of CSS:

![Text message from Albany: "I literally have ZERO clue what I'm doing, this is so fun"](/blog/csshell/zero-clue.jpg)

And the best possible reaction to the solution for a particularly diabolical puzzle:

![Text message: "Me: Let me know if you want a small pointer Albany: I think I'm gonna need it Me: <solution censored> Albany: You are insane"](/blog/csshell/you-are-insane.png)

After finishing all 15 levels and adding a few birthday-specific features, the game was finally ready to launch to its intended target audience of exactly one person. At 2:17 AM on June 24th, I tossed CSS Hell onto a public domain and sent it to Anshul. After a couple days of frustration, breakthroughs, and occasional troubleshooting, Anshul paid me the highest compliment I could have expected:

![Text message: "Anshul: this is quite fun Marcos: Thank you! Anshul: oh fuck Anshul: i mean this is quite funny looking Anshul: i would never have fun CSSing"](/blog/csshell/quite-fun.jpg)

Along the way, we discovered some snags. For example, one of the levels depended on a certain property in the CSS specification that wasn't fully supported on all versions of Safari. Also, the UI didn't indicate that a CSS property was being ignored because the same property was already defined. But after smoothing out these and a few other complications, I was left with a surprisingly playable CSS-based puzzle game. As far as I was concerned, this was mission accomplished.

### Suddenly, Hacker News

Stuff about HN and Kevin Powell

### Reflection

Reflection stuff

[^1]: People usually use the term "code monkey" in a [certain way](https://www.urbandictionary.com/define.php?term=code%20monkey), but I think in Anshul's case, he just felt that there was something spiritually primate-like about aligning divs and tuning margins.