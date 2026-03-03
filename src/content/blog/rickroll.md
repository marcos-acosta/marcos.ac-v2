---
title: "How I learned to recognize rick roll QR codes by sight alone"
description: "Or, how I ended up learning way more about QR codes than I bargained for"
pubDate: 'Feb 20 2026'
heroImage: '../../assets/rick-roll/marcos-reading-qr-code.jpeg'
tags: 'random,projects'
pinned: true
---

In October last year, I was talking with my friend Jiadai about [tactics for avoiding rick rolls](https://www.youtube.com/watch?v=dQw4w9WgXcQ), including learning to recognize the distinctive `XcQ` in the canonical Rick Roll YouTube video: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`. Since we had been talking about QR codes recently,[^1] I started thinking about the practicality of recognizing rick roll QR codes. In a moment of overconfidence, I stated that by the end of January 2026, I would be able to discern rick roll QR codes from safe QR codes, by sight alone, with 95% accuracy. Jiadai recorded a voice memo of me saying this, and the bet was on.

## Formalizing the bet

At the start of January, I realized we needed to formalize the parameters of the bet, because it was clearly impossible for me to recognize _any_ rick roll, since there are probably hundreds of rick roll YouTube links, not to mention literally infinite possible redirects. That said, it would obviously be too easy to memorize a _single_ QR code. I wanted the terms of the bet to remain close to the _spirit_ of my original claim while still being at least remotely doable. Here's what I landed on for the specs of a "valid" rick roll QR code:

- Any one of the three top rick roll YouTube URLs ([1](https://www.youtube.com/watch?v=dQw4w9WgXcQ), [2](https://www.youtube.com/watch?v=xvFZjo5PgG0), [3](https://www.youtube.com/watch?v=iik25wqIuFo))
- Uppercase or lowercase domain (i.e. WWW.YOUTUBE.COM or www.youtube.com)
- Low or medium error correction (more on this later)
- Any one of the eight possible mask matters (more on this later)

In combination, there were 96 possible rick roll QR codes I needed to prepare for. This was too much for me to simply commit all the shapes to memory, which is by design.

As for the safe QR codes, I decided it would be most fun if Jiadai personally supplied a list of safe QR codes, so that I wouldn't know the distribution of non-rick-roll QR code at trial time. The only parameters for the safe QR codes were:

- Must be a valid, openable HTTP link
- Must be either version 3 (29x29) or version 4 (33x33)
  - Why? All 96 rick roll QR codes are one of these two sizes, so otherwise it would be a dead giveaway

The quiz would be relatively straightforward: each round, there would be a 50% chance of a rick roll or a safe QR code being shown, and I would need to correctly identify which one it is 19 times out of 20.

The punishment? Listening to "Never Gonna Give You Up" for three hours continuously.

## How QR codes work

> _If you already know how QR codes work, you can skip to the [next section](https://marcos.ac/rick-roll#idea-1-just-read-the-damn-thing). And if you want to skip past all the trial-and-error stuff, you can jump straight to [this section](https://marcos.ac/rick-roll#decision-trees)._

Now that the terms of the bet were defined, it was time to get to work.[^2] First, I needed to learn how QR codes store data. There were a bunch of resources I found helpful, but I'll just list a few of them here:

* [Calvin](https://calvin.sh/)'s [Control Freak QR Code Generator](https://calvin.sh/tools/qr/)
* [Thonky's QR Code Tutorial](https://www.thonky.com/qr-code-tutorial/)
* The [QRazyBox help page](https://merri.cx/qrazybox/help/getting-started/about-qr-code.html)
* Veritasium's on [how to encode a QR code by hand](https://www.youtube.com/watch?v=w5ebcowAJD8)
* This video [Omar](https://omar.website/) sent me of a guy 12 years ago explaining [how to decode a QR code by hand](https://www.youtube.com/watch?v=KA8hDldvfv0)

There are obviously a lot of details, so we'll just stick to the fundamentals.

### The anatomy of a QR code

![The main parts of a QR code, including the finder patterns in three of the corners, alignment pattern in the fourth corner, timing patterns, and format information](../../assets/rick-roll/anatomy.png)

The _finder patterns_ are the most distinctive part of a QR code– QR code scanners use these to, well, _find_ the QR code and establish its boundaries.

This QR code shown above is 29x29 pixels (or modules), which is also called a _version 3_ QR code. Smaller versions (down to version 1, or 21x21) store less data, while larger versions (up to version 40, or 177x177) store more data.

All versions (except version 1) have one or more _alignment patterns_ which help the scanner account for perspective warp.

On the top and left sides of the QR code there are the so-called _timing patterns_, which are alternating on-and-off modules that help the scanner determine the width and height of the QR code in modules (i.e. the version).

Finally, there's the _format information_ which, among other things, tells the scanner about the error correction and mask pattern used, which we'll talk about in just a second.

### From URL to QR code

Let's say we generate a QR code from the canonical rick roll link, `https://www.youtube.com/watch?v=dQw4w9WgXcQ`.

![A rick roll QR code, with the right half highlighted in purple](../../assets/rick-roll/rr-text.png)

The purple highlighted part is the URL itself (visual courtesy of [Calvin](https://calvin.sh/tools/qr)). Each letter is converted to its byte representation (i.e. one letter = 8 bits) and then those bytes snake[^5] up and down the QR code, starting from the bottom right corner. The background color (white) means the bit is off (`0`) and foreground color (black) means it's on (`1`). As you can see, the data bytes skip over the fixed parts of the QR code like the aligment pattern, format information, and timing pattern.

#### Error correction

You might also notice that the URL only takes up half of the QR code. What's the other half? Part of it is padding, but the rest is _error correction_.

![A rick roll QR code, with the left half highlighted in red](../../assets/rick-roll/rr-ec.png)

Understanding the details of [Reed-Solomon error correction](https://www.youtube.com/watch?v=dQw4w9WgXcQ) is challenging (I sure don't), but the bigger picture is this: error correction adds redundancy in a very smart way so that if some parts of the QR code are covered, or missing, or scanned incorrectly, the QR code can still be read. How much of the QR code can be damaged before it's unscannable? Well, there are four levels of error correction:

- `L`: Low  (scannable with 7% of QR code damaged)
- `M`: Medium (15%)
- `Q`: Quartile (25%)
- `H`: High (30%)

The level of error correction is included in the format information I mentioned earlier. It's actually the very first two modules just below the top-left finder pattern. In this QR code, both those modules are on (`11`). For this challenge there were two relevant patterns I needed to know:

- `11` means low (`L`) error correction
- `10` means medium (`M`) error correction

Lastly, there's one very big catch.

#### Mask patterns

If you were to actually convert that URL to binary and cross-reference the URL, you would find they don't match up. That's because if we were to naively encode our bytes as-is, we would wind up with large patches of black and white modules, which would be hard for a scanner to read. To fix this, one of eight _mask patterns_ is used to deterministically _flip_ certain modules in the QR code from on to off and vice versa. Check out this diagram from the [QRazyBox help page](https://merri.cx/qrazybox/help/getting-started/about-qr-code.html):

![Eight different black-and-white patterns, ranging from checkerboard to more chaotic-looking](../../assets/rick-roll/mask-patterns.png)

That first mask pattern is quite simple; it completely flips every third column. The fourth mask pattern shown flips every other row. Other mask patterns get a bit complex. In practice, when generating a QR code, the generator tries all eight mask patterns and picks the one that results in the least clumpiness.

The QR code tells the scanner which mask pattern is used by including it in the format information, right next to the error correction level. In order to recover the original data bytes, the scanner needs to determine which mask pattern is used and re-flip the appropriate modules to recover the original bytes.

## Idea #1: Just read the damn thing

![Chat with Luke: "29x29 seems almost doable to kinda memorize the mask patterns and parse some if it in your head / If you're fine taking like 5 minutes staring at it before deciding haha"](../../assets/rick-roll/luke-1.png)

Since half of the QR code is error correction anyway, my first idea was to simply read the data bytes... in my head. I realized this would probably be very slow,[^3] so I figured I would just read a select few bytes instead. Like, maybe I'd find the `u` in `youtube` and then a couple characters of the YouTube id. I could always get unlucky if Jiadai chose a YouTube link that very closely resembled a rick roll URL, but I figured there wasn't much I could do about that anyway. That aside, how hard could it be?

Well... very hard. The biggest issue, turns out, is the mask pattern. It's a classic case of the time-space tradeoff. I could opt for the space-efficient approach (i.e. less memorization) and run the mental calculations to figure out which modules to flip and then convert to ASCII in my head, but that would be very compute-heavy, and my brain is low on RAM. The complementary time-efficient approach would involve simply memorizing all eight versions of each byte of interest (one for each mask). But my brain doesn't have the kind of space for that, either.

I gave up on this idea before I even started.

![A meme; panel 1: "already given up?", panel 2, different character: "yeah"](../../assets/rick-roll/gave-up.png)

## Idea #2: Bits with high mutual information

Although my original idea was infeasible, there was one useful insight: certain parts of the QR code contain more information than others. For example, the finder patterns, alignment pattern, and timing patterns clearly contain zero information with regard to a QR code's rick roll-iness. Conversely, there must be certain parts of the QR code that happen to be very useful discriminators.

The first thing I wanted to do was to simply plot a heatmap of the [_mutual information_](https://www.youtube.com/watch?v=xvFZjo5PgG0) of each module. Mutual information is also called _information gain_ because it represents the amount of information learned about a random variable (in this case, whether the QR code is a rick roll or not) by observing a different random variable (in this case, a certain module being on or off).[^4]

Before I could do anything, though, I needed labeled data. For the positive examples, I just repeatedly sampled from the 96 sanctioned rick roll QR codes, and for the negative examples, I initially experimented with generating QR codes from random safe YouTube links or just gibberish URLs. Then, I generated a few thousand positive and negative QR codes, separated them by version (aka size), and ran the mutual information calculation.

Here's what I saw for version 3 (29x29) using the "gibberish" algorithm to generate the safe QR codes:

![A heatmap on a QR code grid, with a smattering of bright modules in the right and center, and one bright spot near the top left](../../assets/rick-roll/mutual-information-v3-random.png)

At first, I was pretty excited. It was clearly getting _something_ right because the finder patterns and timing patterns carried zero information, as expected. But then I looked closer and noticed that yellow pixel in the top left. Why was one of the most information-dense modules the module that distinguishes between low and medium error correction?

_\*facepalm\*_

It turned out that among all the rick roll QR codes, all the ones with low error correction were version 3 (29x29). The ones with medium error correction needed a larger grid and were thus version 4 (33x33). However, some gibberish URLs were short enough to have medium error correction while _staying_ 29x29, which meant a single pixel could be a dead giveaway.

If I wanted the results of my analysis to be robust, I had to be very careful with how I generated safe QR codes and prepared my data. So, I required that all version 3 safe QR codes use low error correction, and all version 4 safe QR codes use medium error correction. If I were to see one of the other combinations during the trial, I would immediately know it's not a rick roll.

Once I made those changes, the mutual information map looked less suspicious (also note the maximums are a more moderate ~0.08 bits versus ~0.2 bits):

![A heatmap on a QR code grid with fewer bright spots than the one before](../../assets/rick-roll/mutual-information-v3-fixed.png)

There are still plenty of curious patterns to investigate, like, why so many of the information-dense modules seem to line up vertically, and why they seem to come in two columns. I leave these as an exercise to the reader, because I was running out of time, and I wasn't going to win this bet if I kept falling down rabbit holes.

So, how was I supposed to take this information map and turn it into an algorithm for classifying QR codes?

My first thought was to naively check the `N` most information-dense modules and have each module "vote" toward a certain outcome, depending on whether its "on" or "off" state is more associated with rick roll or safe QR codes. But when I tested my approach on the QR code data, I found that the accuracy barely approached 80%, even as I increased `N`.

I could have predicted the poor performance, though. For one thing, this approach doesn't take into account the fact that different modules carry different _amounts_ of information, and so should be weighted. But that was out of the question, since I wouldn't be able to do that in my head at trial time.

But also, since we're looking at the values of _multiple_ modules, it doesn't make sense to assign each one an _individual_ vote. For example, maybe one module being on is a predictor of a rick roll _if_ another module is off. That is, we should be considering _joint_ probabilities.

## Idea #3: Decision trees

See, it was clear that certain combinations of modules being on or off would be indicative of the QR code's true identity. In the extreme case, the "combination" of _every_ module in the QR code is a perfect predictor. I already ruled out memorizing all 96 rick roll QR codes, but it still seemed reasonable that there would be _smaller_ combinations that are also very predictive.

This probably comes down to happenstance; since there are so few rick roll QR codes compared to the infinite alternatives, it's almost certain that by random chance, there'll be some combinations of off/on modules that appear in many rick roll QR codes but are statistically unlikely among randomly chosen safe QR codes.

That said, this all depended on the quality of the algorithm I used to generate safe QR codes, since my opponent Jiadai could choose _any_ QR code that produced a valid HTTP URL. As an example, let's say that the safe QR codes in my training data had an implicit bias which resulted in a certain error correction module usually being off. If this helped distinguish between the two classes during training, my model would learn to pay attention to this module being off. But maybe Jiadai ended up choosing URLs from a certain domain which, due to some mathematical coincidence, typically resulted in that same error correction module being _on_. Then, my whole plan would fall apart.

So, I made the safe QR code algorithm more robust by having the generator randomly choose from a few different "types" of URLs that I hoped would match Jiadai's distribution.
- Random safe YouTube URL (50% chance)
- Random gibberish URL (25% chance)
- "Evil" YouTube URL (25% chance)
  - i.e. only one character away from a rick roll YouTube URL

With the data quality improved, all that was left was to choose the machine learning algorithm.

> ChatGPT? LLMs? AI slop? What are you talking about? It's 2013, let's put on some Imagine Dragons and train some decision trees!

That's right, we're doing some old school machine learning.

Decision trees were a natural fit for one big reason: they're basically flow charts, which makes them super easy to interpret and commit to memory. Sure, I could train a small neural net, but sadly, the gazillion-parameter organic neural network in my skull is incapable of emulating even a tiny artificial neural network.

So, I split my data into two buckets, version 3 and version 4, and converted all the QR codes to vectors by concatenating all the rows and representing them numerically. In other words, a single version 3 QR code became an 841-dimensional vector, and a version 4 QR code became a 1,089-dimensional vector. Then I just trained a decision tree for each version using good ol' `sklearn`, and that was that. The only question was: would it be good enough?

Initially, the answer was no.

![A confusion matrix with 681 true negatives, 319 false positives, 0 false negatives, and 1000 true positives. Accuracy: 84%](../../assets/rick-roll/confusion-matrix-1.png)

Above is the confusion matrix for a decision tree trained on the version 3 (29x29) QR codes. The accuracy is only 84%, which is so close yet so far from 95%. I was surprised to see that the recall was 100%, and at first, I figured this must be another instance of data leakage in the training data. But then I realized this was expected: since all the positive examples only come from a handful of unique examples, the model can easily memorize patterns and eliminate the possibility of a false positive.

Still, that 84% accuracy. But there was hope! I had set the maximum depth of the tree (i.e. the maximum number of "decision points" in the flow chart) to `4`, because, well... I needed to memorize two of them, and my memory's not that great. But if I wanted to win (and make no mistake: I did), I would simply have to push my limits. I increased the maximum depth to `5`, and then `6`. It wasn't until I bumped the maximum depth to `7` that I got some models that could _maybe_ do the trick.

![Two confusion matrices with accuracies of 93.83% and 97.13%, respectively](../../assets/rick-roll/confusion-matrix-2.png)

The one on the left is for version 3 (29x29), the the one on the right is for version 4 (33x33). You might notice that the accuracy of the version 3 model is less than 95%. However, I didn't see myself memorizing two decision trees with depths larger than 7, so this was my best bet: if I assumed that the two versions appeared roughly equally, and I emulated the models in my head perfectly, I would average out to an accuracy of... 95.48%.

Talk about a fair game.

### Memorizing two depth-7 decision trees

The hard part was over! Now I just needed to memorize these dang things. The first thing I did was use `sklearn`'s built-in visualization module to take a look at the nodes. This was the result of printing the version 3 QR code decision tree:

![A large, unreadable flowchart](../../assets/rick-roll/dt-ugly.png)

Uh... well, that's not going to work. I had a better shot of memorizing the entire `curl` manpage. I needed something much more _visual_. While I'm often conflicted when it comes to vibecoding, I was more than happy to kick Claude Code into `Auto-Accept Mode` and turn those eyesores into  pedagogical study guides like this one:

![A QR code-sized grid with certain modules highlighted and numbered, and a decision tree below that references those modules](../../assets/rick-roll/study-guide-1.png)

Each "key module" was numbered on both the grid and in the decision tree so that I could easily cross-reference. I could also tell from the tree structure that the models clearly _did_ memorize parts of the rick roll QR codes. In the tree shown above, there are only three combinations that result in a rick roll prediction. If the QR code doesn't have one of those patterns, it's assumed to be safe. After seeing the confusion matrices, this made sense!

### Training

For a while, I just stared at the study guides for the two versions and quizzed myself in my head, but eventually I knew I had to test myself more rigorously. I once again leaned on Claude to cook up a CLI where I could test myself against the same safe QR code generator I used for training. I also added an option to constrain the QR code generation to require certain modules be on or off, which helped me practice less-common branches of the decision tree.

![A CLI where it draws QR codes and the user inputs whether it's a rick roll or not](../../assets/rick-roll/quiz.png)

After a couple days of focused training, I was as ready as I'd ever be.

## The trial

The trial itself took place at CCNYC, a creative coding meetup I help organize. Oops, I dropped a [link](https://ccnyc.space/). Ah, sorry, dropped [another link](https://www.instagram.com/creativecodingnyc/), my bad.

Earlier,[^6] I made a website that would serve as the official arbiter of justice, hosted at [rickroll.marcos.ac](https://rickroll.marcos.ac) and designed by Jiadai. It was designed so that Jiadai could drop in a JSON file of her chosen safe URLs ([example JSON format](https://github.com/marcos-acosta/rick-roll-qr-codes/blob/main/example-json/non-rick-rolls.json)) and the site would take care of the rest. I used a Kahoot-style setup where one screen is the host and I, as the player, join with my phone. The mobile site uses the camera so that if I choose to scan the QR code, the backend server gets notified via WebSocket. Accidentally scanning a rick roll QR code results, obviously, in the dreaded song playing.

Of course, we could have just generated the 20 QR codes as images and called it a day, but as the great Megamind once said...

> _PRESENTATION!_  
> – Megamind

The first QR code was the most nerve-wracking. After all this analysis, memorization, and training. Two mistakes is all it would take to lose the bet. In the best case, my training data was representative of Jiadai's safe QR codes, and I perfectly emulate the decision trees, and the model is only wrong once. On the other hand, even with perfect play, the model could easily be wrong twice, and that's _if_ my training data was any good. The first QR code was my litmus test.

But I trusted the process, followed the decision tree, and didn't scan it.

![I don't scan the QR code and am met with a gif of Rick Astley crying, and I smile](../../assets/rick-roll/qr-1.gif)

Breath of relief. I kept going. On my second QR code, I only had to look for a second before deciding it was safe. I scanned it and disaster struck.

![I duck and clutch my head as Rick Astley dancing appears on the projector](../../assets/rick-roll/oh-shit.jpeg)

What had happened is that I saw the first two modules in the format information were on, which– in a moment of nerves– I mistakenly thought meant `MEDIUM` error correction. Since the QR code was version 3 and all version 3 rick rolls had `LOW` error correction, I deduced it must be safe.

This was a critical blunder. Now, not only did I need to refrain from making a single mistake, my decision trees would _also_ need to be perfectly accurate, which was never a guarantee in the first place. But there was no other choice than to roll with the punches and keep going. As the rounds went by, I started to loosen up and entered the QR code scanning zone. I reached round 10 without making any additional mistakes.

By round 15, [Maxime](https://maximeheckel.com/) noted: "He does it faster than I can whip out my camera."

![Me laughing in response to Maxime](../../assets/rick-roll/faster.gif)

Finally, the last[^7] round. It was a version 3 QR code and the first two modules of the format information were `on off`. This time, I knew what `MEDIUM` error correction looked like. I scanned the QR code and cemented my victory.

![I scan a safe QR code and celebrate](../../assets/rick-roll/win.gif)

## Epilogue

So... although I won the most _interesting_ part of the bet, the _exact terms_ stated that I would be able to accomplish this feat by the end of January, but I postponed until mid-February because I wasn't quite ready yet. Jiadai accepted my compromise to split the punishment so that she would listen to two hours of "Never Gonna Give You Up", while I listened to one. Here's a picture of us being tortured together.

![Jiadai and I listening to Rick Astley's "Never Gonna Give You Up" in a cafe](../../assets/rick-roll/punishment.png)

We also took the opportunity to finish implementing Jiadai's design for the site. At trial time, I had to roll back to my (boring) minimalist design because I found the QR codes hard to read and I couldn't tell if the scanning was working. So, we fixed some UI bugs and the site looks much spiffier now thanks to her.

![A vaporwave-coded landing page](../../assets/rick-roll/new-design.png)

## Post-epilogue

![A screenshot of a text conversation between me and Jiadai: she sends a screenshot of her Spotify, which is now recommending Rick Astley](../../assets/rick-roll/top-mixes.jpeg)

[^1]: I feel like talking about QR codes is kind of like talking about sports teams but for nerds.
[^2]: Well, actually, it was time to procrastinate on this project until the very end of the bet period, but let's breeze through that part.
[^5]: This is a huge oversimplification. Trust me.
[^3]: Although time limits were never mentioned in the original terms of the bet, not even I wanted to spend 10 minutes reading a QR code.
[^4]: Mutual information is similar to correlation, but also not- one big difference is that correlation assumes that the relationship between the two variables is linear, while mutual information doesn't even assume it's a continuous function.
[^6]: In fact, I made the website before I even started figuring out how the hell I was going to win this bet, and used the web development as an excuse to procrastinate on doing that.
[^7]: For those keeping score, the reason it says "ROUND 19" is because my device got booted from the WebSocket connection after the first round, so we had to restart.