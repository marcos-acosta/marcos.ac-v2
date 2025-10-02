---
title: 'RUGB'
description: "The color-guessing game that made me realize I don't know what color is"
pubDate: 'Jul 08 2022'
heroImage: '../../assets/blog-placeholder-3.jpg'
tags: 'projects,games,web-dev'
---

It started when a friend showed me [this video](https://www.youtube.com/shorts/W4Rebo3aEkY) of Tom Lum guessing the RGB value of his friend's nail color with astonishing accuracy. _Now this_, I thought, _is a useless skill worth having_. I searched the web for a site where I could practice guessing RGB values in a gamified way, but I didn't find anything. So, as is always the case when a nerd can't find the exact thing they want, I decided to make it.

The first question was how to design the game. At the time (the year of our Lord 2022), Wordle had been out for a year but was still _the_ minimalist web game, so the "Wordle treatment" was very tempting. In that approach, the player would be shown a color and given _N_ guesses to  guess the exact RGB (or hex) values. Although very zeitgeist-y, I felt like the fun in guessing color values was just getting good at being in the ballpark, not mechanically trial-and-error-ing to find the exact bit representation.

With that in mind, [Geoguessr](https://www.geoguessr.com/) actually seemed like a better game design reference. Multiple rounds, each one randomly selected, one guess each, and a final cumulative score at the end.

From the start, having a smooth and enjoyable UX was a priority. Since the game has only one mechanic (i.e. input numbers), it should be done well. I went with a minimalist approach where the target color is shown in the background and the RGB input is the central element. I also added a few convenience features, like automatically tabbing to the next value input after typing a 3-digit number (since RGB values can't exceed 255) and auto-selecting an invalid RGB value. On submission, the predicted color is shown directly above the target color to give the player crucial visual feedback.

### The color theory rabbit hole

By far and away, the most intricate part of this project was settling on a fair scoring function. In Geoguessr, the primary metric is distance, and an exponential curve is applied so that being off by a mile when you're a mile away affects your score much more than if you're two thousand miles away.

Naturally, I initially chose good ol' Euclidian distance as my scoring metric, where the color space can be thought of as a cube with axes for red, green, and blue. The final score would be based on the distance between the predicted and actual coordinates within that cube. Similarly to Geoguessr, I also applied an exponential to make accuracy more important closer to the target color.

```js
distance = sqrt((r_actual - r_pred)^2 + (g_actual - g_pred)^2 + (b_actual - b_pred)^2)
score = round(max(0, 100 - (distance / A)^B))
```

Where `A` and `B` could be tuned until it "feels right".

But as I began testing, I noticed that something was off. A guess that looked spot-on would sometimes get a *worse* score than a previous mediocre-looking guess. At first, I figured I was just imagining things. But on one occasion when I guessed a shade of green that was (in my estimation) indistinguishable from the target color and received a sub-par score, I knew there was definitely a problem. This was the beginning of my descent into the deep, deep rabbit hole of color theory.

![An xkcd comic about how no one really understands color theory](https://imgs.xkcd.com/comics/color_models_2x.png)

But I won't go into it here. Ultimately, when your computer monitor goes to display a color, it does so by activating minuscule LEDs. Each pixel contains one red, one green, and one blue LED. Hence, RGB. The RGB color space isn't perceptually uniform, though. As an illustrative example, take a look at the pairs of colors below.

(Insert example)

The colors in each pair are X units apart in the RGB color space. But, if your eyes are like mine, the pair on the left look almost identical, while the pair on the right seem pretty distinct.

Solving this alignment problem is hard, but luckily, I'm far from the first person to confront it. Enter: the International Committee on Illumination (CIE), which formed in 1913 to become the authority on matters of light, illumination, color, and color spaces. In 1976, they began to tackle this question of quantitatively measuring color difference. The CIE proposed a metric called ∆E, which should have the following properties:

- `∆E < 1.0`: No perceptible difference
- `∆E = 1.0`: Just noticeable difference (JND)
- `1 < ∆E ≤ 2`: Perceptible difference with close observation
- `2 < ∆E ≤ 10`: Perceptible difference at a glance
- `∆E < 50`: The two colors are more similar than they are different
- `∆E = 100`: The colors are opposites

Their first color difference function the CIE cooked up in 1976 (dE76) is actually our old friend Euclidean distance, but in the CIELAB color space instead of the RGB color space. That approach still falls short, though, especially with high-saturation, low-brightness colors:

(Example)

In the coming decades, the CIE iterated on their color difference formula, giving rise to dE94 in '94 and dE00 in 2000, each of which improved on its predecessor in terms of aligning the ∆E metric with its intended interpretation. Taking a glance at the equation for dE00, we see that the Euclidean simplicity of dE76 has been replaced with some hardcore feature engineering:

(Image)

When I swapped out my RGB-based Euclidean distance with LAB-based dE00 function, I found that the scores were much more reasonable:

(Example)

With the scoring function fixed and a leaderboard added, the only thing left to do was to pick a name. I settled on RUGB because it almost spells RGB and has absolutely nothing to do with rugby.

### The brief RUGB scene at Harvey Mudd College

Once the site went live, it started to spread among my friends, and then to their friends as people raced to the top of the leaderboard. This brought me a lot of joy– arguably, a game designer's one hope is that players enjoy the experience of playing it. 

Since there are ten rounds with a maximum 100 points per round, the maximum theoretical score is 1,000. Within a day, the leaderboard was filled with scores in the 800s. One of our [local celebrity CS professors](https://www.cs.hmc.edu/~dodds/ducttape/index.html) managed to top the leaderboard in one try with a score of 870.

(pictures)

By the next day, the bar had been raised to 939, averaging an impressive 93.9 points per round. As the leaderboard became more cutthroat, I noticed that players intent on making the leaderboard would simply refresh the page after making a particularly bad guess to avoid wasting time on a bad run. It also highlighted an interesting fact of RGB guessing: certain colors *are* easier to identify than others (we learned that shades of yellow/brown were particularly difficult), so part of the strategy for getting a high score was just playing enough times for the RNG to produce an "easy" run.

As time went on, the top scores continued to creep higher into the 900s; I seem to remember that Albany Blackburn held the high score of 946 by the time I graduated a semester later. My high score was no longer on the leaderboard, which to me is a sign of success.

### Reflection

Looking back a few years later, making RUGB and watching its brief moment in the spotlight on campus was a highlight of the semester. I had made a few other games at that point, but (to the surprise of no one) it was especially rewarding to see other people get truly _involved_ with a game I made.

At the time, I had a number of ideas for how I world improve RUGB. For one, there was the handling of cheaters: it's hilariously easy to cheat on RUGB, since the answer is literally in your browser.

(Image)

Case in point: I checked the leaderboard today and noticed that somebody has generously self-identified themself as a cheater.[^1]

(Image)

Practically, there's very little that can be done about that, since banning a perfect score seems excessive. I did, though, get a creative suggestion to catch players digging for low-hanging fruit in the browser's inspector: Apply an overlay to the background color with some opacity, and then in the application logic, calculate the resulting "combined" color and treat it as the true target color.

On the subject of over-engineering RUGB, some other ideas I had included a timed version, where the score is also a function of speed, a "color of the day" (a slight Wordleification), "RUGB for dogs" that excludes reds and greens (also helpful for colorblind folks), and a "versus mode" where players would go head-to-head with a random challenger, [QuizUp](https://en.wikipedia.org/wiki/QuizUp)-style. There were other things, too: I never got around to making the site mobile-friendly, and I meant to add better analytics so I had proper usage data beyond just the scores themselves.

I slated these ideas for later, since I still need to graduate, and my head was filled with other projects I wanted to work on. Plus, it seemed like RUGB had gotten all the attention that a color-guessing game could get.

#### On "almost making it"

About a year later, I was telling a friend about RUGB and he seemed to already be familiar with it. He showed me this fellow named [Jared Cross](https://www.instagram.com/jared__cross) who found his niche as a color guessing expert, mostly on a hex-guessing site called [Hexcodle](https://hexcodle.com/) which was published a year after RUGB. The very next day, a different friend sent me a link to *another* recent hex-guessing game which was generation a lot of attention online[^2]. I couldn't help beating myself up for not implementing the ideas I had, and for not attempting to share my work online. _If only I had_, I thought, _I might have had my big break_.  That was the first time I felt that specific feeling; I'd never been concerned about the mythical "big break" prior to making this silly little color-guessing game.

Looking back with even *more* hindsight now, I can see that my negative reaction was overblown. Since then, I've had a pretty modest success when my [CSS game](https://csshell.com/) hit the front page of Hacker News and was [live-streamed](https://www.youtube.com/watch?v=z6OQO5SwUhU) by CSS guru Kevin Powell. And guess what:

1. Watching RUGB's brief popularity on my college campus was more personally rewarding
2. Modest internet success or the lack thereof apparently had no effect on my desire to keep making fun websites (and get better at it)

Plus, the narrative of "I could have done that" or "I did that first" often overlooks some crucial details. Like, people who lament not having come up with Wordle first (such a simple idea!) might not know that before Wordle, [Josh](https://www.powerlanguage.co.uk/) had already honed his craft of simple-yet-addictive games with the viral Reddit social experiments [r/place](https://en.wikipedia.org/wiki/R/place) and [the button](https://en.wikipedia.org/wiki/The_Button_(Reddit)).

More recently, I've seen people react negatively to Blake Anderson's sensational [Horse Race Tests](https://x.com/snakesandrews/status/1908942786549998058), bewildered by how such a seemingly simple and crude game with no direct player interaction could gain such a large following. Having seen Blake give a talk at [Wonderville](https://www.wonderville.nyc/events/wordhack-july-2024) two years earlier, I can say with absolute certainty that Blake has been honing his craft for ages, and if anything, his virality is overdue.

As another example, Harvest Moon came out before Stardew Valley and yet never saw the latter game's level of success despite being a nearly identical farm sim game. The core game mechanics might be the same, but people care about e.g. the fact that Stardew Valley allows same-sex marriage, unlike Harvest Moon. Details like that matter.

That's not to entirely discount the role of luck, though (see: Darius Kazemi's brilliant [How I Won the Lottery](https://www.youtube.com/watch?v=l_F9jxsfGCw) talk). Actually, luck is just a different way of looking at the same thing. When you have a system as chaotic as millions of individuals who may or may not see or play or share your game, it's fair to talk about randomness, although certain things will seem deterministic (for example, if your game can't be played on a phone, it won't be as popular).

Thus ends my philosophical aside. More to the point: I had a blast making RUGB and, in the process, learned to temper my own unproductive desire for broader success in favor of enjoying local success. Because, in the memorable words of Robin Sloan, [an app can be a home-cooked meal](https://www.robinsloan.com/notes/home-cooked-app/).

[^1]: To be honest, I'm not sure that any of the top 9 scores are legitimate, which would imply that Albany in 10th place may still have the top legitimate score, two years later.
[^2]: It was called Colorrush by [luke](https://github.com/bvvst), but I can't find it anywhere now. Strange, because it looked like a lot of effort went into its UI.