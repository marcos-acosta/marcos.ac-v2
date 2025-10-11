---
title: "What's the biggest number?"
description: "The unexpected beauty in the study of very large numbers"
pubDate: 'Mar 05 2025'
heroImage: '../../assets/biggest-number/biggest-number-header.png'
tags: 'essays,math'
---

Today we'll address a question that has long occupied the minds of children, mathematicians, and child mathematicians: What's the biggest number?

> **Child A**: When I grow up, I'm gonna have a million dollars.  
> **Child B**: Well, when I grow up, I'm gonna have a _billion_ dollars.  
> **Child A**: Oh yeah? Well, I'm gonna have a _billion_ billion dollars.  
> **Child B**: Well, I'm gonna have a _zillion_ dollars.  
> **Child A**: Ok, well, then I'm gonna have _infinity_ dollars.  
> **Child B**: Fine, then I'll have _infinity_ infinity dollars.  
> **Child A**: Well, I'm gonna have however many dollars you have, _plus one_!

Whereas the dialogue above illustrates a naive, blustering approach to the question, we will investigate the topic with rigor in the name of science and progress. Together, we'll discover the monstrosities that lie beyond the number of grains of sand on the earth, past the number of subatomic particles in the universe, and even beyond the number of _possible arrangements_ of subatomic particles in the universe.

Ready? Let's begin.

## Infinity

The first thing we need to do is deal with the question of infinity. You'll see plenty of amateurs at local "biggest number" competitions invoke infinity like it's some kind of ace in the hole, but this gambit is easily punished by experience [googologists](https://googology.fandom.com/wiki/Googology_Wiki).

Why? For one thing, there isn't one "infinity" in the same way there's only one `5`. "Infinity" could refer to the number of [rational numbers](https://en.wikipedia.org/wiki/Rational_number). Or, it could refer to the number of [real numbers](https://en.wikipedia.org/wiki/Real_number), which is infinitely larger than the former kind of infinity. You could also consider the number of possible subsets of real numbers and get an even bigger, infinitely _larger_ infinity. Or maybe you're referring to [transfinite numbers](https://en.wikipedia.org/wiki/Transfinite_number)?

More to the point, though, we discard infinities because they behave differently than regular counting numbers like `1`, `2`, `3`, etc. Regular old, salt-of-the-earth counting numbers have certain nice properties that you lose with infinities. For example:

- The ability to count up from `1` to the number (at least, in theory)
- The ability to write down every digit of the number (at least, in theory)
- The ability to imagine a collection containing that number of things (at least, in theory)

Infinity is and has always been slightly problematic for mathematicians because it's so unintuitive. While everyone can agree on the properties of `5` (it's odd, prime, etc.), there's no "one size fits all" intuitive description of infinity.

And finally, infinity is just a joykill. It's like naming Finchley Station on your first turn of [Finchley Station (the game)](<https://en.wikipedia.org/wiki/Finchley_Central_(game)>). Naming big numbers is a beautiful sport, and declaring your number to be the biggest _by definition_ is blatantly anticompetitive.

With that out of the way, let's start counting.

## The Cookie Clicker Principle

If you've ever seen a movie where an ambitious protagonist wants to become the greatest {karate master, jedi, boxer}, you know that you don't get a training montage until you go back to basics. So, let's revisit the fundamentals.

![Square one](../../assets/biggest-number/sq-one.png "Square one.")

Consider the number `1`. We can add one to that and get `1+1`, which represents a bigger number (namely, `2`). Add another one and we get `1+1+1`, or `3`. We could keep adding one forever, which clues us into the fact that we can _generalize_ this process. Instead of adding five ones, or ten ones, or a hundred ones, we can summarize the _act_ of summing _any number_ of ones together. Without any further ado, I'm pleased to present you with our first "fast"-growing function:

```
f(n) = 1+1+...+1+1 (n times) = n
```

Okay, I know what you're thinking. The function doesn't do anything. While that may be true, I wanted to start here because it illustrates the absolute simplest case of a surprisingly powerful strategy that will come up time and time again. I'll call it the **Cookie Clicker Principle**. It goes like this:

> **The Cookie Clicker Principle**
>
> Whenever an operation could be performed an arbitrary number of times, it can be generalized with a parameter. Usually, a new notation is needed.

If you were on the internet in 2013, you'll remember spending anywhere between a few seconds to a few days of your life clicking a cookie. The hook of the game, though, was that you could "power up" by buying upgrades which (among other things) allowed you farm _more cookies_ per click. This is roughly our guiding principle in the quest for bigger and bigger numbers.

In this case, we noticed that the `+` operation could be performed any number of times, so we generalized the process of repeated addition with a parameter, `n`. It just so happens that our "symbol" for repeated addition just _is_ the number itself, so it doesn't look very impressive. The next example will be a little more illustrative.

## Repeated addition: multiplication

So, with `f(n) = n`, we might notice that the function only spits out a single copy of `n`. Why not two copies? That would correspond to `f'(n) = 2n`. What about three copies of `n`? That gets us `f''(n) = 3n`. Whereas `f(10)` gave us a measly `10`, `f''(n)` gets us `30`. But of course, we could keep going, with `4n`, `5n`, and so on.

This brings us back to the Cookie Clicker Principle. The number of copies of `n` could be increased arbitrarily, so why not generalize that idea? We _could_ use a new variable like `m`, but just to keep things simple, we'll be environmentally friendly and reuse the same `n` to produce our next fast-growing function:

```
g(n) = n+n+...+n+n (n times) = n*n
```

Now, with that same input of `10`, the `g` function gives us a crisp `100`. That's pretty good!

## Repeated multiplication: exponentiation

But, we notice that we arbitrarily chose to multiply `n` by itself only once. Why not multiply `n` by itself twice? Or three times? That would correspond to `g'(n) = n*n*n`, `g''(n) = n*n*n*n`, etc. Well, well, well, we've walked straight into the Cookie Clicker Principle again. So, let's use a different notation to represent the idea of multiplying `n` by itself any number of times. In keeping with the pattern, we'll just reuse the same `n`.

```
h(n) = n*n*...*n*n (n times) = n^n
```

Now we're cooking with gas. While `f(10)` gave us `10` and `g(10)` gave us `100`, `h(10)` gives us ten billion. That's more than the number of people on earth! Not bad at all.

To illustrate how fast `h` grows, consider `h(100)`.

```
h(100) = 100^100 = (10^2)^100 = 10^200
```

That's a one followed by two hundred zeroes. To put that in perspective, there's a popular number out there called a _googol_ which would be written as a one followed by a hundred zeroes. To put that in perspective, there's between `10^78` and `10^82` atoms in the observable universe, so a googol is at least _a billion billion_ observable universes' worth of atoms. Our `h(100)`, on the other hand, is worth a _googol_ googols. That's pretty big.

## Repeated exponentiation: Knuth's up-arrows

![A stack of exponents](../../assets/biggest-number/power-stack.png)

But will we stop there? Absolutely not. In the grand scheme of things, what's two hundred zeroes? It's nothing. We notice that we only raised `n` to the power of itself once. Why not raise `n` to the power of `n`, and then raise `n` to _that_ power? Or how about a stack of 4 `n`s? Or 5? Once again, the Cookie Clicker Principle applies.

Computer pioneer and [TeX](https://en.wikipedia.org/wiki/TeX) inventor [Donald E. Knuth](https://en.wikipedia.org/wiki/Donald_Knuth) saw what was going on here, and in the '70s he came up with a new notation to generalize all of this generalization. It's called "[up-arrow notation](https://en.wikipedia.org/wiki/Knuth%27s_up-arrow_notation)", and it's pretty powerful. Here's how it works:

One arrow (`↑`) means repeated multiplication, a.k.a. exponentiation. So `2↑3` means "multiply together three copies of two" which becomes `2*2*2 = 2^3 = 8`.

Two arrows (`↑↑`) means repeated _exponentiation_. So, `2↑↑3` would represent `(2^(2^2))`, which is `16`. The cute name for a stack of exponents like that is a "power tower".

Keeping with the pattern, _three_ arrows means repeated double-arrowing, so `2↑↑↑3` means:

```
2↑↑(2↑↑2) = 2↑↑(2^2) = 2↑↑4 = 2^(2^(2^2)) = 2^16 = 65,536
```

And so on.

I intentionally picked small numbers so that the results are manageable, but these examples don't give a sense of how _insanely powerful_ the up-arrow notation is for expressing big numbers. Let's define `j(n) = n↑↑n` and consider `j(10)`. This would correspond to a power tower ten `10`s tall. It's hard to even find a way to _describe_ how big that number is. We could say it's a one followed by `10↑↑9` zeroes, but that's not very helpful. We could alternatively take a stab at the top part of the stack: `10↑↑4` is a one followed by a hundred million googol zeroes. If you think you can picture that, you can't. There's little point in trying to put the _whole_ number into perspective, because it's so much bigger that than we could ever fathom. And that's just with _two arrows_. What if we had used three? Or four? Or five? Wait a second...

Just when we thought we had generalized the whole thing, from repeated multiplication to repeated exponentiation to repeated _repeated_ exponentiation, and so on, the Cookie Clicker Principle reappears!

To "automate" the process of up-arrowing, we can use a shorthand to express how _many_ arrows there are, like `(↑^4)` to represent four up-arrows. Instead of "hard-coding" a specific number of up-arrows, we can "pull it out" as a parameter, just like all the previous times. This would give us our next fast-growing function:

```
k(n) = n(↑^n)n
```

It goes without saying, but if you thought `j(10)` was big, consider `k(10)`: `10↑↑↑↑↑↑↑↑↑↑10`. At this point, I've basically run out of interesting commentary to give for numbers this big. It's just, like, **_big_**.

You may have lost your appetite, but there's still more to come.

## Hyperoperation

By now, you should be convinced that there is _no limit_ to how fast we can make a function grow. Each time we come up with a new operator to generalize the act of applying a previous operator, we can always generalize the number of times that the _new_ operator is applied.

Mathematicians have devised many, many notations to describe functions that grow unspeakably faster than `k`. One example is [Conway](https://en.wikipedia.org/wiki/John_Horton_Conway)'s chained-arrow notation. Without getting into the weeds of it, in the chained-arrow notation, `a→b` corresponds to regular exponentiation, `a→b→n` corresponds to `a(↑^n)b`, and a chain of four arrows or more is... well, just crazy. I won't give a full definition since it's not easy to summarize, but feel free to check out the definition on [Wikipedia](https://en.wikipedia.org/wiki/Conway_chained_arrow_notation) if you're curious.

We can also generalize the up-arrow function in a different way, where the number of up-arrows is calculated recursively:

```
m(n) = 3↑↑↑↑3 if n = 1, else 3(↑^m(n-1))3
```

To put that into words: `m(1)` is already incomprehensibly, inexplicably large. `m(2)` goes ahead and sticks `m(1)` many up-arrows between the `3`s. Then, `m(3)` sticks _that_ many up-arrows between the `3`s, et cetera. If you repeated this process _sixty four_ times, you would get **Graham's number**.

Graham's number arose when mathematician Ronald Graham was trying to find an upper bound on the solution to a [graph theory problem](https://en.wikipedia.org/wiki/Graham%27s_number#Context), and it was the largest number ever used in a mathematical publication up to that point. To quote Wikipedia:

> It (Graham's number) is so large that the observable universe is far too small to contain an ordinary digital representation of Graham's number, assuming that each digit occupies one [Planck volume](https://en.wikipedia.org/wiki/Planck_units#Derived_units), possibly the smallest measurable space. But even the number of digits in this digital representation of Graham's number would itself be a number so large that _its_ digital representation cannot be represented in the observable universe.

It's so dang big that even if you stuck a `9` in every Planck volume in the observable universe and interpreted the whole thing as a power tower (i.e. `9^(9^(9^...))`), the result would _still_ be smaller than Graham's number.

But in the grand scheme of things, what's a universe-scale power tower? There's still bigger fish to fry. For example, there's the `TREE` function, which grows so fast that `TREE(3)` is already [unfathomably larger](https://en.wikipedia.org/wiki/Kruskal%27s_tree_theorem#TREE_function) than Graham's number. Need we go on?

## Forbidden functions

Actually, it turns out that we mortals are forbidden from constructing the _fastest_-growing functions. Why? To understand that, we need to understand the difference between _computable_ and _uncomputable_ functions.

In broad terms, a computable function is one that could be run by an algorithm (a little circular, I know). By "algorithm", we informally mean "a step-by-step process". Formally, that "step-by-step process" is usually a well-studied model of computation, the most famous example being the Turing machine. If you're not familiar with Turing machines, I always like to recommend [this Quanta article](https://www.quantamagazine.org/alan-turings-most-important-machine-was-never-built-20230503/). If you're in a "TL;DR" mood, then (a) I'm surprised you made it this far, and (b) even if you just learn the vibe of a Turing machine, you'll probably get the gist of this section.

Let's consider a specific function that adds two to an input. Even if you're not an algorithms person, you could probably guess that this function is very much computable. In Python, we would just write:

```py
def add_two(n):
  return n + 2
```

The Turing machine would be similarly simple. I sketched it out below, in case you were curious:

> `ADD_TWO` (Turing machine)
>
> Assume the input is represented as `n` `1`s on the tape (otherwise `0`), and the Turing machine head starts at the leftmost `1`. Also assume the Turing machine starts in state `S0`.
>
> - When reading `1` in state `S0`: Move right, remain in state `S0`
> - When reading `0` in state `S0`: Write a `1`, move right, switch to state `S1`
> - When in state `S1`: Write a `1` and switch to the `HALT` state (terminate).

When the Turing machine terminates, it will have left `n + 2` `1`s on the tape.

A slightly more complicated function would be one that computes the `n`th prime. That is, `p(1) = 2`, `p(2) = 3`, `p(3) = 5`, `p(10) = 29`, and so on.

Considering how much mystery and intrigue surrounds the primes, you might suspect that this function wouldn't be computable, but it actually is! In pseudocode (a.k.a. Python), the algorithm might look like this:

```py
def is_prime(n):
  for i in range(2, n):
    # If i divides n
    if n % i == 0:
      return False
  return True

def p(n):
  num_primes = 1
  x = 2
  while num_primes < n:
    x += 1
    if is_prime(x):
      num_primes += 1
  return x
```

It may be a "brute force" approach[^sqrt], but brute force is computable! The corresponding Turing machine for this pseudocode would be a beast, for sure, but it _can_ be constructed, which is all that matters.

Now that we have a sense of what a computable function is, what would it mean for a function to be _uncomputable_? We'll take a look at one famous example, which has to do with the **halting problem**.

> **The halting problem (informally)**
>
> _Context_  
> Turing machines compute inputs. When a Turing machine computes an input, the computation will either run forever or (eventually) halt. Consider the fact that we can encode a Turing machine as a single integer (in much the same way a computer program can be represented as binary, which is also a number). We could do the same with any input to a Turing machine. Then, we could construct a single number `N` for any combination of a Turing machine _and_ input.
>
> _The halting problem_  
> Is it possible to write a function `HALTS` that returns one value (say, `0`) if the Turing machine and input encoded by `N` runs forever, and a different value (say, `1`) if it eventually halts?

In 1936, Alonzo Church and Alan Turing independently proved that it is _impossible_ to write an algorithm for `HALTS`. Which is a bummer, because this function would be the most godlike superpower for mathematicians and computer scientists. I mean, so many great mathematical mysteries could be solved with this method: take the [Goldbach Conjecture](https://en.wikipedia.org/wiki/Goldbach%27s_conjecture), which manages to come up in almost every one of my essays. The conjecture states that every even number greater than two can be expressed as the sum of two primes. There's currently no proof. But, if we had `HALTS`, then we could do the following: Write a program that counts up and stops if it ever finds an even number that breaks the rule. Then, pass its code to `HALTS`. If `HALTS` returns `0`, then the conjecture is true, otherwise, it's false!

![Prometheus tries to steal the HALTS function](../../assets/biggest-number/prometheus.png)

### Busy beavers strike again

So, solving the halting problem is uncomputable, and as a result, anything that _depends_ on cracking the halting problem is also uncomputable. This brings me to the Busy Beaver problem, which I described in more detail in my previous essay on [unthinkable thoughts](https://worldsworstdetective.com/unthinkable-thoughts#chaos-in-the-patterns-in-the-chaos-in-the-patterns). To summarize quickly, we can define a function `BB(n)` that tells us the _longest_ number of steps that a Turing machine with `n` states can run (with no input) before eventually halting. By definition, Turing machines that run forever are disqualified, which is where the halting problem shows up.

Currently, we know the value of `BB(1)` through `BB(5)`. Although we can calculate `BB` for _specific_ input values, we _cannot_ write an algorithm that computes `BB(n)` in general, because that would violate the uncomputability of the halting problem.

And here's the real kicker: In 1961, it was [proved](https://gwern.net/doc/cs/computable/1962-rado.pdf) that `BB(n)` will eventually grow faster than _any_ computable function. In other words, if we can explain, in a step-by-step manner, how to compute the result of a fast-growing function, then _by definition_ that function doesn't grow as fast as `BB(n)` (or countless other uncomputable functions).

In _other_ other words: there's always a bigger fish.

## Sidenote: Sbiis Saibian

I've pretty much finished talking shop, but there's another fascinating angle to this story, which is the individual known pseudonymously as [Sbiis Saibian](https://googology.fandom.com/wiki/User:Sbiis_Saibian). While not the creator of the [Googology wiki](https://googology.fandom.com/wiki/Googology_Wiki) (the fandom page for people who enjoy hunting down large numbers), Saibian is one of the most prolific contributors. I was immediately enchanted by the seriousness with which Saibian treats the subject. In fact, my introduction to this entire topic was reading his [Introduction to Googology](https://googology.fandom.com/wiki/User_blog:Sbiis_Saibian/Introduction_to_Googology) page. Just to sample a few highlights:

> "Googology is not JUST a study. It is a craft."
>
> "If your [sic] going to be a googologist, your going to need to broaden your perspective on infinity."
>
> "In googology your goal is to come up with an honest-to-goodness real ACTUAL number that you can point to and say exists."
>
> "Once you realize how pitiful addition, multiplication, and exponentation is here, the next most likely thing you are to do is grab a bunch of powerful notations you barely understand and smoosh them together in some haphazard manner."
>
> "Don't expect googologist's [sic] to be impressed. Just show us the money. Define your number and we shall see what it does and does not dwarf, otherwise it's just hogwash."
>
> "Hidden within every large number notation is a clock ... which ticks slower and slower."

And my personal favorite:

> "This is one of the oldest and lamest tricks in the book. Probably since the dawn of large number competitions, there was always been some snarky person who has tried some variation of "my number is whatever your number is plus one". It's precisely these sort of school yard "tactics" which have kept googology from making further progress amongst the masses."
>
> – Sbiis Saibian

I was completely fascinated by this anonymous individual and his seemingly unbounded devotion to large numbers. To learn more about the subject, I read through his "[online textbook](https://sites.google.com/site/largenumbers/home?authuser=0)" on large numbers. Saibian begins the first section with an introduction so steeped in religious awe that I hardly knew what to make of it:

> ... somewhere in the heavens ... they are waiting ... they exist in another dimension far removed from our own and our mundane concerns ... they live in the gaping yawn of eternity in the sea of infinity ... few are aware of their existence ... the contemplation of the smaller members of their kind is enough to drive men insane ...

First of all, starting with an ellipsis is such a baller move. "Gaping Yawn of Eternity" sounds like the name of an album I would have liked in middle school, back when I planned on naming my first album _Pi Cubed_[^album]. I have this mental image of Saibian crafting massive number after massive number, feeling the burden of humanity on his shoulders as he tames the unspeakable horrors that lie beyond our meager world of billions and trillions.

![Detective rolling a boulder up a hill](../../assets/biggest-number/boulder.png)

Every fact I learn about Sbiis Saibian makes me even more curious about the kind of person he is. The most interesting tidbit I've discovered about Saibian is his [Decimice](https://sites.google.com/site/largenumbers/home/appendix/f). Saibian writes that, since childhood, he's had strong [color associations](https://en.wikipedia.org/wiki/Synesthesia) with different digits. Wanting to give each digit a distinct personality, he designed and drew ten anthropomorphic mice to represent each of the ten digits, giving each one a unique color theme and even a list of hobbies. He adds:

> "One character in particular "Fourzi", representing the number 4, has become my avatar and kind of my unofficial "fursona" in the context of googology."

But even here, in the realm of colored-pencil-drawn numerological mice, Saibian feels the need to define "a few important conventions" he used in creating the Decimice:

> "Firstly and most importantly, if a number is "even" then it is "male" and if it is "odd" then it is "female". Male names end in -zi where as female names end in -ri. All names are exactly two syllables long."

It may sound like I'm just making fun of Sbiis Saibian and his obsession with numbers. I will admit that his prose occasionally leans into a bombastic and/or angsty tone that makes it a little difficult to take seriously. But the truth is that, to an extent, I can relate.

In my 6th grade math class, there was a poster directly next to my desk with the first hundred digits of pi. When I zoned out in class, I would memorize a few digits, and eventually I had the whole thing memorized. This lead me to read Wikipedia pages about pi and its relationship with prime numbers, which got me into number theory. In high school, I was reading about Russell's Paradox, Gödel's Incompleteness Theorem, and the Riemann Hypothesis. I didn't necessarily _understand_ all of it, but it all felt _important_ in a way I couldn't quite put into words. I distinctly remember a moment in college when I became hyper-aware of the fact that humans' unique ability to conceptualize numbers as an abstract thing enabled us to _describe the laws of physics_ and even _communicate at the speed of light_. In that moment, I felt a kind of existential terror. I looked around at everyday objects like lamps and laptops with a new sense of awe and disbelief.

And that's kind of the crux of this essay. The main reason I found Sbiis Saibian (and the entire subject of googology) so fascinating is that it makes me feel, simultaneously, two polar opposite reactions: "Who cares?" and "How could you not care?"

## Who cares?

So... what are the practical implications of this? Sure, very big numbers are often useful, like the speed of light or the number of bits in a massive data warehouse. But once we start dealing with numbers like Graham's number, whose size absolutely dwarfs the scale of the universe, what's the point?

Some philosophers have taken this viewpoint to the extreme: to [ultrafinitists](https://en.wikipedia.org/wiki/Ultrafinitism), if something (e.g. a number) can't be _actually_ constructed, then we're not justified in saying it exists. Since it doesn't seem possible to ever have Graham's number of _anything_, an ultrafinitist would argue that the number itself hasn't actually been "found" or "discovered". It's just as nonexistent as unicorns.

Ultrafinitism takes issue with the circular definition of numbers in classical mathematics: at the lowest level, a number is the repeated application of adding one, so e.g. `3 = 1+1+1`. But for numbers like Graham's number, you'd just say "Trust me, there's Graham's number of `+1`s". Ultrafinitists aren't a big fan of that circularity.

Pedantic? Maybe. But it illustrates the point that the physical, actual, as-it-relates-to-humans usefulness of numbers like Graham's number (or any of the unimaginably larger numbers googologists have cooked up) seems like basically zero.

Furthermore, we know that there's no pot of gold at the end of the rainbow, so to speak. Above every fast-growing function is another, equally pointless faster-growing function, and above _that_ is an infinite number of uncomputable functions that will never be described. So who cares?

## How could you not care?

First, I'd like to refute the idea that "googology is pointless because there's very limited practical value". As Sbiis Saibian himself stated, googology is a _craft_. It's an art, it's a challenge. When George Mallory was asked why he climbed Mount Everest, he reportedly said, "Because it's there." Well, googologists seek out bigger numbers because they're _there_. What's more human than that?

> "People ask me, 'What is the use of climbing Mount Everest?' and my answer must at once be, 'It is of no use. There is not the slightest prospect of any gain whatsoever. Oh, we may learn a little about the behaviour of the human body at high altitudes, and possibly medical men may turn our observation to some account for the purposes of aviation. But otherwise nothing will come of it. We shall not bring back a single bit of gold or silver, not a gem, nor any coal or iron... What we get from this adventure is just sheer joy. And joy is, after all, the end of life. We do not live to eat and make money. We eat and make money to be able to live. That is what life means and what life is for."
>
> – George Mallory

Well put, George.

Also, saying that the study of large numbers is useless because we'll probably never use the numbers themselves is kind of like arguing that _school_ is useless because no one remembers what year the French Revolution started, or what the Golgi apparatus does, or what a covalent bond is. Just like school teaches kids how to self-organize and handle social situations (among other things), there's value in the _method_ that googologists use to define larger numbers.

### The abstraction dojo

![A physical pendulum being abstracted to an ideal pendulum being abstracted to a formula](../../assets/biggest-number/pendulum.png)

To me, googology is like a dojo where one's capacity for _abstraction_ is pushed to its limits. I very quickly ran into my _own_ limits for abstraction when trying to intuitively understand Conway's chained arrow notation for chains of four or more arrows. The definition itself was simple enough, and I was able to work through a few examples with four arrows. But I still wasn't able to _grok_ it; I didn't fully see what the chained arrows were supposed to _represent_ in the same way that I deeply understand what addition, multiplication, and exponentiation represent.

The study of large numbers pushes this understanding of numbers to the absolute extreme; to the scale of the universe, and then so far beyond it that the observable universe becomes a rounding error. It's so irreverent, I love it. But, as Saibian pointed out, crafting these massive numbers requires much more skill than "smooshing powerful notations in a haphazard manner": each new notation requires effort and ingenuity, holding in one's head multiple dizzying towers of abstraction, and generalizing _those_ towers with an even _grander_ layer of abstraction.

Humans have a unique power for identifying abstract patterns and generalizing them. It's that very skill which has allowed us to generalize, say, counting numbers to rational numbers, to irrational numbers, to negative numbers (and zero), to complex numbers, to multidimensional vectors, and so on. Each one of those breakthroughs improved (or enabled the existence of) all kinds of human endeavors from accounting and steam engines to GPS and quantum computers.

One of my favorite examples of this principle is the work of Claude Shannon, who realized that the amount of "information" in a message could be _measured_, regardless of whether that message was a telegraph, a sequence of numbers, or the results of coin tosses. His [development of this idea](https://www.quantamagazine.org/how-claude-shannons-information-theory-invented-the-future-20201222/) resulted in a theory so general that it revolutionized practically _every_ scientific discipline, including mathematics, electrical engineering, signal processing, statistics, computer science, neurology, physics[^physics], cryptography, and biology. That's a pretty powerful abstraction[^flood].

Today, we're seeing computer scientists attempt to generalize _thought itself_ as a massive, immensely complex function. If such a thing were truly possible, would that mean we're capable of generalizing our own _ability_ to generalize? What does that even mean for human intelligence? It's a very [Hofstadter](https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach)-coded question.

In other words, humans have used abstractions like numbers and information theory to harness the laws of reality and propel ourselves into the next technological age. But in the face of all of that technological progress, I think there's something deeply artistic about discovering higher abstractions just for the sake of _doing_ it, despite the Sisyphean nature of the task. In my mind, googologists are like martial arts masters, honing their craft in the art of self defense without expecting a fight. Beyond the realm of practical value, I salute the googologists building their towers in the sky.

Damn, now _I'm_ starting to sound like Sbiis.

## So... what's the biggest number?

Probably [ten](https://www.youtube.com/watch?v=SMKnskpPYeo). ■

[^sqrt]: Yeah, I know we could optimize this by only iterating up to `sqrt(n)`, but the point is only that it's _possible_, not necessarily _efficient_.
[^album]: That's not a joke. I decided that the album cover would be an actual cube with the digits of pi written on it. I honestly, truly, legitimately thought that would be cool. Thankfully, we don't stay 12 forever.
[^flood]: If that at all sounds interesting, I highly recommend reading [_The Information: A History, a Theory, a Flood_](https://en.wikipedia.org/wiki/The_Information:_A_History,_a_Theory,_a_Flood) by James Gleick.
[^physics]: Information theory's effect on physics was so profound that many physicists today consider [information to be the most fundamental building block of the universe](https://johnhorgan.org/cross-check/physicist-john-wheeler-and-the-it-from-bit).
